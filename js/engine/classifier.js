/**
 * Ayurvedic Rule-Based Expert System - Classification Policy (Enhanced)
 * Implements 10-Class Directional Prakriti Ontology (Single-Doshas, Directional Dual-Doshas, Sama),
 * Sub-Classifiers for Agni and Koshtha, and Boundary Distance Metrics.
 */

export const DEFAULT_THRESHOLDS = {
  dualGap: 6.0,      // Upper limit for dual-dosha classification (points)
  balancedGap: 4.0,   // Max-min limit for Sama classification (points)
  symmetricThreshold: 1.5 // Margin below which a dual-dosha is completely symmetrical
};

/**
 * Classifies an evaluated score profile into a 10-class Granular Prakriti.
 * @param {Array<{ dosha: string, score: number, percentage: number }>} rankedList
 * @param {{ dualGap: number, balancedGap: number, symmetricThreshold: number }} thresholds
 * @param {object} subEvaluations - Agni and Koshtha evaluation keys
 */
export function classifyPrakriti(
  rankedList,
  thresholds = DEFAULT_THRESHOLDS,
  subEvaluations = { agni: "SAMAGNI", koshtha: "MADHYAMA", manas: null }
) {
  const [first, second, third] = rankedList;
  const dualGap = thresholds.dualGap ?? DEFAULT_THRESHOLDS.dualGap;
  const balancedGap = thresholds.balancedGap ?? DEFAULT_THRESHOLDS.balancedGap;
  const symmThresh = thresholds.symmetricThreshold ?? DEFAULT_THRESHOLDS.symmetricThreshold;

  const maxMinDiff = parseFloat((first.score - third.score).toFixed(2));
  const topTwoDiff = parseFloat((first.score - second.score).toFixed(2));

  // Case 1: SAMA (Tridoshic Equilibrated Harmony)
  if (maxMinDiff <= balancedGap) {
    return {
      prakritiCode: "SAMA",
      categoryType: "Samadoshaja",
      directionality: "SYMMETRICAL",
      leadingDosha: "BALANCED",
      secondaryDosha: null,
      decisionBranch: "BRANCH_1_SAMA",
      reasoning: `Max score (${first.dosha}: ${first.score}) minus min score (${third.dosha}: ${third.score}) is ${maxMinDiff} pts, which satisfies the balanced threshold (≤ ${balancedGap} pts). Symmetrical tridoshic equilibrium established.`,
      thresholdsUsed: { dualGap, balancedGap },
      distanceToShift: parseFloat((balancedGap - maxMinDiff).toFixed(2)),
      nearestAlternative: `${first.dosha}_${second.dosha}`,
      agniCode: subEvaluations.agni || "SAMAGNI",
      koshthaCode: subEvaluations.koshtha || "MADHYAMA",
      manasData: subEvaluations.manas || null
    };
  }

  // Case 2: DUAL-DOSHA (Dvandvaja - 6 Directional Variations)
  if (topTwoDiff <= dualGap) {
    const isSymmetric = topTwoDiff <= symmThresh;
    const directionalCode = `${first.dosha}_${second.dosha}`;

    let dirLabel = isSymmetric ? "Co-Equal Dual" : `${first.dosha} Leading with Secondary ${second.dosha}`;

    return {
      prakritiCode: directionalCode,
      categoryType: "Dvandvaja",
      directionality: isSymmetric ? "SYMMETRIC_DUAL" : "DIRECTIONAL_DUAL",
      leadingDosha: first.dosha,
      secondaryDosha: second.dosha,
      decisionBranch: isSymmetric ? "BRANCH_2A_SYMMETRIC_DUAL" : "BRANCH_2B_DIRECTIONAL_DUAL",
      reasoning: `Top score (${first.dosha}: ${first.score}) and runner-up (${second.dosha}: ${second.score}) differ by ${topTwoDiff} pts (within dual threshold ≤ ${dualGap} pts). ${dirLabel}. Third ranked (${third.dosha}: ${third.score}) is separated by ${maxMinDiff} pts.`,
      thresholdsUsed: { dualGap, balancedGap },
      distanceToShift: parseFloat((dualGap - topTwoDiff).toFixed(2)),
      nearestAlternative: first.dosha,
      agniCode: subEvaluations.agni || "SAMAGNI",
      koshthaCode: subEvaluations.koshtha || "MADHYAMA",
      manasData: subEvaluations.manas || null
    };
  }

  // Case 3: SINGLE-DOSHA (Ekadoshaja - 3 Pure Profiles)
  return {
    prakritiCode: first.dosha,
    categoryType: "Ekadoshaja",
    directionality: "DOMINANT_SINGLE",
    leadingDosha: first.dosha,
    secondaryDosha: second.dosha,
    decisionBranch: "BRANCH_3_SINGLE",
    reasoning: `Leading score (${first.dosha}: ${first.score}) exceeds runner-up (${second.dosha}: ${second.score}) by margin of ${topTwoDiff} pts (exceeding dual threshold > ${dualGap} pts). Decisive single-dosha dominance established.`,
    thresholdsUsed: { dualGap, balancedGap },
    distanceToShift: parseFloat((topTwoDiff - dualGap).toFixed(2)),
    nearestAlternative: `${first.dosha}_${second.dosha}`,
    agniCode: subEvaluations.agni || "SAMAGNI",
    koshthaCode: subEvaluations.koshtha || "MADHYAMA",
    manasData: subEvaluations.manas || null
  };
}
