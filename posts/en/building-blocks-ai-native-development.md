---
title: 'Your Building Blocks Set the Ceiling on AI-Assisted Delivery'
date: '2026-08-11'
lead: "AI made code generation cheap; it did nothing to reduce the cost of being wrong. Shared packages, explicit contracts, executable rules, and reliable gates now determine how much useful work a team can get from AI-assisted development."
metaDescription: "Why shared packages, contracts, executable architecture rules, and process gates decide the quality of AI-native software development: what to extract, which rules to enforce, how to gate agent work, and why security has to move into the platform."
tags:
    - AI-Native Development
    - Platform Engineering
    - Software Factory
    - Spec-First
    - Agentic Development
    - Architecture Governance
    - Custom Software Engineering
---

## The blank page is the problem, not the typing

Ask a capable model to add a feature to an empty repository and you will probably get something that runs. You will also get a new configuration pattern, error shape, logging convention, money representation, and repository layer. Each choice may be defensible on its own. Taken together, they form a system nobody designed.

Give the same task to the same model in a codebase with a shared config package, one route kit, one money type, one error union, and architecture rules enforced in CI. Now it has far fewer decisions to invent and can compose the pieces already there.

This part of AI-assisted development gets little attention because it is old and unglamorous. The quality of your building blocks has always limited how fast a team can move safely. AI pushed much more code at that limit, so weak foundations show up sooner and more often.

## The four kinds of building block

"Building blocks" often gets read as "libraries." An AI-native workflow depends on four broader categories:

1. **Runtime blocks:** shared packages that do work at runtime. Config, HTTP, auth, money, IDs, monitoring. Code you do not write again.
2. **Contract blocks:** OpenAPI, AsyncAPI, JSON Schema, TypeBox definitions. The shape of the boundary, defined before the implementation exists.
3. **Guideline blocks:** architecture invariants, layering rules, naming and ownership conventions. What is allowed, what is forbidden, and why.
4. **Process blocks:** the gates. Review, approval, CI checks, budgets, branch protection. Where a change has to prove itself before it moves.

A human engineer absorbs the last two by osmosis over months. An agent has none of that history; it gets one context window and whatever you put in it. The useful measure, then, is how much of your system's design intent can be consumed and checked by something with no institutional memory. Model choice matters far less.

If the answer is "it is in people's heads and in the code, mostly," you will get output that looks right and drifts.

## Constraints are what make generated output good

In production systems, more freedom and a better prompt rarely produce the most dependable result. Useful constraints do.

A model produces the most probable code for the context it was given. With a blank context, "most probable" means the average of everything on the internet, which is a mix of tutorials, blog snippets, and abandoned repositories. With a constrained context, "most probable" means the pattern your codebase already uses fifty times.

Every one of these narrows the space in a useful way:

- a shared package that already solves the concern
- a schema that defines what a valid payload looks like
- a layering rule that forbids the shortcut
- a test that fails when the shortcut is taken
- a scaffold that produces the right skeleton before generation starts

This is ordinary platform engineering, applied where it has the most effect: before generation starts.

## Context is scarce, and a good package is compression

Building blocks also save context, which is finite and expensive.

Every token spent on a model rediscovering how your system does authentication is a token not spent on the actual problem. Every file the agent has to read to infer a convention is latency, cost, and an opportunity to infer it slightly wrong.

A well-designed package is compression. With a shared config package in the context, the agent does not need to read six environment-loading implementations to guess the house style. One import line replaces a research phase.

The same logic applies to contracts. A route schema states the interface in a form that is shorter than the implementation, unambiguous, and machine-checkable. It is a better prompt than any prompt, because it is also the test.

For larger organisations, this changes the economics. The report *Platform engineering 2.0: An evolution for the AI era* (Weave Intelligence, commissioned by Broadcom, 2026) puts numbers on the pressure: developers generating two to ten times more code, and token spend arriving as a new and largely invisible cost category that most organisations have no tooling to track. At that scale compression stops being a matter of taste and starts showing up in the bill.

## What to extract, and what to leave alone

