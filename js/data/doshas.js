/**
 * Ayurvedic Expert System - Ontological Knowledge Base (Enhanced)
 * Supports 10-Class Directional Prakriti, Agni States, Koshtha Motility,
 * and Manasika Guna Archetypes.
 */

export const DOSHA_DETAILS = {
  VATA: {
    name: "Vata",
    sanskritName: "वात",
    elements: ["Vayu (Air)", "Akasha (Ether/Space)"],
    principle: "Kinetic Energy & Biological Movement",
    qualities: ["Dry (Ruksha)", "Light (Laghu)", "Cold (Sheeta)", "Rough (Khara)", "Subtle (Sukshma)", "Mobile (Chala)"],
    seat: "Colon (Pakvashaya), pelvic cavity, thighs, ears, bones, skin",
    color: "#5AA7DE",
    symbol: "💨",
    keyFunctions: [
      "Initiates and coordinates all somatic motor movements (Cheshta)",
      "Controls respiratory rhythm (Prana/Udana) and nervous impulse conduction",
      "Drives speech, mental sensory inputs, and cellular division",
      "Executes waste excretion (stool, urine, menstruation) through Apana"
    ],
    governingSutra: "तत्र रूक्षो लघुः शीतो खरः सूक्ष्मश्चलोऽनिलः (Ashtanga Hridaya Sutra 1.11)"
  },
  PITTA: {
    name: "Pitta",
    sanskritName: "पित्त",
    elements: ["Agni (Fire)", "Jala (Water)"],
    principle: "Thermal Energy, Biotransformation & Metabolism",
    qualities: ["Hot (Ushna)", "Sharp (Teekshna)", "Light (Laghu)", "Slightly Oily (Sasneha)", "Liquid (Sara/Drava)", "Spreading (Visra)"],
    seat: "Small intestine (Grahani), stomach, sweat, sebaceous glands, blood, eyes, skin",
    color: "#F06A38",
    symbol: "🔥",
    keyFunctions: [
      "Drives enzymatic digestion and nutrient breakdown (Pachaka Agni)",
      "Maintains internal body temperature and metabolic calorigenesis",
      "Synthesizes vision, visual processing, and ocular discernment (Alochaka)",
      "Governs skin radiance, intellect, courage, and cognitive digestion (Sadhaka)"
    ],
    governingSutra: "पित्तं सस्नेहतीक्ष्णोष्णं लघु विस्रं सरं द्रवम् (Ashtanga Hridaya Sutra 1.11)"
  },
  KAPHA: {
    name: "Kapha",
    sanskritName: "कफ",
    elements: ["Prithvi (Earth)", "Jala (Water)"],
    principle: "Structural Cohesion, Anabolism & Homeostatic Lubrication",
    qualities: ["Heavy (Guru)", "Cold (Sheeta)", "Soft (Mridu)", "Oily (Snigdha)", "Sweet (Madhura)", "Stable (Sthira)", "Slimy (Picchila)"],
    seat: "Chest (Uras), throat, head, trachea, joints, stomach, plasma, fat tissue",
    color: "#45BF7A",
    symbol: "💧",
    keyFunctions: [
      "Provides musculoskeletal structural integrity and tissue mass (Dhatu Vardhana)",
      "Lubricates joint articulation through synovial fluids (Shleshaka)",
      "Protects mucous linings against gastric acid and abrasion (Kledaka)",
      "Cultivates immunological resilience (Ojas / Bala), patience, and emotional grounding"
    ],
    governingSutra: "स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः (Ashtanga Hridaya Sutra 1.12)"
  }
};

