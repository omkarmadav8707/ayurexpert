/**
 * Ayurvedic Expert System - Formal Verification Test Suite (Enhanced)
 * 16 Rigorous Test Vectors covering Single-Dosha, Directional Dual-Dosha (V-P vs P-V, etc.),
 * Sama Tridoshic, Boundary Thresholds, Sparse Rejection, Agni Sub-classification,
 * Attribute Dissonance, and Order Permutation Invariance.
 */

export const TEST_SUITE = [
  {
    id: "TC-01",
    name: "Pure Vata Dominance (Laghu-Ruksha Manifestation)",
    category: "Ekadoshaja Classification",
    description: "Evaluates an archetype with pure Vata responses across all 24 somatic and metabolic domains.",
    answers: createUniformVector("A1"),
    expectedClassification: "VATA",
    verificationCriteria: "Vata is the unique maximum with margin > dualGap (adjusted margin >> 6 pts).",
    clinicalRationale: "Complete alignment with classical Vata Lakshanas yields unequivocal Ekadoshaja Vata classification."
  },
  {
    id: "TC-02",
    name: "Pure Pitta Dominance (Teekshna-Ushna Manifestation)",
    category: "Ekadoshaja Classification",
    description: "Evaluates an archetype with intense metabolic fire, sharp intellect, and warm flushed skin.",
    answers: createUniformVector("A2"),
    expectedClassification: "PITTA",
    verificationCriteria: "Pitta is the unique maximum with margin > dualGap (adjusted margin >> 6 pts).",
    clinicalRationale: "Pure fiery attributes produce unambiguous Tikshnagni/Pitta dominance."
  },
  {
    id: "TC-03",
    name: "Pure Kapha Dominance (Guru-Snigdha-Sthira Manifestation)",
    category: "Ekadoshaja Classification",
    description: "Evaluates an archetype with sturdy frame, thick unctuous skin, and deep physical endurance.",
    answers: createUniformVector("A3"),
    expectedClassification: "KAPHA",
    verificationCriteria: "Kapha is the unique maximum with margin > dualGap (adjusted margin >> 6 pts).",
    clinicalRationale: "Pure structural stability and slow metabolism yield classic Kapha Prakriti."
  },
  {
    id: "TC-04",
    name: "Directional Dual Vata-Pitta (Vata Leading)",
    category: "Directional Dvandvaja",
    description: "Vata has primary dominance (14 questions) while Pitta is secondary (10 questions).",
    answers: createSplitVector(14, "A1", 10, "A2"),
    expectedClassification: "VATA_PITTA",
    verificationCriteria: "Vata leads Pitta within dualGap threshold, correctly producing directional VATA_PITTA.",
    clinicalRationale: "Classical texts distinguish Vata-Pitta (Vata leading) from Pitta-Vata (Pitta leading)."
  },
  {
    id: "TC-05",
    name: "Directional Dual Pitta-Vata (Pitta Leading)",
    category: "Directional Dvandvaja",
    description: "Pitta has primary dominance (14 questions) while Vata is secondary (10 questions).",
    answers: createSplitVector(14, "A2", 10, "A1"),
    expectedClassification: "PITTA_VATA",
    verificationCriteria: "Pitta leads Vata within dualGap threshold, correctly producing directional PITTA_VATA.",
    clinicalRationale: "Pitta leading produces sharp strategic ambition tempered by Vata agility."
  },
  {
    id: "TC-06",
    name: "Directional Dual Pitta-Kapha (Pitta Leading)",
    category: "Directional Dvandvaja",
    description: "Pitta has primary dominance (14 questions) while Kapha is secondary (10 questions).",
    answers: createSplitVector(14, "A2", 10, "A3"),
    expectedClassification: "PITTA_KAPHA",
    verificationCriteria: "Pitta leads Kapha within dualGap threshold, producing PITTA_KAPHA.",
    clinicalRationale: "Dynamic willpower supported by physical stamina."
  },
  {
    id: "TC-07",
    name: "Directional Dual Kapha-Pitta (Kapha Leading)",
    category: "Directional Dvandvaja",
    description: "Kapha has primary dominance (14 questions) while Pitta is secondary (10 questions).",
    answers: createSplitVector(14, "A3", 10, "A2"),
    expectedClassification: "KAPHA_PITTA",
    verificationCriteria: "Kapha leads Pitta within dualGap threshold, producing KAPHA_PITTA.",
    clinicalRationale: "Grounded physical endurance ignited by internal metabolic warmth."
  },
  {
    id: "TC-08",
    name: "Directional Dual Vata-Kapha (Vata Leading)",
    category: "Directional Dvandvaja",
    description: "Vata has primary dominance (14 questions) while Kapha is secondary (10 questions).",
    answers: createSplitVector(14, "A1", 10, "A3"),
    expectedClassification: "VATA_KAPHA",
    verificationCriteria: "Vata leads Kapha within dualGap threshold, producing VATA_KAPHA.",
    clinicalRationale: "Intuitive creative imagination with secondary gentle grounding."
  },
  {
    id: "TC-09",
    name: "Directional Dual Kapha-Vata (Kapha Leading)",
    category: "Directional Dvandvaja",
    description: "Kapha has primary dominance (14 questions) while Vata is secondary (10 questions).",
    answers: createSplitVector(14, "A3", 10, "A1"),
    expectedClassification: "KAPHA_VATA",
    verificationCriteria: "Kapha leads Vata within dualGap threshold, producing KAPHA_VATA.",
    clinicalRationale: "Deep physical stability with secondary creative spark."
  },
  {
    id: "TC-10",
    name: "Sama Prakriti (Tridoshic Symmetrical Equilibrium)",
    category: "Samadoshaja Classification",
    description: "All 24 questions answered with balanced/neutral option A4 (+1 to all doshas).",
    answers: createUniformVector("A4"),
    expectedClassification: "SAMA",
    verificationCriteria: "max(V,P,K) - min(V,P,K) == 0 <= balancedGap(4). Classifies as SAMA.",
    clinicalRationale: "Perfect tri-elemental symmetry triggers canonical Sama Prakriti classification."
  },
  {
    id: "TC-11",
    name: "Dual-Dosha Boundary Test (Difference <= dualGap)",
    category: "Boundary Condition",
    description: "Verifies inclusive boundary condition where Rank 1 and Rank 2 differ by points <= dualGap.",
    answers: createSplitVector(13, "A1", 11, "A2"),
    expectedClassification: "VATA_PITTA",
    verificationCriteria: "Score margin is <= dualGap (6 pts). Must remain in dual-dosha category.",
    clinicalRationale: "Confirms proper margin thresholding at border conditions."
  },
  {
    id: "TC-12",
    name: "Balanced Sama Boundary Test (Difference <= balancedGap)",
    category: "Boundary Condition",
    description: "Verifies inclusive boundary where spread across all three doshas is within balancedGap.",
    answers: (() => {
      const a = {};
      const qIds = [
        "Q01_BODY_FRAME", "Q02_SKIN_NATURE", "Q03_HAIR_TEXTURE", "Q04_EYES_GAZE", "Q05_JOINTS_FLEXIBILITY", "Q06_TEETH_GUMS",
        "Q07_APPETITE_METABOLISM", "Q08_DIGESTION_ELIMINATION", "Q09_THIRST_HYDRATION", "Q10_TEMPERATURE_PREFERENCE",
        "Q11_PERSPIRATION_SWEAT", "Q12_SLEEP_PATTERN", "Q13_DREAMS_THEMES", "Q14_PHYSICAL_ACTIVITY_PACE",
        "Q15_ENERGY_STAMINA", "Q16_SPEECH_COMMUNICATION", "Q17_LEARNING_MEMORY", "Q18_STRESS_RESPONSE",
        "Q19_WORK_PROJECT_STYLE", "Q20_FINANCIAL_HABITS", "Q21_ROUTINE_PREFERENCE", "Q22_TASTE_PREFERENCE",
        "Q23_WEATHER_DISCOMFORT", "Q24_PULSE_RHYTHM_MOVEMENT"
      ];
      // 8 Vata, 8 Pitta, 8 Kapha -> exactly equal
      qIds.slice(0, 8).forEach(id => a[id] = "A1");
      qIds.slice(8, 16).forEach(id => a[id] = "A2");
      qIds.slice(16, 24).forEach(id => a[id] = "A3");
      return a;
    })(),
    expectedClassification: "SAMA",
    verificationCriteria: "Spread across all three doshas <= balancedGap. Classifies as SAMA.",
    clinicalRationale: "Equal representation across all three dosha markers creates balanced equilibrium."
  },
  {
    id: "TC-13",
    name: "Sparse / Incomplete Questionnaire Input Rejection",
    category: "Validation & Robustness",
    description: "Evaluates system behavior when required questions are omitted or null.",
    answers: {
      Q01_BODY_FRAME: "A1",
      Q02_SKIN_NATURE: "A1"
    },
    expectedClassification: "VALIDATION_ERROR",
    verificationCriteria: "Engine validator returns isValid: false and prevents erroneous inference.",
    clinicalRationale: "Ayurvedic Pariksha requires a holistic multi-domain dataset; partial inputs must not emit false diagnoses."
  },
  {
    id: "TC-14",
    name: "Agni Sub-System Classification (Tikshnagni Detection)",
    category: "Sub-Classifier Verification",
    description: "Verifies that voracious hunger (Q07=A2) and high thirst (Q09=A2) trigger Tikshnagni sub-classification.",
    answers: (() => {
      const a = createUniformVector("A1");
      a["Q07_APPETITE_METABOLISM"] = "A2"; // Intense hunger
      a["Q09_THIRST_HYDRATION"] = "A2";    // High thirst
      return a;
    })(),
    expectedClassification: "VATA", // Vata overall, but Agni must be TIKSHNAGNI
    expectedSubsystem: { agni: "TIKSHNAGNI" },
    verificationCriteria: "Sub-classifier correctly detects Tikshnagni from isolated metabolic fire markers.",
    clinicalRationale: "Validates multi-facet diagnostic separation between overall Prakriti and digestive Agni."
  },
  {
    id: "TC-15",
    name: "Polar Attribute Dissonance Detection",
    category: "Conflict Handling",
    description: "Evaluates conflicting inputs where somatic build is heavy (Kapha) but skin and mind are dry/anxious (Vata).",
    answers: (() => {
      const a = createUniformVector("A1");
      // Heavy skeleton and joint traits
      a["Q01_BODY_FRAME"] = "A3";
      a["Q05_JOINTS_FLEXIBILITY"] = "A3";
      a["Q06_TEETH_GUMS"] = "A3";
      a["Q12_SLEEP_PATTERN"] = "A3";
      return a;
    })(),
    expectedClassification: "VATA_KAPHA",
    verificationCriteria: "Dissonance metric flags dual polarity (> 20%) while resolving into deterministic dual classification.",
    clinicalRationale: "Demonstrates principled resolution of opposing Gunas (Laghu vs Guru)."
  },
  {
    id: "TC-16",
    name: "Permutation Invariance & Commutative Determinism",
    category: "Formal Correctness",
    description: "Submitting identical answers in shuffled question presentation order yields strictly identical output.",
    answers: createUniformVector("A2"),
    expectedClassification: "PITTA",
    verificationCriteria: "Evaluates commutative property: Aggregate(shuffle(A)) == Aggregate(A).",
    clinicalRationale: "Invariance under evaluation order ensures scientific reproducibility."
  }
];

