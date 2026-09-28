# PRD — Ayurvedic Classification Rule-Based Expert System

**Product:** Ayurvedic Classification Expert System  
**Document status:** MVP product requirements  
**Primary use:** Educational / wellness-oriented dosha and prakriti classification  
**Audience:** Students, learners, wellness users, and developers building an explainable rule-based system

---

## 1. Product Overview

The website is an interactive, rule-based expert system that asks users a structured questionnaire and classifies their responses into an Ayurvedic constitution profile, primarily using the three doshas:

- **Vata**
- **Pitta**
- **Kapha**

The system may also identify a **dual-dosha tendency** (for example, Vata-Pitta) or a relatively balanced result when scores are close.

Ayurvedic sources describe the three doshas as Vata/Vayu, Pitta, and Kapha, and official AYUSH material describes Prakriti as having seven primary categories: Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Vata-Kapha, and Sama. The website will use these traditional categories as an educational classification model rather than presenting them as a biomedical diagnosis.  
Source: Ministry of AYUSH, *Principles of Ayurveda / Ayusoft*.  
https://ayusoft.ayush.gov.in/principles-of-ayurveda/

### Product principle

**Explain every result.** Every classification should show which answers contributed to the result and how the rules were applied.

---

## 2. Problem Statement

Many Ayurveda-learning resources explain doshas conceptually but do not provide a simple, transparent way for a learner to see how a collection of questionnaire observations can map to a classification.

Users need:

1. A guided questionnaire.
2. A consistent scoring/rule model.
3. An easy-to-understand result.
4. An explanation of the evidence behind the result.
5. Educational information about the resulting dosha profile.
6. A clear distinction between traditional Ayurvedic concepts and medical diagnosis.

---

## 3. Goals

### Primary goals

- Build a responsive web application for Ayurvedic dosha/prakriti classification.
- Use deterministic, inspectable rules instead of an opaque ML model.
- Provide a score breakdown for Vata, Pitta, and Kapha.
- Support single-dosha and dual-dosha outcomes plus a balanced outcome.
- Make rules editable/configurable without rewriting the UI.
- Record an explanation for every rule fired.
- Provide an educational result page.

### Secondary goals

- Make the system suitable for classroom/project demonstrations.
- Allow future expansion to additional Ayurvedic knowledge domains.
- Support English first, with localization-ready content architecture.

---

## 4. Non-Goals

The MVP will **not**:

- Diagnose disease.
- Recommend prescription drugs, dosages, detox procedures, or individualized treatment.
- Replace consultation with a qualified healthcare professional.
- Claim that the score is a scientifically validated medical test.
- Infer sensitive medical conditions from user responses.
- Use machine learning for the core classification.

---

## 5. Target Users

### A. Student / learner
Wants to understand how an expert system works.

### B. Wellness learner
Wants an educational overview of traditional dosha concepts.

### C. Project evaluator / instructor
Wants to inspect rules, inputs, reasoning, and outputs.

### D. Developer
Wants a clean architecture where the rule engine can be extended independently of the frontend.

---

## 6. Core User Journey

1. User opens the homepage.
2. User reads a short explanation and disclaimer.
3. User starts the assessment.
4. User answers approximately 20–30 multiple-choice questions.
5. User can move backward/forward and edit answers.
6. The system validates that required questions are completed.
7. The rule engine converts answers into weighted evidence.
8. The inference engine calculates Vata/Pitta/Kapha scores.
9. A classification rule determines the profile.
10. The system presents:
   - primary result,
   - secondary tendency where applicable,
   - score visualization,
   - reasons/evidence,
   - educational explanation.
11. User may restart the assessment or view the rule logic.

---

## 7. MVP Functional Requirements

### FR-01 — Landing page

Display:

- Product name.
- Short description.
- “Start Assessment” CTA.
- “How it works” section.
- Educational disclaimer.
- Link to methodology/rules.

### FR-02 — Assessment questionnaire

Each question contains:

- Question ID.
- Category.
- Question text.
- 3–5 answer options.
- One or more dosha weights per option.
- Optional explanation metadata.

Example:

| Question | Example answer | Vata | Pitta | Kapha |
|---|---|---:|---:|---:|
| Typical body frame | Lean/light | +3 | 0 | 0 |
| Typical body frame | Medium | 0 | +3 | 0 |
| Typical body frame | Broad/sturdy | 0 | 0 | +3 |

The exact questions and weights should be stored as configuration/rules rather than hard-coded into page components.

### FR-03 — Progress tracking

Show:

- Current question number.
- Total questions.
- Progress indicator.
- Back / Next controls.

### FR-04 — Validation

Prevent final submission when required questions are unanswered.

Show a human-readable message such as:

> Please answer all required questions before viewing your classification.

### FR-05 — Rule-based inference

The engine shall:

1. Read normalized answer IDs.
2. Match applicable rules.
3. Add/subtract weighted evidence.
4. Store the rules fired.
5. Produce Vata/Pitta/Kapha scores.
6. Determine the result category.

### FR-06 — Result classification

MVP categories:

- Vata
- Pitta
- Kapha
- Vata-Pitta
- Pitta-Kapha
- Vata-Kapha
- Sama / relatively balanced

The result should be based on configurable thresholds and score relationships.

### FR-07 — Explanation

Result page must answer:

- Why was this classification produced?
- Which answers contributed?
- What was the score for each dosha?
- What rule groups were triggered?

Example:

> Your highest score is Vata. Several responses related to body build, activity pattern, sleep variability, and preference patterns contributed evidence toward Vata.

