# ARCHITECTURE — Ayurvedic Classification Rule-Based Expert System

**Architecture style:** Layered, domain-first, explainable rule engine  
**MVP deployment:** Client-first web application  
**Recommended stack:** Next.js + TypeScript  
**Rule engine:** Deterministic forward-chaining / weighted evidence model

---

## 1. Architecture Goals

The architecture must make the expert system:

- Deterministic.
- Explainable.
- Testable.
- Easy to extend.
- Independent of the UI.
- Safe to update when rules/content change.
- Capable of producing a reasoning trace.

The most important design choice is to keep **domain rules separate from presentation**.

---

## 2. High-Level Architecture

```text
┌──────────────────────────────────────────────┐
│                  Web UI                      │
│ React / Next.js                              │
│                                              │
│ Home → Assessment → Results → Methodology   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             Application Layer                │
│                                              │
│ AssessmentService                            │
│ ClassificationService                        │
│ ResultFormatter                              │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                Domain Layer                  │
│                                              │
│ Questionnaire Model                          │
│ Rule Model                                   │
│ Rule Engine                                  │
│ Scoring Engine                               │
│ Classification Policy                        │
│ Explanation Builder                          │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              Data / Configuration            │
│                                              │
│ questions.json                               │
│ rules.json                                   │
│ doshas.json                                  │
│ thresholds.json                              │
└──────────────────────────────────────────────┘
```

---

## 3. Domain Model

### Dosha

```ts
type Dosha = "VATA" | "PITTA" | "KAPHA";
```

### Prakriti classification

```ts
type Prakriti =
  | "VATA"
  | "PITTA"
  | "KAPHA"
  | "VATA_PITTA"
  | "PITTA_KAPHA"
  | "VATA_KAPHA"
  | "SAMA";
```

### Question

```ts
type Question = {
  id: string;
  category: string;
  text: string;
  required: boolean;
  options: AnswerOption[];
};
```

### Answer option

```ts
type AnswerOption = {
  id: string;
  label: string;
};
```

### Rule

```ts
type Rule = {
  id: string;
  questionId: string;
  answerId: string;
  effects: DoshaEffect[];
  explanation: string;
};
```

### Dosha effect

```ts
type DoshaEffect = {
  dosha: Dosha;
  weight: number;
};
```

### Rule trace

```ts
type RuleTrace = {
  ruleId: string;
  questionId: string;
  answerId: string;
  effects: DoshaEffect[];
  explanation: string;
};
```

---

## 4. Rule Engine

The engine is a deterministic mapping system.

### Input

```ts
Record<QuestionId, AnswerId>
```

### Processing

```text
answers
   ↓
find matching rules
   ↓
apply rule effects
   ↓
aggregate scores
   ↓
normalize
   ↓
classification policy
   ↓
reasoning trace
```

### Pseudocode

```ts
function evaluate(
  answers: Record<string, string>,
  rules: Rule[]
): EvaluationResult {
  const scores = {
    VATA: 0,
    PITTA: 0,
    KAPHA: 0
  };

  const firedRules: RuleTrace[] = [];

  for (const rule of rules) {
    if (answers[rule.questionId] === rule.answerId) {
      for (const effect of rule.effects) {
        scores[effect.dosha] += effect.weight;
      }

      firedRules.push({
        ruleId: rule.id,
        questionId: rule.questionId,
        answerId: rule.answerId,
        effects: rule.effects,
        explanation: rule.explanation
      });
    }
  }

  return {
    scores,
    firedRules
  };
}
```

---

## 5. Classification Policy

The classification policy is separate from the scoring engine.

### Example configuration

```json
{
  "dualGap": 5,
  "balancedGap": 3
}
```

### Example algorithm

```ts
function classify(scores: ScoreSet, config: ThresholdConfig): Prakriti {
  const ordered = sortDescending(scores);

  const [first, second, third] = ordered;

  if (first.value - third.value <= config.balancedGap) {
    return "SAMA";
  }

  if (first.value - second.value <= config.dualGap) {
    return pairToPrakriti(first.dosha, second.dosha);
  }

  return first.dosha;
}
```

Important: these numeric thresholds are **project configuration examples**, not an authoritative Ayurvedic standard. They should be documented as implementation choices.

---

## 6. Normalization

Raw scores depend on how many rules exist in each category, so normalization is useful when the questionnaire grows.

Example:

```ts
normalized = score / maximumPossibleScoreForDosha
```

