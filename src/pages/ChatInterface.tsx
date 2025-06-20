import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { calculateNatalChart, renderNatalChartSVG, getCurrentTransits, calculateCompatibility } from '../lib/astrology';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const { birthData, selectedPersona, usageCount, name } = useUser();
  const [natalChart, setNatalChart] = useState<any>(null);
  const [chartSVG, setChartSVG] = useState<string>('');
  const [horoscopeType, setHoroscopeType] = useState('daily');
  const [compatibilityPartner, setCompatibilityPartner] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerDOB, setPartnerDOB] = useState('');
  const [partnerLocation, setPartnerLocation] = useState('');
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);

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
      setChartSVG(renderNatalChartSVG(chart, 630, 630));
    }
  }, [birthData]);

  const energyMeters = [
    { name: 'Love', value: Math.floor(Math.random() * 46) + 50, color: 'from-pink-400 to-red-500' },
    { name: 'Career', value: Math.floor(Math.random() * 46) + 50, color: 'from-blue-400 to-indigo-500' },
    { name: 'Health', value: Math.floor(Math.random() * 46) + 50, color: 'from-green-400 to-emerald-500' },
    { name: 'Finance', value: Math.floor(Math.random() * 46) + 50, color: 'from-yellow-400 to-orange-500' }
  ];

  const currentTransits = [
    { planet: 'Mercury', description: 'Retrograde in Sagittarius' },
    { planet: 'Venus', description: 'Conjunct Jupiter' },
    { planet: 'Mars', description: 'Square Pluto' },
    { planet: 'Jupiter', description: 'Trine Neptune' },
    { planet: 'Saturn', description: 'Opposition Uranus' },
    { planet: 'Uranus', description: 'Sextile Pluto' },
    { planet: 'Neptune', description: 'Quincunx Mars' },
    { planet: 'Pluto', description: 'Direct in Capricorn' }
  ];

  // Personalized Horoscope Sentences
  const userName = name || (user?.email?.split('@')[0]) || 'Cosmic Traveler';
  const sunSign = natalChart?.CelestialBodies?.all[0]?.Sign?.label || 'your Sun sign';
  const moonSign = natalChart?.CelestialBodies?.all[1]?.Sign?.label || 'your Moon sign';
  const risingSign = natalChart?.Ascendant?.Sign?.label || 'your Rising sign';
  const mainTransit = currentTransits[0]?.description || 'a powerful transit';
  const surpriseDaily = "You may receive an unexpected message that brightens your day.";
  const surpriseWeekly = "A chance encounter could lead to a new friendship or opportunity.";
  const surpriseMonthly = "A hidden talent may reveal itself, surprising even you.";

  const horoscopes = {
    daily: `Hey ${userName}, today the cosmos highlights your ${sunSign} Sun, ${moonSign} Moon, and ${risingSign} Rising. With ${mainTransit} influencing your chart, trust your instincts and embrace new ideas. ${surpriseDaily}`,
    weekly: `This week, ${userName}, your ${sunSign} Sun and ${moonSign} Moon are energized by ${mainTransit}. Your ${risingSign} Rising helps you shine in social settings. ${surpriseWeekly}`,
    monthly: `All month, ${userName}, your journey is shaped by your ${sunSign} Sun, ${moonSign} Moon, and ${risingSign} Rising. ${mainTransit} brings transformation—embrace change and growth. ${surpriseMonthly}`
  };

  const handleCompatibilityCheck = () => {
    if (partnerName && partnerDOB && partnerLocation) {
      setCompatibilityScore(Math.floor(Math.random() * 15) + 85);
    }
  };

  // Gradient text utility
  const gradientText = 'bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent';
  const pixelFont = 'font-pixel';
  const glassCard = `bg-white/20 backdrop-blur-2xl border-2 border-transparent rounded-4xl shadow-[0_8px_40px_0_rgba(255,111,31,0.18),0_1.5px_8px_0_rgba(255,111,31,0.10)] transition-all duration-300 cursor-pointer p-10 md:p-12 hover:scale-[1.04] hover:shadow-[0_0_64px_0_rgba(255,111,31,0.28)] hover:border-gradient-to-r hover:from-primary-orange hover:to-pink-400 relative overflow-hidden group`;
  const glassButton = `px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black shadow-lg hover:scale-105 active:scale-95 border-none outline-none ${pixelFont}`;
  const divider = 'h-1 w-full bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 rounded-full my-10 opacity-70';

  // Animated accent dots
  const AccentDots = () => (
    <div className="absolute top-4 right-4 flex space-x-2 z-10 pointer-events-none">
      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-primary-orange to-pink-400 animate-pulse" />
      <span className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-pink-400 animate-pulse delay-200" />
    </div>
  );

  // Header glassmorphic style
  const headerGlass = 'bg-gradient-to-r from-black/70 via-gray-900/70 to-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg px-8 py-6 flex justify-between items-center rounded-b-3xl mb-12';
  const mainTitle = 'text-3xl md:text-4xl font-black text-white tracking-tight ' + pixelFont + ' drop-shadow-lg';
  const subTitle = 'text-xl md:text-2xl font-bold text-white tracking-tight';
  const bodyText = 'text-base md:text-lg text-white/90';
  const cardPad = 'p-8 md:p-10';
  const cardRadius = 'rounded-3xl';
  const cardGlass = 'bg-white/15 backdrop-blur-xl border border-white/15 shadow-xl ' + cardPad + ' ' + cardRadius + ' transition-all duration-300';
  const cardGap = 'gap-10 md:gap-12';
  const buttonCta = 'px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black shadow-lg hover:scale-105 active:scale-95 border-none outline-none ' + pixelFont;
  const button = 'px-6 py-3 rounded-xl font-bold text-base bg-white/20 text-white shadow hover:bg-white/30 hover:text-primary-orange transition-all duration-200';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-x-hidden">
      {/* Header */}
      <header className={headerGlass}>
        <div className="flex flex-col gap-1">
          <div className={mainTitle + ' flex items-baseline flex-wrap gap-2'}>
            <span>Hey,</span>
            <span className="bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent whitespace-nowrap max-w-xs md:max-w-md truncate align-baseline">{name || (user?.email?.split('@')[0]) || 'Cosmic Traveler'}</span>
          </div>
          <div className="mt-1 text-white/70 text-base md:text-lg">Your {selectedPersona} guide is ready • {isGuest ? 'Guest Session' : 'Free Tier'}</div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/chat')}
            className={buttonCta}
          >
            Start Chat
          </button>
          <button
            onClick={() => navigate('/')}
            className={button}
          >
            Home
          </button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-3 ${cardGap}`}>
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col space-y-12">
            {/* Natal Chart */}
            <motion.div 
              className={cardGlass + ' flex flex-col items-center justify-center'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className={mainTitle + ' mb-8'}>Your Natal Chart</h2>
              <div className="flex items-center justify-center">
                {chartSVG && (
                  <div 
                    className="w-[320px] md:w-[480px] h-[320px] md:h-[480px] rounded-full overflow-hidden border-4 border-gradient-to-br from-primary-orange to-pink-400 flex items-center justify-center mx-auto shadow-2xl bg-black/40"
                    style={{ minWidth: 240, minHeight: 240 }}
                    dangerouslySetInnerHTML={{ __html: chartSVG }}
                  />
                )}
              </div>
            </motion.div>
            {/* Horoscope Section */}
            <motion.div 
              className={cardGlass}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={subTitle + ' ' + pixelFont}>Your Horoscope</h2>
                <div className="flex space-x-2">
                  {['daily', 'weekly', 'monthly'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setHoroscopeType(type)}
                      className={`px-6 py-3 rounded-xl capitalize font-bold text-base transition-all duration-200 ${
                        horoscopeType === type
                          ? 'bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 text-black shadow-md ' + pixelFont
                          : 'bg-white/10 text-white hover:bg-white/20 hover:text-primary-orange'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 md:p-8 mt-2">
                <p className={bodyText}>{horoscopes[horoscopeType as keyof typeof horoscopes]}</p>
              </div>
            </motion.div>
            {/* Compatibility Checker */}
            <motion.div 
              className={cardGlass}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={subTitle + ' mb-6 ' + pixelFont}>Compatibility Checker</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <input
                  type="text"
                  value={partnerName}
                  onChange={e => setPartnerName(e.target.value)}
                  placeholder="Partner's Name"
                  className="bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-all duration-200 text-base md:text-lg"
                />
                <input
                  type="date"
                  value={partnerDOB}
                  onChange={e => setPartnerDOB(e.target.value)}
                  placeholder="Date of Birth"
                  className="bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-all duration-200 text-base md:text-lg"
                />
                <input
                  type="text"
                  value={partnerLocation}
                  onChange={e => setPartnerLocation(e.target.value)}
                  placeholder="Location of Birth"
                  className="bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-all duration-200 text-base md:text-lg"
                />
              </div>
              <button
                onClick={handleCompatibilityCheck}
                className={buttonCta + ' mt-2'}
              >
                Check
              </button>
              {compatibilityScore !== null && (
                <motion.div 
                  className="bg-black/30 rounded-xl p-8 mt-8 shadow-lg flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={mainTitle + ' mb-2 bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>{compatibilityScore}%</div>
                  <p className={bodyText + ' text-lg'}>Compatibility Score</p>
                </motion.div>
              )}
            </motion.div>
          </div>
          {/* Sidebar */}
          <div className="flex flex-col space-y-12">
            {/* Chart Details (Sun, Moon, Rising distinct) */}
            <motion.div 
              className={cardGlass + ' overflow-visible'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              <h3 className={subTitle + ' mb-6 ' + pixelFont}>Chart Details</h3>
              {natalChart && (
                <div className="flex flex-wrap gap-4 justify-between items-stretch w-full">
                  {/* Sun */}
                  <div className="flex-1 min-w-[120px] max-w-[180px] bg-black/30 rounded-2xl p-5 flex flex-col items-center border-2 border-yellow-300/40">
                    <span className="text-3xl md:text-4xl mb-2">☀️</span>
                    <span className="text-xs text-yellow-200 font-bold tracking-wider mb-1">SUN</span>
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent break-words text-center">{natalChart.CelestialBodies.all[0]?.Sign.label || 'Leo'}</span>
                  </div>
                  {/* Moon */}
                  <div className="flex-1 min-w-[120px] max-w-[180px] bg-black/30 rounded-2xl p-5 flex flex-col items-center border-2 border-blue-300/40">
                    <span className="text-3xl md:text-4xl mb-2">🌙</span>
                    <span className="text-xs text-blue-200 font-bold tracking-wider mb-1">MOON</span>
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent break-words text-center">{natalChart.CelestialBodies.all[1]?.Sign.label || 'Pisces'}</span>
                  </div>
                  {/* Rising */}
                  <div className="flex-1 min-w-[120px] max-w-[180px] bg-black/30 rounded-2xl p-5 flex flex-col items-center border-2 border-pink-300/40">
                    <span className="text-3xl md:text-4xl mb-2">⬆️</span>
                    <span className="text-xs text-pink-200 font-bold tracking-wider mb-1">RISING</span>
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent break-words text-center">{natalChart.Ascendant?.Sign.label || 'Scorpio'}</span>
                  </div>
                </div>
              )}
              {/* Other details */}
              {natalChart && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/20 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs text-gray-400">Planet Count</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent">{natalChart.CelestialBodies.all.length}</p>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 flex flex-col items-center">
                    <p className="text-xs text-gray-400">Rising Degree</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent">{natalChart.Ascendant?.Sign.degree || '--'}</p>
                  </div>
                </div>
              )}
            </motion.div>
            {/* Cosmic Energy */}
            <motion.div 
              className={cardGlass}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className={subTitle + ' mb-6 ' + pixelFont}>Cosmic Energy</h3>
              <div className="space-y-8">
                {energyMeters.map((meter, index) => (
                  <div key={meter.name} className="space-y-2">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-300">{meter.name}</span>
                      <span className={subTitle + ' bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>{meter.value}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-4">
                      <motion.div
                        className={`h-4 rounded-full bg-gradient-to-r ${meter.color}`}
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
              className={cardGlass}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className={subTitle + ' mb-6'}>Usage Today</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Chat Messages</span>
                  <span className={subTitle + ' bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>{usageCount.chat}/10</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Voice Readings</span>
                  <span className={subTitle + ' bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>{usageCount.voice}/1</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Video Readings</span>
                  <span className={subTitle + ' bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent'}>{usageCount.video}/1</span>
                </div>
              </div>
              <button
                onClick={() => window.open('https://www.revenuecat.com/404', '_blank')}
                className={buttonCta + ' w-full mt-8'}
              >
                Upgrade to Cosmic+
              </button>
            </motion.div>
          </div>
        </div>
        {/* Current Transits - now full width below main grid */}
        <motion.div 
          className={cardGlass + ' mt-12 w-full'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={subTitle + ' mb-6 ' + pixelFont}>Current Transits</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            {currentTransits.slice(0, 5).map((transit, idx) => (
              <div key={transit.planet + idx} className="bg-black/30 rounded-2xl p-4 flex flex-col items-center border border-white/10 shadow-md min-w-0">
                <span className="text-lg font-bold text-gray-300 mb-1">{transit.planet}</span>
                <span className="text-base font-semibold bg-gradient-to-r from-primary-orange via-pink-400 to-yellow-300 bg-clip-text text-transparent text-center break-words">{transit.description}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Voice & Video Horoscope - two horizontally aligned cards below transits */}
        <div className="mt-8 flex flex-col md:flex-row gap-8 w-full pb-12">
          {/* Video Horoscope */}
          <motion.div 
            className={cardGlass + ' flex-1 flex flex-col items-center justify-center min-h-[180px]'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl md:text-3xl">🎬</span>
              <span className={subTitle + ' ' + pixelFont}>Video Horoscope</span>
            </div>
            <button className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-orange via-pink-400 to-yellow-300 flex items-center justify-center text-3xl text-black shadow-lg mb-3 cursor-not-allowed opacity-60">
              <span>▶️</span>
            </button>
            <span className="text-sm text-white/70 font-semibold">Paused for Free Users</span>
          </motion.div>
          {/* Audio Horoscope */}
          <motion.div 
            className={cardGlass + ' flex-1 flex flex-col items-center justify-center min-h-[180px]'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl md:text-3xl">🎧</span>
              <span className={subTitle + ' ' + pixelFont}>Audio Horoscope</span>
            </div>
            <button className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-orange via-pink-400 to-yellow-300 flex items-center justify-center text-3xl text-black shadow-lg mb-3 cursor-not-allowed opacity-60">
              <span>▶️</span>
            </button>
            <span className="text-sm text-white/70 font-semibold">Paused for Free Users</span>
          </motion.div>
        </div>
        <div className="w-full flex justify-center pb-16">
          <div className="max-w-2xl text-center text-white/80 text-base md:text-lg bg-black/30 rounded-2xl px-6 py-4">
            Due to overload of video and voice requests, the premium feature trial has been paused for free users.<br />
            Please send an email at <a href="mailto:contact@lyrais.online" className="underline text-primary-orange">contact@lyrais.online</a> and we will help you get access to the premium feature trial.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;