import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { calculateNatalChart, renderNatalChartSVG, getCurrentTransits, calculateCompatibility } from '../lib/astrology';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const { birthData, selectedPersona, usageCount } = useUser();
  const [natalChart, setNatalChart] = useState<any>(null);
  const [chartSVG, setChartSVG] = useState<string>('');
  const [horoscopeType, setHoroscopeType] = useState('daily');
  const [compatibilityPartner, setCompatibilityPartner] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);

  useEffect(() => {
    if (birthData) {
      const birthDate = new Date(birthData.date + 'T' + birthData.time);
      const chart = calculateNatalChart({
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        day: birthDate.getDate(),
        hour: birthDate.getHours(),
        minute: birthDate.getMinutes(),
        latitude: birthData.latitude,
        longitude: birthData.longitude
      });
      setNatalChart(chart);
      setChartSVG(renderNatalChartSVG(chart));
    }
  }, [birthData]);

  const energyMeters = [
    { name: 'Love', value: Math.random() * 100, color: 'from-pink-400 to-red-500' },
    { name: 'Career', value: Math.random() * 100, color: 'from-blue-400 to-indigo-500' },
    { name: 'Health', value: Math.random() * 100, color: 'from-green-400 to-emerald-500' },
    { name: 'Finance', value: Math.random() * 100, color: 'from-yellow-400 to-orange-500' }
  ];

  const horoscopes = {
    daily: "Today's cosmic energy brings powerful transformation. Jupiter's alignment with your natal Sun suggests breakthrough moments in personal growth. Trust your intuition as Mercury dances through your communication sector.",
    weekly: "This week, Mercury retrograde in your communication sector asks for patience in relationships. Venus brings harmony to your creative projects and social connections. The lunar eclipse illuminates hidden aspects of your personality.",
    monthly: "November brings profound changes as Pluto aspects your midheaven. Career shifts align with your soul's purpose. Embrace the transformation with confidence as Saturn's lessons prepare you for long-term success."
  };

  const handleCompatibilityCheck = () => {
    if (compatibilityPartner && birthData) {
      const partnerBirthDate = new Date();
      partnerBirthDate.setFullYear(partnerBirthDate.getFullYear() - 25);
      
      const result = calculateCompatibility(
        {
          year: new Date(birthData.date).getFullYear(),
          month: new Date(birthData.date).getMonth() + 1,
          day: new Date(birthData.date).getDate(),
          hour: parseInt(birthData.time.split(':')[0]),
          minute: parseInt(birthData.time.split(':')[1]),
          latitude: birthData.latitude,
          longitude: birthData.longitude
        },
        {
          year: partnerBirthDate.getFullYear(),
          month: partnerBirthDate.getMonth() + 1,
          day: partnerBirthDate.getDate(),
          hour: 12,
          minute: 0,
          latitude: 40.7128,
          longitude: -74.0060
        }
      );
      setCompatibilityResult(result);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-primary-orange/20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Welcome back, <span className="text-primary-orange">{user?.email?.split('@')[0] || 'Cosmic Traveler'}</span>
            </motion.h1>
            <p className="text-gray-400 mt-1">Your {selectedPersona} guide is ready • {isGuest ? 'Guest Session' : 'Free Tier'}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/chat')}
              className="bg-primary-orange text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              Start Chat
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-primary-orange text-primary-orange px-6 py-3 rounded-xl font-medium hover:bg-primary-orange hover:text-black transition-all duration-300"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Natal Chart */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-orange">Your Natal Chart</h2>
              <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  {chartSVG && (
                    <div 
                      className="w-80 h-80 rounded-full overflow-hidden border-2 border-primary-orange/30"
                      dangerouslySetInnerHTML={{ __html: chartSVG }}
                    />
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold">Chart Details</h3>
                  {natalChart && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Sun Sign</p>
                        <p className="text-lg font-medium text-primary-orange">
                          {natalChart.CelestialBodies.all[0]?.Sign.label || 'Leo'}
                        </p>
                      </div>
                      <div className="bg-black/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Moon Sign</p>
                        <p className="text-lg font-medium text-primary-orange">
                          {natalChart.CelestialBodies.all[1]?.Sign.label || 'Pisces'}
                        </p>
                      </div>
                      <div className="bg-black/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Rising Sign</p>
                        <p className="text-lg font-medium text-primary-orange">
                          {natalChart.Ascendant?.Sign.label || 'Scorpio'}
                        </p>
                      </div>
                      <div className="bg-black/50 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Planet Count</p>
                        <p className="text-lg font-medium text-primary-orange">
                          {natalChart.CelestialBodies.all.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Horoscope Section */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-orange">Your Horoscope</h2>
                <div className="flex space-x-2">
                  {['daily', 'weekly', 'monthly'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setHoroscopeType(type)}
                      className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
                        horoscopeType === type
                          ? 'bg-primary-orange text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-black/50 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed">
                  {horoscopes[horoscopeType as keyof typeof horoscopes]}
                </p>
              </div>
            </motion.div>

            {/* Compatibility Checker */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-orange">Compatibility Checker</h2>
              <div className="flex space-x-4 mb-6">
                <input
                  type="text"
                  value={compatibilityPartner}
                  onChange={(e) => setCompatibilityPartner(e.target.value)}
                  placeholder="Enter partner's name"
                  className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-orange focus:outline-none"
                />
                <button
                  onClick={handleCompatibilityCheck}
                  className="bg-primary-orange text-black px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Check
                </button>
              </div>
              {compatibilityResult && (
                <motion.div 
                  className="bg-black/50 rounded-lg p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-primary-orange mb-2">
                      {compatibilityResult.percentage}%
                    </div>
                    <p className="text-gray-400">Compatibility Score</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {compatibilityResult.aspects.map((aspect: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-primary-orange">✓</span>
                        <span>{aspect}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Voice Horoscope Section */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-orange">Voice Horoscope</h2>
              <div className="text-center">
                <button
                  onClick={() => {}}
                  className="bg-primary-orange text-black px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
                >
                  <span className="text-2xl">▶</span>
                  <span>Play My Horoscope</span>
                </button>
                <div className="mt-6 bg-black/50 rounded-lg p-6">
                  <p className="text-gray-300 mb-4">
                    Due to overload of requests, the premium services have been paused for free trial users. 
                    Upgrade to Cosmic Premium to unlock full voice experiences.
                  </p>
                  <p className="text-sm text-gray-400">Powered by ElevenLabs</p>
                </div>
              </div>
            </motion.div>

            {/* Video Horoscope Section */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-primary-orange">Video Horoscope</h2>
              <div className="text-center">
                <button
                  onClick={() => {}}
                  className="bg-primary-orange text-black px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto"
                >
                  <span className="text-2xl">🎬</span>
                  <span>Generate Video Horoscope</span>
                </button>
                <div className="mt-6 bg-black/50 rounded-lg p-6">
                  <p className="text-gray-300 mb-4">
                    Due to overload of requests, the premium services have been paused for free trial users. 
                    Upgrade to Cosmic Premium to unlock personalized cosmic videos.
                  </p>
                  <p className="text-sm text-gray-400">Powered by Tavus</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Energy Meters */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6 text-primary-orange">Cosmic Energy</h3>
              <div className="space-y-6">
                {energyMeters.map((meter, index) => (
                  <div key={meter.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{meter.name}</span>
                      <span className="text-white">{Math.round(meter.value)}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${meter.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${meter.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Usage Tracker */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary-orange">Usage Today</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Chat Messages</span>
                  <span className="text-white">{usageCount.chat}/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Voice Readings</span>
                  <span className="text-white">{usageCount.voice}/1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Video Readings</span>
                  <span className="text-white">{usageCount.video}/1</span>
                </div>
              </div>
              <button
                onClick={() => window.open('https://www.revenuecat.com/404', '_blank')}
                className="w-full mt-4 bg-primary-orange text-black py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Upgrade to Cosmic+
              </button>
            </motion.div>

            {/* Transit Tracker */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary-orange">Current Transits</h3>
              <div className="space-y-3">
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Mercury</p>
                  <p className="text-white">Retrograde in Sagittarius</p>
                </div>
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Venus</p>
                  <p className="text-white">Conjunct Jupiter</p>
                </div>
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400">Mars</p>
                  <p className="text-white">Square Pluto</p>
                </div>
              </div>
            </motion.div>

            {/* Download Report */}
            <motion.div 
              className="bg-gray-900 rounded-3xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary-orange">Full Report</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get your complete astrological profile with detailed analysis
              </p>
              <button
                onClick={() => window.open('https://www.revenuecat.com/404', '_blank')}
                className="w-full bg-primary-orange text-black py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Download PDF</span>
                <span>📄</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;