// Helper functions for test vector creation
function createUniformVector(optionId) {
  const a = {};
  const qIds = [
    "Q01_BODY_FRAME", "Q02_SKIN_NATURE", "Q03_HAIR_TEXTURE", "Q04_EYES_GAZE", "Q05_JOINTS_FLEXIBILITY", "Q06_TEETH_GUMS",
    "Q07_APPETITE_METABOLISM", "Q08_DIGESTION_ELIMINATION", "Q09_THIRST_HYDRATION", "Q10_TEMPERATURE_PREFERENCE",
    "Q11_PERSPIRATION_SWEAT", "Q12_SLEEP_PATTERN", "Q13_DREAMS_THEMES", "Q14_PHYSICAL_ACTIVITY_PACE",
    "Q15_ENERGY_STAMINA", "Q16_SPEECH_COMMUNICATION", "Q17_LEARNING_MEMORY", "Q18_STRESS_RESPONSE",
    "Q19_WORK_PROJECT_STYLE", "Q20_FINANCIAL_HABITS", "Q21_ROUTINE_PREFERENCE", "Q22_TASTE_PREFERENCE",
    "Q23_WEATHER_DISCOMFORT", "Q24_PULSE_RHYTHM_MOVEMENT"
  ];
  qIds.forEach(id => a[id] = optionId);
  return a;
}

