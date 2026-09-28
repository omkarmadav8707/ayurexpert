/**
 * Ayurvedic Rule-Based Expert System - Inference Engine (Enhanced)
 * Features:
 * 1. Tiered Domain Weighting (Sharira Invariants 1.25x, Metabolic 1.0x, Cognitive 0.85x)
 * 2. Certainty Factor (CF) Asymptotic Evidence Combination
 * 3. Multi-Facet Sub-Classifiers: Agni (Metabolism), Koshtha (Bowel), Manas (Gunas)
 * 4. Full Auditable Fired Rules Trace
 */

import { RULE_BASE } from "../data/rules.js";
import { QUESTIONNAIRE_DATA } from "../data/questions.js";

export const DEFAULT_TIER_MULTIPLIERS = {
  1: 1.25, // Anatomical & Somatic Invariants
  2: 1.00, // Metabolic & Physiological Core
  3: 0.85  // Neuro-Cognitive & Behavioral
};

/**
 * Validates that all required questions in the questionnaire have been answered.
 * @param {Record<string, string>} answers 
 * @returns {{ isValid: boolean, missingQuestions: string[], totalAnswered: number, totalRequired: number }}
 */
export function validateAnswers(answers = {}) {
  const missing = [];
  for (const q of QUESTIONNAIRE_DATA) {
    if (!answers[q.id]) {
      missing.push(q.id);
    }
  }

  return {
    isValid: missing.length === 0,
    missingQuestions: missing,
    totalAnswered: Object.keys(answers).filter(id => answers[id]).length,
    totalRequired: QUESTIONNAIRE_DATA.length
  };
}

/**
 * Enhanced forward-chaining evaluator incorporating tiered domain multipliers,
 * Certainty Factor accumulation, and multi-facet sub-classifiers.
 * @param {Record<string, string>} answers - Map of QuestionId -> AnswerId
 * @param {Array} customRules - Optional custom rules
 * @param {object} tierMultipliers - Multipliers for Tier 1, 2, 3
 */
export function evaluateRules(
  answers = {},
  customRules = RULE_BASE,
  tierMultipliers = DEFAULT_TIER_MULTIPLIERS
) {
  const startTime = performance.now();

  const rawScores = { vata: 0, pitta: 0, kapha: 0 };
  const adjustedScores = { vata: 0, pitta: 0, kapha: 0 };
  const firedRules = [];

  // Question metadata lookup
  const questionMap = new Map();
  for (const q of QUESTIONNAIRE_DATA) {
    questionMap.set(q.id, q);
  }

  // Certainty Factor trackers per dosha
  const cfTracker = { vata: 0, pitta: 0, kapha: 0 };

  for (const rule of customRules) {
    const selectedAnswerId = answers[rule.questionId];

    if (selectedAnswerId && selectedAnswerId === rule.answerId) {
      const qMeta = questionMap.get(rule.questionId);
      const tier = qMeta ? qMeta.tier || 2 : 2;
      const multiplier = tierMultipliers[tier] || 1.0;
      const optMeta = qMeta ? qMeta.options.find(o => o.id === rule.answerId) : null;

      const ruleEffects = [];

      for (const effect of rule.effects) {
        const dKey = effect.dosha.toLowerCase();
        const rawW = effect.weight;
        const adjW = parseFloat((rawW * multiplier).toFixed(2));

        if (rawScores[dKey] !== undefined) {
          rawScores[dKey] += rawW;
          adjustedScores[dKey] = parseFloat((adjustedScores[dKey] + adjW).toFixed(2));

          // Asymptotic CF combination: CF_comb = CF1 + CF2 * (1 - CF1)
          const ruleCF = (rule.confidence || 0.9) * (adjW / 3.0);
          cfTracker[dKey] = cfTracker[dKey] + ruleCF * (1 - cfTracker[dKey]);
        }

        ruleEffects.push({
          dosha: effect.dosha,
          rawWeight: rawW,
          adjustedWeight: adjW
        });
      }

      firedRules.push({
        ruleId: rule.id,
        questionId: rule.questionId,
        questionText: qMeta ? qMeta.text : rule.questionId,
        category: qMeta ? qMeta.domain : "General",
        tier,
        tierName: qMeta ? qMeta.tierName : "Standard",
        multiplier,
        sanskritTerm: qMeta ? qMeta.sanskritTerm : "",
        answerId: rule.answerId,
        answerText: optMeta ? optMeta.text : rule.answerId,
        effects: ruleEffects,
        confidence: rule.confidence || 1.0,
        explanation: rule.explanation,
        sanskritReference: rule.sanskritReference || ""
      });
    }
  }

  // Multi-Facet Sub-Classifier Evaluations
  const agniEvaluation = evaluateAgniSubsystem(answers);
  const koshthaEvaluation = evaluateKoshthaSubsystem(answers);
  const manasEvaluation = evaluateManasSubsystem(answers);

  // Overall Confidence Factor (Weighted average across active evidence)
  const totalWeight = adjustedScores.vata + adjustedScores.pitta + adjustedScores.kapha;
  let overallConfidencePct = 85;
  if (totalWeight > 0) {
    const cfComposite = (
      cfTracker.vata * (adjustedScores.vata / totalWeight) +
      cfTracker.pitta * (adjustedScores.pitta / totalWeight) +
      cfTracker.kapha * (adjustedScores.kapha / totalWeight)
    );
    overallConfidencePct = Math.min(98, Math.max(65, Math.round(cfComposite * 100)));
  }

  const endTime = performance.now();

  return {
    rawScores,
    adjustedScores,
    firedRules,
    totalFired: firedRules.length,
    agniEvaluation,
    koshthaEvaluation,
    manasEvaluation,
    confidencePct: overallConfidencePct,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3))
  };
}