The wording must remain educational and avoid medical conclusions.

### FR-08 — Educational profile

For each dosha, include:

- Traditional descriptor.
- Common characteristics used by the questionnaire.
- Simple learning notes.
- “This is a traditional Ayurvedic framework” notice.

Official AYUSH materials describe Vata, Pitta, and Kapha as the three doshas and associate them with different functional characteristics.  
Source: https://ayusoft.ayush.gov.in/principles-of-ayurveda/

### FR-09 — Restart

Allow the user to clear answers and start again.

### FR-10 — Rule transparency page

Provide a developer/project-oriented screen that can display:

- Rule ID.
- Condition.
- Weight.
- Dosha affected.
- Human-readable explanation.

This is important for demonstrating expert-system reasoning.

---

## 8. Suggested MVP Question Domains

Use neutral, observable questionnaire domains rather than disease symptoms:

1. Body frame / build
2. Skin tendency
3. Hair characteristics
4. Appetite pattern
5. Meal regularity
6. Temperature preference
7. Activity style
8. Sleep pattern
9. Energy pattern
10. Speech pace
11. Learning / recall style
12. Stress-response tendency
13. Work style
14. Routine preference
15. Environmental preference
16. General physical tendencies
17. Digestion-related self-observation
18. Movement/rest tendency
19. General constitution observations
20. User confidence / unsure response

These are modeled as educational questionnaire dimensions, not clinical measurements.

---

## 9. Rule Model

### 9.1 Evidence scoring

Each selected answer contributes weighted points.

Example:

```text
Q01-A01 -> Vata +3
Q01-A02 -> Pitta +3
Q01-A03 -> Kapha +3
```

A response can also be mixed:

```text
Q09-A02 -> Vata +2, Pitta +1
```

### 9.2 Confidence

Each rule can include a confidence/evidence value:

```text
confidence = 0.0 to 1.0
```

This is a system-design aid, not a clinical probability.

### 9.3 Classification logic

Example configurable logic:

```text
Let V, P, K be normalized scores.

If max(V,P,K) - min(V,P,K) <= BALANCED_GAP:
    result = SAMA

Else if top two scores are within DUAL_GAP:
    result = corresponding dual-dosha category

Else:
    result = single highest dosha
```

The thresholds must live in configuration so they can be tuned without changing application code.

---

## 10. Result Data Contract

Example:

```json
{
  "classification": "Vata-Pitta",
  "scores": {
    "vata": 42,
    "pitta": 38,
    "kapha": 21
  },
  "normalizedScores": {
    "vata": 0.84,
    "pitta": 0.76,
    "kapha": 0.42
  },
  "firedRules": [
    "BODY_FRAME_LEAN",
    "APPETITE_VARIABLE",
    "TEMPERATURE_WARM",
    "ACTIVITY_QUICK"
  ],
  "confidenceBand": "moderate",
  "disclaimer": true
}
```

---

## 11. Non-Functional Requirements

### Performance

- Initial page load should feel fast on mobile networks.
- Rule evaluation should be effectively instantaneous for the MVP.

### Accessibility

- Keyboard navigation.
- Visible focus indicators.
- Semantic form controls.
- Good text contrast.
- Screen-reader-friendly labels.
- No information conveyed by color alone.

### Responsiveness

Support:

- Mobile
- Tablet
- Desktop

### Maintainability

Questions, rule mappings, profile text, and thresholds should be data-driven.

### Privacy

MVP should avoid collecting personally identifying information.

Prefer:

- No account required.
- No name/email required.
- No server persistence of answers unless explicitly added later.
- Local browser state for a simple MVP.

---

## 12. Analytics (Optional)

For a later version, track only privacy-safe aggregate events:

- Assessment started.
- Assessment completed.
- Question abandonment rate.
- Time to completion.
- Most commonly selected answer categories.

Do not collect health profiles tied to identifiable users without a separate privacy review.

---

## 13. Acceptance Criteria

The MVP is complete when:

- A user can start and finish the questionnaire.
- Required-answer validation works.
- Scores are computed deterministically.
- The same answers produce the same result.
- The result supports all seven requested prakriti categories.
- The UI explains why the result occurred.
- Rules are externalized/configurable.
- The website is responsive.
- The site includes an educational/non-diagnostic disclaimer.
- Rule evaluation can be unit-tested independently of the UI.

---

## 14. Future Enhancements

Potential v2 additions:

- Rule editor for instructors.
- Admin dashboard.
- Localization (Marathi/Hindi/English).
- Question randomization while preserving scoring.
- Comparison of “assessment result” vs “learning examples”.
- Exportable assessment report.
- Versioned rule sets for different educational curricula.
- Clinician-reviewed content workflow, if the project scope later becomes professional healthcare software.

---

## 15. Source Notes

The conceptual classification in this PRD follows traditional Ayurvedic terminology as described in official AYUSH educational material. AYUSH describes three doshas — Vata/Vayu, Pitta, and Kapha — and describes seven primary Prakriti categories including dual-dosha and Sama categories. This website should present those concepts as an Ayurvedic traditional framework, not as established biomedical diagnosis.

Primary reference:
- Ministry of AYUSH, Ayusoft — Principles of Ayurveda
  https://ayusoft.ayush.gov.in/principles-of-ayurveda/

Additional AYUSH reference:
- Ayusoft — Prakriti Analysis Questionnaire (infant example)
  https://ayusoft.ayush.gov.in/infant/