A useful package catalogue is rarely designed up front. Ours grew out of an ERP monorepo where the same code kept appearing twice, and most good catalogues start the same way.

The split matters more than any list. Generic blocks can travel between systems: configuration, HTTP routing, auth clients, ID generation, monitoring, audit-log hashing, and the shared lint, format, and compiler settings. Product policy should stay in the repository that owns it: domain value objects, business calculations, the platform kernel of one product.

Publish too much and the result becomes a framework nobody can change. Publish nothing and the same audit-hash function gets written four times, with one subtly different version.

The rule we apply is narrow: extract when the code is generic, does one thing, and already has real consumers in the repository. Not before. A package extracted for an imagined second user freezes its API around the first one.

## Guidelines only count when they execute

Most enterprise codebases we see have plenty of standards, but many exist only as prose. A wiki page can say "domain code must not import the database layer"; a CI check can prevent the import from shipping.

That difference always mattered. With agents in the loop it becomes decisive, because an agent will happily satisfy every documented convention it was shown and violate the one that was only implied. It has no instinct telling it that this particular shortcut is the one that caused the incident last year.

So write the invariants down, and then make them run. Good candidates are the rules whose violation is expensive and easy to detect mechanically:

- a module exposes only what its public entry point lists, and deep imports across modules fail CI
- a module owns exactly one database schema, and cross-schema joins and foreign keys are forbidden
- every write goes through a use case that owns the transaction
- every event publish goes through an outbox, never a direct broker call from domain code
- the system clock is injected, never read directly outside infrastructure
- monetary values use one money type, never a bare floating-point number
- schemas are the source of truth, and generated contracts are read-only
- generated code is never edited by hand

Each needs an enforcement mechanism: an architecture check, a lint rule, a type boundary, or a test. Run the whole suite as one command on every pull request, so that a human and an agent face the same gate. Our ERP platform has twenty-two such invariants; the number matters less than the fact that none of them depends on someone remembering it.

Enforcement turns a style guide into a path an autonomous worker can follow. If the change cannot merge without satisfying the rule, it matters less whether the agent remembered the prose.

## Visual: what an agent needs, and where it comes from

```mermaid
flowchart TD
    A[Task description] --> Z[Agent context]
    B[Shared packages] --> Z
    C[Contracts: OpenAPI, AsyncAPI, TypeBox] --> Z
    D[Architecture invariants] --> Z
    E[Repository conventions file] --> Z
    Z --> F[Generated change]
    F --> G[Architecture checks]
    F --> H[Type check and contract validation]
    F --> I[Tests]
    G --> J{Gate passes}
    H --> J
    I --> J
    J -->|no| Z
    J -->|yes| K[Pull request for human review]
```

## Gate the work, not only the output

CI checks the result. Running agents without supervision also needs gates around the work itself, before and after the code exists. The setup we run in our own software factory follows a pattern that does not depend on any particular tool.

Split each task into steps, and give every step a fresh context that inherits only the previous step's condensed output:

1. **Research:** read the target repository and produce a map of the relevant code, with a file and line reference for every claim.
2. **Plan:** turn the research into numbered phases, each with the files it touches and a command that verifies it.
3. **Implement:** refuse to start until a human has approved the plan, then generate the change and open a pull request.
4. **Review:** in a fresh context that sees only the approved plan and the resulting diff, answer one question: does this diff implement this plan?

The reviewer should never see the reasoning that produced the code, so that reasoning cannot persuade it. It compares intent with result, which is the job a good human reviewer does and the author of a change usually finds hardest. Derive the verdict from the findings, not from the model's summary: an unmet plan criterion means changes requested, even if the reviewer called the change "good overall."

Around the steps, add the guardrails that make unattended runs survivable:

- **Human plan approval:** implementation cannot start without it. This is the one gate worth keeping manual.
- **Stop the line:** no implementation while the target's default branch is failing. Research and planning stay allowed, because that is how the breakage gets understood.
- **Spend ceilings:** each run gets the tightest of a per-run limit, the task's budget, and the project's cap, plus a wall-clock limit. A run with no budget left fails before its first model call.
- **A single egress point:** every model call goes through one proxy. No step talks to a provider directly.

