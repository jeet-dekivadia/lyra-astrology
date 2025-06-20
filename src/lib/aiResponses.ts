export const getAIResponse = (message: string, persona: string, birthData: any) => {
  const responses = {
    Astrologer: [
      `With your Sun in ${birthData?.sunSign || 'Leo'}, this situation reflects your natural leadership abilities. The current planetary alignment suggests transformation is coming.`,
      `Your Moon in ${birthData?.moonSign || 'Pisces'} indicates deep emotional sensitivity. Trust your intuition during this Mercury retrograde period.`,
      `The stars are aligning in your favor. Your ${birthData?.risingSign || 'Scorpio'} rising gives you powerful magnetism to attract what you need.`,
      `Jupiter's influence on your natal chart suggests expansion and growth. This challenge is preparing you for greater abundance.`,
      `Your birth chart reveals strong Pluto aspects, indicating you're going through a profound transformation. Embrace the change.`,
      `Venus is blessing your relationship sector. With your ${birthData?.sunSign || 'Gemini'} energy, communication will be key.`,
      `The upcoming lunar eclipse will illuminate your path. Your ${birthData?.moonSign || 'Cancer'} Moon helps you navigate emotional waters.`,
      `Mars energy is activating your career sector. Your natural ${birthData?.risingSign || 'Aries'} assertiveness will serve you well.`,
      `The cosmic winds are shifting in your favor. Your birth chart shows remarkable resilience and adaptability.`,
      `Saturn's lessons are preparing you for long-term success. Your ${birthData?.sunSign || 'Capricorn'} determination will see you through.`,
      `The North Node in your chart indicates this is part of your soul's journey. You're exactly where you need to be.`,
      `Your natal Mercury placement suggests clear communication will resolve this situation. Speak your truth with confidence.`,
      `This planetary transit is temporary, but the growth it brings is permanent. Your ${birthData?.moonSign || 'Virgo'} Moon will guide you through.`,
      `The universe is conspiring in your favor. Your birth chart shows strong intuitive abilities - trust what you feel.`,
      `Chiron's influence suggests healing through this experience. Your ${birthData?.sunSign || 'Scorpio'} Sun knows how to transform pain into power.`
    ],
    Therapist: [
      `I hear the pain in your words, and it's completely valid to feel this way. Your emotions are a compass guiding you toward healing.`,
      `What you're experiencing sounds overwhelming. Remember, it's okay to take things one day at a time. You're stronger than you know.`,
      `Your feelings matter deeply. Sometimes the universe puts us through challenges to help us discover our inner strength and resilience.`,
      `I want you to know that you're not alone in this journey. Every step you take toward healing is an act of courage.`,
      `It's beautiful that you're reaching out and sharing your feelings. This shows incredible self-awareness and emotional intelligence.`,
      `Your sensitivity is actually a superpower, even when it feels overwhelming. The world needs more people with your depth of feeling.`,
      `I can sense your inner wisdom trying to guide you. Trust that voice within you - it knows the way forward.`,
      `Healing isn't linear, and it's okay to have difficult days. You're exactly where you need to be in your journey.`,
      `Your capacity for growth and transformation is remarkable. I believe in your ability to navigate through this challenging time.`,
      `Remember to be gentle with yourself. You're doing the best you can with the resources you have right now.`,
      `This feeling you're experiencing is temporary, but the strength you're building is permanent. You're so much more resilient than you realize.`,
      `It's okay to sit with these emotions without trying to fix them immediately. Sometimes healing requires us to feel fully first.`,
      `Your willingness to be vulnerable and honest about your struggles is a sign of incredible emotional maturity and courage.`,
      `I see your light even when you can't see it yourself. You have an innate ability to heal and transform your experiences into wisdom.`,
      `Trust the process of your healing. Every emotion you feel is information, and you're learning to interpret your inner world with such skill.`
    ],
    Friend: [
      `Hey, I totally get it! Life can be such a rollercoaster sometimes. But you know what? You've got this! ✨`,
      `Aw, sending you the biggest cosmic hug right now! Things might seem tough, but I have a feeling something amazing is coming your way.`,
      `Girl, you're literally one of the strongest people I know! This is just a temporary cloud - your sunshine is coming! ☀️`,
      `Okay, first of all, you're amazing and don't let anyone tell you otherwise! Let's figure this out together, yeah?`,
      `I'm here for you no matter what! Sometimes the universe has weird ways of setting us up for something incredible.`,
      `You know what? I think this is just the universe clearing out space for all the good stuff that's about to enter your life!`,
      `Honestly, every time you've been through something tough before, you've come out even more awesome. This time will be no different!`,
      `I believe in you SO much! You have this incredible ability to turn any situation around. It's like your superpower!`,
      `Let's be real - you're a total badass! This challenge is just another opportunity for you to show how incredible you are.`,
      `I'm literally sending you all the good vibes right now! You're going to look back on this moment and be so proud of how you handled it.`,
      `Bestie, you've been through storms before and look how you bloomed! This is just another chapter in your amazing story.`,
      `I'm so proud of you for reaching out and talking about this. That takes real courage, and you've got it in spades!`,
      `You know what I love about you? You never give up. Even when things get tough, you keep pushing forward. That's legendary behavior!`,
      `I have such a good feeling about your future! The universe is totally setting you up for something magical - I can feel it!`,
      `Remember when you thought you wouldn't get through that last thing? Look at you now! You're absolutely unstoppable, my cosmic friend!`
    ]
  };

  const personaResponses = responses[persona as keyof typeof responses] || responses.Astrologer;
  
  // Simple keyword-based response selection for more contextual responses
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('love') || lowerMessage.includes('relationship')) {
    return personaResponses[Math.floor(Math.random() * 5)]; // First 5 responses
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('lonely')) {
    return personaResponses[Math.floor(Math.random() * 5) + 5]; // Middle 5 responses
  } else if (lowerMessage.includes('career') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
    return personaResponses[Math.floor(Math.random() * 5) + 10]; // Last 5 responses
  }
  
  return personaResponses[Math.floor(Math.random() * personaResponses.length)];
};