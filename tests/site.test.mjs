import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {products} from '../products.mjs';
import {remember,pilotBrief,memoryType} from '../shared/logic.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=resolve(root,'dist');
const [p]=products;
test('Single product',()=>{
  assert.equal(products.length,1);
  assert.equal(p.slug,'remnexa');
});
test('Complete local navigation',()=>{
  for(const page of ['index.html','docs.html']){
    const html=readFileSync(resolve(dir,page),'utf8');
    assert.ok(html.includes(`data-product="${p.name}"`));
    assert.ok(html.includes('lang="en"'));
    for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      const target=match[1];
      if(!target.startsWith('./')&&!target.startsWith('#'))continue;
      const [file,hash]=target.split('#');
      const dest=resolve(dir,file||page);
      assert.ok(existsSync(dest),`missing ${target}`);
      if(hash)assert.ok(readFileSync(dest,'utf8').includes(`id="${hash}"`),`missing anchor ${hash}`);
    }
  }
});
test('No parent attribution and no outbound submission',()=>{
  for(const file of ['index.html','docs.html','product-guide.md'])assert.doesNotMatch(readFileSync(resolve(dir,file),'utf8'),/by Brain Engine|Part of Brain Engine|© 2026 Brain Engine|mailto:/i);
  const html=readFileSync(resolve(dir,'index.html'),'utf8');
  assert.ok([...html.matchAll(/data-section="([^"]+)"/g)].length>=8);
  const js=readFileSync(resolve(root,'shared/site.js'),'utf8');
  assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|sendBeacon|mailto:/);
});
test('Memory correction and forgetting',()=>{
  assert.equal(remember().recalled.value,'Lisbon');
  const updated=remember(true);
  assert.equal(updated.recalled.value,'Porto');
  assert.deepEqual(updated.history.map(x=>x.value),['Lisbon','Porto']);
  assert.equal(remember(true,true).recalled,null);
  assert.equal(typeof memoryType,'function');
});
test('Pilot brief validation',()=>{
  const text=pilotBrief(p.name,{team:'Example Team',useCase:'Evaluate our scoped workflow with a controlled dataset.',deployment:'Private infrastructure'});
  assert.ok(text.includes(`${p.name} — pilot brief`));
  assert.ok(text.includes('Not submitted.'));
  assert.throws(()=>pilotBrief('Remnexa',{team:'X',useCase:'short'}));
});
test('Documented capability boundaries and source attribution',()=>{
  const html=readFileSync(resolve(dir,'docs.html'),'utf8');
  assert.ok(html.includes('id="limits"'));
  assert.ok(html.includes('id="sources"'));
  assert.ok(html.includes('Evaluation-stage foundation'));
  for(const source of p.sources)assert.ok(html.includes(source));
  assert.doesNotMatch(html,/\$\d|mailto:|api_key\s*=\s*["'][^"']+/);
  assert.ok(p.docs.find(x=>x[0]==='limits')[2].includes('1,000'));
});