Or:

```ts
normalized = (score - minScore) / (maxScore - minScore)
```

The chosen formula should be documented and unit-tested.

The result UI can show either:

- raw educational points, or
- a normalized 0–100 visualization.

Avoid displaying a value as a clinical probability.

---

## 7. Explainability Layer

A core expert-system feature is a **reasoning trace**.

For every result, retain:

```text
Question answered
     ↓
Answer selected
     ↓
Rule matched
     ↓
Dosha weight applied
     ↓
Running score
     ↓
Classification decision
```

Example:

```json
{
  "ruleId": "Q08_ACTIVITY_FAST",
  "matched": true,
  "effects": [
    { "dosha": "VATA", "weight": 2 }
  ],
  "explanation": "Selected activity description contributed Vata-associated evidence in this rule set."
}
```

This allows the product to show “Why this result?” without exposing implementation code.

---

## 8. Data-Driven Rule Files

Recommended structure:

```text
/data
  /questions
    questions.en.json
  /rules
    prakriti.v1.json
  /profiles
    doshas.en.json
  /config
    thresholds.json
```

Example rule:

```json
{
  "id": "BODY_FRAME_LEAN",
  "questionId": "body_frame",
  "answerId": "lean_light",
  "effects": [
    {
      "dosha": "VATA",
      "weight": 3
    }
  ],
  "explanation": "This answer is configured as Vata-associated evidence within the educational rule set."
}
```

---

## 9. Recommended Project Structure

```text
app/
  page.tsx
  assessment/
    page.tsx
  results/
    page.tsx
  methodology/
    page.tsx
  doshas/
    page.tsx

components/
  assessment/
    QuestionCard.tsx
    AnswerOption.tsx
    AssessmentNavigator.tsx
    ProgressBar.tsx
  results/
    ScoreChart.tsx
    EvidenceList.tsx
    RuleTracePanel.tsx
    ClassificationCard.tsx
  common/
    Header.tsx
    Footer.tsx
    Disclaimer.tsx

domain/
  dosha.ts
  prakriti.ts
  question.ts
  rule.ts
  scoring.ts
  classification.ts
  explanation.ts

services/
  assessmentService.ts
  classificationService.ts

data/
  questions/
  rules/
  profiles/
  config/

lib/
  validation.ts
  storage.ts
  analytics.ts

tests/
  scoring/
  classification/
  rule-engine/
  fixtures/
```

---

## 10. Application State

For an MVP, client state is sufficient.

Recommended:

```ts
type AppState = {
  answers: Record<string, string>;
  currentQuestionIndex: number;
  evaluation?: EvaluationResult;
};
```

Persist temporary answers to `sessionStorage` so page refreshes do not immediately lose progress.

Do not store personally identifying data.

---

## 11. API Strategy

### MVP

No backend required if:

- Rules are public/non-sensitive.
- The questionnaire is educational.
- No server-side persistence is needed.

Flow:

```text
Browser
  ↓
Question data
  ↓
Rule engine
  ↓
Results
```

### Later backend

Introduce an API when needing:

- Admin-managed rules.
- Rule versioning.
- Authentication.
- Saved reports.
- Centralized analytics.
- Server-side auditing.

Possible endpoints:

```text
GET  /api/questionnaire
GET  /api/rules/version
POST /api/classify
GET  /api/profiles/:id
```

---

## 12. Rule Versioning

Every rule set should have metadata:

```json
{
  "version": "1.0.0",
  "name": "Educational Prakriti Rule Set",
  "effectiveDate": "2026-09-28",
  "sourceNotes": [
    "Traditional Ayurvedic concepts based on cited educational references."
  ]
}
```

When the classification logic changes, increment the rule-set version.

This makes results reproducible.

---

## 13. Validation

Use runtime schemas with Zod or equivalent.

Validate:

- Question IDs.
- Answer IDs.
- Rule IDs.
- Dosha enum values.
- Weight numeric ranges.
- Threshold configuration.
- Required question completion.

Example:

```ts
const DoshaSchema = z.enum(["VATA", "PITTA", "KAPHA"]);
```

---

## 14. Testing Strategy

### Unit tests

Test:

- One answer maps to expected rule.
- Rule weights are accumulated correctly.
- Negative/zero weights behave correctly if supported.
- Dual-dosha threshold works.
- Balanced threshold works.
- Same input always returns same output.

### Example