export const PRAKRITI_PROFILES = {
  // --- EKADOSHAJA (PURE SINGLE DOSHA) ---
  VATA: {
    type: "Ekadoshaja (Single-Dosha)",
    title: "Pure Vata Dominant Prakriti",
    sanskritTitle: "शुद्ध वातज प्रकृति",
    dominantDoshas: ["VATA"],
    primaryDosha: "VATA",
    secondaryDosha: null,
    tagline: "The Quick, Creative, and Agile Pioneer",
    description: "Your responses reflect a decisive single-dosha predominance of Vata. In classical Ayurvedic ontology, Vata individuals are defined by swift movement, agile cognition, exceptional creative imagination, and responsive sensitivity. Your physical frame is naturally slender, your skin tends toward coolness and dryness, and your metabolic rhythms ebb and flow dynamically.",
    strengths: [
      "Exceptional creative ideation, originality, and artistic intuition",
      "Fast mental grasp, flexibility, and adaptable perspective",
      "High natural kinetic agility and quick physical reflexes",
      "Enthusiastic communicator and spontaneous visionary"
    ],
    vulnerabilities: [
      "Tendency toward irregular digestion (Vishamagni) and abdominal gas",
      "High susceptibility to cold, windy climates and dry joint stiffness",
      "Mental overwhelm, anxiety, or light restless sleep when ungrounded",
      "Sudden energy depletion and crashes from overexertion"
    ],
    dietaryGuidelines: [
      "Favor warm, moist, unctuous, freshly cooked hearty meals",
      "Emphasize Sweet, Sour, and Salty tastes (Madhura, Amla, Lavana)",
      "Incorporate ghee, sesame oil, root vegetables, warm stews, and warming spices",
      "Strictly avoid raw cold salads, ice water, and dry crackers"
    ],
    lifestylePractices: [
      "Establish a steady, calming daily routine (Dinacharya) with consistent sleep times",
      "Warm sesame oil self-massage (Abhyanga) before morning bathing",
      "Gentle, grounding movement like slow Hatha yoga and Nadi Shodhana pranayama",
      "Keep body insulated and protected from cold drafts"
    ],
    ayushCitation: "AYUSH Ayusoft: Vata Prakriti manifests lightness, dryness, and kinetic variability as core attributes."
  },

  PITTA: {
    type: "Ekadoshaja (Single-Dosha)",
    title: "Pure Pitta Dominant Prakriti",
    sanskritTitle: "शुद्ध पित्तज प्रकृति",
    dominantDoshas: ["PITTA"],
    primaryDosha: "PITTA",
    secondaryDosha: null,
    tagline: "The Visionary, Dynamic, and Discerning Achiever",
    description: "Your responses demonstrate an unequivocal predominance of Pitta dosha. Governed by Agni (fire), Pitta manifests as razor-sharp intellect, articulate leadership, formidable metabolic calorigenesis, and purposeful focus. You possess a symmetrical athletic build, warm skin, voracious digestion, and a relentless drive for efficiency.",
    strengths: [
      "Sharp, penetrating intellect, logic, and analytical problem-solving",
      "Natural organizational leadership, clarity, and unwavering determination",
      "Robust digestive power (Tikshnagni) and efficient cellular metabolism",
      "Articulate, persuasive, and commanding speech"
    ],
    vulnerabilities: [
      "Prone to hyperacidity, skin redness, flushing, and inflammatory flare-ups",
      "Intolerance to intense midday heat and direct summer sun",
      "Irritability, impatience, or critical perfectionism under pressure",
      "Tendency to burn out from relentless over-work"
    ],
    dietaryGuidelines: [
      "Favor cooling, moderately dense, fresh foods at regular scheduled intervals",
      "Emphasize Sweet, Bitter, and Astringent tastes (Madhura, Tikta, Kashaya)",
      "Enjoy cooling fruits (melons, pears), basmati rice, coconut water, cucumber, and mint",
      "Reduce excessively spicy peppers, sour fermented foods, vinegar, and deep-fried snacks"
    ],
    lifestylePractices: [
      "Seek calm, cool, pleasant, unhurried environments; swim or take evening walks",
      "Cooling coconut oil massage to calm internal metabolic fire",
      "Cultivate contentment and non-competitive recreation; practice Sheetali Pranayama",
      "Avoid intense heated arguments during mealtimes"
    ],
    ayushCitation: "AYUSH Ayusoft: Pitta Prakriti manifests sharp thermogenic and metabolic traits under Agni predominance."
  },

  KAPHA: {
    type: "Ekadoshaja (Single-Dosha)",
    title: "Pure Kapha Dominant Prakriti",
    sanskritTitle: "शुद्ध कफज प्रकृति",
    dominantDoshas: ["KAPHA"],
    primaryDosha: "KAPHA",
    secondaryDosha: null,
    tagline: "The Grounded, Loyal, and Nurturing Anchor",
    description: "Your responses show a decisive predominance of Kapha dosha. Rooted in earth and water, Kapha embodies musculoskeletal stability, deep physical endurance, calm emotional grounding, and great loyalty. You possess a sturdy, solid skeletal build, smooth luminous skin, abundant lustrous hair, and steady, unflappable patience.",
    strengths: [
      "Exceptional natural immunity (Ojas), physical stamina, and structural vigor",
      "Profound emotional loyalty, patience, empathy, and serene tolerance",
      "Crystalline lifelong memory retention and methodical execution",
      "Graceful, smooth, and resilient musculoskeletal constitution"
    ],
    vulnerabilities: [
      "Sluggish metabolism (Mandagni), fluid retention, and weight gain",
      "Prone to lethargy, excess morning drowsiness, and respiratory mucus",
      "Emotional reluctance to embrace change, possessiveness, or procrastination",
      "Depleted by cold, damp, cloudy weather"
    ],
    dietaryGuidelines: [
      "Favor light, warm, dry, spicy, stimulating meals with fresh steamed vegetables",
      "Emphasize Pungent, Bitter, and Astringent tastes (Katu, Tikta, Kashaya)",
      "Incorporate ginger, black pepper, turmeric, lentils, barley, and raw unheated honey",
      "Minimize heavy sweets, dense dairy, oily fried foods, and chilled desserts"
    ],
    lifestylePractices: [
      "Engage in vigorous daily cardiovascular workouts and stimulating Surya Namaskar",
      "Dry powder massage (Udvartana) or dry brushing to stimulate lymphatic flow",
      "Wake early before sunrise; strictly avoid daytime naps that induce heaviness",
      "Seek mental novelty, spontaneous adventures, and regular active challenges"
    ],
    ayushCitation: "AYUSH Ayusoft: Kapha Prakriti embodies stability, unctuousness, and structural endurance."
  },

  // --- DVANDVAJA: VATA-PITTA / PITTA-VATA ---
  VATA_PITTA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Vata-Pitta Prakriti (Vata Leading)",
    sanskritTitle: "वात-प्रधान पित्तज प्रकृति",
    dominantDoshas: ["VATA", "PITTA"],
    primaryDosha: "VATA",
    secondaryDosha: "PITTA",
    tagline: "The Quick Creative Innovator with Sharp Execution",
    description: "Your assessment reveals a dual-dosha constitution led by Vata with strong secondary Pitta. Your core nature is visionary, agile, and creative (Vata), channeled into organized, sharp, and purposeful execution (Pitta). You are naturally slender, quick on your feet, and intellectually fast.",
    strengths: [
      "Bridges creative conceptual ideation with tactical implementation skills",
      "Fast learning speed, quick linguistic dexterity, and persuasive charisma",
      "High entrepreneurial enthusiasm and intellectual versatility",
      "Naturally energetic and goal-directed"
    ],
    vulnerabilities: [
      "High risk of nervous exhaustion and insomnia when overscheduled",
      "Appetite oscillates between skipping meals and sudden hyperacidic hunger",
      "Sensitivity to both freezing winds (Vata) and sweltering summer heat (Pitta)",
      "Stress manifests as acute anxiety quickly pivoting into irritable frustration"
    ],
    dietaryGuidelines: [
      "Prioritize regular, soothing meals with nourishing, room-temperature to warm whole foods",
      "Emphasize Sweet taste, followed by moderate Bitter and Astringent flavors",
      "Use moderate healthy oils (ghee, olive oil) while avoiding extreme hot chili spices",
      "Stay hydrated with lukewarm fennel, licorice, and coriander tea"
    ],
    lifestylePractices: [
      "Anchor your agile mind with a structured, restful evening wind-down routine",
      "Alternate cooling practices in summer with warming practices in winter",
      "Practice mindful non-competitive yoga to prevent mental and physical strain",
      "Schedule deliberate downtime between intense work sprints"
    ],
    ayushCitation: "AYUSH Ayusoft: Dual Prakritis reflect composite physiological dynamics governed by two co-dominant doshas."
  },

  PITTA_VATA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Pitta-Vata Prakriti (Pitta Leading)",
    sanskritTitle: "पित्त-प्रधान वातज प्रकृति",
    dominantDoshas: ["PITTA", "VATA"],
    primaryDosha: "PITTA",
    secondaryDosha: "VATA",
    tagline: "The Sharp Strategist with Dynamic Agility",
    description: "Your assessment reveals a dual-dosha constitution led by Pitta with strong secondary Vata. Your core drive is ambitious, analytical, and goal-oriented (Pitta), supercharged by fast kinetic agility and conceptual speed (Vata). You possess an athletic build with sharp features, intense focus, and high productivity.",
    strengths: [
      "Strategic clarity combined with rapid prototyping and execution",
      "High intellectual discernment, debate ability, and leadership drive",
      "Strong metabolism that handles demanding schedules with determination",
      "Innovative problem solver who demands excellence"
    ],
    vulnerabilities: [
      "Prone to sudden burnout from pushing the nervous system too hard",
      "Digestive hyperacidity paired with bloating if meals are delayed",
      "Impatience with slower coworkers; prone to critical irritability",
      "Skin easily flushes or develops stress-related hives and dry patches"
    ],
    dietaryGuidelines: [
      "Emphasize cooling, grounding, whole foods: basmati rice, sweet fruits, ghee, and coconut",
      "Favor Sweet, Bitter, and Astringent tastes; reduce acidic citrus, alcohol, and fermented foods",
      "Eat in calm, quiet settings without screens or intense debates",
      "Ensure adequate hydration to soothe metabolic heat and cellular dryness"
    ],
    lifestylePractices: [
      "Practice grounding meditation, slow deep breathing, and cooling Sheetali pranayama",
      "Moderate your workout intensity; favor swimming and moonlit walks over intense competitions",
      "Establish strict work boundaries to prevent late-night insomnia",
      "Use cooling coconut or brahmi oil on scalp and feet before sleep"
    ],
    ayushCitation: "AYUSH Ayusoft: Directional dual-dosha profiles prioritize the leading dosha in therapeutic dietetics."
  },

  // --- DVANDVAJA: PITTA-KAPHA / KAPHA-PITTA ---
  PITTA_KAPHA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Pitta-Kapha Prakriti (Pitta Leading)",
    sanskritTitle: "पित्त-प्रधान कफज प्रकृति",
    dominantDoshas: ["PITTA", "KAPHA"],
    primaryDosha: "PITTA",
    secondaryDosha: "KAPHA",
    tagline: "The Powerful Leader — Dynamic Will with Unshakable Endurance",
    description: "Your assessment reveals a dual-dosha constitution led by Pitta with strong secondary Kapha. You blend the transformative fire, intellect, and ambition of Pitta with the physical strength, grounding, and steady endurance of Kapha. You possess an athletic muscular frame, powerful stamina, and commanding executive presence.",
    strengths: [
      "Exceptional physical stamina combined with razor-sharp strategic focus",
      "High natural immunity, metabolic strength, and disease resistance",
      "Charismatic leadership style that balances decisive drive with patient follow-through",
      "Consistent, powerful digestive power"
    ],
    vulnerabilities: [
      "Prone to inflammatory conditions coupled with lymphatic stagnation if diet is heavy",
      "Can exhibit intense competitiveness, stubbornness, or authoritarian tendencies",
      "Discomfort in warm, humid weather",
      "Weight gain can occur if physical intensity drops while appetite remains high"
    ],
    dietaryGuidelines: [
      "Favor light, fresh, moderately spiced, cooling whole foods",
      "Emphasize Bitter and Astringent tastes, with light Pungent and Sweet",
      "Abundant leafy greens, cruciferous vegetables, lentils, and cooling herbs",
      "Limit rich dairy, oily fried foods, heavy red meat, and refined sugars"
    ],
    lifestylePractices: [
      "Maintain consistent, challenging daily workouts to prevent metabolic sluggishness",
      "Cultivate humility, playfulness, and emotional flexibility",
      "Avoid prolonged exposure to humid hot climates",
      "Light dinners to ensure digestive completion before sleep"
    ],
    ayushCitation: "AYUSH Ayusoft: Pitta-Kapha constitution exhibits harmonious blending of Agni transformation and Soma cohesion."
  },

  KAPHA_PITTA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Kapha-Pitta Prakriti (Kapha Leading)",
    sanskritTitle: "कफ-प्रधान पित्तज प्रकृति",
    dominantDoshas: ["KAPHA", "PITTA"],
    primaryDosha: "KAPHA",
    secondaryDosha: "PITTA",
    tagline: "The Resilient Pillar — Grounded Stability with Focused Drive",
    description: "Your assessment reveals a dual-dosha constitution led by Kapha with strong secondary Pitta. Your foundational nature is solid, grounded, calm, and loyal (Kapha), ignited by the focused intellect, courage, and warmth of Pitta. You have a solid, sturdy frame, reliable stamina, and excellent composure under pressure.",
    strengths: [
      "Immense physical and emotional endurance coupled with clear analytical insight",
      "Deeply dependable, compassionate leadership style that commands natural respect",
      "Steady, robust metabolic balance that resists external stressors",
      "Patient long-range strategic vision with the capability to execute thoroughly"
    ],
    vulnerabilities: [
      "Slow initial motivation; can resist changes to comfortable habits",
      "Prone to water retention, sluggish digestion, or localized inflammatory heat",
      "Tendency to hold onto grievances or stubborn viewpoints",
      "Struggles in humid, warm, or damp seasonal shifts"
    ],
    dietaryGuidelines: [
      "Favor warm, light, zestful, easily digestible meals with moderate spices",
      "Emphasize Pungent, Bitter, and Astringent tastes",
      "Incorporate ginger, black pepper, turmeric, light grains (quinoa, millet), and steamed greens",
      "Strictly avoid heavy cheese, rich creamy sauces, ice cream, and deep-fried foods"
    ],
    lifestylePractices: [
      "Engage in vigorous morning exercise (running, cycling, dynamic vinyasa yoga)",
      "Rise early before dawn; embrace active challenges and dynamic projects",
      "Dry brushing or udvartana herbal powder massage to mobilize lymphatic fluid",
      "Cultivate spontaneous creative activities outside routine work"
    ],
    ayushCitation: "AYUSH Ayusoft: Kapha-Pitta individuals possess supreme physical endurance tempered by metabolic warmth."
  },

  // --- DVANDVAJA: VATA-KAPHA / KAPHA-VATA ---
  VATA_KAPHA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Vata-Kapha Prakriti (Vata Leading)",
    sanskritTitle: "वात-प्रधान कफज प्रकृति",
    dominantDoshas: ["VATA", "KAPHA"],
    primaryDosha: "VATA",
    secondaryDosha: "KAPHA",
    tagline: "The Imaginative Guardian — Intuitive Vision with Gentle Grace",
    description: "Your assessment reveals a dual-dosha constitution led by Vata with strong secondary Kapha. While opposite in mobility and mass, they share the primary quality of Sheeta (coldness). You blend Vata's creative, intuitive imagination with Kapha's gentle compassion and deep loyalty. You need consistent warmth and internal nourishment.",
    strengths: [
      "Harmonious blend of conceptual imagination and emotional warmth",
      "Gentle, diplomatic, considerate, and loyal interpersonal nature",
      "Capacity for patient endurance interspersed with creative bursts",
      "Natural artistic sensitivity and musical/verbal appreciation"
    ],
    vulnerabilities: [
      "High sensitivity to cold weather, winter drafts, and air-conditioning",
      "Digestive fire (Agni) can be low and erratic, predisposing to bloating and sluggishness",
      "Prone to joint stiffness, fluid retention, or sudden mood oscillations",
      "May hesitate to take decisive risks, caught between restlessness and comfort"
    ],
    dietaryGuidelines: [
      "Emphasize warm, lightly spiced, cooked, nourishing meals with moderate unctuousness",
      "Use warming spices: ginger, cumin, black pepper, cinnamon, and ajwain to kindle Agni",
      "Choose warming stews, roasted root vegetables, warm grains, and herbal broths",
      "Strictly avoid ice-cold drinks, frozen desserts, raw cold salads, and dry crackers"
    ],
    lifestylePractices: [
      "Stay warmly dressed in layers; keep living and workspaces warm and draft-free",
      "Engage in warming physical exercise like dynamic yoga, brisk walking, or sauna therapy",
      "Practice warming Pranayama: Bhastrika and Surya Bhedana",
      "Maintain a predictable routine that still allows space for creative self-expression"
    ],
    ayushCitation: "AYUSH Ayusoft: Vata-Kapha constitution requires continuous therapeutic warmth to counterbalance shared Sheeta quality."
  },

  KAPHA_VATA: {
    type: "Dvandvaja (Directional Dual-Dosha)",
    title: "Kapha-Vata Prakriti (Kapha Leading)",
    sanskritTitle: "कफ-प्रधान वातज प्रकृति",
    dominantDoshas: ["KAPHA", "VATA"],
    primaryDosha: "KAPHA",
    secondaryDosha: "VATA",
    tagline: "The Peaceful Architect — Deep Grounding with Creative Spark",
    description: "Your assessment reveals a dual-dosha constitution led by Kapha with strong secondary Vata. Your baseline is deeply grounded, calm, solid, and nurturing (Kapha), illuminated by sudden intuitive flashes and creative curiosity (Vata). You possess a sturdy frame, pleasant demeanor, and thoughtful, measured perspective.",
    strengths: [
      "Remarkable emotional poise, kindness, and dependable endurance",
      "Original lateral thinking supported by patient methodical follow-through",
      "Calming presence that harmonizes groups and resolves conflicts peacefully",
      "High natural physical resilience once momentum is established"
    ],
    vulnerabilities: [
      "High vulnerability to cold, damp, cloudy weather",
      "Digestive fire fluctuates between sluggish digestion and irregular appetite",
      "Can alternate between periods of heavy inertia and sudden mental overthinking",
      "Respiratory and sinus congestion during late winter and spring"
    ],
    dietaryGuidelines: [
      "Favor warm, light, freshly cooked, well-spiced meals with minimal heavy oils",
      "Emphasize Pungent, Bitter, and Astringent tastes with warming digestive spices",
      "Enjoy light soups, warm spiced teas, steamed greens, and well-cooked lentils",
      "Avoid cold milk, yogurt at night, chilled ice water, and heavy greasy foods"
    ],
    lifestylePractices: [
      "Engage in daily brisk morning exercise in warm sunlight",
      "Maintain stimulating social and intellectual activities to prevent lethargy",
      "Keep hands, feet, and chest warm and well-protected",
      "Practice dynamic breathing exercises and regular creative writing or hobbies"
    ],
    ayushCitation: "AYUSH Ayusoft: Directional Kapha-Vata profiles benefit from warming spices and daily active movement."
  },

  // --- SAMADOSHAJA (EQUILIBRATED TRIDOSHA) ---
  SAMA: {
    type: "Samadoshaja / Tridoshaja",
    title: "Sama Prakriti (Equilibrated Tridosha)",
    sanskritTitle: "सम प्रकृति (त्रिदोषज)",
    dominantDoshas: ["VATA", "PITTA", "KAPHA"],
    primaryDosha: "BALANCED",
    secondaryDosha: null,
    tagline: "The Harmonious Ideal — Balanced Biological Equilibrium",
    description: "Your responses demonstrate an exceptionally balanced distribution across Vata, Pitta, and Kapha within the configured threshold boundaries. In classical Ayurvedic literature, Sama Prakriti is considered the rarest and most ideal baseline constitution, representing physiological harmony, robust immunity, adaptability, and psychological equanimity.",
    strengths: [
      "Natural physiological balance and robust homeostatic adaptability",
      "Equilibrated digestion (Samagni) that easily adjusts to varied dietary contexts",
      "Harmonious cognitive faculties: creativity (Vata), analytical focus (Pitta), and steady memory (Kapha)",
      "High natural resistance to disease and emotional stability"
    ],
    vulnerabilities: [
      "Can still be displaced by extreme, sustained unseasonal lifestyle or chronic dietary abuse",
      "Susceptible to complacency in self-care due to generally resilient baseline health",
      "Requires seasonal adaptation (Ritucharya) to match external environmental shifts"
    ],
    dietaryGuidelines: [
      "Maintain a wholesome, diverse diet containing all six tastes (Shad Rasa) in moderation",
      "Adjust diet according to external seasons (more warming in winter, cooling in summer)",
      "Enjoy fresh, seasonal, organic, freshly prepared whole foods with moderate spices",
      "Avoid extreme food trends, overeating, or irregular eating schedules"
    ],
    lifestylePractices: [
      "Practice mindful seasonal living (Ritucharya) and daily self-care (Dinacharya)",
      "Maintain balanced physical fitness incorporating strength, endurance, and flexibility",
      "Cultivate ongoing mindfulness, meditation, and continuous learning",
      "Retain internal gratitude and balanced service to community"
    ],
    ayushCitation: "AYUSH Ayusoft: Sama Prakriti represents ideal tridoshic equilibrium with symmetrical functional attributes."
  }
};

