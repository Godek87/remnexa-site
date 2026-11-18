import {remember, recoveryPoints, recoveryPlan, evaluateScale, pilotBrief} from './logic.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
window.lucide?.createIcons();

const menu = $('[data-menu]');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  $('#navigation').classList.toggle('open', !expanded);
});
$$('#navigation a').forEach(link => link.addEventListener('click', () => {
  menu?.setAttribute('aria-expanded', 'false');
  $('#navigation').classList.remove('open');
}));

const dialog = $('#pilot-dialog');
$$('[data-pilot]').forEach(button => button.addEventListener('click', () => {
  $('#pilot-status').textContent = '';
  dialog.showModal();
}));
$('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
$('#pilot-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.target));
  try {
    const text = pilotBrief(document.body.dataset.product, values);
    const url = URL.createObjectURL(new Blob([text], {type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${document.body.dataset.product.toLowerCase()}-pilot-brief.md`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('#pilot-status').textContent = 'Your brief is ready. Check your downloads. Nothing has been sent.';
  } catch (error) { $('#pilot-status').textContent = error.message; }
});

$$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
    button.textContent = 'Copied';
  } catch { button.textContent = 'Select the code to copy'; }
}));

function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { $('[data-demo-status]').textContent = 'Browser storage unavailable. This session still works.'; }
}
function restore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === 'object' ? value : fallback;
  } catch { return fallback; }
}

if ($('#memory-demo')) {
  const saved = restore('remnexa-illustration-v1', {});
  let corrected = saved.corrected === true;
  let forgotten = saved.forgotten === true;
  const render = () => {
    const data = remember(corrected, forgotten);
    $('#memory-city').textContent = data.recalled?.value ?? 'Withheld';
    $('#memory-answer').textContent = data.recalled
      ? `The delivery city is ${data.recalled.value}.`
      : 'This memory is excluded from recall.';
    $('#memory-source').textContent = data.recalled?.source ?? 'Recall tombstone · history retained';
    $('#revision').textContent = `Revision ${data.history.length}`;
    $('#memory-older').hidden = !corrected;
    $('#memory-forget').disabled = forgotten;
    $('#memory-correct').disabled = corrected || forgotten;
    $('#memory-history').textContent = data.history.map(x => `r${x.revision} · ${x.value}`).join(' → ');
    $('#memory-state').textContent = forgotten ? 'Excluded' : 'Reported';
    persist('remnexa-illustration-v1', {corrected, forgotten});
  };
  $('#memory-correct').addEventListener('click', () => {corrected = true; render();});
  $('#memory-forget').addEventListener('click', () => {forgotten = true; render();});
  $('#memory-reset').addEventListener('click', () => {corrected = false; forgotten = false; render();});
  render();
}

if ($('#storage-demo')) {
  let selection = 1;
  const render = () => {
    const p = recoveryPoints[selection];
    $$('#recovery-points button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === selection)));
    $('#point-time').textContent = p.time;
    $('#point-id').textContent = p.id;
    $('#point-records').textContent = p.records.toLocaleString('en-US');
    $('#clone-output').textContent = 'Choose a recovery point, then preview a recovery clone.';
    $('#clone-result').hidden = true;
  };
  $$('#recovery-points button').forEach((button, i) => button.addEventListener('click', () => {selection = i; render();}));
  $('#prepare-clone').addEventListener('click', () => {
    const plan = recoveryPlan(selection);
    $('#clone-output').textContent = `${plan.snapshot} → ${plan.target}`;
    $('#clone-result').hidden = false;
  });
  render();
}

if ($('#model-demo')) {
  let evaluated = false;
  const render = () => {
    const state = evaluateScale(Number($('#scale').value), evaluated);
    $('#scale-value').textContent = `${$('#scale').value}×`;
    $('#model-formula').textContent = `y = ${$('#scale').value}x`;
    $('#model-output').textContent = `[${state.output.join(', ')}]`;
    $('#eval-state').textContent = state.state;
    $('#eval-state').classList.toggle('verified', evaluated);
    $('#eval-result').textContent = evaluated
      ? `${state.passed} / ${state.cases} example cases passed`
      : 'Configuration changed. Run the example evaluation.';
    $('#eval-bar').style.width = evaluated ? `${state.passed / state.cases * 100}%` : '0%';
    $('#eval-fingerprint').textContent = state.fingerprint;
  };
  $('#scale').addEventListener('input', () => {evaluated = false; render();});
  $('#evaluate').addEventListener('click', () => {evaluated = true; render();});
  render();
}

const search = $('#docs-search');
search?.addEventListener('input', () => {
  const query = search.value.toLowerCase().trim();
  let visible = 0;
  $$('.doc-article').forEach(article => {
    const match = article.textContent.toLowerCase().includes(query);
    article.hidden = !match;
    const link = $(`.docs-nav a[href="#${article.id}"]`);
    if (link) link.hidden = !match;
    if (match) visible++;
  });
  $('#search-status').textContent = query ? `${visible} matching sections` : '';
  $('#docs-empty').hidden = visible > 0;
});

// The following explorers explain architecture; they do not call a product runtime.
import {memoryType,transferEstimate,architectureScenario} from './logic.mjs';
$$('[data-memory-type]').forEach(button=>button.addEventListener('click',()=>{
  const type=memoryType(button.dataset.memoryType);
  $$('[data-memory-type]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  for(const [id,key] of [['title','title'],['purpose','purpose'],['example','example'],['source','source']])$('#memory-type-'+id).textContent=type[key];
}));
function renderTransfer(){
  try{
    const volume=Number($('#transfer-volume').value), speed=Number($('#transfer-speed').value);
    const result=transferEstimate(volume,speed);
    $('#transfer-time').textContent=result.hours>=48?`${result.days.toFixed(1)} days`:`${result.hours.toFixed(1)} hours`;
    $('#transfer-formula').textContent=`${volume} PB × 8 ÷ ${speed} Gbit/s`;
    $('#transfer-error').textContent='';
  }catch(error){$('#transfer-time').textContent='—';$('#transfer-formula').textContent='';$('#transfer-error').textContent=error.message;}
}
if($('#transfer-volume')){ $('#transfer-volume').addEventListener('input',renderTransfer);$('#transfer-speed').addEventListener('change',renderTransfer);renderTransfer(); }
$$('[data-architecture]').forEach(button=>button.addEventListener('click',()=>{
  const scenario=architectureScenario(button.dataset.architecture);
  $$('[data-architecture]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('#architecture-goal').textContent=scenario.goal;
  $('#architecture-boundary').textContent=scenario.boundary;
  $('#architecture-criteria').textContent=scenario.criteria;
  $('#architecture-components').replaceChildren(...scenario.components.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
}));
