import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { getAIResponse } from '../lib/aiResponses';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const { birthData, selectedPersona, chatHistory, setChatHistory, usageCount, incrementUsage } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const aiResponse = getAIResponse(inputMessage, selectedPersona, birthData);
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

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-primary-orange mb-2">Lyra Chat</h2>
          <p className="text-gray-400 text-sm">
            {user?.email?.split('@')[0] || 'Guest'} • {selectedPersona} Mode
          </p>
        </div>
        
        <div className="flex-1 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-orange">Choose Your Guide</h3>
            {['Astrologer', 'Therapist', 'Friend'].map((persona) => (
              <button
                key={persona}
                onClick={() => window.location.reload()}
                className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedPersona === persona
                    ? 'bg-primary-orange text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{persona}</div>
                <div className="text-sm opacity-75">
                  {persona === 'Astrologer' && 'Wise & Technical'}
                  {persona === 'Therapist' && 'Supportive & Soft'}
                  {persona === 'Friend' && 'Casual & Encouraging'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-primary-orange mb-2">Today's Usage</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Messages</span>
                <span>{usageCount.chat}/10</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary-orange text-black py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-900 border-b border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                <span className="text-black font-bold">
                  {selectedPersona === 'Astrologer' && '🔮'}
                  {selectedPersona === 'Therapist' && '💙'}
                  {selectedPersona === 'Friend' && '✨'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Your {selectedPersona}</h3>
                <p className="text-gray-400 text-sm">Online • Ready to guide you</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gray-800 text-white'
                      : 'bg-primary-orange text-black'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-75 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-primary-orange text-black px-4 py-3 rounded-2xl max-w-xs">
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

        {/* Input Area */}
        <div className="bg-gray-900 border-t border-gray-800 p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-primary-orange focus:outline-none resize-none"
                rows={2}
              />
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute bottom-3 right-3 text-gray-400 hover:text-primary-orange transition-colors"
              >
                😊
              </button>
              
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg p-3 grid grid-cols-6 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiClick(emoji)}
                      className="p-2 hover:bg-gray-700 rounded transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-primary-orange text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>Send</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;