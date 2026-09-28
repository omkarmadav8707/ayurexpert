/**
 * Ayurvedic Expert System - Questionnaire Knowledge Base (Enhanced)
 * 24 Structured Observational Assessment Domains with Hierarchical Tiers
 * - Tier 1: Somatic Invariants (Sharira Sanhanana, Sandhi, Twak, etc. - 1.25x)
 * - Tier 2: Physiological Core (Agni, Koshtha, Sweda, Bala - 1.00x)
 * - Tier 3: Neuro-Cognitive & Behavioral (Manas, Nidra, Smriti, Vak - 0.85x)
 */

export const QUESTIONNAIRE_DATA = [
  // --- TIER 1: ANATOMICAL & SOMATIC INVARIANTS (1.25x) ---
  {
    id: "Q01_BODY_FRAME",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Sharira Sanhanana",
    text: "How would you describe your natural lifelong skeletal frame and body build?",
    hint: "Observe your natural bone structure and build across your adult life.",
    options: [
      { id: "A1", text: "Lean, slender, light bone frame; narrow shoulders and hips; prominent joints", subtext: "Naturally hard to gain weight; tall or noticeably petite" },
      { id: "A2", text: "Medium, balanced, moderate muscular development; symmetrical proportions", subtext: "Maintains weight with moderate effort; athletic build" },
      { id: "A3", text: "Broad, sturdy, solid bone frame; well-developed musculature and curves", subtext: "Gains weight easily; broad chest and hips; robust strength" },
      { id: "A4", text: "Variable or blend of different characteristics / Not entirely certain", subtext: "Mixed physical tendencies without clear predominance" }
    ]
  },
  {
    id: "Q02_SKIN_NATURE",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Twak Lakshana",
    text: "What is the typical texture, moisture, and temperature of your skin?",
    hint: "Reflect on how your skin feels untreated in normal weather.",
    options: [
      { id: "A1", text: "Dry, rough, cool to touch, thin; prone to cracking, flaking, or calluses", subtext: "Quickly dehydrates; veins often visible through skin" },
      { id: "A2", text: "Warm, soft, slightly oily in T-zone; prone to redness, flushing, moles, or freckles", subtext: "Sensitive to sun; easily overheats and reddens" },
      { id: "A3", text: "Thick, smooth, oily/moist, cool, supple; glowing and rarely irritated", subtext: "Naturally well-lubricated; slow to show signs of aging" },
      { id: "A4", text: "Moderate moisture with seasonal variation / Not distinctly prominent", subtext: "Combination skin without a strong predominant pattern" }
    ]
  },
  {
    id: "Q03_HAIR_TEXTURE",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Kesha Prakriti",
    text: "What best describes the natural quality and thickness of your hair?",
    hint: "Consider your hair's natural untreated state.",
    options: [
      { id: "A1", text: "Dry, coarse, thin, brittle, prone to split ends, wavy/curly, dull sheen", subtext: "Tends to knot easily; often requires rich oils or conditioners" },
      { id: "A2", text: "Fine, soft, straight or slight wave, medium density; early graying or thinning", subtext: "Reddish, blondish, or light undertones; sensitive scalp" },
      { id: "A3", text: "Thick, abundant, lustrous, wavy, deep-rooted, oily/glossy and dark", subtext: "Strong resilient follicles; retains deep natural hydration" },
      { id: "A4", text: "Medium thickness with no notable dryness, oiliness, or premature thinning", subtext: "Balanced hair characteristics" }
    ]
  },
  {
    id: "Q04_EYES_GAZE",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Netra Pariksha",
    text: "How would you describe your eyes in terms of size, luster, and gaze?",
    hint: "Eye expression and sclera condition are classical diagnostic markers.",
    options: [
      { id: "A1", text: "Small to medium, quick-moving, dry or tired easily, slightly sunken, lively gaze", subtext: "Blinks frequently; sclera may appear dull or slightly dusky" },
      { id: "A2", text: "Medium-sized, piercing, sharp, penetrating gaze; light-sensitive with reddish hints", subtext: "Inflames easily with lack of sleep or screen time; sclera slightly pinkish" },
      { id: "A3", text: "Large, wide, attractive, calm, deep gaze; thick lashes; clear white sclera", subtext: "Moist, steady, peaceful eyes with thick well-defined eyelashes" },
      { id: "A4", text: "Average size and gaze without prominent dryness, redness, or heaviness", subtext: "Conventional eye presentation" }
    ]
  },
  {
    id: "Q05_JOINTS_FLEXIBILITY",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Sandhi Sansthana",
    text: "What is the condition and sound of your skeletal joints during movement?",
    hint: "Notice cracking sounds, stability, and natural joint flexibility.",
    options: [
      { id: "A1", text: "Prominent, knobby, thin joints; prone to cracking, popping, stiffness, or hyperextension", subtext: "Variable range of motion; dry joint sensations" },
      { id: "A2", text: "Medium, moderately padded, flexible, warm; prone to occasional inflammation or burning", subtext: "Good loose mobility; moderate ligamentous stability" },
      { id: "A3", text: "Large, heavily cushioned, well-lubricated, sturdy, stable; quiet movement", subtext: "Rarely cracks; very strong and durable joint architecture" },
      { id: "A4", text: "Normal joint mobility with occasional mild stiffness depending on exertion", subtext: "Average joint characteristics" }
    ]
  },
  {
    id: "Q06_TEETH_GUMS",
    domain: "Physical Constitution",
    tier: 1,
    tierName: "Anatomical Invariant",
    sanskritTerm: "Danta & Dantamoola",
    text: "What is your typical dental health and structural alignment?",
    hint: "Teeth durability and gum sensitivity.",
    options: [
      { id: "A1", text: "Irregular, crooked, crowded or spaced; dry gums; thin or sensitive enamel", subtext: "Prone to micro-chipping or receding gums" },
      { id: "A2", text: "Medium-sized, yellowish or yellowish-white; soft gums that bleed or inflame easily", subtext: "Prone to canker sores, gum heat, or sensitivity to acids" },
      { id: "A3", text: "Large, strong, straight, bright white, gleaming; firm, pink, healthy gums", subtext: "Rarely develops cavities; robust dental architecture" },
      { id: "A4", text: "Standard dental alignment with moderate dental maintenance requirements", subtext: "Balanced oral features" }
    ]
  },

  // --- TIER 2: PHYSIOLOGICAL & METABOLIC CORE (1.00x) ---
  {
    id: "Q07_APPETITE_METABOLISM",
    domain: "Metabolism & Digestion",
    tier: 2,
    tierName: "Metabolic Core",
    isAgniMarker: true,
    sanskritTerm: "Jatharagni Lakshana",
    text: "How would you describe your daily appetite pattern and digestive fire (Agni)?",
    hint: "Is your appetite regular, intense, sluggish, or erratic?",
    options: [
      { id: "A1", text: "Irregular and unpredictable (Vishamagni); ravenous one day, forgetting meals the next", subtext: "Easily gets bloated, anxious, or gassy if meals are delayed" },
      { id: "A2", text: "Intense, sharp, voracious (Tikshnagni); irritable and faint if meals are delayed even 30 mins", subtext: "Strong digestion; consumes large portions; prone to acidity or heartburn" },
      { id: "A3", text: "Steady, slow, mild (Mandagni); can easily skip meals without hunger or discomfort", subtext: "Digests slowly; feels heavy or drowsy after eating moderate meals" },
      { id: "A4", text: "Generally consistent appetite without extreme hunger spikes or heaviness (Samagni)", subtext: "Predictable appetite matching physical activity" }
    ]
  },
  {
    id: "Q08_DIGESTION_ELIMINATION",
    domain: "Metabolism & Digestion",
    tier: 2,
    tierName: "Metabolic Core",
    isKoshthaMarker: true,
    sanskritTerm: "Koshtha Lakshana",
    text: "What is your typical bowel elimination tendency (Koshtha)?",
    hint: "Frequency, ease, and stool consistency.",
    options: [
      { id: "A1", text: "Hard, dry, difficult, irregular, prone to constipation and gas (Krura Koshtha)", subtext: "May go alternate days; bowel transit time is variable and dry" },
      { id: "A2", text: "Frequent, soft to loose, urgent, 2–3 times daily; easily stimulated by heat/spices (Mridu Koshtha)", subtext: "Quick transit; yellowish or burning sensations at times" },
      { id: "A3", text: "Regular, once daily, formed, heavy, oily, complete, never urgent (Madhyama Koshtha)", subtext: "Consistent morning bowel movement; sluggish if overeating" },
      { id: "A4", text: "Normal regularity with minor deviations linked to traveling or diet changes", subtext: "Average balanced elimination" }
    ]
  },
  {
    id: "Q09_THIRST_HYDRATION",
    domain: "Metabolism & Digestion",
    tier: 2,
    tierName: "Metabolic Core",
    isAgniMarker: true,
    sanskritTerm: "Pipasa Lakshana",
    text: "What is your typical level of thirst and beverage preference?",
    hint: "How frequently do you crave fluids, and at what temperature?",
    options: [
      { id: "A1", text: "Variable and sporadic thirst; distinctly prefers warm or hot drinks, soothing teas", subtext: "Cold drinks cause discomfort, constriction, or digestive spasms" },
      { id: "A2", text: "Frequent, intense, unquenchable thirst; strong craving for ice-cold or chilled drinks", subtext: "High internal metabolic heat creates constant demand for cooling fluids" },
      { id: "A3", text: "Low, minimal thirst; drinks out of habit rather than strong thirst; prefers warm to room temperature", subtext: "Retains water readily; rarely feels dehydrated" },
      { id: "A4", text: "Moderate fluid intake throughout the day with seasonal adjustment", subtext: "Standard thirst response" }
    ]
  },
  {
    id: "Q10_TEMPERATURE_PREFERENCE",
    domain: "Physiology & Sensation",
    tier: 2,
    tierName: "Metabolic Core",
    isKoshthaMarker: true,
    sanskritTerm: "Sheeta/Ushna Satmya",
    text: "Which environmental weather and ambient temperature do you find most uncomfortable?",
    hint: "Identify the climate condition that depletes your energy quickest.",
    options: [
      { id: "A1", text: "Cold, windy, dry, drafts; hands and feet are persistently icy and cold", subtext: "Thrives in warm, sunny, tropical, humid climates; adores heat" },
      { id: "A2", text: "Hot, sunny, muggy weather; suffocated by direct sun, hot rooms, or midday heat", subtext: "Thrives in crisp, cool, breezy, alpine, or air-conditioned environments" },
      { id: "A3", text: "Cold, damp, cloudy, foggy, rainy weather; feels congested, sluggish, and heavy", subtext: "Thrives in dry, warm, active, well-ventilated environments" },
      { id: "A4", text: "Tolerates most temperatures reasonably well with ordinary seasonal adaptation", subtext: "No acute aversion to mild heat or cold" }
    ]
  },
  {
    id: "Q11_PERSPIRATION_SWEAT",
    domain: "Physiology & Sensation",
    tier: 2,
    tierName: "Metabolic Core",
    sanskritTerm: "Sweda Pravritti",
    text: "How easily and abundantly do you perspire during mild exertion or warm days?",
    hint: "Consider volume, odor, and triggers for sweating.",
    options: [
      { id: "A1", text: "Scanty, minimal, odorless; rarely sweats except in intense saunas or extreme heat", subtext: "Skin stays dry even during workouts" },
      { id: "A2", text: "Profuse, copious, warm, strong or sour odor; sweats readily with minor exertion or spicy food", subtext: "Requires frequent freshening; shirts easily show perspiration marks" },
      { id: "A3", text: "Moderate, steady; begins slowly after sustained effort; pleasant or neutral scent", subtext: "Sweats during cardiovascular exercise but rarely in resting conditions" },
      { id: "A4", text: "Normal perspiration commensurate with physical workout intensity", subtext: "Standard sweating response" }
    ]
  },
  {
    id: "Q15_ENERGY_STAMINA",
    domain: "Physiology & Sensation",
    tier: 2,
    tierName: "Metabolic Core",
    sanskritTerm: "Bala & Vyayama Shakthi",
    text: "How does your physical energy and endurance distribute over the course of a day?",
    hint: "Look at bursts vs steady sustained output.",
    options: [
      { id: "A1", text: "Bursts of sudden high energy followed by swift exhaustion; energy fluctuates unpredictably", subtext: "Tends to push past limits and experience sudden crashes" },
      { id: "A2", text: "Strong, focused, goal-driven stamina; works aggressively then needs planned recovery", subtext: "Pushes through fatigue with sheer willpower; competitive endurance" },
      { id: "A3", text: "High steady endurance, excellent stamina; slow to start but can work tirelessly for hours", subtext: "Rarely gets depleted; immense reservoir of physical strength" },
      { id: "A4", text: "Balanced stamina that rises smoothly in morning and wanes gently in evening", subtext: "Stable conventional energy curve" }
    ]
  },
  {
    id: "Q22_TASTE_PREFERENCE",
    domain: "Metabolism & Digestion",
    tier: 2,
    tierName: "Metabolic Core",
    isAgniMarker: true,
    sanskritTerm: "Rasa Ruchi",
    text: "Which flavors and tastes (Rasas) do you naturally gravitate toward most frequently?",
    hint: "Your cravings often indicate your body's subtle elemental composition.",
    options: [
      { id: "A1", text: "Warm, rich, nourishing flavors: sweet, sour, and salty; buttery, hearty, cooked foods", subtext: "Dislikes raw salads, dry crackers, or bitter leafy vegetables" },
      { id: "A2", text: "Cool, refreshing, cleansing flavors: sweet, bitter, and astringent; fresh fruits, salads, cooling herbs", subtext: "Aversion to overly spicy, pungent chilis, salty fried snacks, or vinegar" },
      { id: "A3", text: "Light, stimulating, warming, zestful flavors: pungent/spicy, bitter, and astringent; light broths", subtext: "Caves into heavy sweets and dairy, but feels lethargic afterwards" },
      { id: "A4", text: "Enjoys an eclectic variety of all six tastes without severe craving or aversion", subtext: "Broad balanced culinary palate" }
    ]
  },
  {
    id: "Q24_PULSE_RHYTHM_MOVEMENT",
    domain: "Physiology & Sensation",
    tier: 2,
    tierName: "Metabolic Core",
    sanskritTerm: "Nadi Gati Sadrishya",
    text: "When observing your internal bodily movement and heart pulse sensation at rest, which analogy fits closest?",
    hint: "Classical Ayurvedic texts describe pulse movements as serpent (Vata), frog (Pitta), or swan (Kapha).",
    options: [
      { id: "A1", text: "Serpentine, quick, thready, light, shifting, irregular like a snake (Sarpa Gati)", subtext: "Fast, delicate, and easily influenced by momentary anxiety or cold" },
      { id: "A2", text: "Bounding, prominent, jumping, forceful, regular like a leaping frog (Manduka Gati)", subtext: "Strong, warm, clear, rhythmic, and visibly noticeable" },
      { id: "A3", text: "Slow, broad, steady, deep, gliding gracefully like a regal swan (Hamsa Gati)", subtext: "Gentle, rhythmic, heavy, calm, and slow to alter rate" },
      { id: "A4", text: "Even, moderate, rhythmic heartbeat without notable bounding or thready qualities", subtext: "Standard rhythmic pulse characteristics" }
    ]
  },

  // --- TIER 3: NEURO-COGNITIVE & BEHAVIORAL DISPOSITION (0.85x) ---
  {
    id: "Q12_SLEEP_PATTERN",
    domain: "Physiology & Sensation",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Nidra Lakshana",
    text: "What best characterizes your typical sleep duration, depth, and waking state?",
    hint: "Do you wake easily, wake refreshed, or struggle to get out of bed?",
    options: [
      { id: "A1", text: "Light, interrupted, restless, 5–6 hours; awakened easily by slight noises; mind races at night", subtext: "Often wakes unrefreshed, stiff, or prone to insomnia" },
      { id: "A2", text: "Moderate, sound, 6–7 hours; falls asleep easily; wakes up purposeful and alert", subtext: "May wake up in the night feeling warm or thirsty, then quickly fall back asleep" },
      { id: "A3", text: "Deep, heavy, prolonged, 8–10 hours; difficult to wake in the morning; loves napping", subtext: "Takes 30–60 minutes to clear morning grogginess and become fully awake" },
      { id: "A4", text: "Consistent 7–8 hours of uninterrupted sleep with natural morning alertness", subtext: "Regular balanced sleep cycle" }
    ]
  },
  {
    id: "Q13_DREAMS_THEMES",
    domain: "Physiology & Sensation",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Svapna Darshana",
    text: "When you recall dreams, which recurring themes or sensations are most common?",
    hint: "Dreams often reflect subtle subconscious mental dosha activity.",
    options: [
      { id: "A1", text: "Flying, running, wandering in space, mountains, falling, panic, confusion, rapid motion", subtext: "Vivid, fleeting, changing scenes rapidly; waking feeling anxious" },
      { id: "A2", text: "Fire, conflicts, problem-solving, teaching, vibrant colors, sunlight, lightning, competition", subtext: "Intense, vivid, dramatic, structured, or heroic narrative dreams" },
      { id: "A3", text: "Water, oceans, peaceful gardens, lakes, romantic scenes, floating slowly, gentle animals", subtext: "Calm, slow-paced, serene, or emotional dreams; often forgets details" },
      { id: "A4", text: "Varied everyday scenarios without prominent thematic or sensory patterns", subtext: "Neutral mundane dream patterns" }
    ]
  },
  {
    id: "Q14_PHYSICAL_ACTIVITY_PACE",
    domain: "Physiology & Sensation",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Pravritti / Cheshta",
    text: "What is your natural walking speed, bodily gesture pace, and movement rhythm?",
    hint: "How do you naturally move when you are not rushing?",
    options: [
      { id: "A1", text: "Fast, brisk, light-footed, fidgety; frequent shifting, gesturing with hands, restless sitting", subtext: "Cannot sit still for prolonged periods without tapping foot or moving" },
      { id: "A2", text: "Determined, purposeful, sharp, steady gait; intentional, crisp, and direct body language", subtext: "Moves with deliberate intent and focused energy" },
      { id: "A3", text: "Slow, graceful, grounded, deliberate, relaxed; steady posture; sits contentedly for hours", subtext: "Dislikes being hurried or rushed; solid, calm physical presence" },
      { id: "A4", text: "Moderate walking and movement rhythm adjusting easily to the situation", subtext: "Average natural tempo" }
    ]
  },
  {
    id: "Q16_SPEECH_COMMUNICATION",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    isManasMarker: true,
    sanskritTerm: "Vak Pravritti",
    text: "What best describes your natural speaking pace, tone, and conversation style?",
    hint: "Notice speech velocity, volume, and storytelling structure.",
    options: [
      { id: "A1", text: "Rapid, enthusiastic, talkative, hopping between topics; can wander or lose train of thought", subtext: "High-pitched, breathless, or voice turns raspy when tired" },
      { id: "A2", text: "Clear, sharp, articulate, persuasive, commanding, direct; argues or debates assertively", subtext: "Direct tone; gets frustrated by vague answers or beating around the bush" },
      { id: "A3", text: "Slow, measured, melodious, soft-spoken, listens more than speaks; peaceful and reassuring", subtext: "Considers words deeply before speaking; rarely raises voice" },
      { id: "A4", text: "Moderate speaking rate with comfortable conversational adaptability", subtext: "Balanced vocal traits" }
    ]
  },
  {
    id: "Q17_LEARNING_MEMORY",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    isManasMarker: true,
    sanskritTerm: "Medha / Smriti",
    text: "How do you grasp new ideas, absorb study material, and retain information long-term?",
    hint: "Contrast initial learning speed with long-term retention.",
    options: [
      { id: "A1", text: "Quick to grasp instantly, highly intuitive; but tends to forget just as quickly without repetition", subtext: "Excels at creative leaps; short-term memory stronger than long-term cataloging" },
      { id: "A2", text: "Analytical, methodical, grasps through logic and systems; retains clearly and precisely", subtext: "Photographic or organized recall; focuses on facts, principles, and cause-and-effect" },
      { id: "A3", text: "Takes time and repetition to initially absorb; once learned, never forgotten for a lifetime", subtext: "Deep crystalline retention; patient conceptual grounding" },
      { id: "A4", text: "Average learning speed with standard notes review and practical retention", subtext: "Standard cognitive processing" }
    ]
  },
  {
    id: "Q18_STRESS_RESPONSE",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    isManasMarker: true,
    sanskritTerm: "Manasa Bhava / Krodha-Bhaya",
    text: "When confronted with severe stress, pressure, or unexpected crisis, what is your primary reaction?",
    hint: "Which initial emotional pattern automatically surges forward?",
    options: [
      { id: "A1", text: "Anxiety, worry, racing thoughts, panic, hyper-vigilance, overthinking, feeling overwhelmed", subtext: "May withdraw into fear, self-doubt, or trembling paralysis" },
      { id: "A2", text: "Irritation, impatience, anger, frustration, criticism, blaming, urgent urge to take control", subtext: "Directs fiery energy outward into aggressive problem-solving or arguments" },
      { id: "A3", text: "Withdrawal, resistance to change, procrastination, stubbornness, denial, calm detachment", subtext: "Shuts down emotionally; seeks comfort food, sleep, or solitude" },
      { id: "A4", text: "Calm pragmatic evaluation with brief temporary emotional adjustment", subtext: "Balanced emotional equilibrium" }
    ]
  },
  {
    id: "Q19_WORK_PROJECT_STYLE",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    isManasMarker: true,
    sanskritTerm: "Karma Pravritti",
    text: "How do you naturally approach creative work, business tasks, and project execution?",
    hint: "Ideation vs execution vs finishing.",
    options: [
      { id: "A1", text: "Brilliant ideator, starts many exciting projects simultaneously; struggles to finish routine details", subtext: "Works in sudden creative flashes; craves variety and creative freedom" },
      { id: "A2", text: "Organized, laser-focused, ambitious leader; creates schedules, hits deadlines ruthlessly", subtext: "Perfectionistic drive; holds self and coworkers to rigorous standards" },
      { id: "A3", text: "Dependable, steady finisher, supports team harmony; loyal plodder who maintains routine excellence", subtext: "Dislikes abrupt pivoting; methodical, patient step-by-step follow-through" },
      { id: "A4", text: "Adaptive project worker comfortable with both planning and execution", subtext: "Versatile operational approach" }
    ]
  },
  {
    id: "Q20_FINANCIAL_HABITS",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Dhana Vyaya",
    text: "What best describes your natural relationship with money, spending, and savings?",
    hint: "Impulse spending vs strategic investment vs conservative preservation.",
    options: [
      { id: "A1", text: "Spends impulsively on immediate inspirations, gadgets, experiences, or travel; erratic saving", subtext: "Money comes and goes quickly; struggles with disciplined budgets" },
      { id: "A2", text: "Spends strategically on quality, luxury, status items, high-tech tools; calculates ROI carefully", subtext: "Keeps organized financial spreadsheets; ambitious investor" },
      { id: "A3", text: "Cautious, conservative saver; hoards resources carefully; dislikes frivolous or wasteful expenses", subtext: "Steady accumulation; feels most secure with robust savings cushion" },
      { id: "A4", text: "Pragmatic balanced spending with reasonable savings and budgeting", subtext: "Standard financial balance" }
    ]
  },
  {
    id: "Q21_ROUTINE_PREFERENCE",
    domain: "Mind & Behavior",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Dinacharya Satmya",
    text: "How do you feel about strict daily routines, fixed schedules, and predictability?",
    hint: "Does a fixed schedule feel like a prison, a productive framework, or comforting stability?",
    options: [
      { id: "A1", text: "Dislikes rigid routines; feels boxed in; thrives on spontaneity, novelty, and flexibility", subtext: "No two days look the same; bedtime and meal times drift constantly" },
      { id: "A2", text: "Demands planned, productive, efficient schedules; optimizes every hour of the calendar", subtext: "Frustrated when others waste time or meetings run off agenda" },
      { id: "A3", text: "Deeply loves predictable, familiar routines; finds immense comfort in cozy daily habits", subtext: "Stressed by sudden last-minute surprises or unexpected plan cancellations" },
      { id: "A4", text: "Enjoys general structure while easily accommodating spontaneous changes", subtext: "Flexible equilibrium" }
    ]
  },
  {
    id: "Q23_WEATHER_DISCOMFORT",
    domain: "Physiology & Sensation",
    tier: 3,
    tierName: "Behavioral & Cognitive",
    sanskritTerm: "Ritu Asatmyata",
    text: "Which season or weather condition brings out your worst physical or mental sluggishness?",
    hint: "Notice when you feel most out of harmony during the year.",
    options: [
      { id: "A1", text: "Late autumn & dry windy winter: skin dries, joints ache, anxiety and insomnia increase", subtext: "Windy, chilly weather penetrates immediately to the bones" },
      { id: "A2", text: "Midsummer & blazing sunny days: skin breaks out, irritability peaks, migraines or burning sensations occur", subtext: "Excessive heat and direct sunlight quickly drain patience and vitality" },
      { id: "A3", text: "Late winter & wet soggy spring: heavy chest, congestion, allergies, excessive sleeping, and lethargy", subtext: "Cold dampness creates sluggish metabolism and fluid accumulation" },
      { id: "A4", text: "Mild seasonal adjustments with no pronounced seasonal vulnerability", subtext: "High adaptive resilience across all seasons" }
    ]
  }
];