```ts
it("classifies a clear Vata-leading score", () => {
  const result = classify(
    { VATA: 40, PITTA: 20, KAPHA: 18 },
    { dualGap: 5, balancedGap: 3 }
  );

  expect(result).toBe("VATA");
});
```

### Integration tests

Test:

```text
Questionnaire
 → answer selection
 → submission
 → rule engine
 → results rendering
```

### Accessibility tests

Use automated checks plus manual keyboard navigation.

---

## 15. Security and Privacy

MVP principles:

- No credentials required.
- No unnecessary personal data.
- Avoid sending questionnaire answers to third parties.
- Sanitize any future user-generated content.
- Validate all rule/config data before loading.

If a future version stores assessments, add:

- retention policy,
- privacy notice,
- deletion mechanism,
- access controls,
- threat modeling.

---

## 16. Safety / Health-Content Boundary

The system should remain an educational classification tool.

Do not implement automated logic such as:

```text
Symptoms → disease diagnosis → treatment
```

For the MVP, keep the inference model closer to:

```text
Questionnaire observations
        ↓
traditional dosha-associated evidence
        ↓
educational classification
        ↓
explanation
```

Any future medical or treatment feature would need a separate clinical/safety/legal review.

---

## 17. Content Governance

Store source attribution with profile content.

Example:

```json
{
  "profile": "VATA",
  "content": {
    "title": "Vata",
    "summary": "...",
    "sourceRefs": ["AYUSOFT_PRINCIPLES"]
  }
}
```

Use versioned content reviews before changing high-impact educational statements.

---

## 18. Deployment Architecture

### Simple MVP

```text
GitHub
   ↓
CI build + tests
   ↓
Vercel / similar hosting
   ↓
Next.js web application
   ↓
Static questionnaire + local rule engine
```

### Future scalable model

```text
Browser
  ↓
CDN
  ↓
Next.js frontend
  ↓
API
  ├── Rule Service
  ├── Content Service
  ├── Assessment Service
  └── Analytics Service
       ↓
   Database
```

---

## 19. Observability

Log technical events only:

- rule-set load failures,
- schema validation failures,
- client exceptions,
- page performance metrics.

For privacy reasons, do not log complete assessment answers unless the product later establishes a clear, reviewed data-collection purpose.

---

## 20. Architecture Decision Records

### ADR-001 — Rule-based over ML

**Decision:** Use deterministic rules for MVP.

**Reason:** Explainability, reproducibility, classroom demonstration value, and easier testing.

### ADR-002 — Data-driven rules

**Decision:** Keep rules separate from UI and core engine code.

**Reason:** Rule changes should not require component rewrites.

### ADR-003 — Client-first processing

**Decision:** Process assessment locally in the browser for MVP.

**Reason:** Simpler deployment and better privacy.

### ADR-004 — Separate classification policy

**Decision:** Keep threshold logic outside the scoring engine.

**Reason:** Prevent scoring logic from becoming coupled to one classification policy.

---

## 21. Technical Flow

```text
[User]
   |
   v
[Assessment UI]
   |
   | answers
   v
[Validation]
   |
   v
[Rule Engine]
   |
   +------> [Rule Trace]
   |
   v
[Score Aggregator]
   |
   v
[Classification Policy]
   |
   v
[Explanation Builder]
   |
   v
[Result View]
```

---

## 22. Reference Model for Ayurvedic Concepts

Official AYUSH educational material describes:

- three doshas: Vata/Vayu, Pitta, Kapha;
- five great elements (Pancha-Mahabhuta) as part of the traditional conceptual framework;
- seven primary Prakriti categories: Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Vata-Kapha, and Sama.

These concepts are used here to define the **content domain of the educational rule set**, not to establish biomedical diagnostic validity.

Primary reference:
- Ministry of AYUSH, Ayusoft — Principles of Ayurveda
  https://ayusoft.ayush.gov.in/principles-of-ayurveda/

Example questionnaire reference:
- Ministry of AYUSH, Ayusoft — Prakriti Analysis Questionnaire
  https://ayusoft.ayush.gov.in/infant/

---

## 23. Recommended Build Order

1. Create static dosha/profile content.
2. Create question and answer schema.
3. Create rule-set JSON.
4. Implement rule engine.
5. Implement classification policy.
6. Add reasoning trace.
7. Build assessment UI.
8. Build results UI.
9. Add methodology/rule-transparency page.
10. Add automated tests.
11. Perform accessibility and content review.
12. Deploy MVP.