Keep the task, its budget, its result, and its review verdict together, in the place where people already track their work. The record of what an agent did is only useful if someone reads it.

Build this tooling from the same blocks it enforces. Ours runs on the same shared packages and spec-first routes as the systems its agents work on, which makes it the first user of every standard. An awkward package gets noticed by the people who use it every day, and every improvement to the blocks improves both sides.

## Visual: the run pipeline and its gates

```mermaid
flowchart TD
    A[Task with intent and budget] --> B[Research: code map with file and line references]
    B --> C[Plan: numbered phases and verification commands]
    C --> D{Human approves plan}
    D -->|no| C
    D -->|yes| E{Default branch green}
    E -->|no| F[Blocked: stop the line]
    E -->|yes| G[Implement: branch and pull request]
    G --> H[Review: approved plan vs diff, fresh context]
    H --> I{Findings clean}
    I -->|no| J[Changes requested, back to the queue]
    I -->|yes| K[Human review and merge]
```

## Security has to move into the platform

For AI workloads, an instruction not to leak data is weaker than an architecture in which the model never receives the protected data. The instruction depends on compliance. The architecture does not.

The pattern is a boundary process between your systems and the model provider. It is the only process that holds the provider key and the only one allowed to make an outbound call. It recognises personal data deterministically: tax numbers, national and social security IDs, bank and card numbers with checksum validation, phone numbers, email and postal addresses, names. It replaces each value with a reversible token for the duration of the run, restores the originals on the response path, and writes every crossing to a tamper-evident audit log. Detection quality is a CI gate: a labelled corpus with recall and precision floors that must hold before the boundary ships.

This is what the platform engineering report calls security shifting down. Shift-left moved security earlier in the timeline and handed developers more tools and more responsibility. Shift-down moves it into the platform, where it is invisible to the developer and cannot be bypassed by a prompt.

The report also names the new attack surfaces: shadow AI sprawl, prompt injection, model poisoning, and inference data leaks, none of which a SAST or DAST tool detects in a live inference stream. A deterministic boundary with an audit trail handles the last of those at the layer best placed to contain it.

## Scale makes the platform more important

This may sound like a tidy setup for a small team. In a large organisation the building-block question matters even more, because every inconsistency gains more consumers.

Drift gets expensive as consumers multiply. Ten teams each solving configuration their own way multiply the surface area for the next migration, the next CVE, and the next compliance requirement by ten.

Agents also arrive as a new class of user. The report is direct about this: AI agents are the first new platform persona in over a decade, and they consume APIs rather than interfaces. They need versioned, well-documented APIs, scoped permissions, non-human identity, audit logging, budget controls, and egress controls. Every one of those is a platform capability rather than a developer preference. If your platform cannot express "this actor may do these things, spending at most this much, and here is the record," you cannot safely run agents at all, however good the model is.

Bounded autonomy turns out to have a shape. Teams operationalising it converge on seven concerns: identity, context, capability, execution, evaluation, security, and observability. The gates above map onto that list. Plan approval and stop-the-line are capability limits. The review step is evaluation. The boundary process is security. Run logs, artifacts, and the audit trail are observability. Spend ceilings are the execution limit. None of it is model-specific, so it survives the next model.

Cost becomes a first-class signal at the same time. The industry baseline is roughly 35% cloud waste before AI infrastructure lands on top of it, and token spend from agentic development is a category most organisations have no tooling for at all. A per-run cost ceiling that stops a run mid-flight is a small thing to build, and it separates an experiment from a budget incident.

Composability is the hedge against pace. The CNCF ecosystem went from roughly 50 projects in 2018 to more than 200 today, and model capabilities and agent patterns turn over faster than that. Nobody is picking the permanently correct tool right now. What you can do is make sure that swapping one does not cascade, which is the same modular, API-first, versioned-contract discipline that makes packages worth extracting in the first place.

