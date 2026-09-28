/**
 * Ayurvedic Rule-Based Expert System - Scoring Engine (Enhanced)
 * Handles Proportional Normalization, Dissonance/Ambiguity Metrics,
 * Barycentric 2D Mapping, and 6-Axis Radar Spider Coordinates.
 */

/**
 * Computes complete statistical and geometric profile from raw and adjusted scores.
 * @param {{ vata: number, pitta: number, kapha: number }} adjustedScores 
 * @param {{ vata: number, pitta: number, kapha: number }} rawScores 
 */
export function computeScoreProfile(adjustedScores, rawScores = adjustedScores) {
  const v = Math.max(0, adjustedScores.vata || 0);
  const p = Math.max(0, adjustedScores.pitta || 0);
  const k = Math.max(0, adjustedScores.kapha || 0);

  const total = parseFloat((v + p + k).toFixed(2));

  const percentages = {
    vata: total > 0 ? Math.round((v / total) * 100) : 33,
    pitta: total > 0 ? Math.round((p / total) * 100) : 33,
    kapha: total > 0 ? Math.round((k / total) * 100) : 34
  };

  const sumPct = percentages.vata + percentages.pitta + percentages.kapha;
  if (total > 0 && sumPct !== 100) {
    percentages.kapha += (100 - sumPct);
  }

  // Ordinal ranking
  const list = [
    { dosha: "VATA", key: "vata", label: "Vata", score: v, rawScore: rawScores.vata, percentage: percentages.vata },
    { dosha: "PITTA", key: "pitta", label: "Pitta", score: p, rawScore: rawScores.pitta, percentage: percentages.pitta },
    { dosha: "KAPHA", key: "kapha", label: "Kapha", score: k, rawScore: rawScores.kapha, percentage: percentages.kapha }
  ];

  list.sort((a, b) => b.score - a.score);

  const diff12 = parseFloat((list[0].score - list[1].score).toFixed(2));
  const diff13 = parseFloat((list[0].score - list[2].score).toFixed(2));
  const maxMinDiff = parseFloat((list[0].score - list[2].score).toFixed(2));

  // Dissonance / Ambiguity Metric (Xi):
  // Measures polar conflict between extreme Vata and extreme Kapha traits
  let dissonanceIndex = 0;
  const vkMin = Math.min(v, k);
  const vkSum = v + k;
  if (vkSum > 10) {
    dissonanceIndex = Math.round((vkMin / vkSum) * 100);
  }

  // Barycentric 2D Mapping in Equilateral Triangle
  // Top: Pitta (200, 40)
  // Bottom-Left: Vata (60, 280)
  // Bottom-Right: Kapha (340, 280)
  const normV = total > 0 ? v / total : 1 / 3;
  const normP = total > 0 ? p / total : 1 / 3;
  const normK = total > 0 ? k / total : 1 / 3;

  const bx = normV * 60 + normP * 200 + normK * 340;
  const by = normV * 280 + normP * 40 + normK * 280;

  // 6-Axis Radar Coordinates (Normalized 0.1 to 1.0)
  // 1: Mobility (Vata)
  // 2: Thermogenesis (Pitta)
  // 3: Cohesion / Mass (Kapha)
  // 4: Lightness / Dryness (Vata)
  // 5: Sharpness / Metabolism (Pitta)
  // 6: Synovial Stability (Kapha)
  const radarAxes = {
    mobility: Math.min(1.0, Math.max(0.15, normV * 1.8)),
    thermogenesis: Math.min(1.0, Math.max(0.15, normP * 1.8)),
    cohesion: Math.min(1.0, Math.max(0.15, normK * 1.8)),
    lightness: Math.min(1.0, Math.max(0.15, normV * 1.7)),
    sharpness: Math.min(1.0, Math.max(0.15, normP * 1.7)),
    stability: Math.min(1.0, Math.max(0.15, normK * 1.7))
  };

  return {
    raw: rawScores,
    adjusted: { vata: v, pitta: p, kapha: k },
    total,
    percentages,
    ranked: list,
    margins: {
      diff12,
      diff13,
      maxMinDiff
    },
    dissonanceIndex,
    barycentricPoint: {
      x: Math.round(bx * 10) / 10,
      y: Math.round(by * 10) / 10
    },
    radarAxes
  };
}
