# DESIGN — Ayurvedic Classification Expert System Website

**Design direction:** Calm, educational, modern, trustworthy, culturally respectful  
**Primary UI:** Responsive web application  
**MVP pages:** Home, Assessment, Results, Methodology, Dosha Information

---

## 1. Design Goals

The interface should feel:

- Natural without looking like a generic “spa” website.
- Educational rather than medicalized.
- Simple enough for a first-time user.
- Transparent about how the expert system reaches its result.
- Comfortable for long-form questionnaire use.

Avoid:

- Fear-based health messaging.
- Medical claims.
- “Instant diagnosis” language.
- Decorative complexity that interferes with the assessment.

---

## 2. Suggested Visual Language

### Color system

Use an earthy, light palette:

```text
Background       #F8F5EE
Surface          #FFFFFF
Primary          #315C46
Primary Dark     #244534
Accent           #C58B45
Text             #243128
Muted Text       #68736C
Border           #DFE5DE
Success          #4E7A5A
Warning          #A8752E
```

The colors are starting tokens, not fixed implementation requirements.

### Typography

Suggested pairing:

- Headings: **Cormorant Garamond** or another readable serif.
- Body/UI: **Inter**, **Source Sans 3**, or system sans-serif.

Use typography to create a calm editorial feel while keeping UI controls highly readable.

---

## 3. Information Architecture

```text
Home
 ├── What is the system?
 ├── How it works
 ├── Dosha overview
 └── Start assessment
       ↓
Assessment
 ├── Intro + consent/disclaimer
 ├── Questions 1–N
 └── Submit
       ↓
Results
 ├── Primary classification
 ├── Score chart
 ├── Rule explanation
 ├── Key answer evidence
 ├── Educational profile
 └── Restart

Methodology
 ├── Rule engine
 ├── Scoring model
 ├── Classification thresholds
 └── Limitations

Dosha Information
 ├── Vata
 ├── Pitta
 ├── Kapha
 └── Dual/balanced profiles
```

---

## 4. Home Page

### Hero

Headline:

> Discover Your Ayurvedic Dosha Profile

Supporting copy:

> Explore a traditional Ayurvedic classification model through a transparent, rule-based questionnaire.

Primary CTA:

**Start Assessment**

Secondary CTA:

**How It Works**

Small disclaimer:

> Educational classification only. This tool does not diagnose medical conditions or replace professional healthcare advice.

### “How it works” section

Three cards:

**1. Answer**  
Respond to questions about general constitution and preferences.

**2. Evaluate**  
The rule engine converts responses into weighted dosha evidence.

**3. Explain**  
See the classification, scores, and rules that contributed to the result.

---

## 5. Assessment Screen

### Layout

Desktop:

```text
┌──────────────────────────────────────────────┐
│ Logo                          Question 8/24  │
│                                              │
│ Progress ███████████░░░░░░░░                │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ What best describes your typical ...    │ │
│ │                                          │ │
│ │ ○ Option A                               │ │
│ │ ○ Option B                               │ │
│ │ ○ Option C                               │ │
│ │ ○ Not sure                               │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ ← Back                         Next →         │
└──────────────────────────────────────────────┘
```

Mobile:

- One-column layout.
- Large tap targets.
- Sticky bottom navigation.
- Progress bar at top.

### Interaction

Answer options should be large cards/radio controls.

Selected state:

- Clear border.
- Subtle background change.
- Check icon optional.
- Never rely on color alone.

---

## 6. Question UX

### Question card

Elements:

- Category label, e.g. `BODY CONSTITUTION`
- Question text
- Short helper sentence where needed
- Options
- “Not sure” option

Example:

> Which description is closest to your typical body frame?

Options:

- Lean / light
- Medium / moderate
- Broad / sturdy
- Not sure

Avoid leading users toward a preferred answer.

---

## 7. Results Page

### Top section

```text
Your Ayurvedic Profile

VATA–PITTA
Two-dosha profile

Vata   ████████████████  42
Pitta  ██████████████    38
Kapha  ███████           21
```

Use a neutral chart visualization. Do not label the result as “good”, “bad”, “healthy”, or “unhealthy”.

### Explanation block

Heading:

> Why this result?

Show 3–6 concise evidence items:

```text
✓ Body-frame response contributed Vata evidence
✓ Activity-pattern response contributed Vata evidence
✓ Temperature preference contributed Pitta evidence
✓ Appetite-pattern response contributed Pitta evidence
```

Each evidence item can expand to show:

```text
Rule: APPETITE_VARIABLE
Weight: Vata +3
Reason: Selected answer mapped to the configured Vata rule.
```

The evidence display makes the expert system auditable.

---