Then there is the golden-path problem, where agents change the arithmetic. Standardised templates that once enabled most deployments start blocking the teams doing something new, and every exception routes back through the platform team. When scaffolding, contract generation, and migration work become cheap to run, the platform team can afford more paths instead of defending one. What turns a path into a cage is the cost of extending it.

## Old practices, higher value

Every practice that made software safe to change before AI still does that job. Most are worth more than they were, because the constraint moved.

Contract-first design used to be documentation and a coordination device. It is now the prompt and the gate as well: it tells the agent what to build, and it tells CI whether it built it. Spec-first was a good idea when humans were the only consumers. It is close to mandatory when they are not.

Tests changed role too. An agent can run your suite in a loop, which makes it the fitness function of the generation process rather than a safety net after it. A weak suite now does something worse than miss bugs. It teaches the loop that broken code is acceptable.

Code review is where the bottleneck landed. Verification is the scarce resource once writing is cheap, and what review is for has shifted with it: less typo-hunting, more "does this diff do what we agreed, and only that."

Keeping changes small and single-concern matters more, not less. When generation is cheap, the temptation is to ship large diffs. Resist it. Review is the constraint, and review cost grows faster than diff size.

CI remains the enforcement layer. Agents follow what is enforced, not what is documented. So does everyone else, eventually. Agents just make it obvious immediately.

Observability earns its keep faster now. More code shipping faster means more unknown-unknowns reaching production. Structured logging, tracing, and metrics are how you find out what an accelerated pipeline actually shipped.

Decision records cover the one thing that cannot be regenerated from source: why. An ADR explaining a trade-off is worth more per line than almost anything else you write, because it is the context that makes the next change correct instead of merely plausible.

Trunk hygiene closes the list. Stop the line is an old manufacturing idea, and it works for the reason it always did: building on a broken foundation multiplies the damage. Automation multiplies it faster.

The mechanism behind all of this is simple. AI changed the cost of producing a candidate solution and left the cost of verifying one roughly where it was. Every practice that improves verification therefore appreciates. Every practice that only improved production speed depreciates.

## Where the engineering effort moves

In our experience, engineers spend less time typing implementations and more time specifying interfaces, defining invariants, building scaffolds, and reviewing intent against outcome. Senior engineering time moves toward system design.

Documentation becomes executable context. A conventions file at the repository root, path-scoped instruction files, task-triggered procedures. Every one of them is read on every run, so they get corrected when they are wrong, so they stay true. Documentation that a machine consumes daily is the first documentation with a working feedback loop.

A new class of non-functional requirement appears as well: egress control, spend caps, non-human identity, action audit, and plan approval. Five years ago none of these appeared on a backlog. They are now prerequisites for running agents against a live codebase, and they belong to the platform team.

## Where this goes wrong

The approach has a maintenance cost, and it fails in predictable ways:

- packages get extracted before they have consumers, freezing an API around a single use case
- "shared" becomes a dumping ground of pass-through wrappers and vague utility modules
- rules are written as prose and never given an enforcement mechanism
- plan approval degrades into a rubber stamp, which removes the only human gate that matters
- the same system both writes and approves the change
- autonomy is expanded before budgets, audit, and egress control exist
- the block catalogue grows faster than the appetite to maintain it

The fix in each case is the same as it was before agents existed: be selective, keep the blocks few and in use, make the rules executable, and keep a human at the decision points you cannot cheaply undo.

## Build the runway before increasing the speed

Judge AI-assisted development by what the generated code lands on, not by how much code the model can write. Strong packages, explicit contracts, enforced invariants, and reliable gates keep generated changes aligned with the existing system. Standards that live only in people's heads produce plausible drift, usually discovered later in production.

If you are starting, the order matters more than the tooling:

1. Write down the invariants you already rely on, and make the most expensive two or three run in CI.
2. Extract the shared blocks that already have several users in your codebase, and only those.
3. Put contracts before implementation for every boundary agents will touch.
4. Add plan approval, review against the plan, and spend ceilings before giving agents more autonomy.

The tools changed. Contract-first design, tests that fail loudly, review against intent, small diffs, enforced CI, observability, and written decisions did not. They now decide whether AI speeds up useful work or merely speeds up drift.