// --- SUB-CLASSIFIER ONTOLOGIES ---

export const AGNI_PROFILES = {
  VISHAMAGNI: {
    title: "Vishamagni (विशमाग्नि)",
    sanskrit: "विषमो वातेन",
    dosha: "VATA",
    tagline: "Irregular & Variable Metabolic Fire",
    description: "Your digestion is erratic and unpredictable under the mobile (Chala) quality of Vata. Appetite fluctuates from intense hunger to completely forgetting meals, often leading to gas, distension, or dry constipation.",
    guideline: "Eat warm, grounding meals at strict, fixed daily hours; sip warm ginger water before eating."
  },
  TIKSHNAGNI: {
    title: "Tikshnagni (तीक्ष्णाग्नि)",
    sanskrit: "तीक्ष्णः पित्तेन",
    dosha: "PITTA",
    tagline: "Intense & Voracious Metabolic Fire",
    description: "Your digestive fire burns hot and rapid under the sharp (Teekshna) and hot (Ushna) qualities of Pitta. Digestion is quick, leading to irritability if meals are delayed, and susceptibility to hyperacidity and heat.",
    guideline: "Eat cooling, hearty meals with ghee, sweet fruits, and coconut water; avoid skipping meals or excessive chilis."
  },
  MANDAGNI: {
    title: "Mandagni (मन्दाग्नि)",
    sanskrit: "मन्दः कफेन",
    dosha: "KAPHA",
    tagline: "Slow & Steady Metabolic Fire",
    description: "Your digestion is slow, cool, and heavy under the dense (Guru) and unctuous (Snigdha) qualities of Kapha. You can easily skip meals without hunger, but meals take several hours to digest, inducing post-meal drowsiness.",
    guideline: "Favor light, hot, well-spiced meals with black pepper, ginger, and turmeric; avoid heavy dairy and daytime naps."
  },
  SAMAGNI: {
    title: "Samagni (समाग्नि)",
    sanskrit: "समः समैः",
    dosha: "BALANCED",
    tagline: "Equilibrated & Harmonious Metabolic Fire",
    description: "Your digestive power operates in natural physiological equilibrium. Food is digested efficiently without gas, burning, heaviness, or erratic spikes. Nourishment is properly absorbed into the Dhatus.",
    guideline: "Maintain balanced, seasonal eating with fresh, mindful, whole food preparations."
  }
};

