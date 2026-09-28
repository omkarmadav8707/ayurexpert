/**
 * Ayurvedic Rule-Based Expert System - Explanation & Audit Engine (Enhanced)
 * Synthesizes:
 * 1. Fired rule evidence traces with Tier weights
 * 2. Counterfactual Decision Boundary & Pivot Questions Analysis
 * 3. Clinical narratives for Agni and Koshtha states
 * 4. Dissonance / Ambiguity interpretation
 */

import { DOSHA_DETAILS, AGNI_PROFILES, KOSHTHA_PROFILES } from "../data/doshas.js";

/**
 * Builds comprehensive explainability record for the classification result.
 * @param {object} evaluation - Fired rules and scores from ruleEngine
 * @param {object} scoreProfile - Ranked scores, margins, and dissonance
 * @param {object} classification - Output from classifier
 */
export function buildExplanation(evaluation, scoreProfile, classification) {
  const { firedRules, confidencePct } = evaluation;
  const { ranked, percentages, dissonanceIndex } = scoreProfile;
  const { prakritiCode, reasoning, distanceToShift, nearestAlternative, leadingDosha, secondaryDosha } = classification;

  // Domain & Tier breakdown
  const tierContributions = {
    tier1: { label: "Tier 1: Anatomical Invariants (1.25x)", vata: 0, pitta: 0, kapha: 0 },
    tier2: { label: "Tier 2: Metabolic Core (1.00x)", vata: 0, pitta: 0, kapha: 0 },
    tier3: { label: "Tier 3: Neuro-Cognitive (0.85x)", vata: 0, pitta: 0, kapha: 0 }
  };

  for (const rule of firedRules) {
    const tKey = `tier${rule.tier || 2}`;
    for (const eff of rule.effects) {
      const k = eff.dosha.toLowerCase();
      if (tierContributions[tKey]) {
        tierContributions[tKey][k] = parseFloat(((tierContributions[tKey][k] || 0) + eff.adjustedWeight).toFixed(2));
      }
    }
  }

  // Identify Top Primary Driver Rules for the leading dosha(s)
  const targetDoshas = leadingDosha === "BALANCED" ? ["VATA", "PITTA", "KAPHA"] : [leadingDosha, secondaryDosha].filter(Boolean);
  const keyDrivers = [];

  for (const rule of firedRules) {
    const contributes = rule.effects.some(e => targetDoshas.includes(e.dosha) && e.rawWeight >= 3);
    if (contributes) {
      const effectDesc = rule.effects.map(e => `${e.dosha} +${e.adjustedWeight} pts (Tier ${rule.tier})`).join(", ");
      keyDrivers.push({
        ruleId: rule.ruleId,
        questionText: rule.questionText,
        category: rule.category,
        tierName: rule.tierName,
        multiplier: rule.multiplier,
        sanskritTerm: rule.sanskritTerm,
        answerText: rule.answerText,
        effectText: effectDesc,
        explanation: rule.explanation,
        sanskritReference: rule.sanskritReference,
        primaryDosha: rule.effects[0].dosha
      });
    }
  }

  const selectedDrivers = keyDrivers.slice(0, 6);

  // Counterfactual & Pivot Question Analysis
  // Find which question contributed the most points toward the leading dosha
  const sortedByImpact = [...firedRules].sort((a, b) => {
    const aLead = a.effects.find(e => e.dosha === leadingDosha)?.adjustedWeight || 0;
    const bLead = b.effects.find(e => e.dosha === leadingDosha)?.adjustedWeight || 0;
    return bLead - aLead;
  });

  const pivotQuestion = sortedByImpact[0] || null;
  const pivotNarrative = pivotQuestion
    ? `Your response to "${pivotQuestion.questionText}" contributed ${pivotQuestion.effects[0]?.adjustedWeight} pts (Tier ${pivotQuestion.tier}: ${pivotQuestion.tierName}), exerting the highest leverage on establishing ${leadingDosha} dominance.`
    : "Evidence was evenly distributed across multiple observational questions.";

  // Boundary Sensitivity Statement
  const boundarySensitivityStatement = distanceToShift !== undefined
    ? `You are within ${distanceToShift} points of shifting classification boundary toward ${nearestAlternative}.`
    : "Classification is well-centered within its decision boundary.";

  // Formulate headline and summary
  let headline = "";
  let summaryParagraph = "";

  if (classification.categoryType === "Samadoshaja") {
    headline = "Equally Distributed Tri-Elemental Evidence (Sama Equilibrium)";
    summaryParagraph = `Your responses demonstrate a remarkably harmonious distribution across Vata (${percentages.vata}%), Pitta (${percentages.pitta}%), and Kapha (${percentages.kapha}%). The maximum spread between your highest and lowest dosha scores is within the calibrated balanced threshold (${classification.thresholdsUsed.balancedGap} pts).`;
  } else if (classification.categoryType === "Dvandvaja") {
    const n1 = DOSHA_DETAILS[leadingDosha]?.name || leadingDosha;
    const n2 = DOSHA_DETAILS[secondaryDosha]?.name || secondaryDosha;
    headline = `Dual-Dosha Co-Dominance: ${n1} Leading with ${n2} Secondary`;
    summaryParagraph = `Your assessment reveals closely aligned evidence for both ${n1} (${percentages[leadingDosha.toLowerCase()]}%) and ${n2} (${percentages[secondaryDosha.toLowerCase()]}%), with ${n1} as the primary constitutional driver. Points margin between the top two doshas is within the configured threshold (${classification.thresholdsUsed.dualGap} pts).`;
  } else {
    const name = DOSHA_DETAILS[leadingDosha]?.name || leadingDosha;
    headline = `Distinct ${name} Dominance Established`;
    summaryParagraph = `Your responses generated decisive evidence for ${name} (${percentages[leadingDosha.toLowerCase()]}%), outscoring the second-ranked dosha by a distinct margin. Invariable anatomical markers and core metabolic indicators consistently fired rules reflecting classical ${name} qualities (Gunas).`;
  }

  // Sub-profile clinical data
  const agniData = AGNI_PROFILES[classification.agniCode] || AGNI_PROFILES.SAMAGNI;
  const koshthaData = KOSHTHA_PROFILES[classification.koshthaCode] || KOSHTHA_PROFILES.MADHYAMA;

  return {
    headline,
    summaryParagraph,
    decisionReasoning: reasoning,
    keyDrivers: selectedDrivers,
    tierContributions,
    pivotQuestionNarrative: pivotNarrative,
    boundarySensitivityStatement,
    confidencePct,
    dissonanceIndex,
    agniData,
    koshthaData,
    firedRuleTraces: firedRules
  };
}
