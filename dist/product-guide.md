# Remnexa

A sourced memory layer for AI and enterprise applications. Connect facts, context, experience and time while preserving evidence and access boundaries.

## Product overview

Remnexa is the commercial identity of brain-memory: a sourced memory foundation for applications that need continuity without confusing evidence, belief and history.

The package supports working, episodic, fact, experience and intention records. It separates observed, reported, inferred and simulated knowledge. A customer statement does not silently become an observation; a generated inference does not silently become a verified fact.

Current delivery: opt-in Python foundation. A production hosted service, billing, customer API keys and automated deployment are not included in this website release.



## Memory architecture

Remnexa separates stored material from the context that an application is allowed to use now. The application captures a scoped record with evidence. Persistence protects the record and its revision history. Recall evaluates scope, sources, current successors, dependencies and the requested budget before returning context.


### Knowledge, experience and procedureThe root research describes three complementary directions. Knowledge memory captures what is known about entities and relationships. Experience memory links a situation, a decision and an observed outcome. Procedural memory preserves a reusable method together with conditions for applying it. These directions extend the current record foundation; they are not all automated by it.

A context compiler is the architectural boundary between these stores and a consuming agent. It should select admissible context rather than append an unlimited transcript. The current bounded recall package is the foundation for that boundary.


### Where retrieval fitsDense, lexical and graph retrieval can propose useful candidates. They do not replace the canonical record or its current permissions. A candidate must resolve to a known record, within the correct namespace, with valid evidence. The research discusses hybrid retrieval and time-varying relationships; the shipped foundation currently exposes an adapter seam to the existing SearchService.



## The memory atlas

Record formPurposeExample

WorkingContext for an active taskPrepare a renewal review with the current brief

EpisodicA situated eventA service visit, with time and outcome

FactA sourced assertionA customer-reported delivery preference

ExperienceContext and outcome for later considerationA failed attempt and the conditions around it

IntentionA scoped future intentReview a renewal before a deadline



Record form is separate from epistemic status. The same fact-shaped record may be reported or observed. An inference remains an inference even when stored permanently. Simulation output remains simulated. This prevents the act of remembering from silently upgrading the evidence.

Intentions are data, not an action queue. Expiry and policy still apply, and another authorized mechanism must execute a business action.



## Experience, freshness & development direction

The broader memory design addresses a question beyond retrieval: what did the organization learn, and when is that lesson applicable? Candidate lessons need provenance, a description of the original context and evidence of outcomes. They should be tested before proactive application to a different business situation.


### Freshness and conflictsA relationship can change over time. A reported preference can be corrected. An evidence source can be withdrawn. The current foundation makes revisions, conflicts and dependency freshness explicit. The research direction adds richer reconciliation, selective consolidation, utility scoring, archive policies and proactive retrieval.


### Learning without invented certaintyObserved outcomes may inform a reusable lesson, but correlation alone does not prove causality. Automatic extraction, causal lesson application and neural consolidation require separate evaluation tracks. Metronix and Hy-Memory materials are research and source-study inputs, not a claim that every feature in those projects ships as Remnexa.

Memory is intended to integrate with data, decisions, execution outcomes and recovery. Automatic hooks from every subsystem and full storage-coordinated epoch restoration remain open delivery work.



## Workloads & pilot design


### Customer continuityCapture a permitted customer preference, correct it, then recall in a later interaction. Acceptance should prove that the old value is not returned as current truth, the source is visible and another tenant cannot access the record.


### Operational experienceCapture an incident, a proposed action and the observed outcome as separate records. Connect their evidence and test what happens when an underlying source changes or is revoked. Do not represent an untested remedy as an approved procedure.


### Agent task continuityKeep bounded working context across process restarts. Test conflicting writers, invalid evidence, expired intentions, a full namespace and unavailable persistence. An agent must handle withheld context explicitly rather than filling the gap with an invented memory.

A production evaluation should include representative tasks and failure cases, not just successful recall. Define retention, access review, recovery and data ownership alongside answer quality.



## Integration & setup

Use the repository environment with Python 3.14. The package depends on Brain Fabric and Brain Data; a standalone public package installation command is not advertised.


