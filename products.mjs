import {enrich} from './content.mjs';
export const products = [
{
  slug:'remnexa', name:'Remnexa', module:'brain-memory', category:'The memory layer',
  description:'Persistent, sourced memory for AI and business. Keep the context, corrections and evidence that make the next interaction better.',
  tagline:'Intelligence deserves<br>a longer <em>memory.</em>',
  intro:'Give your AI a past it can actually use. Preserve what matters, follow what changed, and bring the right context into the next decision.',
  promise:'A conversation ends.<br>The understanding shouldn’t.',
  sectionIntro:'Useful memory needs more than a saved transcript. It needs sources, boundaries and a clear view of what is still true.',
  features:[
    ['layers','Context with continuity','Keep facts, experiences and intentions in a structured memory that your application can recall across interactions.'],
    ['git-pull-request','Corrections, not confusion','New information supersedes old information. Preserve the history without treating every version as today’s truth.'],
    ['shield-check','Evidence before confidence','Keep reported facts separate from observations and inferences. Carry source revisions and access checks into recall.']
  ],
  steps:[
    ['Capture with a source','Your application supplies a scoped record, its evidence and the type of knowledge it represents.'],
    ['Keep the history intelligible','Record corrections, dependencies and conflicts. Distinguish when something happened from when the system learned it.'],
    ['Recall what is allowed','Build a bounded context package using current permissions and source checks. Keep withheld or unverified states explicit.']
  ],
  workflowTitle:'From a passing detail<br>to useful context.',
  technicalTitle:'Your intelligence.<br>Your boundaries.',
  technicalText:'Designed for teams that need to know where a memory came from, who may use it, and how it changed. Start with a bounded integration in your own environment.',
  technicalRows:[['Integration','Python 3.14 library'],['Persistence','PostgreSQL adapter'],['Access','Namespace RBAC + RLS'],['Normal path','No model call required']],
  codeLabel:'Composition example · host supplies dependencies',
  code:`from brain_memory.application.service import MemoryService

memory = MemoryService(
    store, permission_checker, evidence_verifier, clock
)
record = memory.capture(context, namespace, draft)
package = memory.recall(context, namespace, query)`,
  useCases:'For assistants that remember a customer. For operations teams that keep the reasons behind decisions. For agents that need grounded context.',
  closing:'Make the next interaction<br>start with understanding.',
  faqs:[
    ['Is Remnexa a hosted memory API today?','The current foundation is a Python library with a PostgreSQL adapter. A managed API, subscription provisioning and customer API keys are planned delivery work. This site does not issue credentials.'],
    ['Does forgetting permanently erase a memory?','Forgetting excludes a memory and its dependent reuse from recall. History is retained. Physical deletion, backup cleanup and model unlearning are separate work and are not claimed here.'],
    ['Do I need an LLM to store and recall memory?','The foundation’s normal capture and structured recall path does not call a model. Semantic extraction and autonomous consolidation are not enabled by this package.'],
    ['Can I integrate it with my own application?','The intended standalone offering uses the same foundation. Today a pilot needs a trusted composition root and the existing Fabric/Data dependencies. Packaging a supported independent service is part of commercial preparation.']
  ],
  sources:['brain-memory/README.md','brain-memory/src/brain_memory/application/service.py','openspec/changes/add-hy-memory-foundation/CODEX_REPORT.md'],
  docs:[
    ['overview','Product overview',`<p>Remnexa is the commercial identity of <code>brain-memory</code>: a sourced memory foundation for applications that need continuity without confusing evidence, belief and history.</p><p>The package supports working, episodic, fact, experience and intention records. It separates observed, reported, inferred and simulated knowledge. A customer statement does not silently become an observation; a generated inference does not silently become a verified fact.</p><div class="notice">Current delivery: opt-in Python foundation. A production hosted service, billing, customer API keys and automated deployment are not included in this website release.</div>`],
    ['integration','Integration & setup',`<p>Use the repository environment with Python 3.14. The package depends on Brain Fabric and Brain Data; a standalone public package installation command is not advertised.</p><ol><li>Resolve PostgreSQL access through the existing SecretStore and supply a <code>ScopedPostgres</code> factory.</li><li>Construct <code>PostgresMemoryStore</code> and explicitly initialize the namespace schema.</li><li>Supply the current PermissionChecker, EvidenceVerifier and Clock to MemoryService.</li><li>Register exact namespace read/write/forget grants through the identity registry.</li><li>Capture a sourced draft, then recall using a scoped query and a bounded context budget.</li></ol><p>The example below shows composition, not a complete bootstrap. The host supplies the context, namespace, evidence verifier and database. Never treat context-supplied permission strings as authority.</p>`],
    ['records','Records, corrections & time',`<p>A record preserves source revision and SHA-256 provenance. Corrections create successors rather than overwriting the earlier assertion. Unresolved conflicts remain explicit.</p><p>Valid-time describes when information applies in the business. Knowledge-time describes when this system learned it. Historical queries must respect both semantics, current permissions and forgetting rules.</p><p>Imported active Hy MemoryNode records are restricted to supported layers and matched user/workspace. Ambiguous timestamps, unsupported states and missing foundations are refused. A full third-party memory database migration is not implemented.</p>`],
    ['access','Access & evidence',`<p>Namespace identity includes tenant, organization, domain, environment and owner/workspace. Sharing is granted through canonical RBAC. PostgreSQL persistence uses scoped access and row-level isolation.</p><p>The file evidence adapter is bound to an explicit tenant scope and an allowlist of local files. It pins revisions and hashes, rejects symlinks and over-budget files, and rechecks source access. Uploaded document text does not become an instruction with system authority.</p><p>Source checks are not a distributed transaction over external systems. Deployers must define source revisions, revocation behavior and the trust boundary of their own evidence adapters.</p>`],
    ['recall','Recall & search',`<p>Structured recall uses topic/kind filters and optional authorized search candidates. The SearchMemoryAdapter wraps the existing Data SearchService; it does not build or publish a vector index.</p><p>Search results must resolve to the correct memory namespace and record identity. Old candidates may resolve to current successors, with source visibility checked again.</p><p>The context budget is measured in serialized record characters, not LLM tokens. Envelope metadata is additional. Truncated, withheld and unverified results remain distinguishable.</p>`],
    ['operations','Operations & recovery',`<p>The PostgreSQL foundation stores namespace snapshots and receipts atomically using compare-and-swap. Concurrent writers must handle version conflicts rather than silently replacing a newer snapshot.</p><p>Back up the database and test restoration with tenant-scoped samples. Full Enterprise Epoch admission and storage-coordinated memory rollback are not implemented by this foundation.</p><p>Do not automatically execute intentions as business actions. Expired intentions do not gain execution authority.</p>`],
    ['limits','Limits & readiness',`<ul><li>At most 1,000 records and 8 MB per namespace snapshot.</li><li>Whole-snapshot persistence is a correctness baseline, not evidence of million-record scale.</li><li>Forgetting affects recall; it does not physically erase rows or backups.</li><li>No autonomous extraction, neural consolidation or unrestricted agent reflection.</li><li>Semantic recall needs the separately configured Data index pipeline.</li><li>No current public API, managed provisioning, billing or production SLA.</li></ul><p>These boundaries are published so a pilot can establish measurable acceptance criteria before expanding deployment.</p>`],
    ['commercial','Pilot & commercial delivery',`<p>Start with one workflow, an authorized dataset and an agreed namespace budget. Define evidence access, correction behavior, privacy requirements and a recovery test before deployment.</p><p>The proposed commercial paths are a scoped evaluation, customer-hosted integration, and an enterprise deployment agreement. Pricing, service terms and support commitments are established during scoping; there is no automated checkout.</p><p>The pilot form produces a Markdown brief locally. It sends nothing, stores no form data and asks for no credentials. No contact details are requested.</p>`]
  ]
},
];

enrich(products);
