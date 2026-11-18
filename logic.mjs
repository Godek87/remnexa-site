/** Deterministic browser illustrations, not calls to Brain Engine runtimes. */
export function remember(correction = false, forgotten = false) {
  const history = [{revision: 1, value: 'Lisbon', source: 'Onboarding note · Oct 12'}];
  if (correction) history.push({revision: 2, value: 'Porto', source: 'Customer update · Oct 18'});
  return {history, recalled: forgotten ? null : history.at(-1), forgotten};
}

export const recoveryPoints = Object.freeze([
  {id: 'orders@09-00', time: '09:00', records: 12480, changes: 0},
  {id: 'orders@12-00', time: '12:00', records: 12816, changes: 336},
  {id: 'orders@15-00', time: '15:00', records: 13104, changes: 624},
]);
export function recoveryPlan(index) {
  const point = recoveryPoints[index];
  if (!point) throw new RangeError('Choose a listed recovery point.');
  return {snapshot: point.id, target: 'sandbox/orders-review', source: 'tank/orders',
    sourceUnchanged: true, status: 'Illustrative plan', records: point.records};
}

export function evaluateScale(scale, evaluated = false) {
  if (!Number.isFinite(scale) || scale < 0 || scale > 4) throw new RangeError('Scale must be from 0 to 4.');
  const input = [1, 2, 3, 4];
  const expected = [2, 4, 6, 8];
  const output = input.map(x => x * scale);
  const passed = output.filter((x,i) => Math.abs(x - expected[i]) < 0.000001).length;
  return {input, output, expected, passed, cases: input.length,
    fingerprint: `illustration:affine-v1:scale-${scale}:dataset-v1`,
    state: evaluated ? 'Evaluated' : 'Unevaluated'};
}

export function pilotBrief(product, fields) {
  if (!['Remnexa', 'Volqora', 'Metarynth'].includes(product)) throw new Error('Unknown product.');
  const team = String(fields.team ?? '').trim();
  const useCase = String(fields.useCase ?? '').trim();
  if (!team || useCase.length < 20) throw new Error('Add your team and at least 20 characters describing the use case.');
  if (team.length > 120 || useCase.length > 2500) throw new Error('The brief exceeds its text limit.');
  const deployment = ['Private infrastructure', 'Existing platform integration', 'Exploring options'].includes(fields.deployment)
    ? fields.deployment : 'Exploring options';
  return `# ${product} — pilot brief\n\nTeam: ${team}\nDeployment: ${deployment}\n\n## Use case\n${useCase}\n\n## Pilot acceptance\n- Agree one measurable workflow and a test dataset.\n- Confirm the supported deployment and access boundaries.\n- Verify recovery, failure handling and operational ownership.\n- Review the evidence before agreeing production scope.\n\nPrepared locally in your browser. Not submitted. No subscription or resources created.\nCommercial scope, price and service terms remain to be agreed.\n`;
}

const memoryTypes = Object.freeze({
  working: {title:'Working context', purpose:'The immediate context needed to continue a task.', example:'“Prepare the renewal review for Atlas Studio.”', source:'Task brief · revision 1'},
  episodic: {title:'Episodes', purpose:'A situated event: what happened, when it happened and what was observed.', example:'“The service visit ended at 14:30; the customer confirmed completion.”', source:'Service record · observed event'},
  fact: {title:'Facts', purpose:'A sourced assertion whose status and validity remain explicit.', example:'“The customer reports that deliveries should go to Porto.”', source:'Customer update · reported information'},
  experience: {title:'Experience', purpose:'Preserve the conditions around an attempt and its recorded outcome.', example:'“The second repair attempt succeeded after replacing the valve.”', source:'Maintenance report · outcome evidence'},
  intention: {title:'Intentions', purpose:'A future intent with scope and expiry, without permission to execute an action.', example:'“Review the renewal before October 30.”', source:'Task owner · dated instruction'},
});
export function memoryType(id){const result=Object.hasOwn(memoryTypes,id)?memoryTypes[id]:null;if(!result)throw new RangeError('Unknown memory type.');return {...result};}
export function transferEstimate(petabytes,gigabits){
  if(!Number.isFinite(petabytes)||petabytes<0.001||petabytes>1000||!Number.isFinite(gigabits)||gigabits<=0)throw new RangeError('Enter a volume between 0.001 and 1,000 PB and a positive link speed.');
  const seconds=petabytes*1e15*8/(gigabits*1e9);
  return {seconds,hours:seconds/3600,days:seconds/86400,kind:'Theoretical full-transfer lower bound'};
}
const architectures=Object.freeze({
  clinic:{goal:'Reduce appointment waiting while respecting room and clinician constraints.',components:['Appointment state','Duration predictor','Constraint solver','Policy check'],criteria:'Waiting time · feasible schedules · compute budget',boundary:'Requires qualified forecasting, scheduling and permission adapters. Example composition only.'},
  retrieval:{goal:'Find relevant enterprise evidence while preserving source permissions and freshness.',components:['Pinned source resolver','Lexical + vector candidates','Permission filter','Relevance ranker'],criteria:'Relevance · unauthorized-result exclusion · freshness · latency',boundary:'Requires source, index and ranking integrations. This example does not run a search service.'},
  operations:{goal:'Allocate work against expected demand, available capacity and hard business constraints.',components:['Point-in-time operational state','Demand forecast','Capacity optimizer','Baseline comparison'],criteria:'Feasible allocation · forecast error · resource cost · stability',boundary:'A forecast does not prove the causal effect of an intervention. Example composition only.'},
});
export function architectureScenario(id){const result=Object.hasOwn(architectures,id)?architectures[id]:null;if(!result)throw new RangeError('Unknown architecture scenario.');return {...result,components:[...result.components]};}