- Resolve PostgreSQL access through the existing SecretStore and supply a ScopedPostgres factory.
- Construct PostgresMemoryStore and explicitly initialize the namespace schema.
- Supply the current PermissionChecker, EvidenceVerifier and Clock to MemoryService.
- Register exact namespace read/write/forget grants through the identity registry.
- Capture a sourced draft, then recall using a scoped query and a bounded context budget.

The example below shows composition, not a complete bootstrap. The host supplies the context, namespace, evidence verifier and database. Never treat context-supplied permission strings as authority.



## Records, corrections & time

A record preserves source revision and SHA-256 provenance. Corrections create successors rather than overwriting the earlier assertion. Unresolved conflicts remain explicit.

Valid-time describes when information applies in the business. Knowledge-time describes when this system learned it. Historical queries must respect both semantics, current permissions and forgetting rules.

Imported active Hy MemoryNode records are restricted to supported layers and matched user/workspace. Ambiguous timestamps, unsupported states and missing foundations are refused. A full third-party memory database migration is not implemented.



## Access & evidence

Namespace identity includes tenant, organization, domain, environment and owner/workspace. Sharing is granted through canonical RBAC. PostgreSQL persistence uses scoped access and row-level isolation.

The file evidence adapter is bound to an explicit tenant scope and an allowlist of local files. It pins revisions and hashes, rejects symlinks and over-budget files, and rechecks source access. Uploaded document text does not become an instruction with system authority.

Source checks are not a distributed transaction over external systems. Deployers must define source revisions, revocation behavior and the trust boundary of their own evidence adapters.



## Recall & search

Structured recall uses topic/kind filters and optional authorized search candidates. The SearchMemoryAdapter wraps the existing Data SearchService; it does not build or publish a vector index.

Search results must resolve to the correct memory namespace and record identity. Old candidates may resolve to current successors, with source visibility checked again.

The context budget is measured in serialized record characters, not LLM tokens. Envelope metadata is additional. Truncated, withheld and unverified results remain distinguishable.



## Operations & recovery

The PostgreSQL foundation stores namespace snapshots and receipts atomically using compare-and-swap. Concurrent writers must handle version conflicts rather than silently replacing a newer snapshot.

Back up the database and test restoration with tenant-scoped samples. Full Enterprise Epoch admission and storage-coordinated memory rollback are not implemented by this foundation.

Do not automatically execute intentions as business actions. Expired intentions do not gain execution authority.



## Limits & readiness


- At most 1,000 records and 8 MB per namespace snapshot.
- Whole-snapshot persistence is a correctness baseline, not evidence of million-record scale.
- Forgetting affects recall; it does not physically erase rows or backups.
- No autonomous extraction, neural consolidation or unrestricted agent reflection.
- Semantic recall needs the separately configured Data index pipeline.
- No current public API, managed provisioning, billing or production SLA.

These boundaries are published so a pilot can establish measurable acceptance criteria before expanding deployment.



## Pilot & commercial delivery

Start with one workflow, an authorized dataset and an agreed namespace budget. Define evidence access, correction behavior, privacy requirements and a recovery test before deployment.

The proposed commercial paths are a scoped evaluation, customer-hosted integration, and an enterprise deployment agreement. Pricing, service terms and support commitments are established during scoping; there is no automated checkout.

The pilot form produces a Markdown brief locally. It sends nothing, stores no form data and asks for no credentials. No contact details are requested.



## Current composition example

```
from brain_memory.application.service import MemoryService

memory = MemoryService(
    store, permission_checker, evidence_verifier, clock
)
record = memory.capture(context, namespace, draft)
package = memory.recall(context, namespace, query)
```

## Source references

- brain-memory/README.md
- brain-memory/src/brain_memory/application/service.py
- openspec/changes/add-hy-memory-foundation/CODEX_REPORT.md
- metronix-memory-analysis.md — architecture research, not a shipped backend
- brain-fabric-unified-cognitive-system.md §4 — Memory Fabric direction
- BRAIN_ENGINE_FOR_TECHNICAL_INVESTORS_RU.md §4.6 — completed-product direction

Implementation baseline: 8111c77. Product direction is not a shipped-capability claim.
