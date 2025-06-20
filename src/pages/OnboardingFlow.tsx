import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import 'leaflet/dist/leaflet.css';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, setGuestMode } = useAuth();
  const { setBirthData, setSelectedPersona } = useUser();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    latitude: 40.7128,
    longitude: -74.0060,
    persona: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (formData.email && formData.password) {
        setLoading(true);
        try {
          const { error } = await signUp(formData.email, formData.password);
          if (error) {
            console.error('Signup error:', error);
          }
        } catch (error) {
          console.error('Signup error:', error);
        }
        setLoading(false);
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (formData.birthDate && formData.birthTime && formData.birthLocation) {
        setBirthData({
          date: formData.birthDate,
          time: formData.birthTime,
          location: formData.birthLocation,
          latitude: formData.latitude,
          longitude: formData.longitude
        });
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (formData.persona) {
        setSelectedPersona(formData.persona);
        navigate('/dashboard');
      }
    }
  };

  const handleGuestMode = () => {
    setGuestMode();
    setCurrentStep(2);
  };

  const personas = [
    {
      id: 'Astrologer',
      title: 'Astrologer',
      description: 'Wise & Technical',
      emoji: '🔮',
      details: 'Deep astrological insights with precise calculations and cosmic wisdom'
    },
    {
      id: 'Therapist',
      title: 'Therapist',
      description: 'Supportive & Soft',
      emoji: '💙',
      details: 'Emotional support and healing guidance with astrological context'
    },
    {
      id: 'Friend',
      title: 'Friend',
      description: 'Casual & Encouraging',
      emoji: '✨',
      details: 'Friendly cosmic companion for daily guidance and motivation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  step <= currentStep 
                    ? 'bg-primary-orange text-black' 
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <motion.div
              className="bg-primary-orange h-3 rounded-full"
              initial={{ width: '33%' }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Create Account */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-4xl font-bold text-black mb-2">Create Account</h2>
              <p className="text-gray-600 mb-8">Join the cosmic community</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    placeholder="Enter secure password"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="flex-1 bg-primary-orange text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Next'}
                </button>
              </div>

              <button
                onClick={handleGuestMode}
                className="w-full mt-4 text-center py-3 text-gray-600 hover:text-primary-orange transition-colors duration-200 border border-gray-300 rounded-xl hover:border-primary-orange"
              >
                Continue as Guest
              </button>
            </motion.div>
          )}

          {/* Step 2: Birth Information */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-4xl font-bold text-black mb-2">Birth Information</h2>
              <p className="text-gray-600 mb-8">Your chart is unique. We use this info to generate precision astrology using circular-natal-horoscope-js calculations and zodiac-winner chart visualizations.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time of Birth</label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => handleInputChange('birthTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location of Birth</label>
                  <input
                    type="text"
                    value={formData.birthLocation}
                    onChange={(e) => handleInputChange('birthLocation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    placeholder="City, Country"
                  />
                  {formData.birthLocation && (
                    <div className="mt-4 h-48 rounded-xl overflow-hidden">
                      <MapContainer
                        center={[formData.latitude, formData.longitude]}
                        zoom={10}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[formData.latitude, formData.longitude]}>
                          <Popup>{formData.birthLocation}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-8 bg-primary-orange text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Continue to Persona Selection
              </button>
            </motion.div>
          )}

          {/* Step 3: Choose AI Guide Mode */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-4xl font-bold text-black mb-2">Choose AI Guide Mode</h2>
              <p className="text-gray-600 mb-8">Select your preferred cosmic companion</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personas.map((persona) => (
                  <motion.div
                    key={persona.id}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      formData.persona === persona.id
                        ? 'border-primary-orange bg-orange-50 shadow-lg'
                        : 'border-gray-300 hover:border-primary-orange'
                    }`}
                    onClick={() => handleInputChange('persona', persona.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{persona.emoji}</div>
                      <h3 className="font-bold text-xl text-black mb-2">{persona.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{persona.description}</p>
                      <p className="text-xs text-gray-500">{persona.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!formData.persona}
                className="w-full mt-8 bg-primary-orange text-black px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Launch Lyra Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;