## 8. Dosha Profile Cards

### Vata

Traditional educational descriptors can be presented as examples such as mobility/activity-related tendencies.

### Pitta

Traditional educational descriptors can be presented as examples related to transformation/metabolic functions.

### Kapha

Traditional educational descriptors can be presented as examples related to stability/nourishment.

Do not turn these cards into medical symptom checklists.

Official AYUSH educational material associates Vata with locomotive functions, Pitta with transformation/digestion-related processes, and Kapha with moistening/nourishment-related functions within the traditional framework.  
Source: https://ayusoft.ayush.gov.in/principles-of-ayurveda/

---

## 9. Methodology Page

Purpose: make the system inspectable.

Sections:

### Step 1 — Inputs

Questions generate normalized answer IDs.

### Step 2 — Rules

Each answer maps to one or more weighted dosha effects.

### Step 3 — Aggregation

All rule contributions are added to Vata/Pitta/Kapha totals.

### Step 4 — Classification

Configurable gap thresholds decide single, dual, or balanced profile.

### Step 5 — Explanation

Fired rules become human-readable evidence.

### Example

```text
Answer:
“Lean / light”

Rule:
BODY_FRAME_LEAN

Effect:
Vata +3

Explanation:
This answer is configured as Vata-associated evidence
within this educational rule set.
```

---

## 10. Components

Recommended reusable components:

```text
AppShell
Header
Footer
Hero
InfoCard
PrimaryButton
SecondaryButton
ProgressBar
QuestionCard
AnswerOption
AssessmentNavigator
ScoreChart
ClassificationBadge
EvidenceList
RuleTracePanel
DoshaCard
Disclaimer
Accordion
Toast / InlineValidation
```

---

## 11. State Design

### Assessment state

```ts
type AssessmentState = {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  isComplete: boolean;
};
```

### Result state

```ts
type ClassificationResult = {
  classification: string;
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  firedRules: string[];
  explanation: string[];
};
```

---

## 12. Accessibility

Target WCAG 2.2 AA practices:

- Proper semantic headings.
- Labels associated with radio buttons.
- Keyboard navigation.
- Visible focus state.
- Minimum comfortable touch target.
- Color-independent state changes.
- Reduced-motion support.
- Error messages linked to relevant controls.
- Charts paired with text values.

---

## 13. Responsive Breakpoints

Suggested:

```text
Mobile:   < 640px
Tablet:   640–1023px
Desktop:  >= 1024px
```

The assessment should remain easy to use at all widths.

---

## 14. Empty / Error / Edge States

### No answers

Display:

> Please choose an answer before continuing.

### Incomplete form

Display:

> A few questions are still unanswered.

### Tied top scores

Use dual-dosha or balanced rules according to configured thresholds.

### Very low confidence

Do not invent precision. Display:

> Your responses are relatively balanced in this rule set.

### Rule-data failure

Display a friendly error and never expose raw stack traces.

---

## 15. Content Tone

Use:

- “traditional Ayurvedic framework”
- “educational classification”
- “your responses contributed…”
- “within this rule set”
- “one interpretation of the questionnaire”

Avoid:

- “This proves…”
- “You have…”
- “You are medically…”
- “Guaranteed diagnosis”
- “Cure”
- “Disease detected”

---

## 16. Suggested Frontend Stack

A practical implementation option:

- **Next.js + TypeScript**
- **React**
- **Tailwind CSS**
- **Zod** for runtime validation
- **Recharts** or lightweight SVG for score visualization
- Local JSON/TypeScript data for MVP rules
- Optional API layer later

The architecture should keep the domain/rule engine framework-independent even if the UI stack changes.

---

## 17. Visual Result Example

```text
┌───────────────────────────────────────────────┐
│                YOUR RESULT                    │
│                                               │
│               VATA–PITTA                      │
│         Two-dosha classification              │
│                                               │
│ Vata    ████████████████   42                 │
│ Pitta   ██████████████     38                 │
│ Kapha   ███████            21                 │
│                                               │
│ Why this result?                              │
│ ✓ Body frame → Vata evidence                  │
│ ✓ Activity pattern → Vata evidence            │
│ ✓ Temperature → Pitta evidence               │
│ ✓ Appetite pattern → Pitta evidence           │
│                                               │
│ [View Rule Trace]     [Restart Assessment]    │
└───────────────────────────────────────────────┘
```

---

## 18. Design Success Criteria

The design is successful when a first-time user can:

1. Understand what the tool does within 10 seconds.
2. Start the assessment without creating an account.
3. Answer questions without confusion.
4. Understand the result without needing technical knowledge.
5. Inspect why the result was produced.
6. Understand the tool's educational/non-diagnostic limitation.