export const KOSHTHA_PROFILES = {
  KRURA: {
    title: "Krura Koshtha (क्रूर कोष्ठ)",
    sanskrit: "क्रूरो वातेन",
    dosha: "VATA",
    tagline: "Hard, Dry & Sluggish Bowel Transit",
    description: "Bowel movements are dry, irregular, and require extra time. Strongly driven by Apana Vata drying action on the colon.",
    guideline: "Increase healthy unctuous fats (warm milk with ghee, soaked figs/prunes, warm castor oil as needed)."
  },
  MRIDU: {
    title: "Mridu Koshtha (मृदु कोष्ठ)",
    sanskrit: "मृदुः पित्तेन",
    dosha: "PITTA",
    tagline: "Sensitive, Rapid & Loose Bowel Transit",
    description: "Bowel transit is fast and sensitive. Easily stimulated into loose elimination by warm milk, spices, or emotional intensity.",
    guideline: "Favor cooling, soothing astringent foods: pomegranate, boiled basmati rice, coriander, and bilva."
  },
  MADHYAMA: {
    title: "Madhyama Koshtha (मध्यम कोष्ठ)",
    sanskrit: "मध्यमः कफेन वा समैः",
    dosha: "KAPHA",
    tagline: "Regular, Formed & Consistent Bowel Transit",
    description: "Bowel movements are regular, once daily, formed, and comfortable. Reflects healthy structural lubrication without dryness or irritation.",
    guideline: "Maintain regular dietary fiber, adequate hydration, and daily morning physical movement."
  }
};

export const MANAS_PROFILES = {
  SATTVA: {
    title: "Sattva Predominant (सात्त्विक भाव)",
    quality: "Clarity, Harmony, Wisdom & Equanimity",
    description: "Mind is predominantly calm, clear, truthful, compassionate, and self-controlled under stress."
  },
  RAJAS: {
    title: "Rajas Predominant (राजसिक भाव)",
    quality: "Passion, Ambition, Dynamism & Restlessness",
    description: "Mind is intensely driven, competitive, active, and ambitious, with a tendency toward frustration, impatience, or worry."
  },
  TAMAS: {
    title: "Tamas Predominant (तामसिक भाव)",
    quality: "Stability, Inertia, Attachment & Resistance",
    description: "Mind is stable and enduring, but prone to resistance to change, procrastination, withdrawal, or mental heaviness."
  }
};
