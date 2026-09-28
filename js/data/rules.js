/**
 * Ayurvedic Expert System - Production Rule Base
 * 96 Formally Specified Production Rules
 * Mapping observational facts (Prashna Pariksha) to Tridosha evidence vectors.
 * Grounded in classical texts: Ashtanga Hridaya (Sutrasthana 1), Charaka Samhita (Vimanasthana 8).
 */

export const RULE_BASE = [
  // Q01 - Body Frame
  {
    id: "R_01_A1",
    questionId: "Q01_BODY_FRAME",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.95,
    explanation: "Slender, light skeletal frame reflects the Laghu (light) and Ruksha (dry) qualities of Vata dosha.",
    sanskritReference: "Laghu Ruksha Alpa Sharira (Charaka Vimana 8.98)"
  },
  {
    id: "R_01_A2",
    questionId: "Q01_BODY_FRAME",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Medium, symmetrical, athletic frame corresponds to the moderate (Madhyama) physical attributes of Pitta dosha.",
    sanskritReference: "Madhyama Bala Madhyama Ayus (Charaka Vimana 8.97)"
  },
  {
    id: "R_01_A3",
    questionId: "Q01_BODY_FRAME",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Broad, sturdy, well-developed bone frame reflects the Guru (heavy) and Sthira (stable) qualities of Kapha dosha.",
    sanskritReference: "Sthira Sara Upachita Sharira (Charaka Vimana 8.96)"
  },
  {
    id: "R_01_A4",
    questionId: "Q01_BODY_FRAME",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Mixed frame suggests balanced physical proportions or dual-dosha manifestation.",
    sanskritReference: "Samadosha Lakshana"
  },

  // Q02 - Skin
  {
    id: "R_02_A1",
    questionId: "Q02_SKIN_NATURE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.95,
    explanation: "Dry, rough, cool skin directly reflects Ruksha (dry), Khara (rough), and Sheeta (cold) Gunas of Vata.",
    sanskritReference: "Ruksha Khara Twacha (Ashtanga Hridaya 1.11)"
  },
  {
    id: "R_02_A2",
    questionId: "Q02_SKIN_NATURE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Warm, soft, flushed skin prone to moles and freckles manifests Ushna (hot) and Teekshna (sharp) Pitta Gunas.",
    sanskritReference: "Ushna Teekshna Twak Prabhata (Charaka Vimana 8.97)"
  },
  {
    id: "R_02_A3",
    questionId: "Q02_SKIN_NATURE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Thick, smooth, oily, supple skin embodies Snigdha (unctuous), Sheeta (cool), and Slakshna (smooth) Kapha qualities.",
    sanskritReference: "Snigdha Slakshna Gaur Twacha (Charaka Vimana 8.96)"
  },
  {
    id: "R_02_A4",
    questionId: "Q02_SKIN_NATURE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Neutral skin tone with seasonal variations indicates balanced cutaneous tissue (Rasa Dhatu).",
    sanskritReference: "Madhyama Twak"
  },

  // Q03 - Hair
  {
    id: "R_03_A1",
    questionId: "Q03_HAIR_TEXTURE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.90,
    explanation: "Dry, brittle, thin, easily knotted hair is driven by Ruksha and Chala properties of Vata.",
    sanskritReference: "Ruksha Alpa Kuntala (Sushruta Sharirasthana 4)"
  },
  {
    id: "R_03_A2",
    questionId: "Q03_HAIR_TEXTURE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Early graying (Palitya), thinning, or reddish tones result from internal Ushna (heat) characteristic of Pitta.",
    sanskritReference: "Khalitya Palitya Yukta (Charaka Vimana 8.97)"
  },
  {
    id: "R_03_A3",
    questionId: "Q03_HAIR_TEXTURE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Abundant, thick, lustrous, dark, wavy hair exhibits Snigdha, Sandra, and Guru Gunas of Kapha.",
    sanskritReference: "Snigdha Ghanakuntala (Charaka Vimana 8.96)"
  },
  {
    id: "R_03_A4",
    questionId: "Q03_HAIR_TEXTURE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Normal hair density and texture reflects balanced Asthi Dhatu and Mala metabolism.",
    sanskritReference: "Sama Kesha"
  },

  // Q04 - Eyes
  {
    id: "R_04_A1",
    questionId: "Q04_EYES_GAZE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.88,
    explanation: "Restless, quick-moving, slightly dry or dull eyes reflect Chala (mobile) and Ruksha (dry) Vata.",
    sanskritReference: "Chala Asphutita Netra (Charaka Vimana 8.98)"
  },
  {
    id: "R_04_A2",
    questionId: "Q04_EYES_GAZE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Sharp, penetrating, light-sensitive eyes with reddish tinges demonstrate Alochaka Pitta activity.",
    sanskritReference: "Tamra Netra Teekshna Drishti (Sushruta Sharira 4)"
  },
  {
    id: "R_04_A3",
    questionId: "Q04_EYES_GAZE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Large, luminous, calm eyes with clear white sclera and long lashes indicate Tarpaka Kapha unctuousness.",
    sanskritReference: "Rakta-Shukla Vibhakta Netra (Charaka Vimana 8.96)"
  },
  {
    id: "R_04_A4",
    questionId: "Q04_EYES_GAZE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Normal eye morphology without marked dryness, inflammation, or heaviness.",
    sanskritReference: "Sama Netra"
  },

  // Q05 - Joints
  {
    id: "R_05_A1",
    questionId: "Q05_JOINTS_FLEXIBILITY",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.94,
    explanation: "Popping, prominent, cracking joints signify diminished Shleshaka Kapha and elevated dry, rough Vata.",
    sanskritReference: "Sphutita Sandhi Sabda (Charaka Vimana 8.98)"
  },
  {
    id: "R_05_A2",
    questionId: "Q05_JOINTS_FLEXIBILITY",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.88,
    explanation: "Loose, warm joints susceptible to inflammation display the Sarata (fluidity) and Ushna qualities of Pitta.",
    sanskritReference: "Shithila Sandhi Ushna (Charaka Sutra 20)"
  },
  {
    id: "R_05_A3",
    questionId: "Q05_JOINTS_FLEXIBILITY",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Well-padded, noiseless, solid joints signify optimal Shleshaka Kapha synovial lubrication and Sthirata.",
    sanskritReference: "Gudha Sandhi Dridha (Charaka Vimana 8.96)"
  },
  {
    id: "R_05_A4",
    questionId: "Q05_JOINTS_FLEXIBILITY",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Symmetrical, quiet joint mechanics indicate balanced articular tissue.",
    sanskritReference: "Sama Sandhi"
  },

  // Q06 - Teeth & Gums
  {
    id: "R_06_A1",
    questionId: "Q06_TEETH_GUMS",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.88,
    explanation: "Irregular, crooked, thin teeth with receding gums signify deficient Asthi Dhatu nourished by dry Vata.",
    sanskritReference: "Visham Danta Ruksha (Charaka Vimana 8.98)"
  },
  {
    id: "R_06_A2",
    questionId: "Q06_TEETH_GUMS",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Soft, bleeding gums and yellowish tooth enamel reveal the acidic, hot, and liquid nature of Pitta.",
    sanskritReference: "Peeta Danta Dantamoola Rakta (Sushruta Sharira 4)"
  },
  {
    id: "R_06_A3",
    questionId: "Q06_TEETH_GUMS",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.94,
    explanation: "Large, white, strong, gleaming teeth set in sturdy gums demonstrate excellent Kapha and Asthi Sara.",
    sanskritReference: "Shukla Snigdha Danta (Charaka Vimana 8.96)"
  },
  {
    id: "R_06_A4",
    questionId: "Q06_TEETH_GUMS",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Average dental strength and gum tone.",
    sanskritReference: "Sama Danta"
  },

  // Q07 - Appetite & Agni
  {
    id: "R_07_A1",
    questionId: "Q07_APPETITE_METABOLISM",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.96,
    explanation: "Unpredictable, erratic appetite is the hallmark of Vishamagni caused by the unstable Chala Guna of Vata.",
    sanskritReference: "Vishamagni Vishama Koshtha (Ashtanga Hridaya Sharira 3)"
  },
  {
    id: "R_07_A2",
    questionId: "Q07_APPETITE_METABOLISM",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.96,
    explanation: "Sharp, intense, unforgiving hunger represents Tikshnagni driven by Pachaka Pitta's high digestive fire.",
    sanskritReference: "Tikshnagni Kshudha-Pipasa-Bahula (Charaka Vimana 8.97)"
  },
  {
    id: "R_07_A3",
    questionId: "Q07_APPETITE_METABOLISM",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.96,
    explanation: "Slow, steady, mild appetite represents Mandagni caused by the cold, heavy, and moist qualities of Kapha.",
    sanskritReference: "Mandagni Alpa Kanksha (Charaka Vimana 8.96)"
  },
  {
    id: "R_07_A4",
    questionId: "Q07_APPETITE_METABOLISM",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.70,
    explanation: "Predictable, balanced digestion corresponds to classical Samagni (ideal digestive equilibrium).",
    sanskritReference: "Samagni (Charaka Sutra 28)"
  },

  // Q08 - Digestion & Elimination
  {
    id: "R_08_A1",
    questionId: "Q08_DIGESTION_ELIMINATION",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.95,
    explanation: "Hard, dry stools and irregular elimination characterize Krura Koshtha under Apana Vata drying action.",
    sanskritReference: "Krura Koshtha (Ashtanga Hridaya Sutra 1.8)"
  },
  {
    id: "R_08_A2",
    questionId: "Q08_DIGESTION_ELIMINATION",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.95,
    explanation: "Frequent, soft, loose bowel movements define Mridu Koshtha due to the liquid (Sara/Drava) property of Pitta.",
    sanskritReference: "Mridu Koshtha (Ashtanga Hridaya Sutra 1.8)"
  },
  {
    id: "R_08_A3",
    questionId: "Q08_DIGESTION_ELIMINATION",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Regular, formed, oily, once-daily elimination corresponds to Madhyama Koshtha under Kapha stability.",
    sanskritReference: "Madhyama Koshtha (Ashtanga Hridaya Sutra 1.8)"
  },
  {
    id: "R_08_A4",
    questionId: "Q08_DIGESTION_ELIMINATION",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Neutral, predictable bowel habits indicate balanced gastrointestinal motility.",
    sanskritReference: "Sama Koshtha"
  },

  // Q09 - Thirst & Hydration
  {
    id: "R_09_A1",
    questionId: "Q09_THIRST_HYDRATION",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.90,
    explanation: "Variable thirst with a strong preference for warm beverages counteracts Vata's Sheeta (cold) nature.",
    sanskritReference: "Ushna Satmya (Charaka Sutra 6)"
  },
  {
    id: "R_09_A2",
    questionId: "Q09_THIRST_HYDRATION",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.95,
    explanation: "Intense, recurrent thirst and desire for chilled fluids arises from Pitta's high internal metabolic heat (Ushna).",
    sanskritReference: "Trishna-Prachura Sheeta-Kamata (Charaka Vimana 8.97)"
  },
  {
    id: "R_09_A3",
    questionId: "Q09_THIRST_HYDRATION",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.90,
    explanation: "Low thirst and natural fluid retention reflect Kapha's intrinsic watery (Ap/Jala) and unctuous composition.",
    sanskritReference: "Alpa Pipasa (Sushruta Sharira 4)"
  },
  {
    id: "R_09_A4",
    questionId: "Q09_THIRST_HYDRATION",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Standard hydration balance with no acute internal thirst disturbance.",
    sanskritReference: "Sama Pipasa"
  },

  // Q10 - Temperature Preference
  {
    id: "R_10_A1",
    questionId: "Q10_TEMPERATURE_PREFERENCE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.96,
    explanation: "Severe intolerance of cold, wind, and dry drafts directly evidences Vata's Sheeta and Chala Gunas.",
    sanskritReference: "Sheeta Asahishnu (Charaka Vimana 8.98)"
  },
  {
    id: "R_10_A2",
    questionId: "Q10_TEMPERATURE_PREFERENCE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.96,
    explanation: "Acute discomfort in heat, sun, and summer reflects Pitta's innate Ushna (hot) and Teekshna (sharp) nature.",
    sanskritReference: "Gharma Asahishnu (Charaka Vimana 8.97)"
  },
  {
    id: "R_10_A3",
    questionId: "Q10_TEMPERATURE_PREFERENCE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.94,
    explanation: "Aversion to cold, damp, rainy conditions arises because wet cold aggravates Kapha's Sheeta and Snigdha qualities.",
    sanskritReference: "Kleda Asahishnu (Charaka Vimana 8.96)"
  },
  {
    id: "R_10_A4",
    questionId: "Q10_TEMPERATURE_PREFERENCE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Resilient thermal homeostasis indicates well-equilibrated Doshas.",
    sanskritReference: "Sama Satmya"
  },

  // Q11 - Perspiration
  {
    id: "R_11_A1",
    questionId: "Q11_PERSPIRATION_SWEAT",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.90,
    explanation: "Scanty, minimal perspiration demonstrates the Ruksha (dry) nature of Vata constricting sweat channels.",
    sanskritReference: "Alpa Sweda (Charaka Vimana 8.98)"
  },
  {
    id: "R_11_A2",
    questionId: "Q11_PERSPIRATION_SWEAT",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.95,
    explanation: "Profuse, warm sweat with a strong or sour scent is the classical cardinal marker of Pitta Ushna and Visra Gunas.",
    sanskritReference: "Prabhuta Sweda Putigandhi (Charaka Vimana 8.97)"
  },
  {
    id: "R_11_A3",
    questionId: "Q11_PERSPIRATION_SWEAT",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.90,
    explanation: "Slow-to-start, moderate, pleasant-smelling perspiration reflects Kapha's dense, cool, and steady nature.",
    sanskritReference: "Mandasweda (Sushruta Sharira 4)"
  },
  {
    id: "R_11_A4",
    questionId: "Q11_PERSPIRATION_SWEAT",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Equilibrated sweat excretion (Sweda Mala) proportional to physical exertion.",
    sanskritReference: "Sama Sweda"
  },

  // Q12 - Sleep Pattern
  {
    id: "R_12_A1",
    questionId: "Q12_SLEEP_PATTERN",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.94,
    explanation: "Light, interrupted, restless sleep (Alpanidra / Anidra) results from Vata's Chala (mobile) mind agitation.",
    sanskritReference: "Alpanidra Jagarana (Charaka Vimana 8.98)"
  },
  {
    id: "R_12_A2",
    questionId: "Q12_SLEEP_PATTERN",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Moderate, sound sleep with high wakefulness upon rising is characteristic of focused Pitta metabolism.",
    sanskritReference: "Madhyama Nidra (Charaka Sutra 21)"
  },
  {
    id: "R_12_A3",
    questionId: "Q12_SLEEP_PATTERN",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.96,
    explanation: "Deep, prolonged, heavy sleep with difficulty rising exemplifies Kapha's Tamo-bhuyishtha and Guru Gunas.",
    sanskritReference: "Mahat Nidra Swapnashila (Charaka Vimana 8.96)"
  },
  {
    id: "R_12_A4",
    questionId: "Q12_SLEEP_PATTERN",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Restorative, natural 7-8 hour sleep cycle indicates balanced mental doshas (Sattva).",
    sanskritReference: "Sama Nidra"
  },

  // Q13 - Dreams
  {
    id: "R_13_A1",
    questionId: "Q13_DREAMS_THEMES",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.88,
    explanation: "Dreams of sky, flying, falling, wandering, or running express Vata's connection to Akasha and Vayu elements.",
    sanskritReference: "Akasha Gamana Swapna (Charaka Indriyasthana 5)"
  },
  {
    id: "R_13_A2",
    questionId: "Q13_DREAMS_THEMES",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Dreams of fire, solar rays, lightning, gold, and confrontations mirror Agni Mahabhuta and Pitta sharpness.",
    sanskritReference: "Agni Deepa Swapna (Charaka Indriyasthana 5)"
  },
  {
    id: "R_13_A3",
    questionId: "Q13_DREAMS_THEMES",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Dreams of tranquil lakes, oceans, lotus flowers, clouds, and gentle birds embody Jala and Prithvi elements.",
    sanskritReference: "Jalashaya Kamala Swapna (Charaka Indriyasthana 5)"
  },
  {
    id: "R_13_A4",
    questionId: "Q13_DREAMS_THEMES",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Grounded, neutral dream content reflecting mundane memory integration.",
    sanskritReference: "Sama Swapna"
  },

  // Q14 - Physical Activity Pace
  {
    id: "R_14_A1",
    questionId: "Q14_PHYSICAL_ACTIVITY_PACE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.94,
    explanation: "Brisk, restless walking and frequent shifting movements manifest Chala (mobile) Vata Guna directly.",
    sanskritReference: "Sheeghra Chala Gati (Charaka Vimana 8.98)"
  },
  {
    id: "R_14_A2",
    questionId: "Q14_PHYSICAL_ACTIVITY_PACE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Purposeful, sharp, assertive movement reflects the intense and direct intentionality of Pitta.",
    sanskritReference: "Teekshna Gati (Sushruta Sharira 4)"
  },
  {
    id: "R_14_A3",
    questionId: "Q14_PHYSICAL_ACTIVITY_PACE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.94,
    explanation: "Slow, graceful, grounded, patient movement demonstrates Manda (slow) and Guru (heavy) Kapha.",
    sanskritReference: "Manda Gati Dhira (Charaka Vimana 8.96)"
  },
  {
    id: "R_14_A4",
    questionId: "Q14_PHYSICAL_ACTIVITY_PACE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Adaptive movement tempo responding appropriately to context.",
    sanskritReference: "Sama Gati"
  },

  // Q15 - Energy & Stamina
  {
    id: "R_15_A1",
    questionId: "Q15_ENERGY_STAMINA",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.92,
    explanation: "Sudden bursts of vitality followed by swift fatigue highlight Vata's lack of physical endurance (Alpa Bala).",
    sanskritReference: "Alpa Bala Sheegratama Shrama (Charaka Vimana 8.98)"
  },
  {
    id: "R_15_A2",
    questionId: "Q15_ENERGY_STAMINA",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Intense, competitive, goal-oriented stamina driven by willpower demonstrates Madhyama Bala of Pitta.",
    sanskritReference: "Madhyama Bala (Charaka Vimana 8.97)"
  },
  {
    id: "R_15_A3",
    questionId: "Q15_ENERGY_STAMINA",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Enduring, stable physical stamina and high resistance to fatigue exemplify Uttama Bala (supreme vigor) of Kapha.",
    sanskritReference: "Maha Bala Sthira (Charaka Vimana 8.96)"
  },
  {
    id: "R_15_A4",
    questionId: "Q15_ENERGY_STAMINA",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Steady energy sustained across standard daily activities.",
    sanskritReference: "Sama Bala"
  },

  // Q16 - Speech
  {
    id: "R_16_A1",
    questionId: "Q16_SPEECH_COMMUNICATION",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.92,
    explanation: "Fast, wandering, talkative, breathless speech stems from Udana Vata moving quickly across the vocal chords.",
    sanskritReference: "Pralapinam Sheeghra Vak (Charaka Vimana 8.98)"
  },
  {
    id: "R_16_A2",
    questionId: "Q16_SPEECH_COMMUNICATION",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Articulate, sharp, convincing, and commanding speech embodies the Teekshna and Medhavi qualities of Pitta.",
    sanskritReference: "Vagmi Teekshna Vak (Charaka Vimana 8.97)"
  },
  {
    id: "R_16_A3",
    questionId: "Q16_SPEECH_COMMUNICATION",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.94,
    explanation: "Deep, measured, melodious, calm vocal resonance reflects the Gambhira and Snigdha qualities of Kapha.",
    sanskritReference: "Gambhira Snigdha Vak (Charaka Vimana 8.96)"
  },
  {
    id: "R_16_A4",
    questionId: "Q16_SPEECH_COMMUNICATION",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Clear and balanced communication cadence.",
    sanskritReference: "Sama Vak"
  },

  // Q17 - Learning & Memory
  {
    id: "R_17_A1",
    questionId: "Q17_LEARNING_MEMORY",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.94,
    explanation: "Fast to grasp initially but quick to forget without revision (Sheeghra Grahi, Sheeghra Smriti-Hrasa).",
    sanskritReference: "Sheeghra Grahi Alpa Smriti (Charaka Vimana 8.98)"
  },
  {
    id: "R_17_A2",
    questionId: "Q17_LEARNING_MEMORY",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Sharp intellectual comprehension and logical structured memory reflect high Medha and Pitta brilliance.",
    sanskritReference: "Medhavi Teekshna Buddhi (Charaka Vimana 8.97)"
  },
  {
    id: "R_17_A3",
    questionId: "Q17_LEARNING_MEMORY",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Methodical, deliberate to learn initially but holding permanent lifelong recall (Chira Smriti).",
    sanskritReference: "Chira Grahi Dridha Smriti (Charaka Vimana 8.96)"
  },
  {
    id: "R_17_A4",
    questionId: "Q17_LEARNING_MEMORY",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Balanced cognitive grasp (Dhi), retention (Dhriti), and recall (Smriti).",
    sanskritReference: "Sama Buddhi"
  },

  // Q18 - Stress Response
  {
    id: "R_18_A1",
    questionId: "Q18_STRESS_RESPONSE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.95,
    explanation: "Anxiety, worry, racing thoughts, and fear (Bhaya) are prime psychic manifestations of elevated Vata.",
    sanskritReference: "Bhaya Shoka Bahula (Charaka Vimana 8.98)"
  },
  {
    id: "R_18_A2",
    questionId: "Q18_STRESS_RESPONSE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.95,
    explanation: "Irritability, anger, frustration, and critical outbursts represent Krodha triggered by fiery Pitta.",
    sanskritReference: "Krodha Dwesha Bahula (Charaka Vimana 8.97)"
  },
  {
    id: "R_18_A3",
    questionId: "Q18_STRESS_RESPONSE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Withdrawal, resistance to change, procrastination, and denial stem from Kapha Tamas and Sthirata.",
    sanskritReference: "Akarodha Alpa Samvega (Charaka Vimana 8.96)"
  },
  {
    id: "R_18_A4",
    questionId: "Q18_STRESS_RESPONSE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.65,
    explanation: "Emotional poise and resilience indicate high Sattva Guna and doshic equilibrium.",
    sanskritReference: "Prashanta Manas"
  },

  // Q19 - Work & Project Style
  {
    id: "R_19_A1",
    questionId: "Q19_WORK_PROJECT_STYLE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.90,
    explanation: "Creative ideation, initiating multiple tasks quickly with fluctuating follow-through mirrors Vata mobility.",
    sanskritReference: "Sheeghra Samarambha (Sushruta Sharira 4)"
  },
  {
    id: "R_19_A2",
    questionId: "Q19_WORK_PROJECT_STYLE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Ambitious, systematic leadership, strict adherence to deadlines and execution reflect Tejas and Pitta.",
    sanskritReference: "Udyoga Vikrama Yukta (Charaka Vimana 8.97)"
  },
  {
    id: "R_19_A3",
    questionId: "Q19_WORK_PROJECT_STYLE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Methodical perseverance, patient routine maintenance, and dependable task completion reflect Kapha stability.",
    sanskritReference: "Dridha Nishchaya (Charaka Vimana 8.96)"
  },
  {
    id: "R_19_A4",
    questionId: "Q19_WORK_PROJECT_STYLE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Versatile project execution with balanced planning and implementation skills.",
    sanskritReference: "Sama Karma"
  },

  // Q20 - Financial Habits
  {
    id: "R_20_A1",
    questionId: "Q20_FINANCIAL_HABITS",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.88,
    explanation: "Impulsive spending on immediate desires and erratic savings reflect Chala (mobile) Vata non-attachment.",
    sanskritReference: "Sheeghra Vyaya (Charaka Vimana 8.98)"
  },
  {
    id: "R_20_A2",
    questionId: "Q20_FINANCIAL_HABITS",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Strategic expenditure on quality, status, and calculated investments highlights Pitta's discerning intellect.",
    sanskritReference: "Madhyama Vyaya Vidhivat (Charaka Vimana 8.97)"
  },
  {
    id: "R_20_A3",
    questionId: "Q20_FINANCIAL_HABITS",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Consistent accumulation, conservative saving, and careful preservation of wealth mirror Kapha's Sanchaya propensity.",
    sanskritReference: "Dhana Sanchayi (Charaka Vimana 8.96)"
  },
  {
    id: "R_20_A4",
    questionId: "Q20_FINANCIAL_HABITS",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Prudent financial balance between expenditure and savings.",
    sanskritReference: "Sama Dhana"
  },

  // Q21 - Routine Preference
  {
    id: "R_21_A1",
    questionId: "Q21_ROUTINE_PREFERENCE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.90,
    explanation: "Craving for spontaneity and resistance to rigid daily routines exemplifies Vata's Anavasthitatva (unsteadiness).",
    sanskritReference: "Anavasthita Mati (Charaka Vimana 8.98)"
  },
  {
    id: "R_21_A2",
    questionId: "Q21_ROUTINE_PREFERENCE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.90,
    explanation: "Need for organized, structured, goal-directed scheduling showcases Pitta's disciplined clarity.",
    sanskritReference: "Kala Niyamita (Charaka Vimana 8.97)"
  },
  {
    id: "R_21_A3",
    questionId: "Q21_ROUTINE_PREFERENCE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Deep comfort in familiar, predictable routines and reluctance to pivot demonstrates Kapha's Sthirata (fixity).",
    sanskritReference: "Sthira Achala (Charaka Vimana 8.96)"
  },
  {
    id: "R_21_A4",
    questionId: "Q21_ROUTINE_PREFERENCE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.60,
    explanation: "Harmonious balance between discipline and flexibility.",
    sanskritReference: "Sama Charya"
  },

  // Q22 - Taste Preference
  {
    id: "R_22_A1",
    questionId: "Q22_TASTE_PREFERENCE",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.92,
    explanation: "Craving sweet, sour, and salty (Madhura, Amla, Lavana) tastes is the body's natural innate strategy to pacify Vata.",
    sanskritReference: "Madhur-Amla-Lavanaih Vatam Shamayati (Ashtanga Hridaya Sutra 1.14)"
  },
  {
    id: "R_22_A2",
    questionId: "Q22_TASTE_PREFERENCE",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.92,
    explanation: "Preference for sweet, bitter, and astringent (Madhura, Tikta, Kashaya) tastes acts to soothe inflammatory Pitta heat.",
    sanskritReference: "Tikta-Kashaya-Madhuraih Pittam Shamayati (Ashtanga Hridaya Sutra 1.14)"
  },
  {
    id: "R_22_A3",
    questionId: "Q22_TASTE_PREFERENCE",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.92,
    explanation: "Gravitation toward pungent, bitter, and astringent (Katu, Tikta, Kashaya) flavors dries and lightens heavy Kapha.",
    sanskritReference: "Kashaya-Katu-Tiktakaih Kapham Shamayati (Ashtanga Hridaya Sutra 1.14)"
  },
  {
    id: "R_22_A4",
    questionId: "Q22_TASTE_PREFERENCE",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.70,
    explanation: "Enjoyment of all six tastes (Shad Rasa) indicates optimal gustatory balance (Sama Rasa Satmya).",
    sanskritReference: "Shad Rasa Samata (Charaka Sutra 26)"
  },

  // Q23 - Weather Discomfort
  {
    id: "R_23_A1",
    questionId: "Q23_WEATHER_DISCOMFORT",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.95,
    explanation: "Aggravation during dry, cold, windy late autumn / winter (Hemanta/Shishira) aligns with Vata Prakopa periods.",
    sanskritReference: "Varsha Hemanta Vata Prakopa (Charaka Sutra 6)"
  },
  {
    id: "R_23_A2",
    questionId: "Q23_WEATHER_DISCOMFORT",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.95,
    explanation: "Vulnerability to blazing midsummer heat and autumn sun (Grishma/Sharad) matches classical Pitta Prakopa.",
    sanskritReference: "Grishma Sharad Pitta Prakopa (Charaka Sutra 6)"
  },
  {
    id: "R_23_A3",
    questionId: "Q23_WEATHER_DISCOMFORT",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.95,
    explanation: "Lethargy and congestion in damp late winter / spring (Vasanta) corresponds directly to Kapha Prakopa season.",
    sanskritReference: "Vasanta Kapha Prakopa (Charaka Sutra 6)"
  },
  {
    id: "R_23_A4",
    questionId: "Q23_WEATHER_DISCOMFORT",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.65,
    explanation: "Seamless seasonal acclimatization demonstrates high Ojas and biological resilience.",
    sanskritReference: "Ritu Satmya (Charaka Sutra 6)"
  },

  // Q24 - Pulse Analogy
  {
    id: "R_24_A1",
    questionId: "Q24_PULSE_RHYTHM_MOVEMENT",
    answerId: "A1",
    doshaEffects: [{ dosha: "VATA", weight: 3 }],
    confidence: 0.94,
    explanation: "Serpentine, quick, thready pulse movement (Sarpa Gati / Vakra Gati) is the classical radial pulse hallmark of Vata.",
    sanskritReference: "Vatena Vakra Sarpa Gati (Sharngadhara Samhita Purvakhanda 3)"
  },
  {
    id: "R_24_A2",
    questionId: "Q24_PULSE_RHYTHM_MOVEMENT",
    answerId: "A2",
    doshaEffects: [{ dosha: "PITTA", weight: 3 }],
    confidence: 0.94,
    explanation: "Bounding, prominent, jumping pulse movement (Manduka Gati / frog leap) represents the elevated pulse pressure of Pitta.",
    sanskritReference: "Pittena Manduka Gati (Sharngadhara Samhita Purvakhanda 3)"
  },
  {
    id: "R_24_A3",
    questionId: "Q24_PULSE_RHYTHM_MOVEMENT",
    answerId: "A3",
    doshaEffects: [{ dosha: "KAPHA", weight: 3 }],
    confidence: 0.94,
    explanation: "Broad, slow, graceful, gliding pulse movement (Hamsa Gati / swan glide) reflects the deep heavy volume of Kapha.",
    sanskritReference: "Kaphena Hamsa Gati (Sharngadhara Samhita Purvakhanda 3)"
  },
  {
    id: "R_24_A4",
    questionId: "Q24_PULSE_RHYTHM_MOVEMENT",
    answerId: "A4",
    doshaEffects: [{ dosha: "VATA", weight: 1 }, { dosha: "PITTA", weight: 1 }, { dosha: "KAPHA", weight: 1 }],
    confidence: 0.70,
    explanation: "Even, steady radial pulsation reflecting harmonious tridoshic circulatory tone.",
    sanskritReference: "Sama Nadi Gati"
  }
];
