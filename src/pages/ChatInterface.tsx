import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { getAIResponse } from '../lib/aiResponses';
import { calculateNatalChart } from '../lib/astrology';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Add theme variables here:
const pixelFont = 'font-pixel';
const cardGlass = 'bg-white/20 backdrop-blur-2xl border-2 border-transparent rounded-4xl shadow-[0_8px_40px_0_rgba(255,111,31,0.18),0_1.5px_8px_0_rgba(255,111,31,0.10)] transition-all duration-300 p-6 md:p-8';
const glassmorphicHeader = 'bg-gradient-to-r from-black/70 via-gray-900/70 to-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg px-8 py-6 flex justify-between items-center rounded-b-3xl mb-8';
const gradientText = 'bg-gradient-to-br from-black via-gray-900 to-black text-transparent';

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const { birthData, selectedPersona, chatHistory, setChatHistory, usageCount, incrementUsage, name, setSelectedPersona } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [natalChart, setNatalChart] = useState<any>(null);
  const [sunSign, setSunSign] = useState('');
  const [moonSign, setMoonSign] = useState('');
  const [risingSign, setRisingSign] = useState('');

  // Personalized info for responses
  const userName = name || (user?.email?.split('@')[0]) || 'Cosmic Traveler';
  // For currentTransits, use a static fallback or get from context if available
  const currentTransits = [
    'Mercury Retrograde in Sagittarius',
    'Venus Conjunct Jupiter',
    'Mars Square Pluto',
    'Jupiter Trine Neptune',
    'Saturn Opposition Uranus'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      setMessages(chatHistory);
    } else {
      // Welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `Hello, cosmic soul! I'm your ${selectedPersona} guide. I'm here to provide you with personalized astrological insights and support. What's on your mind today?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [chatHistory, selectedPersona]);

  useEffect(() => {
    if (birthData) {
      const chart = calculateNatalChart({
        year: new Date(birthData.date).getFullYear(),
        month: new Date(birthData.date).getMonth() + 1,
        day: new Date(birthData.date).getDate(),
        hour: parseInt(birthData.time.split(':')[0]),
        minute: parseInt(birthData.time.split(':')[1]),
        latitude: birthData.latitude,
        longitude: birthData.longitude
      });
      setNatalChart(chart);
      setSunSign(chart.CelestialBodies.all.find((p: any) => p.label === 'Sun')?.Sign.label || 'Unknown');
      setMoonSign(chart.CelestialBodies.all.find((p: any) => p.label === 'Moon')?.Sign.label || 'Unknown');
      setRisingSign(chart.Ascendant?.Sign.label || 'Unknown');
    }
  }, [birthData]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Check usage limits for free users
    if (!isGuest && usageCount.chat >= 10) {
      const limitMessage: Message = {
        id: `limit-${Date.now()}`,
        text: "You've reached your daily chat limit! Upgrade to Cosmic+ for unlimited conversations with me.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Increment usage
    incrementUsage('chat');

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage, selectedPersona, { sunSign, moonSign, risingSign }, userName, currentTransits);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => {
        const newMessages = [...prev, aiMessage];
        setChatHistory(newMessages);
        return newMessages;
      });
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const emojis = ['😊', '😢', '😍', '🤔', '😎', '🙄', '😴', '🤗', '😅', '🥺', '✨', '🔮', '🌟', '💫', '🌙', '☀️'];

  const handleEmojiClick = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // 1. Calculate header and input heights (e.g., header: 80px, input: 80px)
  const HEADER_HEIGHT = 80;
  const INPUT_HEIGHT = 80;
  const CHAT_AREA_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + INPUT_HEIGHT}px)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 flex flex-col">
        <div className={cardGlass + ' border-b-0 rounded-b-none mb-0'}>
          <h2 className={pixelFont + ' text-2xl md:text-3xl mb-2 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>Lyra Chat</h2>
          <p className="text-gray-400 text-sm">{userName} • {selectedPersona} Mode</p>
        </div>
        <div className={cardGlass + ' flex-1 mt-0'}>
          <h3 className={pixelFont + ' text-lg mb-4 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>Choose Your Guide</h3>
          {['Astrologer', 'Therapist', 'Friend'].map((persona) => (
            <button
              key={persona}
              onClick={() => setSelectedPersona(persona)}
              className={`w-full p-4 rounded-xl text-left mb-2 font-bold transition-all duration-200 ${selectedPersona === persona ? 'bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black shadow ' + pixelFont : 'bg-white/10 text-white hover:bg-white/20 hover:text-primary-orange hover:scale-105 active:scale-95'}`}
            >
              <div className={pixelFont}>{persona}</div>
              <div className="text-xs opacity-75">
                {persona === 'Astrologer' && 'Wise & Technical'}
                {persona === 'Therapist' && 'Supportive & Soft'}
                {persona === 'Friend' && 'Casual & Encouraging'}
              </div>
            </button>
          ))}
        </div>
        <div className={cardGlass + ' border-t-0 rounded-t-none mt-0 mb-4'}>
          <h4 className={pixelFont + ' mb-2 text-base bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>Today&apos;s Usage</h4>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Messages</span>
              <span>{usageCount.chat}/10</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className={pixelFont + ' w-full mt-4 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black py-2 rounded-xl font-bold hover:scale-105 transition-all duration-300'}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      {/* Main Chat Area */}
      <div className="relative flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className={glassmorphicHeader + ' mb-0 rounded-b-3xl'} style={{ height: HEADER_HEIGHT }}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-orange via-pink-400 to-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-2xl">
                {selectedPersona === 'Astrologer' && '🔮'}
                {selectedPersona === 'Therapist' && '💙'}
                {selectedPersona === 'Friend' && '✨'}
              </span>
            </div>
            <div>
              <h3 className={pixelFont + ' text-lg bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>Your {selectedPersona}</h3>
              <p className="text-gray-400 text-xs md:text-sm">Online • Ready to guide you</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-4 pb-36">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`${cardGlass} max-w-xl ${message.sender === 'user' ? 'ml-auto bg-white/30 text-white' : 'bg-gradient-to-br from-primary-orange via-pink-400 to-yellow-300 text-black'} px-6 py-4 rounded-3xl shadow-lg relative group`}>
                  <div className={pixelFont + ' text-xs mb-1'}>
                    {message.sender === 'user' ? userName : selectedPersona}
                  </div>
                  <div className="whitespace-pre-line text-base md:text-lg">{message.text}</div>
                  <div className="text-xs text-gray-400 mt-2 text-right">{message.timestamp.toLocaleTimeString()}</div>
                  {/* Emoji/like reaction placeholder */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">✨</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* AI Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-br from-primary-orange via-pink-400 to-yellow-300 text-black px-6 py-4 rounded-3xl max-w-xs flex items-center gap-2">
                <span className={pixelFont + ' text-xs'}>{selectedPersona}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Sticky Input Bar */}
        <div className="sticky bottom-0 left-0 w-full z-10">
          <div className="mx-auto max-w-3xl bg-white/20 backdrop-blur-2xl rounded-3xl shadow-xl px-6 py-4 flex items-center gap-4">
            <textarea
              className={pixelFont + ' flex-1 bg-transparent outline-none resize-none text-base md:text-lg text-white placeholder-gray-400 px-2 py-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-orange'}
              rows={1}
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              style={{ minHeight: 36, maxHeight: 60 }}
            />
            <button
              onClick={handleSendMessage}
              className={pixelFont + ' px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black shadow hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-200'}
            >
              Send ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;