/**
 * Sub-Classifier: Evaluates Agni (Digestive Fire) state
 */
function evaluateAgniSubsystem(answers) {
  // Q07 (Appetite), Q09 (Thirst), Q22 (Taste)
  const q7 = answers["Q07_APPETITE_METABOLISM"];
  const q9 = answers["Q09_THIRST_HYDRATION"];
  const q22 = answers["Q22_TASTE_PREFERENCE"];

  let vScore = 0, pScore = 0, kScore = 0, samScore = 0;

  if (q7 === "A1") vScore += 3;
  else if (q7 === "A2") pScore += 3;
  else if (q7 === "A3") kScore += 3;
  else if (q7 === "A4") samScore += 3;

  if (q9 === "A1") vScore += 2;
  else if (q9 === "A2") pScore += 2;
  else if (q9 === "A3") kScore += 2;
  else if (q9 === "A4") samScore += 2;

  if (q22 === "A1") vScore += 1;
  else if (q22 === "A2") pScore += 1;
  else if (q22 === "A3") kScore += 1;
  else if (q22 === "A4") samScore += 2;

  const maxVal = Math.max(vScore, pScore, kScore, samScore);
  if (samScore >= maxVal && samScore >= 4) return "SAMAGNI";
  if (pScore >= maxVal) return "TIKSHNAGNI";
  if (vScore >= maxVal) return "VISHAMAGNI";
  if (kScore >= maxVal) return "MANDAGNI";
  return "SAMAGNI";
}

/**
 * Sub-Classifier: Evaluates Koshtha (Bowel Motility) state
 */
function evaluateKoshthaSubsystem(answers) {
  // Q08 (Bowel elimination) and Q10 (Temperature)
  const q8 = answers["Q08_DIGESTION_ELIMINATION"];
  if (q8 === "A1") return "KRURA";
  if (q8 === "A2") return "MRIDU";
  if (q8 === "A3") return "MADHYAMA";
  return "MADHYAMA";
}

/**
 * Sub-Classifier: Evaluates Manasika Gunas (Psychic Balance)
 */
function evaluateManasSubsystem(answers) {
  let sattva = 0, rajas = 0, tamas = 0;

  const manasQs = ["Q16_SPEECH_COMMUNICATION", "Q17_LEARNING_MEMORY", "Q18_STRESS_RESPONSE", "Q19_WORK_PROJECT_STYLE"];
  manasQs.forEach(qId => {
    const a = answers[qId];
    if (a === "A4") {
      sattva += 3;
    } else if (a === "A2") {
      rajas += 2.5;
      sattva += 0.5;
    } else if (a === "A1") {
      rajas += 2;
      tamas += 1;
    } else if (a === "A3") {
      tamas += 2.5;
      sattva += 0.5;
    }
  });

  const tot = sattva + rajas + tamas || 1;
  return {
    sattvaPct: Math.round((sattva / tot) * 100),
    rajasPct: Math.round((rajas / tot) * 100),
    tamasPct: Math.round((tamas / tot) * 100),
    dominantGuna: sattva >= rajas && sattva >= tamas ? "SATTVA" : (rajas >= tamas ? "RAJAS" : "TAMAS")
  };
}
