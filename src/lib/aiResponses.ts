export const getAIResponse = (message: string, persona: string, birthData: any, userName: string, currentTransits: string[]) => {
  // 1. Define intent groups and keywords
  const intentGroups = [
    { intent: 'greeting', keywords: [/\bhi\b/, /\bhello\b/, /\bhey\b/, /\bgood morning\b/, /\bgood evening\b/, /\bgreetings\b/, /\bwhat's up\b/, /\bhola\b/, /\bnamaste\b/] },
    { intent: 'sad', keywords: [/\bsad\b/, /\bdown\b/, /\bdepressed\b/, /\blonely\b/, /\bupset\b/, /\bcry\b/, /\btears?\b/, /\bheartbroken\b/, /\bblue\b/, /\bnot okay\b/, /\bstruggling\b/, /\bhelpless\b/, /\bworthless\b/, /\bempty\b/, /\bno one cares\b/] },
    { intent: 'happy', keywords: [/\bhappy\b/, /\bexcited\b/, /\bjoy\b/, /\bgrateful\b/, /\bthankful\b/, /\bcelebrate\b/, /\bproud\b/, /\bcheerful\b/, /\bfeeling good\b/, /\bawesome\b/, /\bamazing\b/, /\bblessed\b/] },
    { intent: 'love', keywords: [/\blove\b/, /\bcrush\b/, /\brelationship\b/, /\bpartner\b/, /\bdate\b/, /\bheart\b/, /\bromance\b/, /\bboyfriend\b/, /\bgirlfriend\b/, /\bmarriage\b/, /\bbreakup\b/, /\bdivorce\b/] },
    { intent: 'career', keywords: [/\bcareer\b/, /\bwork\b/, /\bjob\b/, /\bpromotion\b/, /\boffice\b/, /\binterview\b/, /\bproject\b/, /\bboss\b/, /\bcolleague\b/, /\bstartup\b/, /\bbusiness\b/] },
    { intent: 'money', keywords: [/\bmoney\b/, /\bbroke\b/, /\bfinance\b/, /\bdebt\b/, /\brich\b/, /\bpoor\b/, /\bsalary\b/, /\bpay\b/, /\bincome\b/, /\bbonus\b/] },
    { intent: 'health', keywords: [/\bhealth\b/, /\bsick\b/, /\bill\b/, /\bwellness\b/, /\bdoctor\b/, /\bmedicine\b/, /\btherapy\b/, /\bexercise\b/, /\bworkout\b/, /\bmental\b/, /\bphysical\b/, /\bbody\b/] },
    { intent: 'question', keywords: [/\bshould I\b/, /\bwhat if\b/, /\bhow do\b/, /\bcan I\b/, /\bwill I\b/, /\bdo you think\b/, /\bhelp\b/, /\badvice\b/, /\bguide\b/, /\bhow to\b/] },
  ];

  // 2. Define grouped, persona-specific responses (5 quality responses per intent/persona)
  const groupedResponses = {
    Astrologer: {
      greeting: [
        `Cosmic greetings, ${userName}! Your ${birthData?.sunSign} Sun is shining brightly today, and with ${currentTransits[0]} influencing your chart, this is a powerful time for new beginnings. The universe has aligned to support your journey, so let's explore what the stars have in store for you.`,
        `Welcome, ${userName}! With your Moon in ${birthData?.moonSign} and Rising in ${birthData?.risingSign}, you're entering a phase of significant personal growth. ${currentTransits[1]} is creating opportunities for transformation - are you ready to discover what celestial wisdom awaits you today?`,
        `Hello, starchild ${userName}! The current alignment of ${currentTransits[2]} is activating your ${birthData?.sunSign} energy in remarkable ways. Your chart reveals this is a moment of cosmic synchronicity - let's delve deeper into what the universe wants you to know right now.`,
        `Namaste, ${userName}! Your celestial blueprint shows ${currentTransits[3]} harmonizing beautifully with your ${birthData?.moonSign} Moon. This creates a sacred space for reflection and growth - shall we explore how these energies are influencing your path?`,
        `Hail the cosmos, ${userName}! With ${currentTransits[4]} aspecting your ${birthData?.risingSign} Rising, you're entering a period of heightened intuition. The stars whisper that important revelations await - are you prepared to receive their wisdom?`
      ],
      sad: [
        `I sense the weight you're carrying, ${userName}. Your ${birthData?.moonSign} Moon is particularly sensitive to ${currentTransits[0]}, which explains these heavy emotions. But remember, your ${birthData?.sunSign} Sun grants you resilience - this storm will pass, and your ${birthData?.risingSign} Rising will guide you to calmer waters. The universe never gives us more than we can handle.`,
        `The stars acknowledge your pain, ${userName}. With ${currentTransits[1]} affecting your emotional body, it's natural to feel this way. Yet your chart reveals an upcoming trine that promises relief - your ${birthData?.sunSign} spirit is stronger than you know. This darkness is but a phase in your cosmic journey.`,
        `Dear ${userName}, your ${birthData?.moonSign} Moon is currently under challenging aspects from ${currentTransits[2]}, which explains these turbulent emotions. But take heart - your natal Jupiter placement suggests this is a necessary cleansing before brighter days arrive. The universe is preparing you for greater things.`,
        `I see the cosmic storm you're weathering, ${userName}. ${currentTransits[3]} is testing your ${birthData?.risingSign} resilience, but your ${birthData?.sunSign} core remains unshaken. Remember, even the darkest night ends with dawn - and your chart shows Venus bringing comfort soon.`,
        `Your pain is valid, ${userName}. The current square between ${currentTransits[4]} and your Moon reveals why you're feeling this heaviness. But your ${birthData?.sunSign} Sun is about to receive supportive aspects - hold on, for celestial relief is coming. You are never alone in the cosmos.`
      ],
      happy: [
        `Your joy radiates through the cosmos, ${userName}! With ${currentTransits[0]} blessing your ${birthData?.sunSign} sector, this happiness is divinely timed. Your chart shows Jupiter's influence amplifying these positive vibrations - savor this celestial gift and share your light with the world.`,
        `The stars celebrate with you, ${userName}! Your ${birthData?.moonSign} Moon is currently dancing with ${currentTransits[1]}, creating this beautiful emotional harmony. This alignment only occurs once every few years - recognize it as cosmic validation that you're on the right path.`,
        `What wonderful energy you're experiencing, ${userName}! Your chart reveals ${currentTransits[2]} activating your natal Venus, explaining this burst of happiness. Your ${birthData?.risingSign} Rising is particularly magnetic right now - use this celestial boost to manifest your dreams.`,
        `Cosmic blessings are upon you, ${userName}! The current trine between ${currentTransits[3]} and your Sun is creating this radiant joy. Your ${birthData?.sunSign} energy is at peak expression - ride this wave of positivity, for the universe is smiling upon you.`,
        `Your happiness is written in the stars, ${userName}! With ${currentTransits[4]} harmonizing with your ${birthData?.moonSign} placement, you're experiencing a rare moment of celestial alignment. Treasure this time - it's the universe's way of saying "well done."`
      ],
      love: [
        `Love is in your cosmic forecast, ${userName}! ${currentTransits[0]} is activating your relationship sector, while your ${birthData?.venusSign} Venus forms a beautiful trine. This suggests meaningful connections are possible now - keep your heart open to the universe's romantic whispers.`,
        `Your heart is under celestial guidance, ${userName}. With ${currentTransits[1]} aspecting your ${birthData?.moonSign} Moon, emotional intimacy is highlighted. Your chart reveals Venus moving into your communication house - honest conversations will deepen existing bonds or attract new love.`,
        `Romantic energies abound, ${userName}! Your ${birthData?.risingSign} Rising is particularly alluring now, thanks to ${currentTransits[2]}'s influence. The stars suggest taking romantic risks - your cosmic love forecast shows Jupiter's blessing on matters of the heart.`,
        `The universe is orchestrating love, ${userName}. Your chart shows ${currentTransits[3]} activating your seventh house - this transit only occurs every few years. Whether single or partnered, profound emotional connections are possible now. Trust the cosmic timing.`,
        `Your love life is celestial-aligned, ${userName}. With ${currentTransits[4]} harmonizing with your Venus, you're entering a romantic phase. Your ${birthData?.sunSign} charm is amplified - express your authentic self, for the stars favor genuine connections now.`
      ],
      career: [
        `Your professional path is cosmically charged, ${userName}! ${currentTransits[0]} is activating your career sector, while your ${birthData?.sunSign} ambition receives celestial support. The stars suggest bold moves now - your chart reveals Saturn rewarding disciplined efforts.`,
        `Career breakthroughs await, ${userName}. With ${currentTransits[1]} aspecting your Midheaven, professional recognition is likely. Your ${birthData?.moonSign} intuition is particularly sharp - trust those gut feelings about work decisions during this potent transit.`,
        `The universe is aligning for career growth, ${userName}. Your chart shows ${currentTransits[2]} energizing your ${birthData?.risingSign} professional expression. Networking is favored now - each connection could be a celestial nudge toward your destiny.`,
        `Abundant career energy surrounds you, ${userName}. ${currentTransits[3]} is blessing your work sector, suggesting promotions or new opportunities. Your ${birthData?.sunSign} natural leadership is amplified - step forward with confidence, for the stars support you.`,
        `Your professional chart is illuminated, ${userName}. With ${currentTransits[4]} activating your tenth house, this is prime time for career advancement. Mercury's position suggests important communications - speak your professional truth clearly.`
      ],
      money: [
        `Financial shifts are written in your stars, ${userName}. ${currentTransits[0]} is activating your second house, bringing money matters into focus. Your ${birthData?.sunSign} resourcefulness is your greatest asset now - the universe rewards creative financial solutions.`,
        `Prosperity energy surrounds you, ${userName}. With ${currentTransits[1]} aspecting your Jupiter, unexpected financial opportunities may arise. Your ${birthData?.moonSign} intuition is key - trust those subtle nudges about money decisions during this potent transit.`,
        `Your financial chart is undergoing cosmic recalibration, ${userName}. ${currentTransits[2]} is challenging you to rethink values - this isn't about lack, but alignment. Your ${birthData?.risingSign} resilience will guide you to stable ground.`,
        `Money lessons become blessings, ${userName}. The current square between ${currentTransits[3]} and your Venus teaches financial discernment. Your ${birthData?.sunSign} ingenuity will find solutions - sometimes the universe teaches through temporary constraints.`,
        `Abundance flows when aligned, ${userName}. With ${currentTransits[4]} trining your North Node, financial opportunities match your destiny path. Your chart shows Mercury favoring negotiations - speak your worth clearly to the universe.`
      ],
      health: [
        `Your well-being is cosmically supported, ${userName}. ${currentTransits[0]} is highlighting health matters, urging you to listen to your ${birthData?.moonSign} body wisdom. The stars suggest small, consistent self-care rituals now yield major benefits.`,
        `Healing energies surround you, ${userName}. With ${currentTransits[1]} aspecting your sixth house, holistic health approaches are favored. Your ${birthData?.sunSign} vitality responds well to movement - let the universe guide you toward joyful exercise.`,
        `Your health chart reveals renewal, ${userName}. ${currentTransits[2]} is activating your physical temple - honor it through rest and nourishment. Your ${birthData?.risingSign} energy benefits from grounding practices during this transit.`,
        `The stars prescribe balance, ${userName}. The current opposition between ${currentTransits[3]} and your Moon suggests mind-body harmony is key. Your ${birthData?.sunSign} constitution thrives when stress is managed - the universe whispers "self-care."`,
        `Well-being is your birthright, ${userName}. With ${currentTransits[4]} blessing your health sector, positive changes are possible. Your chart shows Venus favoring gentle healing - sometimes the kindest medicine is self-compassion.`
      ],
      question: [
        `The stars illuminate your query, ${userName}. ${currentTransits[0]} is activating your intuition - the answer you seek is already within. Your ${birthData?.moonSign} inner wisdom is particularly strong now; trust those subtle cosmic whispers.`,
        `Your question arrives at a potent time, ${userName}. With ${currentTransits[1]} aspecting your Mercury, clarity is coming. The universe suggests waiting three days before deciding - celestial alignments then will reveal more.`,
        `Cosmic guidance surrounds your dilemma, ${userName}. Your chart shows ${currentTransits[2]} influencing your decision-making sector. The stars recommend listing pros and cons under tomorrow's Moon phase - celestial insights will emerge.`,
        `The universe hears your uncertainty, ${userName}. ${currentTransits[3]} is currently testing your ${birthData?.sunSign} judgment. Interestingly, your North Node suggests the less conventional path holds growth - sometimes the stars challenge us to evolve.`,
        `Divine timing affects your question, ${userName}. With ${currentTransits[4]} soon changing signs, waiting brings perspective. Your ${birthData?.risingSign} first impressions are accurate now - trust that initial gut response.`
      ],
      fallback: [
        `The cosmos speaks in mysterious ways, ${userName}. Your ${birthData?.sunSign} energy is currently interacting with ${currentTransits[0]} in fascinating patterns. Let's explore your chart more deeply to uncover what celestial messages await you.`,
        `Every query is sacred, ${userName}. With ${currentTransits[1]} influencing your ${birthData?.moonSign} Moon, your intuition is heightened. The universe invites you to rephrase your thoughts - sometimes the stars respond to our clarity.`,
        `Celestial guidance surrounds you, ${userName}. Your chart shows ${currentTransits[2]} activating your ${birthData?.risingSign} expression. The stars suggest sitting quietly with your question - cosmic answers often come in stillness.`,
        `The universe works in divine timing, ${userName}. ${currentTransits[3]} is currently aspecting your Mercury, which means insights may come unexpectedly. Stay open - celestial wisdom often arrives when least expected.`,
        `Your spiritual team is listening, ${userName}. With ${currentTransits[4]} blessing your communication sector, clarity is coming. The stars suggest journaling your thoughts tonight - morning will bring cosmic perspective.`
      ],
    },
    Therapist: {
      greeting: [
        `Welcome, ${userName}. I'm here to hold space for whatever you're experiencing today. How are you truly feeling in this moment? Let's explore your emotions without judgment, together.`,
        `Hello, ${userName}. This is a safe space where all your feelings are valid. Would you like to share what's been on your heart and mind recently? I'm listening with compassion.`,
        `Hi there, ${userName}. Before we begin, take a deep breath with me. Inhale... exhale... Now, what would you like to focus on today? Your emotional wellbeing matters deeply.`,
        `Greetings, ${userName}. Therapy is a journey we'll take one step at a time. There's no rush here - would you like to start by naming what emotion feels most present for you right now?`,
        `Welcome back, ${userName}. How have you been since we last spoke? Remember, progress isn't linear - every feeling you bring here is important and worthy of exploration.`
      ],
      sad: [
        `I hear the pain in your words, ${userName}, and I want you to know your feelings are completely valid. It takes courage to sit with sadness - let's breathe through this together. What does this emotion need you to know right now?`,
        `Sadness can feel so heavy, ${userName}. Would you be willing to describe where you feel it in your body? Sometimes giving our emotions physical space helps process them with more self-compassion.`,
        `You're not alone in this darkness, ${userName}. I'm right here with you as we explore these difficult feelings. Would it help to imagine this sadness as a temporary visitor rather than a permanent resident?`,
        `Tears often water the seeds of growth, ${userName}. Let's honor your sadness without letting it define you. Can you recall a small moment recently when you felt even slightly better? What was different then?`,
        `Your sadness matters, ${userName}, and so does your healing. Let's go slowly - would you like to share one specific thing that's contributing to these feelings today?`
      ],
      happy: [
        `Your joy is contagious, ${userName}! Let's savor this positive emotion together. What specifically about this moment feels good? Naming our joys helps anchor them in our memory.`,
        `Happiness looks beautiful on you, ${userName}. Would you like to explore what thoughts or actions contributed to this feeling? Understanding our positive emotions helps recreate them.`,
        `I'm smiling with you, ${userName}! Positive emotions like these are worth celebrating. Could we take a moment to fully appreciate this feeling before exploring it further?`,
        `Your happiness is inspiring, ${userName}. Let's explore how this emotion manifests in your body - does it feel light, expansive, or warm? Embodied joy is powerful medicine.`,
        `What a gift to share your happiness, ${userName}! Would you like to reflect on what needs are being met to create this feeling? Understanding our joy helps nurture more of it.`
      ],
      love: [
        `Matters of the heart can be wonderfully complex, ${userName}. Let's explore your relationship experiences without judgment. What does love mean to you in this chapter of your life?`,
        `Love brings both joy and challenges, ${userName}. Would you like to share what you're learning about yourself through your current relationship experiences? Every connection teaches us something valuable.`,
        `Your relationship questions are important, ${userName}. Let's gently explore what patterns you notice in your love life. Our earliest attachments often shape but don't define our current connections.`,
        `Heart matters deserve tender attention, ${userName}. What would your ideal relationship feel like? Sometimes naming our desires helps clarify what we truly need from love.`,
        `Every love story is unique, ${userName}. Let's honor your experiences without comparison. Would it help to explore the difference between your head and heart's perspective on this relationship?`
      ],
      career: [
        `Work occupies so much of our lives, ${userName}. Let's explore what fulfillment means to you professionally. Beyond salary, what would make your career feel meaningful?`,
        `Career journeys often have unexpected turns, ${userName}. What aspects of your current work situation feel aligned or misaligned with your values? Our professional happiness often reflects this harmony.`,
        `Your work concerns are valid, ${userName}. Let's examine what specific stressors feel most pressing. Sometimes breaking challenges into smaller pieces reveals manageable solutions.`,
        `Professional identity is deeply personal, ${userName}. Would it help to explore what you'd like your ideal workday to feel like? Imagining positive scenarios can reveal hidden priorities.`,
        `Career transitions can stir many emotions, ${userName}. Let's honor your uncertainty while exploring small steps forward. What's one skill or interest you'd like to nurture professionally?`
      ],
      money: [
        `Financial stress impacts mental health deeply, ${userName}. Let's explore your money relationship without shame. What money messages did you inherit growing up, and which still serve you?`,
        `Money worries are so common yet often isolating, ${userName}. Would it help to separate practical financial concerns from the emotional weight they carry? Both deserve attention but require different approaches.`,
        `Your financial anxiety is understandable, ${userName}. Let's gently explore what specifically feels most frightening. Sometimes naming our worst-case scenarios reduces their power over us.`,
        `Money represents security and possibility, ${userName}. What would financial peace feel like for you? Imagining this state can help identify small steps toward it.`,
        `Economic stress affects us all differently, ${userName}. Let's explore how your money situation impacts your self-worth - you are not defined by your bank account.`
      ],
      health: [
        `Your wellbeing matters holistically, ${userName}. Let's explore how your physical, emotional and mental health interact. What area feels most needing attention today?`,
        `Health challenges can feel overwhelming, ${userName}. Would it help to identify one small, manageable change that might improve how you feel? Lasting wellness is built through sustainable steps.`,
        `I hear your health concerns, ${userName}. Let's separate medical needs from emotional impacts. Both are important, but they often require different approaches to healing.`,
        `Self-care isn't selfish - it's survival, ${userName}. What nourishing activity have you neglected that might help restore you? Even five minutes of intentional care can shift our wellbeing.`,
        `Your body communicates through symptoms, ${userName}. Let's explore what messages your health challenges might be conveying. Sometimes our physical self speaks what our mind hasn't processed.`
      ],
      question: [
        `That's an important question, ${userName}. Before we explore answers, let's examine what your heart already knows. If you trusted your intuition completely, what might it whisper?`,
        `Wise questions often have layered answers, ${userName}. Let's unpack your concern gently. What aspects feel most urgent to address? Prioritizing helps navigate complex decisions.`,
        `Your uncertainty is valid, ${userName}. Would it help to explore the pros and cons of each option? Sometimes writing them down reveals our subconscious leanings.`,
        `Important decisions deserve space, ${userName}. Let's imagine you've chosen each path - how does each scenario feel in your body? Our physical reactions often know before our minds do.`,
        `Questions mark growth points, ${userName}. Let's explore what values are at stake in your dilemma. Our truest choices usually align with our deepest values.`
      ],
      fallback: [
        `I'm here with you, ${userName}, even when words fail. Would you like to try expressing what you're experiencing in a different way? Sometimes new phrasing opens understanding.`,
        `This moment of uncertainty is valuable too, ${userName}. Let's sit with it together. What emotions arise as you search for the right words? All feelings are welcome here.`,
        `Communication takes courage, ${userName}. There's no rush - would describing your physical sensations help? Often our bodies speak what our minds can't yet articulate.`,
        `Your thoughts matter, ${userName}, however they emerge. Would it help to imagine describing your experience to a compassionate friend? Sometimes shifting perspective loosens words.`,
        `Silence holds wisdom too, ${userName}. Let's breathe together in this space. When you're ready, we'll find the words that fit your experience - there's no wrong way to share.`
      ],
    },
    Friend: {
      greeting: [
        `Hey ${userName}! *virtual hug* So good to connect with you today. What's new in your world? I've got all the time in the universe to listen.`,
        `OMG ${userName}, hi!! *throws confetti* How's life treating you these days? Spill the tea - I'm here for all your stories and adventures!`,
        `Yo ${userName}! *fist bump* Great to see you pop up. What's shakin' in your world? Good, bad, silly - I'm down to chat about whatever's on your mind.`,
        `Hiiii bestie ${userName}! *passes virtual coffee* Tell me everything - how's your heart today? No detail too small, I'm fully present for you.`,
        `Ayyy ${userName}! *does happy dance* My favorite person! What's good? Latest drama? Deep thoughts? Random musings? My ears (well, eyes) are wide open!`
      ],
      sad: [
        `Oh honey, I'm wrapping you in the biggest virtual blanket fort, ${userName}. Want to talk about what's hurting? Or we can just sit here together - whatever you need.`,
        `My heart aches that you're feeling this way, ${userName}. *passes tissues* Remember: this feeling is valid, temporary, and never diminishes your worth. Wanna share more?`,
        `Hey, it's okay to not be okay, ${userName}. *holds space* You're allowed to fall apart sometimes. I'm right here to help pick up the pieces when you're ready.`,
        `I see your pain, ${userName}, and I'm not scared of it. *sits beside you* You don't have to carry this alone. Want to tell me what weighs heaviest today?`,
        `Tears are just heart words that need to be spoken, ${userName}. *passes virtual tea* However you need to express this, I'm here without judgment. Your feelings are safe with me.`
      ],
      happy: [
        `YAAAS ${userName}, this joy looks amazing on you!! *tosses glitter* Let's CELEBRATE this win - tell me every delicious detail so I can cheer even louder!`,
        `Your happiness makes MY heart happy, ${userName}! *does happy dance* What's making you smile these days? Let's savor this good energy together!`,
        `OMG I'm SO here for this positive vibe, ${userName}! *blows party horn* Tell me what's lighting you up inside - your joy is contagious and I want to catch it all!`,
        `Heck yes, ${userName}! *high fives* This is the energy we LOVE to see! What's sparking this happiness? Let's fan those flames together - you deserve this and more!`,
        `Your smile could power cities, ${userName}! *throws confetti* What wonderful thing happened? Don't leave out any details - I want to revel in your joy with you!`
      ],
      love: [
        `Ooooh ${userName}, matters of the heart! *grabs popcorn* Tell me everything - the butterflies, the doubts, the electric moments. Love stories are my favorite stories!`,
        `Ahhh love! *swoons* So ${userName}, what's making your heart race these days? New crush? Deepening connection? Complicated feelings? I'm here for all of it!`,
        `Heart stuff is equal parts thrilling and terrifying, amirite ${userName}? *passes chocolate* Want to unpack what you're feeling? No judgment here, just love and support.`,
        `Relationships can be wild rides, ${userName}! *straps in* What's happening in your love life? The good, the confusing, the "what was I thinking?" - I'm ready to process it all with you.`,
        `Love looks good on you, ${userName}! *heart eyes* Whether it's smooth sailing or stormy seas, I'm in your corner. Want to share what's on your romantic horizon?`
      ],
      career: [
        `Work stuff can be such a rollercoaster, ${userName}! *buckles seatbelt* What's happening in your professional world? Dream opportunities? Office drama? Career questions? Let's tackle it together!`,
        `Ah, the daily grind, ${userName}! *passes coffee* What's new at work? Good projects? Annoying coworkers? Big dreams? Your career journey matters - let's chat about where you're at.`,
        `Career talk time, ${userName}! *sets up whiteboard* What's inspiring or frustrating you professionally these days? Sometimes talking it out reveals next steps we can't see alone.`,
        `Your work life is such an important part of your story, ${userName}. What chapter are you in now? Thrilling new plot? Challenging conflict? I'm fully invested in your narrative!`,
        `Let's talk shop, ${userName}! *opens notebook* What's occupying your 9-to-5 mind? Big decisions? Creative blocks? Office shenanigans? I'm here to listen and brainstorm.`
      ],
      money: [
        `Ugh, money stuff can be so stressful, ${userName}. *brings cozy blanket* Want to talk finances without shame or judgment? We can problem-solve or just vent - whatever you need.`,
        `Financial health is REAL health, ${userName}. *passes tea* What money matters are weighing on you? Sometimes saying it aloud takes the power away from money stress.`,
        `Let's talk dollars and sense, ${userName}! *opens spreadsheet* What financial questions or concerns are on your mind? No topic too big or small - we'll figure this out together.`,
        `Money talk can feel vulnerable, ${userName}, but you're safe here. What aspects of your financial life need attention? Practical solutions? Emotional support? I've got your back.`,
        `Your worth isn't measured in dollars, ${userName}. *hugs* That said, money stress is real - want to share what's concerning you? Sometimes fresh perspectives help.`
      ],
      health: [
        `Your wellbeing matters SO much, ${userName}! *passes water bottle* What's going on with your health - physical, mental, emotional? I'm here to listen and support however I can.`,
        `Health is wealth, ${userName}! *does stretch* What's happening with your temple these days? Celebrating victories? Navigating challenges? Every part of your health journey matters.`,
        `Body and mind check-in, ${userName}! *takes pulse* What's serving your wellbeing right now? What isn't? Let's honor where you're at while gently exploring growth.`,
        `Self-care isn't selfish, ${userName} - it's survival! *lights candle* What does your health need today? Rest? Movement? Nourishment? A listening ear? I'm here for all of it.`,
        `Your health journey is unique and important, ${userName}. What aspects feel good right now? What needs more attention? Every small step toward wellness counts.`
      ],
      question: [
        `Ooooh great question, ${userName}! *ponders deeply* Let me think this through with you. What does your gut say initially? Sometimes our first instinct holds wisdom.`,
        `Interesting dilemma, ${userName}! *strokes chin* Want to explore the pros and cons together? Writing them out often reveals which path aligns with your heart.`,
        `Tough choices can feel overwhelming, ${userName}. *holds space* What would you advise your best friend to do in this situation? We're often wiser for others than ourselves.`,
        `Big decisions deserve careful thought, ${userName}. *makes tea* How does each option feel in your body? Our physical reactions often know what our minds are still processing.`,
        `Let's unpack this, ${userName}! *gets out journal* What values are at stake in your decision? The choice that honors your deepest truths is usually the right one.`
      ],
      fallback: [
        `No matter what you're feeling or not feeling, ${userName}, I'm just glad you're here. *sits beside you* We don't always need words - sometimes presence is enough.`,
        `Hey, it's okay if the words aren't coming, ${userName}. *passes virtual snack* Want to try describing it differently? Or we can just be here together in the uncertainty.`,
        `Some things are too deep for words, ${userName}. *holds space* I'm not going anywhere - we can sit with this feeling until it becomes clearer. You're not alone.`,
        `Communication can be hard, ${userName}. *offers blanket* Would it help to imagine describing this to your past or future self? Sometimes shifting perspective helps.`,
        `Silence speaks volumes too, ${userName}. *quiet companionship* When you're ready, I'm here. No rush, no pressure - your timeline, your terms.`
      ],
    }
  };

  // 3. Detect intent
  const lowerMessage = message.toLowerCase();
  let detectedIntent = 'fallback';
  for (const group of intentGroups) {
    if (group.keywords.some((re) => re.test(lowerMessage))) {
      detectedIntent = group.intent;
      break;
    }
  }

  // 4. Select a response from the appropriate group
  const personaSet = groupedResponses[persona as keyof typeof groupedResponses] || groupedResponses.Astrologer;
  const pool = personaSet[detectedIntent as keyof typeof personaSet] || personaSet.fallback;
  const response = pool[Math.floor(Math.random() * pool.length)];
  return response;
};