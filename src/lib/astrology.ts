interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
}

// Mock astrology calculations for demo purposes
export function calculateNatalChart(birthData: BirthData) {
  // Return mock horoscope data that matches the expected structure
  return {
    CelestialBodies: {
      all: [
        {
          label: 'Sun',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: false
        },
        {
          label: 'Moon',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: false
        },
        {
          label: 'Mercury',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.8
        },
        {
          label: 'Venus',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: false
        },
        {
          label: 'Mars',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.9
        },
        {
          label: 'Jupiter',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.7
        },
        {
          label: 'Saturn',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.6
        },
        {
          label: 'Uranus',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.5
        },
        {
          label: 'Neptune',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.5
        },
        {
          label: 'Pluto',
          ChartPosition: { Ecliptic: { DecimalDegrees: Math.random() * 360 } },
          Sign: { label: getRandomSign() },
          House: Math.floor(Math.random() * 12) + 1,
          Retrograde: Math.random() > 0.4
        }
      ]
    },
    Houses: Array.from({ length: 12 }, (_, i) => ({
      ChartPosition: { Horizon: { DecimalDegrees: (i * 30) + Math.random() * 30 } }
    })),
    Aspects: {
      all: [
        {
          point1: 'Sun',
          point2: 'Moon',
          aspect: { label: 'Conjunction' },
          orb: Math.random() * 10
        },
        {
          point1: 'Mercury',
          point2: 'Venus',
          aspect: { label: 'Sextile' },
          orb: Math.random() * 10
        },
        {
          point1: 'Mars',
          point2: 'Jupiter',
          aspect: { label: 'Trine' },
          orb: Math.random() * 10
        },
        {
          point1: 'Saturn',
          point2: 'Pluto',
          aspect: { label: 'Square' },
          orb: Math.random() * 10
        }
      ]
    },
    Ascendant: {
      ChartPosition: { Horizon: { DecimalDegrees: Math.random() * 360 } },
      Sign: { label: getRandomSign() }
    },
    Midheaven: {
      ChartPosition: { Horizon: { DecimalDegrees: Math.random() * 360 } }
    }
  };
}

function getRandomSign() {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs[Math.floor(Math.random() * signs.length)];
}

// Mock SVG chart generation
export function renderNatalChartSVG(horoscope: any, width = 400, height = 400) {
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = width / 2 - 30;
  const innerRadius = outerRadius - 80;
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chartGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FF6F1F;stop-opacity:0.3" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <circle cx="${centerX}" cy="${centerY}" r="${outerRadius}" fill="url(#chartGradient)" stroke="#FF6F1F" stroke-width="2"/>
      
      <!-- Inner circle -->
      <circle cx="${centerX}" cy="${centerY}" r="${innerRadius}" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.5"/>
      
      <!-- House divisions (12 houses) -->
      ${Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = centerX + Math.cos(angle) * innerRadius;
        const y1 = centerY + Math.sin(angle) * innerRadius;
        const x2 = centerX + Math.cos(angle) * outerRadius;
        const y2 = centerY + Math.sin(angle) * outerRadius;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFFFFF" stroke-width="1" opacity="0.6"/>`;
      }).join('')}
      
      <!-- Zodiac signs around the outer rim -->
      ${['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((sign, i) => {
        const angle = (i * 30 + 15) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * (outerRadius - 15);
        const y = centerY + Math.sin(angle) * (outerRadius - 15);
        return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="#FF6F1F" font-size="16" font-weight="bold">${sign}</text>`;
      }).join('')}
      
      <!-- Planet positions -->
      ${horoscope.CelestialBodies.all.map((planet: any, i: number) => {
        const angle = (planet.ChartPosition.Ecliptic.DecimalDegrees - 90) * Math.PI / 180;
        const radius = innerRadius + 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const symbols = {
          'Sun': '☉',
          'Moon': '☽',
          'Mercury': '☿',
          'Venus': '♀',
          'Mars': '♂',
          'Jupiter': '♃',
          'Saturn': '♄',
          'Uranus': '♅',
          'Neptune': '♆',
          'Pluto': '♇'
        };
        const symbol = symbols[planet.label as keyof typeof symbols] || planet.label.substring(0, 2);
        return `
          <circle cx="${x}" cy="${y}" r="8" fill="#FF6F1F" stroke="#FFFFFF" stroke-width="2" filter="url(#glow)"/>
          <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF" font-size="12" font-weight="bold">${symbol}</text>
        `;
      }).join('')}
      
      <!-- Aspect lines -->
      ${horoscope.Aspects.all.slice(0, 3).map((aspect: any) => {
        const planet1 = horoscope.CelestialBodies.all.find((p: any) => p.label === aspect.point1);
        const planet2 = horoscope.CelestialBodies.all.find((p: any) => p.label === aspect.point2);
        if (planet1 && planet2) {
          const angle1 = (planet1.ChartPosition.Ecliptic.DecimalDegrees - 90) * Math.PI / 180;
          const angle2 = (planet2.ChartPosition.Ecliptic.DecimalDegrees - 90) * Math.PI / 180;
          const radius = innerRadius + 20;
          const x1 = centerX + Math.cos(angle1) * radius;
          const y1 = centerY + Math.sin(angle1) * radius;
          const x2 = centerX + Math.cos(angle2) * radius;
          const y2 = centerY + Math.sin(angle2) * radius;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FF6F1F" stroke-width="1" opacity="0.6"/>`;
        }
        return '';
      }).join('')}
      
      <!-- Center point -->
      <circle cx="${centerX}" cy="${centerY}" r="4" fill="#FFFFFF" filter="url(#glow)"/>
      
      <!-- Ascendant marker -->
      <line x1="${centerX + innerRadius}" y1="${centerY}" x2="${centerX + outerRadius}" y2="${centerY}" stroke="#FF6F1F" stroke-width="3"/>
      <text x="${centerX + outerRadius + 10}" y="${centerY}" text-anchor="start" dominant-baseline="middle" fill="#FF6F1F" font-size="12" font-weight="bold">ASC</text>
    </svg>
  `;
}

export function getCurrentTransits() {
  const now = new Date();
  return calculateNatalChart({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    latitude: 0,
    longitude: 0
  });
}

export function calculateCompatibility(person1Data: BirthData, person2Data: BirthData) {
  const chart1 = calculateNatalChart(person1Data);
  const chart2 = calculateNatalChart(person2Data);
  
  // Mock compatibility calculation
  const compatibility = Math.floor(Math.random() * 40) + 60; // 60-100%
  
  return {
    percentage: compatibility,
    sunSignMatch: chart1.CelestialBodies.all[0].Sign.label === chart2.CelestialBodies.all[0].Sign.label,
    moonSignMatch: chart1.CelestialBodies.all[1].Sign.label === chart2.CelestialBodies.all[1].Sign.label,
    aspects: [
      'Strong emotional connection through Moon aspects',
      'Complementary communication styles via Mercury harmony',
      'Shared values and goals indicated by Venus-Jupiter alignment',
      'Harmonious energy exchange with Mars-Sun compatibility',
      'Deep spiritual connection through Neptune-Pluto aspects',
      'Balanced partnership dynamics via Libra influences'
    ]
  };
}