function createSplitVector(count1, opt1, count2, opt2) {
  const a = {};
  const qIds = [
    "Q01_BODY_FRAME", "Q02_SKIN_NATURE", "Q03_HAIR_TEXTURE", "Q04_EYES_GAZE", "Q05_JOINTS_FLEXIBILITY", "Q06_TEETH_GUMS",
    "Q07_APPETITE_METABOLISM", "Q08_DIGESTION_ELIMINATION", "Q09_THIRST_HYDRATION", "Q10_TEMPERATURE_PREFERENCE",
    "Q11_PERSPIRATION_SWEAT", "Q12_SLEEP_PATTERN", "Q13_DREAMS_THEMES", "Q14_PHYSICAL_ACTIVITY_PACE",
    "Q15_ENERGY_STAMINA", "Q16_SPEECH_COMMUNICATION", "Q17_LEARNING_MEMORY", "Q18_STRESS_RESPONSE",
    "Q19_WORK_PROJECT_STYLE", "Q20_FINANCIAL_HABITS", "Q21_ROUTINE_PREFERENCE", "Q22_TASTE_PREFERENCE",
    "Q23_WEATHER_DISCOMFORT", "Q24_PULSE_RHYTHM_MOVEMENT"
  ];
  qIds.slice(0, count1).forEach(id => a[id] = opt1);
  qIds.slice(count1, count1 + count2).forEach(id => a[id] = opt2);
  return a;
}
