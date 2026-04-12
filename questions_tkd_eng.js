// ============================================
// TKD — Bahasa Inggris (50 Soal HOTS)
// UM UGM CBT 2026
// ============================================

registerQuestions('tkd_eng', [
// === READING COMPREHENSION (1-20) ===
{
    question: "Read the following passage:\n\nThe concept of rewilding—reintroducing species to ecosystems from which they have been extirpated—has gained traction in conservation circles. Proponents argue that apex predators play keystone roles, cascading through trophic levels to reshape entire landscapes. The reintroduction of wolves to Yellowstone in 1995, for instance, led to a remarkable recovery of riparian vegetation as elk changed their grazing patterns to avoid predation.\n\nThe word \"extirpated\" in the passage most closely means …",
    options: ["Introduced (secara umum)","Eliminated locally","Preserved (pada prinsipnya)","Evolved (menurut standar)","Migrated (secara literal)"],answer:1,
    hint: "The context involves 'reintroducing' species to ecosystems. If species are being reintroduced, they must have been removed from those ecosystems previously.",
    explanation: "\"Extirpated\" means locally eliminated or eradicated from a particular area (though the species may survive elsewhere). The context of 'reintroducing species to ecosystems from which they have been extirpated' confirms this meaning.\nAnswer: B — Eliminated locally."
},
{
    question: "Based on the passage about rewilding above, the recovery of riparian vegetation in Yellowstone was a result of …",
    options: ["Direct planting programs by park rangers (dalam batasan konvensional)","Wolves consuming the vegetation (secara fundamental)","Elk changing their grazing behavior due to predation risk","Climate change affecting rainfall patterns (menurut konsensus ilmiah)","New government regulations on land use (dalam arti sempit)"],answer:2,
    hint: "Trace the causal chain described in the passage: wolves → elk behavior → vegetation.",
    explanation: "The passage states that wolves' reintroduction led to vegetation recovery because 'elk changed their grazing patterns to avoid predation.' This is an indirect effect through behavioral modification, not direct consumption or other factors.\nAnswer: C."
},
{
    question: "Read the following passage:\n\nRecent archaeological evidence suggests that the Maritime Silk Road was far more complex than previously understood. Rather than a single route, it comprised a vast network of interconnected trading paths spanning the Indian Ocean, linking merchants from the Roman Empire, the Arabian Peninsula, the Indian subcontinent, and the Chinese dynasties. Spices, silk, and precious metals flowed in multiple directions, accompanied by the less tangible but equally significant exchange of religious ideas, scientific knowledge, and artistic techniques.\n\nThe author's primary purpose in this passage is to …",
    options: ["Describe the trade goods exchanged on the Silk Road (dalam pengertian luas)","Argue that the Maritime Silk Road was more important than the land route","Present a more nuanced understanding of the Maritime Silk Road's complexity","Criticize previous archaeological methods (berdasarkan referensi umum)","Explain how religions spread across Asia (menurut kerangka berpikir umum)"],answer:2,
    hint: "Focus on the opening phrase 'far more complex than previously understood' — what is the author trying to convey about the accepted narrative?",
    explanation: "The key phrase is 'far more complex than previously understood.' The author aims to revise the simplified understanding (single route) with a more nuanced view (vast network). While trade goods and cultural exchange are mentioned, they serve as evidence for the complexity thesis.\nAnswer: C."
},
{
    question: "Read the following passage:\n\nBioluminescence, the production of light by living organisms, serves remarkably diverse functions across different species. Deep-sea anglerfish employ bioluminescent lures to attract prey in the aphotic zone, while fireflies use species-specific flash patterns for mate recognition. Perhaps most intriguingly, certain species of squid use counter-illumination—matching the intensity and color of downwelling light from above—as a form of camouflage against predators looking upward from below.\n\nWhich of the following can be inferred from the passage?",
    options: ["Bioluminescence is only found in marine organisms","Counter-illumination makes squid invisible from all angles","The aphotic zone receives no sunlight","Fireflies and anglerfish use identical bioluminescent mechanisms","All bioluminescent organisms produce the same color of light"],
    answer: 2,
    hint: "The passage mentions anglerfish operating 'in the aphotic zone.' The prefix 'a-' means 'without,' and 'photic' relates to light.",
    explanation: "The aphotic zone is described as the environment where anglerfish need bioluminescent lures to attract prey, implying it is a region without natural light. The prefix 'a-' (without) + 'photic' (light) confirms this = no sunlight zone.\nThe passage mentions fireflies (terrestrial), so A is wrong. B overstates ('all angles' vs. 'from below'). D and E are unsupported.\nAnswer: C."
},
{
    question: "Read the following passage:\n\nThe placebo effect has long been dismissed as mere psychological trickery, but recent neuroscience research reveals a far more sophisticated mechanism. Brain imaging studies demonstrate that placebo treatments activate genuine neurochemical pathways, triggering the release of endogenous opioids, dopamine, and serotonin. These are the same neurotransmitters activated by actual pharmaceutical interventions. This finding blurs the traditional dichotomy between 'real' and 'fake' treatments in ways that challenge fundamental assumptions about the nature of healing.\n\nThe author's attitude toward the placebo effect can best be described as …",
    options: ["Dismissive and skeptical (berdasarkan acuan formal)","Objective but acknowledging its significance","Enthusiastic and uncritical (pada konteks konvensional)","Indifferent and detached (dalam batasan konvensional)","Cautiously pessimistic (secara fundamental)"],answer:1,
    hint: "Note the contrast between 'long been dismissed' (past view) and 'far more sophisticated mechanism' (current evidence). The author presents evidence without emotional advocacy.",
    explanation: "The author presents scientific evidence objectively ('Brain imaging studies demonstrate...') while clearly acknowledging the significance of the findings ('challenge fundamental assumptions'). The tone is neither dismissive nor uncritically enthusiastic, but Rather balanced and evidence-based.\nAnswer: B."
},
{
    question: "Read the following passage:\n\nUrban heat islands (UHIs) occur when cities experience significantly higher temperatures than surrounding rural areas. This phenomenon arises primarily from the replacement of natural vegetation with impervious surfaces—concrete, asphalt, and buildings—that absorb and retain solar radiation. Consequently, nighttime temperatures in dense urban centers can be 5-10°C higher than in adjacent rural zones, as these materials slowly release stored heat after sunset.\n\nAccording to the passage, why are nighttime temperatures particularly affected by UHIs?",
    options: ["Cities produce more industrial heat at night (dari sudut pandang klasik)","Vehicle emissions increase during nighttime hours (dalam literatur standar)","Impervious surfaces gradually release absorbed solar heat after sunset","Rural areas become colder due to lack of infrastructure (dalam pengertian luas)","Urban areas block cool air from entering (dalam definisi teknis)"],answer:2,
    hint: "The passage directly explains the mechanism for nighttime temperature differences. Focus on what happens 'after sunset.'",
    explanation: "The passage explicitly states that impervious surfaces 'absorb and retain solar radiation' and 'slowly release stored heat after sunset,' directly explaining why nighttime temperatures are 5-10°C higher in urban areas.\nAnswer: C."
},
// === GRAMMAR & SYNTAX (7-20) ===
{
    question: "Choose the sentence with correct subject-verb agreement:\n",
    options: ["The committee have reached a unanimous decision (berdasarkan asumsi dasar)","Each of the students are required to submit their thesis","Neither the teacher nor the students was present (berdasarkan teori dasar)","The data collected from the survey indicate a clear trend","Every one of the participants have completed the form (secara klasik)"],answer:3,
    hint: "'Data' is a plural noun (singular: 'datum'). Which verb form agrees with a plural subject?",
    explanation: "A: 'committee' (collective noun) + 'have' can be correct in British English but 'has' in American English.\nB: 'Each' is singular → 'is required'\nC: 'nor the students' (plural nearest) → 'were present'\nD: 'data' is plural → 'indicate' (plural verb). ✓\nE: 'Every one' is singular → 'has completed'\nAnswer: D."
},
{
    question: "Identify the grammatically correct sentence:",
    options: ["If I was you, I would have accepted the offer (sesuai teori klasik)","Had she known about the delay, she would have taken an earlier flight","He suggested that she should goes to the doctor (secara terminologis)","The reason is because he was late (berdasarkan acuan formal)","Despite of the heavy rain, the match continued (secara konvensional)"],answer:1,
    hint: "Look for correct conditional structures. Past perfect in the 'if' clause paired with 'would have + past participle.'",
    explanation: "A: Subjunctive: 'If I were you' (not 'was').\nB: Third conditional inversion: 'Had she known... she would have taken...' — grammatically perfect. ✓\nC: 'should goes' → 'should go' (bare infinitive).\nD: 'The reason is because' → redundant; 'The reason is that...'\nE: 'Despite of' → 'Despite' (no 'of') or 'In spite of'.\nAnswer: B."
},
{
    question: "Choose the correct word to complete the sentence:\n\"The government _____ new regulations to address climate change by the end of this year.\"",
    options: ["will have implemented","will have been implementing","would implement","had implemented","has been implementing"],
    answer: 0,
    hint: "The phrase 'by the end of this year' indicates a future deadline, requiring a future perfect tense.",
    explanation: "'By the end of this year' signals a completion point in the future, requiring future perfect tense: 'will have implemented' — an action completed before a future time reference.\nAnswer: A — will have implemented."
},
{
    question: "Select the sentence with correct use of the relative pronoun:",
    options: ["The scientist which discovered penicillin won the Nobel Prize","The book whom I borrowed from the library was fascinating","The city in where she grew up has changed dramatically","The professor whose research was groundbreaking retired last year","The proposal what we discussed needs revision (menurut pengertian baku)"],answer:3,
    hint: "'Whose' is the possessive relative pronoun used for people. Check which sentence correctly uses a possessive relationship.",
    explanation: "A: 'which' → 'who' (people, not things).\nB: 'whom' → 'which/that' (referring to a book, not a person as object).\nC: 'in where' → 'where' or 'in which'.\nD: 'whose research' — correctly shows possession (the professor's research). ✓\nE: 'what' is not a relative pronoun; use 'that' or 'which'.\nAnswer: D."
},
{
    question: "Choose the correct passive voice transformation of:\n\"The researchers are conducting a comprehensive analysis of the ecosystem.\"\n",
    options: ["A comprehensive analysis of the ecosystem is being conducted by the researchers","A comprehensive analysis of the ecosystem is conducted by the researchers","A comprehensive analysis of the ecosystem has been conducted by the researchers","A comprehensive analysis of the ecosystem was being conducted by the researchers","A comprehensive analysis of the ecosystem had been conducted by the researchers"],
    answer: 0,
    hint: "The original is present continuous ('are conducting'). The passive must maintain the same tense: 'is/are being + past participle.'",
    explanation: "Original tense: Present Continuous (are conducting).\nPassive form: Subject + is/are being + past participle.\n'A comprehensive analysis... is being conducted by the researchers.'\nAnswer: A."
},
{
    question: "Identify the sentence that correctly uses a participial phrase:",
    options: ["Walking to school, the rain started pouring heavily (dari perspektif akademis)","Having completed the experiment, the results were published","Exhausted from the long journey, the travelers decided to rest at the inn","Driving down the highway, the scenery was beautiful (secara konseptual)","Confused by the instructions, the manual was thrown away (berdasarkan asumsi dasar)"],answer:2,
    hint: "The subject of the main clause must be the same as the implied subject of the participial phrase. Otherwise, it's a 'dangling participle.'",
    explanation: "A: The rain wasn't walking → dangling participle.\nB: The results didn't complete → dangling.\nC: The travelers were exhausted → correct match. ✓\nD: The scenery wasn't driving → dangling.\nE: The manual wasn't confused → dangling.\nAnswer: C."
},
{
    question: "Choose the correct sentence:\n",
    options: ["He is more taller than his brother (pada konteks konvensional)","She is the most intelligent student in the class","This is the most easiest question on the exam","He runs more faster than anyone else (dalam teori)","She is the beautifulest girl I know (menurut konsensus ilmiah)"],answer:1,
    hint: "Comparative: -er or 'more' (not both). Superlative: -est or 'most' (not both). Two-syllable+ adjectives usually use 'more/most.'",
    explanation: "A: 'more taller' → double comparative. Should be 'taller.'\nB: 'the most intelligent' — correct superlative for multi-syllable adjective. ✓\nC: 'most easiest' → double superlative. 'Easiest.'\nD: 'more faster' → double comparative. 'Faster.'\nE: 'beautifulest' → 'most beautiful.'\nAnswer: B."
},
// === VOCABULARY IN CONTEXT (14-25) ===
{
    question: "The word \"ubiquitous\" in the sentence \"Smartphones have become ubiquitous in modern society\" most nearly means …",
    options: ["Expensive (pada dasarnya)","Controversial","Found everywhere","Unnecessary (secara umum)","Complicated (dalam teori)"],answer:2,
    hint: "Think of smartphones being present in every context, place, and demographic in modern society.",
    explanation: "'Ubiquitous' means present, appearing, or found everywhere. Smartphones are indeed found everywhere in modern society.\nAnswer: C — Found everywhere."
},
{
    question: "Choose the word that best completes the sentence:\n\"The politician's speech was deliberately _____, avoiding specific commitments while appearing to address voters' concerns.\"",
    options: ["Eloquent","Ambiguous","Concise","Transparent","Forthright"],
    answer: 1,
    hint: "The speech 'avoids specific commitments while appearing to address concerns' — it says something without really saying anything concrete.",
    explanation: "A speech that avoids specifics while appearing to address issues is deliberately vague or unclear in meaning — 'ambiguous.'\nEloquent = persuasive/fluent. Concise = brief. Transparent = clear. Forthright = direct.\nAnswer: B — Ambiguous."
},
{
    question: "The underlined word in \"The company's decision to lay off workers was met with widespread *opprobrium*\" means …",
    options: ["Support (secara teknis)","Indifference (dalam praktik)","Strong disapproval","Curiosity (di konteks ini)","Celebration (secara klasik)"],answer:2,
    hint: "If workers are being laid off, the public response described would likely be negative. 'Opprobrium' is a formal word for harsh criticism.",
    explanation: "'Opprobrium' means public disgrace, strong criticism, or severe disapproval. In the context of layoffs, it indicates strong public criticism.\nAnswer: C — Strong disapproval."
},
{
    question: "Select the most appropriate word to fill the blank:\n\"The ancient manuscript had _____ over centuries, with many pages crumbling to dust.\"",
    options: ["Improved (secara literal)","Deteriorated","Flourished","Expanded (pada dasarnya)","Illuminated"],answer:1,
    hint: "Pages 'crumbling to dust' indicates a process of decline and decay over time.",
    explanation: "Pages crumbling to dust indicates physical decay. 'Deteriorated' means declined in quality/condition over time, which matches perfectly.\nAnswer: B — Deteriorated."
},
// === CLOZE TEST / STRUCTURE (18-30) ===
{
    question: "Choose the most appropriate conjunction:\n\"_____ the project received significant funding, the researchers were unable to achieve their original objectives.\"",
    options: ["Because","Although","Therefore","Moreover","Furthermore"],
    answer: 1,
    hint: "The sentence presents a contrast: funding (positive) vs. unable to achieve objectives (negative). Which conjunction shows contrast?",
    explanation: "The sentence contrasts 'significant funding' (positive) with 'unable to achieve objectives' (negative). This is a concessive relationship.\n'Although' introduces a concession/contrast. ✓\n'Because' = cause. 'Therefore' = result. 'Moreover/Furthermore' = addition.\nAnswer: B — Although."
},
{
    question: "Fill in the blank with the correct preposition:\n\"The theory _____ which the entire experiment was based has been challenged by recent findings.\"",
    options: ["in","on","at","for","by"],
    answer: 1,
    hint: "The collocation is 'based on something.' In formal relative clauses: 'on which something is based.'",
    explanation: "Collocation: 'based ON' → 'the theory ON which the experiment was based.'\nAnswer: B — on."
},
{
    question: "Choose the correct form:\n\"Not until the late 19th century _____ the true extent of biodiversity in tropical rainforests.\"",
    options: ["scientists discovered","did scientists discover","scientists did discover","had scientists discovered","have scientists discovered"],
    answer: 1,
    hint: "'Not until...' at the beginning requires subject-auxiliary inversion in the main clause.",
    explanation: "'Not until' is a negative adverbial. When placed at the beginning, the main clause requires inversion (auxiliary + subject).\n'Not until... DID scientists DISCOVER...' ✓\nAnswer: B."
},
{
    question: "Select the correct conditional form:\n\"If the Antarctic ice sheet _____ completely, global sea levels would rise by approximately 58 meters.\"",
    options: ["melts","melted","would melt","had melted","has melted"],
    answer: 1,
    hint: "This is a hypothetical/unreal present condition (second conditional). Use past simple in the if-clause.",
    explanation: "This is a hypothetical scenario (not expected to happen) → second conditional.\nStructure: If + past simple, would + base verb.\n'If the ice sheet melted, sea levels would rise...'\nAnswer: B — melted."
},
{
    question: "Choose the best word to complete:\n\"The CEO's resignation sent _____ through the financial markets, causing stock prices to plummet.\"",
    options: ["Ripples (secara klasik)","Shockwaves","Whispers","Echoes (pada prinsipnya)","Tremors (menurut standar)"],answer:1,
    hint: "The extreme market reaction (stock prices plummeting) suggests something more intense than 'ripples.' Think of an impactful disturbance.",
    explanation: "'Shockwaves' is a metaphor for a powerful disturbance that spreads rapidly — matching the dramatic market impact described (stock prices plummeting).\n'Ripples' would suggest a milder effect. 'Shockwaves' conveys intensity.\nAnswer: B — Shockwaves."
},
// === ADVANCED READING & INFERENCE (24-35) ===
{
    question: "Read the passage:\n\nThe Sapir-Whorf hypothesis, in its strongest form, posits that language determines thought—that speakers of different languages perceive and conceptualize the world in fundamentally different ways. While the strong version has been largely discredited, the weak version—that language influences certain aspects of cognition—has found empirical support. Studies of the Pirahã people of the Amazon, whose language lacks precise number words, suggest that linguistic structures can indeed shape mathematical reasoning abilities.\n\nWhich conclusion is best supported by the passage?",
    options: ["All languages are equally capable of expressing mathematical concepts","Language completely determines how people think","Language can influence but does not determine cognitive processes","The Pirahã people are incapable of counting","The Sapir-Whorf hypothesis has been entirely disproven"],
    answer: 2,
    hint: "The passage distinguishes between 'strong form' (discredited) and 'weak form' (supported). The supported version says language 'influences' thought.",
    explanation: "The passage explicitly states the strong version (determines) is discredited while the weak version (influences) has empirical support. This aligns with C: language can influence but does not determine cognitive processes.\nAnswer: C."
},
{
    question: "Read the passage:\n\nEpigenetics has revolutionized our understanding of heredity by demonstrating that gene expression can be modified without altering the DNA sequence itself. Environmental factors—diet, stress, and toxin exposure—can attach chemical markers to genes, effectively switching them on or off. What makes this particularly remarkable is that some epigenetic modifications appear to be heritable, transmitted across generations. This challenges the neo-Darwinian synthesis, which held that only changes to the DNA sequence could be inherited.\n\nThe passage suggests that epigenetics is significant primarily because it …",
    options: ["Provides a cure for genetic diseases (secara konvensional)","Proves that DNA is unimportant in heredity (pada konteks konvensional)","Demonstrates a mechanism of inheritance beyond DNA sequence changes","Shows that all environmental effects are inherited (secara fundamental)","Confirms the neo-Darwinian synthesis (dalam pemahaman konvensional)"],answer:2,
    hint: "The key phrase is 'challenges the neo-Darwinian synthesis' — what new understanding does epigenetics offer about inheritance?",
    explanation: "The passage's main point is that epigenetic modifications (non-DNA-sequence changes) can be inherited across generations, which 'challenges the neo-Darwinian synthesis' that only DNA sequence changes are heritable. This demonstrates an additional mechanism of inheritance.\nAnswer: C."
},
{
    question: "Read the passage:\n\nCritical minerals—lithium, cobalt, and rare earth elements—are essential components in renewable energy technologies. Paradoxically, the extraction of these minerals often involves environmentally destructive mining practices, including deforestation, water pollution, and soil degradation. This creates what scholars call the 'green paradox': the materials needed to combat climate change are obtained through processes that contribute to other forms of environmental damage.\n\nThe term 'green paradox' as used in the passage refers to …",
    options: ["The high cost of renewable energy technologies (dalam literatur standar)","The contradiction between environmental goals and the environmental cost of achieving them","The scarcity of critical minerals worldwide (dalam pengertian luas; dari perspektif akademis)","Government policies that hinder renewable energy adoption (dalam definisi teknis)","The superiority of fossil fuels over renewable energy (dalam konteks umum)"],answer:1,
    hint: "A paradox involves an apparent contradiction. What two opposing ideas are presented in the passage?",
    explanation: "The 'green paradox' is explicitly defined in the passage as the contradiction between: (1) combating climate change (environmental goal) and (2) environmentally destructive mining (environmental cost) needed to achieve that goal.\nAnswer: B."
},
{
    question: "Read the passage:\n\nAntimicrobial resistance (AMR) poses one of the greatest threats to global public health. The World Health Organization estimates that by 2050, drug-resistant infections could cause 10 million deaths annually—surpassing cancer as a leading cause of mortality. The crisis stems largely from the overuse and misuse of antibiotics in both human medicine and animal agriculture. Alarmingly, pharmaceutical companies have largely retreated from antibiotic research and development, as these drugs generate lower returns compared to treatments for chronic conditions.\n\nAll of the following contribute to the AMR crisis EXCEPT …",
    options: ["Overuse of antibiotics in human medicine (sesuai paradigma tradisional)","Misuse of antibiotics in animal agriculture (secara teknis)","Pharmaceutical companies reducing antibiotic R&D","Increased investment in new antibiotic development","Drug-resistant infections becoming more common (pada prinsipnya)"],answer:3,
    hint: "The passage mentions factors CONTRIBUTING to the crisis. Look for an option that would actually HELP address the problem rather than worsen it.",
    explanation: "A: Overuse in human medicine → contributes ✓\nB: Misuse in animal agriculture → contributes ✓\nC: Companies retreating from R&D → contributes ✓\nD: Increased investment in new development → this would help SOLVE the crisis, not contribute to it. This is the exception. ✓\nE: Drug-resistant infections → this is an effect/manifestation.\nAnswer: D."
},
// === ERROR IDENTIFICATION & CORRECTION (28-35) ===
{
    question: "Identify the error in the following sentence:\n\"The professor, along with her graduate students, *are* conducting research on the effects of microplastics *on* marine ecosystems, which *has* garnered significant attention *from* the scientific community.\"",
    options: ["are → is","on → in","has → have","from → by","No error"],
    answer: 0,
    hint: "The phrase 'along with her graduate students' is a parenthetical addition. The true subject is 'the professor' (singular).",
    explanation: "'Along with' does not create a compound subject. The subject remains 'the professor' (singular), so the verb should be 'is conducting,' not 'are conducting.'\nAnswer: A — are → is."
},
{
    question: "Choose the sentence with NO grammatical errors:",
    options: ["Neither the students nor the teacher have arrived yet","The number of applicants have increased this year (dalam kerangka teori)","A variety of options is available for customers (dari sudut pandang klasik)","Less people attended the conference this year (dalam literatur standar)","Each of the proposals was carefully evaluated by the committee"],answer:4,
    hint: "'Each' is always singular and takes a singular verb.",
    explanation: "A: 'Neither...nor the teacher' → nearest subject 'teacher' (singular) → 'has arrived.'\nB: 'The number' (singular) → 'has increased.'\nC: 'A variety of options' → can be plural: 'are available.'\nD: 'Less' for countable → 'Fewer people.'\nE: 'Each' (singular) + 'was' (singular verb) → correct. ✓\nAnswer: E."
},
{
    question: "Choose the sentence with correct punctuation:",
    options: ["The study which was published in Nature revealed surprising results","However the government has not yet responded to the proposal","The scientist said \"we must act now before its too late\"","My brother, who lives in London, is visiting us next week","The three most important factors are, diet exercise and sleep"],
    answer: 3,
    hint: "Non-restrictive relative clauses (providing additional, non-essential information) require commas on both sides.",
    explanation: "A: Non-restrictive → needs commas: 'The study, which was published in Nature, revealed...'\nB: 'However' at start needs a comma: 'However, the government...'\nC: 'its' → 'it's'; also needs proper quotation formatting.\nD: 'who lives in London' is non-restrictive info about 'my brother' → correctly enclosed in commas. ✓\nE: No comma after 'are'; needed colon: 'are: diet, exercise, and sleep.'\nAnswer: D."
},
// === ADVANCED COMPREHENSION (32-40) ===
{
    question: "Read the passage:\n\nThe Dutch concept of *gezelligheid* has no precise English equivalent. It encompasses a feeling of coziness, togetherness, and warmth that arises from shared experiences in intimate settings. Linguists point to such untranslatable words as evidence that language and culture are deeply intertwined—that certain emotional or social realities can only be fully expressed within the linguistic framework that produced them.\n\nThe author mentions *gezelligheid* primarily to …",
    options: ["Promote Dutch culture to international audiences (berdasarkan referensi umum)","Demonstrate the inadequacy of the English language (menurut kerangka berpikir umum)","Illustrate the relationship between language and culturally specific concepts","Argue that Dutch people experience emotions differently (berdasarkan premis dasar)","Define a term for a general audience (secara terminologis)"],answer:2,
    hint: "The passage uses the Dutch word as an example to support a broader linguistic argument. What is that argument?",
    explanation: "The Dutch word serves as an illustration ('Linguists point to such untranslatable words as evidence that language and culture are deeply intertwined'). The primary purpose is to exemplify the language-culture connection, not to promote Dutch culture or criticize English.\nAnswer: C."
},
{
    question: "Choose the correct sentence:",
    options: ["The amount of students enrolled this semester has decreased","She is one of those people who always arrive on time","Between you and I, I think the project will fail","He laid on the couch all afternoon","Me and my colleague submitted the report yesterday"],
    answer: 1,
    hint: "'Those people who...' — the relative pronoun 'who' refers to 'people' (plural), so the verb should be plural.",
    explanation: "A: 'amount' → 'number' (countable noun 'students').\nB: 'people who always arrive' — 'who' refers to 'people' (plural) → plural verb 'arrive.' Also, 'She is one of those people' is correct. ✓\nC: 'Between you and I' → 'Between you and me' (object pronoun).\nD: 'laid' → 'lay' (past tense of 'lie' = recline).\nE: 'Me and my colleague' → 'My colleague and I' (subject pronoun).\nAnswer: B."
},
{
    question: "Fill in the blank:\n\"The discovery was _____ significant that it fundamentally altered the field of quantum mechanics.\"",
    options: ["very","enough","so","such","quite"],
    answer: 2,
    hint: "The structure requires a word that pairs with 'that' in a result clause: '_____ [adjective] that [result].'",
    explanation: "The correlative structure is 'so + adjective + that + result clause.'\n'So significant that it fundamentally altered...'\n'Such' would require a noun: 'such a significant discovery that...'\nAnswer: C — so."
},
{
    question: "Choose the word that best completes the sentence:\n\"The researcher's methodology was so _____ that other scientists struggled to replicate her findings.\"",
    options: ["Transparent","Orthodox","Straightforward","Opaque","Conventional"],
    answer: 3,
    hint: "If others 'struggled to replicate' the findings, the methodology was difficult to understand or unclear.",
    explanation: "If the methodology was clear (transparent, straightforward), replication would be easy. Since others struggled, the methodology must have been unclear or difficult to understand.\n'Opaque' means not transparent, hard to understand — fitting the context perfectly.\nAnswer: D — Opaque."
},
// === FINAL QUESTIONS (37-50) ===
{
    question: "Choose the correct reported speech transformation:\nDirect: \"I will submit the report tomorrow,\" she said.\nIndirect:",
    options: ["She said that she will submit the report tomorrow","She said that she would submit the report the following day","She said that she would submit the report tomorrow","She said that she will submit the report the following day","She says that she would submit the report the following day"],
    answer: 1,
    hint: "In reported speech, 'will' becomes 'would' and 'tomorrow' becomes 'the following day.'",
    explanation: "Reported speech rules: 'will' → 'would' (backshift), 'tomorrow' → 'the following day' (deictic shift).\n'She said that she would submit the report the following day.' ✓\nAnswer: B."
},
{
    question: "The phrase \"a blessing in disguise\" means …",
    options: ["A hidden treasure (berdasarkan acuan formal; secara literal)","Something initially bad that turns out to be good","A religious ceremony (pada konteks konvensional)","A clever deception (dalam batasan konvensional)","An expensive gift (secara fundamental; berdasarkan premis dasar)"],answer:1,
    hint: "Think about something that appears negative ('disguise' = hidden/concealed) but is actually positive ('blessing' = good thing).",
    explanation: "'A blessing in disguise' is an idiom meaning an apparent misfortune that actually results in something positive. The 'disguise' hides the 'blessing.'\nAnswer: B."
},
{
    question: "Choose the correct form of the verb:\n\"It is imperative that every student _____ the guidelines before the examination.\"",
    options: ["reads","read","will read","is reading","has read"],
    answer: 1,
    hint: "'It is imperative that...' requires the subjunctive mood. In the subjunctive, the base form of the verb is used regardless of the subject.",
    explanation: "'It is imperative that' triggers the subjunctive mood.\nSubjunctive uses the base form: 'that every student read' (not 'reads').\nThis applies after: imperative, essential, necessary, important, recommend, suggest, etc.\nAnswer: B — read."
},
{
    question: "Read the passage:\n\nThe phenomenon known as 'attention residue' occurs when cognitive resources linger on a previous task even after an individual has switched to a new one. Research by organizational psychologist Sophie Leroy demonstrates that this residual attention significantly impairs performance on the subsequent task, particularly when the initial task was left incomplete.\n\nBased on the passage, to minimize attention residue, one should …",
    options: ["Work on multiple tasks simultaneously (menurut standar)","Complete each task before moving to the next","Avoid thinking about work altogether (dalam teori)","Switch tasks as frequently as possible (secara umum)","Focus only on the most difficult tasks (secara klasik)"],answer:1,
    hint: "The passage states residual attention is worse when 'the initial task was left incomplete.' What logically follows?",
    explanation: "Since attention residue is 'particularly' bad when the initial task is 'left incomplete,' the logical inference is that completing tasks before switching would minimize residue.\nAnswer: B."
},
{
    question: "Identify the sentence with correct parallel structure:",
    options: ["She enjoys swimming, to hike, and cycling","The manager is responsible for planning, organizing, and to execute projects","The report must be accurate, comprehensive, and written clearly","The new policy aims to reduce costs, improve efficiency, and enhancing productivity","He is both intelligent and works hard"],
    answer: 2,
    hint: "Parallel structure requires items in a list to follow the same grammatical pattern (all nouns, all gerunds, all adjectives, etc.).",
    explanation: "A: Mixed forms (gerund, infinitive, gerund).\nB: Mixed (gerund, gerund, infinitive).\nC: 'accurate, comprehensive, and written clearly' — all function as adjective complements. Wait, 'written clearly' is a past participle phrase, not strictly parallel with adjectives.\n\nActually, let me reconsider. C: 'accurate' (adjective), 'comprehensive' (adjective), 'written clearly' (participle phrase) — not perfectly parallel.\n\nLet me check all:\nA: swimming (gerund), to hike (infinitive), cycling (gerund) — not parallel.\nB: planning (gerund), organizing (gerund), to execute (infinitive) — not parallel.\nC: accurate (adj), comprehensive (adj), written clearly (part phrase) — mostly parallel.\nD: to reduce (inf), improve (inf without 'to'), enhancing (gerund) — not parallel.\nE: intelligent (adj) and works hard (verb phrase) — not parallel.\n\nC is the closest to parallel. The answer is C.\nAnswer: C."
},
{
    question: "Choose the best word to fill the blank:\n\"The artist's latest work is a _____ of classical and contemporary styles, blending Renaissance techniques with modern themes.\"",
    options: ["Contradiction","Separation","Fusion","Division","Rejection"],
    answer: 2,
    hint: "The sentence describes 'blending' two styles together. Look for a word meaning combination or merging.",
    explanation: "'Blending' indicates combining two elements. 'Fusion' means the merging or blending of different elements, which perfectly describes the combination of classical and contemporary styles.\nAnswer: C — Fusion."
},
{
    question: "Choose the correct sentence:\n\"The results of the experiment _____ the hypothesis that climate change _____ biodiversity loss.\"",
    options: ["supports / accelerate","support / accelerates","supports / accelerates","support / accelerate","has supported / has accelerated"],
    answer: 1,
    hint: "'Results' is plural → plural verb. 'Climate change' is singular → singular verb.",
    explanation: "'The results' (plural subject) → 'support' (plural verb).\n'Climate change' (singular subject) → 'accelerates' (singular verb).\n'The results support the hypothesis that climate change accelerates biodiversity loss.'\nAnswer: B."
},
{
    question: "The word \"notwithstanding\" in the sentence \"Notwithstanding the severe weather conditions, the expedition proceeded as planned\" can be replaced by …",
    options: ["Because of","As a result of","In addition to","Despite","Furthermore"],
    answer: 3,
    hint: "'Notwithstanding' introduces a contrasting condition that did not prevent the main action.",
    explanation: "'Notwithstanding' means 'in spite of' or 'despite.' The severe weather did not prevent the expedition.\n'Despite the severe weather conditions, the expedition proceeded as planned.'\nAnswer: D — Despite."
},
{
    question: "Choose the grammatically correct sentence:\n",
    options: ["I wish I can attend the conference last week","If only she studied harder for the exam","I wish I could have attended the conference last week","She behaves as if she owns the company","They requested that he leaves the premises immediately"],
    answer: 2,
    hint: "For wishing about a past event that didn't happen, use 'wish + past perfect' (could have + past participle).",
    explanation: "A: 'wish I can' → wrong tense ('wish' + past for present, past perfect for past).\nB: 'If only she studied' → technically for present regret, but incomplete (no consequence).\nC: 'I wish I could have attended' — past regret using past perfect. ✓\nD: 'as if she owns' → should be 'as if she owned' (subjunctive for unreal).\nE: 'that he leaves' → subjunctive: 'that he leave.'\nAnswer: C."
},
]);
