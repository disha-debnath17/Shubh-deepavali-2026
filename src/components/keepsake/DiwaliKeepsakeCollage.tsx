/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Download, Sparkles, Share2, Check, RefreshCw, Heart, Award, Home, MapPin, Palette } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { DecorationState } from '../../types';
import { getStoredMelaRewards, MELA_BADGES, MelaRewardState } from '../../data/melaData';
import { getRegionByName } from '../../data/regionalData';
import { ToranSvg } from '../decoration/ToranSvg';
import { RangoliSvg } from '../decoration/RangoliSvg';
import { MittiDiyaSvg } from '../decoration/MittiDiyaSvg';
import { StepAndRoofLightsSvg } from '../decoration/StepAndRoofLightsSvg';
import { DEFAULT_SCENE_ANCHORS } from '../../config/sceneAnchors';

interface DiwaliKeepsakeCollageProps {
  userName: string;
  userState?: string;
  currentLanguage: Language;
  decoration?: DecorationState;
  onCelebrateAgain?: () => void;
  onNavigateToScreen?: (screen: number) => void;
  onOpenEcoMela?: () => void;
}

interface RegionalGreetingPreset {
  id: string;
  title: string;
  state: string;
  greetingText: string;
  nativeWish: string;
}

const REGIONAL_PRESETS: RegionalGreetingPreset[] = [
  {
    id: 'wb',
    title: 'Bengal Kali Puja & Sandesh',
    state: 'West Bengal',
    greetingText: 'Maa Kali’s divine radiance dispels all shadow on Amavasya night (with Kojagori Lakshmi Puja observed separately on Ashwin Purnima), filling our home with sweet peace, love, and sacred joy.',
    nativeWish: 'শুভ দীপাবলি ও শ্যামাপূজার প্রীতি ও আন্তরিক শুভেচ্ছা ✨',
  },
  {
    id: 'mh',
    title: 'Maharashtra Diwali Pahat & Faral',
    state: 'Maharashtra',
    greetingText: 'Early morning classical sur, crisp faral delicacies, and golden diyas on every threshold.',
    nativeWish: 'दीपावलीच्या मनःपूर्वक हार्दिक शुभेच्छा व मंगलमय सदिच्छा 🪔',
  },
  {
    id: 'gj',
    title: 'Gujarat Chopda Pujan & Saal Mubarak',
    state: 'Gujarat',
    greetingText: 'Holy ledgers blessed with vermilion and glowing lamps welcoming prosperous beginnings.',
    nativeWish: 'નૂતન વર્ષાભિનંદન અને સાલ મુબારક! સુખ, શાંતિ અને સમૃદ્ધિ વધે 🌸',
  },
  {
    id: 'tn',
    title: 'Tamil Nadu Ganga Snanam & Dawn Sparklers',
    state: 'Tamil Nadu',
    greetingText: 'Sacred oil bath at dawn, joyful flower sparklers, and sweet ukkarai shared with family.',
    nativeWish: 'இனிய தீபாவளி நல்வாழ்த்துகள்! நல்வாழ்வும் மகிழ்ச்சியும் பெருகட்டும் 🪔',
  },
  {
    id: 'up',
    title: 'Ayodhya & Varanasi Deepotsav',
    state: 'Uttar Pradesh',
    greetingText: 'Millions of earthen diyas glowing along sacred ghats celebrating the triumphant homecoming of Sri Ram.',
    nativeWish: 'पावन दीपोत्सव एवं शुभ दीपावली की अनंत मंगलकामनाएं 🪔',
  },
  {
    id: 'pb',
    title: 'Punjab Bandi Chhor Divas & Diwali',
    state: 'Punjab',
    greetingText: 'Celebrating the distinct Sikh festival of Bandi Chhor Divas coinciding with Diwali—honoring liberty, righteousness, and eternal grace with radiant Golden Temple illuminations.',
    nativeWish: 'ਬੰਦੀ ਛੋੜ ਦਿਵਸ ਅਤੇ ਦੀਵਾਲੀ ਦੀਆਂ ਲੱਖ ਲੱਖ ਵਧਾਈਆਂ ✨',
  },
  {
    id: 'universal',
    title: 'Pan-India Unity & Warmth',
    state: 'All of India',
    greetingText: 'Across every state and heart, may our united earthen lamps fill the world with courage, light, and boundless love.',
    nativeWish: 'तमसो मा ज्योतिर्गमय · Shubh Deepavali across India! 🪔',
  },
];

export const DiwaliKeepsakeCollage: React.FC<DiwaliKeepsakeCollageProps> = ({
  userName,
  userState,
  currentLanguage,
  decoration,
  onCelebrateAgain,
  onNavigateToScreen,
  onOpenEcoMela,
}) => {
  const [visitorName, setVisitorName] = useState<string>(userName || 'Beloved Friend');
  const [visitorRegion, setVisitorRegion] = useState<string>(userState || 'West Bengal');
  const [customClosingMessage, setCustomClosingMessage] = useState<string>(
    'May the sacred earthen flame always illuminate our home with joy, unity, and timeless peace.'
  );
  const [melaRewards, setMelaRewards] = useState<MelaRewardState>(getStoredMelaRewards);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Hidden Canvas reference for high-res PNG export
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep visitor name and region updated if parent prop changes
  useEffect(() => {
    if (userName) setVisitorName(userName);
  }, [userName]);

  useEffect(() => {
    if (userState) {
      setVisitorRegion(userState);
    }
  }, [userState]);

  // Read latest Mela rewards on mount and listen for live updates
  useEffect(() => {
    const refreshRewards = () => {
      setMelaRewards(getStoredMelaRewards());
    };

    refreshRewards();

    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent<MelaRewardState>;
      if (custom && custom.detail) {
        setMelaRewards(custom.detail);
      } else {
        refreshRewards();
      }
    };

    window.addEventListener('melaRewardsUpdated', handleCustomEvent);
    window.addEventListener('storage', refreshRewards);
    window.addEventListener('focus', refreshRewards);

    return () => {
      window.removeEventListener('melaRewardsUpdated', handleCustomEvent);
      window.removeEventListener('storage', refreshRewards);
      window.removeEventListener('focus', refreshRewards);
    };
  }, []);

  // Regional wish is always automatically tailored according to the user's cultural region / state
  const activePreset = useMemo(() => {
    const clean = (visitorRegion || '').trim().toLowerCase();
    const matched = REGIONAL_PRESETS.find(
      (p) =>
        p.state.toLowerCase() === clean ||
        clean.includes(p.state.toLowerCase()) ||
        p.state.toLowerCase().includes(clean)
    );
    if (matched) return matched;

    const reg = getRegionByName(visitorRegion);
    if (reg) {
      return {
        id: reg.id,
        title: `${reg.name} Diwali Traditions`,
        state: reg.name,
        greetingText: reg.introTagline[currentLanguage] || reg.introTagline.en,
        nativeWish: `${reg.festivalName[currentLanguage] || reg.festivalName.en} · Shubh Deepavali! 🪔`,
      };
    }
    return REGIONAL_PRESETS[0];
  }, [visitorRegion, currentLanguage]);

  const regionData = getRegionByName(visitorRegion);

  // Fallback defaults for decorations if not yet loaded
  const currentDecor = decoration || {
    fairyLights: true,
    marigoldToran: true,
    rangoli: true,
    diyasCount: 8,
  };

  // Badges to display: strictly only the badges the user has actually unlocked by playing Mela games
  // When a user has played nothing in Mela, displayBadges is empty (showing nothing)
  const displayBadges = useMemo(() => {
    if (!melaRewards.badges || melaRewards.badges.length === 0) {
      return [];
    }
    return MELA_BADGES.filter((b) => melaRewards.badges.includes(b.id));
  }, [melaRewards.badges]);

  // Actual stars earned by the user across Mela games (0 when nothing played)
  const totalStars = melaRewards.stars || 0;

  // Draw high-resolution canvas and trigger download
  const handleDownloadKeepsake = async () => {
    setIsGenerating(true);
    audioManager.playSparkleSound();

    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 1100;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Rich Midnight Navy Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1100);
      bgGrad.addColorStop(0, '#0A0F1D');
      bgGrad.addColorStop(0.5, '#10172D');
      bgGrad.addColorStop(1, '#16233E');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1600, 1100);

      // Ambient golden light spot
      const radialGlow = ctx.createRadialGradient(800, 500, 50, 800, 500, 800);
      radialGlow.addColorStop(0, 'rgba(214, 173, 96, 0.18)');
      radialGlow.addColorStop(0.6, 'rgba(255, 179, 71, 0.08)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, 1600, 1100);

      // Star particles & festive specks
      ctx.fillStyle = 'rgba(255, 245, 222, 0.45)';
      for (let i = 0; i < 90; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * 1600;
        const sy = (Math.cos(i * 77) * 0.5 + 0.5) * 1100;
        const sRad = (i % 3) + 1;
        ctx.beginPath();
        ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Ornate Double Gold Border
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, 1528, 1028);

      ctx.strokeStyle = 'rgba(244, 217, 149, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(46, 46, 1508, 1008);

      // Decorative Corner Mandalas
      const drawCorner = (cx: number, cy: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = '#D6AD60';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(30, 0);
        ctx.moveTo(0, -30);
        ctx.lineTo(0, 30);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(56, 56);
      drawCorner(1544, 56);
      drawCorner(56, 1044);
      drawCorner(1544, 1044);

      // 3. Top Header: Royal Crest & Visitor Identity
      ctx.fillStyle = '#D6AD60';
      ctx.font = 'bold 15px sans-serif';
      ctx.letterSpacing = '5px';
      ctx.textAlign = 'center';
      ctx.fillText('SHUBH DEEPAVALI 2026 · FESTIVAL OF LIGHTS KEEPSAKE', 800, 85);

      ctx.fillStyle = '#FFF5DE';
      ctx.font = 'bold 44px serif';
      ctx.fillText(`${visitorName}’s Diwali Celebration`, 800, 138);

      // Region Ribbon Pill
      const regionText = `📍 ${visitorRegion} · ${activePreset.title}`;
      ctx.font = 'bold 16px sans-serif';
      const textWidth = ctx.measureText(regionText).width;
      ctx.fillStyle = 'rgba(214, 173, 96, 0.15)';
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 1;
      const pillX = 800 - textWidth / 2 - 20;
      ctx.beginPath();
      ctx.roundRect(pillX, 155, textWidth + 40, 32, 16);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#F4D995';
      ctx.fillText(regionText, 800, 177);

      // 4. Left Hero Visual: Polaroid-Style Framed Haveli
      const polaroidX = 75;
      const polaroidY = 220;
      const polaroidW = 670;
      const polaroidH = 500;

      // Polaroid Paper Frame
      ctx.fillStyle = '#FFFDF7';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.roundRect(polaroidX, polaroidY, polaroidW, polaroidH, 12);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Inner Photo
      const photoX = polaroidX + 18;
      const photoY = polaroidY + 18;
      const photoW = polaroidW - 36;
      const photoH = polaroidH - 100;

      // Draw Haveli image if available, else rich stylized illustration
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = '/images/diwali_home_exterior.webp';
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 800); // 800ms safety timeout
        });

        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, photoX, photoY, photoW, photoH);
        } else {
          // Fallback painted scene
          const skyGrad = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
          skyGrad.addColorStop(0, '#0F1A30');
          skyGrad.addColorStop(1, '#2D1F47');
          ctx.fillStyle = skyGrad;
          ctx.fillRect(photoX, photoY, photoW, photoH);
        }

        // Coordinate scaling from 1376x768 SVG scene space into polaroid photo bounds
        const scaleX = photoW / 1376;
        const scaleY = photoH / 768;
        const mapX = (x: number) => photoX + x * scaleX;
        const mapY = (y: number) => photoY + y * scaleY;

        // 1. Draw Fairy String Lights along roofline
        if (currentDecor.fairyLights) {
          ctx.save();
          ctx.shadowColor = '#FFE082';
          ctx.shadowBlur = 9;
          for (let i = 0; i < DEFAULT_SCENE_ANCHORS.roofLightPath.length - 1; i++) {
            const p1 = DEFAULT_SCENE_ANCHORS.roofLightPath[i];
            const p2 = DEFAULT_SCENE_ANCHORS.roofLightPath[i + 1];
            const numBulbs = 10;
            for (let b = 0; b <= numBulbs; b++) {
              const bx = p1.x + (p2.x - p1.x) * (b / numBulbs);
              const by = p1.y + (p2.y - p1.y) * (b / numBulbs);
              ctx.beginPath();
              ctx.arc(mapX(bx), mapY(by), 2.5, 0, Math.PI * 2);
              ctx.fillStyle = b % 2 === 0 ? '#FFE082' : '#FFB347';
              ctx.fill();
            }
          }
          ctx.restore();
        }

        // 2. Draw Marigold Toran Garland across doorway
        if (currentDecor.marigoldToran) {
          ctx.save();
          const pLeft = DEFAULT_SCENE_ANCHORS.lintelLeft;
          const pRight = DEFAULT_SCENE_ANCHORS.lintelRight;
          const flowerCount = 18;
          for (let f = 0; f <= flowerCount; f++) {
            const t = f / flowerCount;
            const fx = pLeft.x + (pRight.x - pLeft.x) * t;
            const fy = pLeft.y + (pRight.y - pLeft.y) * t + Math.sin(t * Math.PI) * 24;
            // Mango leaf behind
            ctx.fillStyle = '#2E7D32';
            ctx.beginPath();
            ctx.ellipse(mapX(fx), mapY(fy) + 3, 2.5, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Marigold blossom
            ctx.fillStyle = f % 2 === 0 ? '#F5A623' : '#FFB347';
            ctx.beginPath();
            ctx.arc(mapX(fx), mapY(fy), 3.8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // 3. Draw Floor Rangoli on courtyard stones
        if (currentDecor.rangoli) {
          ctx.save();
          const rc = DEFAULT_SCENE_ANCHORS.rangoliCenter;
          const radiusNum = typeof DEFAULT_SCENE_ANCHORS.rangoliRadius === 'number' ? DEFAULT_SCENE_ANCHORS.rangoliRadius : 105;
          const rx = radiusNum * scaleX;
          const ry = radiusNum * 0.48 * scaleY;
          const cx = mapX(rc.cx);
          const cy = mapY(rc.cy);

          ctx.strokeStyle = '#F4D995';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(233, 30, 99, 0.45)';
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx * 0.75, ry * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#FFF5DE';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx * 0.45, ry * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // 4. Draw Mitti Ka Diyas with glowing flames
        if (currentDecor.diyasCount > 0) {
          ctx.save();
          const count = Math.min(currentDecor.diyasCount, DEFAULT_SCENE_ANCHORS.diyaSlots.length);
          for (let d = 0; d < count; d++) {
            const slot = DEFAULT_SCENE_ANCHORS.diyaSlots[d];
            const dx = mapX(slot.x);
            const dy = mapY(slot.y);

            // Terracotta cup
            ctx.fillStyle = '#B5532A';
            ctx.beginPath();
            ctx.ellipse(dx, dy + 2, 6, 3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Flame aura
            ctx.shadowColor = '#FF9100';
            ctx.shadowBlur = 9;
            ctx.fillStyle = '#FFE082';
            ctx.beginPath();
            ctx.ellipse(dx, dy - 3, 2.8, 5, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } catch (e) {
        // ignore
      }

      // Warm Golden Light Scrim over photo
      const photoOverlay = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
      photoOverlay.addColorStop(0, 'rgba(0,0,0,0.05)');
      photoOverlay.addColorStop(0.7, 'rgba(255, 179, 71, 0.12)');
      photoOverlay.addColorStop(1, 'rgba(214, 173, 96, 0.35)');
      ctx.fillStyle = photoOverlay;
      ctx.fillRect(photoX, photoY, photoW, photoH);

      // Little festive badges on bottom of polaroid photo
      ctx.fillStyle = 'rgba(16, 23, 45, 0.88)';
      ctx.fillRect(photoX, photoY + photoH - 42, photoW, 42);
      ctx.fillStyle = '#F4D995';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'left';

      const decorList: string[] = [];
      if (currentDecor.fairyLights) decorList.push('💡 Fairy Lights');
      if (currentDecor.marigoldToran) decorList.push('🌼 Toran');
      if (currentDecor.rangoli) decorList.push('🌸 Rangoli');
      if (currentDecor.diyasCount > 0) decorList.push(`🪔 ${currentDecor.diyasCount} Diyas`);
      const decorSummary = decorList.length > 0 ? `✨ DECORATED HAVELI: ${decorList.join(' · ')}` : '✨ ILLUMINATED HAVELI';
      ctx.fillText(decorSummary, photoX + 16, photoY + photoH - 16);

      // Polaroid Handwritten Caption
      ctx.fillStyle = '#2C1B10';
      ctx.font = 'italic bold 23px serif';
      ctx.textAlign = 'center';
      ctx.fillText('“Our Illuminated Home Glowing with Deepavali Light”', polaroidX + polaroidW / 2, polaroidY + polaroidH - 35);

      // 5. Right Top Visual: Favourite Greeting & Cultural Wish
      const greetCardX = 780;
      const greetCardY = 220;
      const greetCardW = 740;
      const greetCardH = 260;

      ctx.fillStyle = 'rgba(25, 39, 71, 0.85)';
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(greetCardX, greetCardY, greetCardW, greetCardH, 16);
      ctx.fill();
      ctx.stroke();

      // Greeting Card Header
      ctx.fillStyle = '#FFB347';
      ctx.font = 'bold 13px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.textAlign = 'left';
      ctx.fillText('❤️ REGIONAL HERITAGE WISH', greetCardX + 28, greetCardY + 40);

      // Decorative Quote mark
      ctx.fillStyle = 'rgba(214, 173, 96, 0.25)';
      ctx.font = 'bold 70px serif';
      ctx.fillText('“', greetCardX + 24, greetCardY + 105);

      // Greeting Body
      ctx.fillStyle = '#FFF5DE';
      ctx.font = 'italic 19px serif';
      const words = activePreset.greetingText.split(' ');
      let line = '';
      let textY = greetCardY + 85;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > greetCardW - 70 && n > 0) {
          ctx.fillText(line, greetCardX + 32, textY);
          line = words[n] + ' ';
          textY += 30;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, greetCardX + 32, textY);

      // Native Wish Highlight Box
      ctx.fillStyle = 'rgba(214, 173, 96, 0.12)';
      ctx.strokeStyle = 'rgba(244, 217, 149, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(greetCardX + 28, greetCardY + 175, greetCardW - 56, 56, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F4D995';
      ctx.font = 'bold 18px serif';
      ctx.fillText(activePreset.nativeWish, greetCardX + 44, greetCardY + 210);

      // 6. Right Middle Visual: Eco-Diwali Mela Achievements
      const melaCardX = 780;
      const melaCardY = 505;
      const melaCardW = 740;
      const melaCardH = 215;

      ctx.fillStyle = 'rgba(25, 39, 71, 0.85)';
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(melaCardX, melaCardY, melaCardW, melaCardH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFB347';
      ctx.font = 'bold 13px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.textAlign = 'left';
      ctx.fillText('🎪 ECO-DIWALI MELA HONOUR ROLL', melaCardX + 28, melaCardY + 38);

      // Stars Counter Badge
      ctx.fillStyle = 'rgba(255, 179, 71, 0.2)';
      ctx.beginPath();
      ctx.roundRect(melaCardX + melaCardW - 200, melaCardY + 18, 170, 32, 16);
      ctx.fill();
      ctx.fillStyle = '#F4D995';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`⭐ ${totalStars} Diwali Stars`, melaCardX + melaCardW - 115, melaCardY + 40);

      // Render Medallions or clean empty state
      if (displayBadges.length === 0) {
        ctx.fillStyle = 'rgba(255, 245, 222, 0.45)';
        ctx.font = 'italic 16px serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          'No Mela badges earned yet · Play festive games to unlock honours',
          melaCardX + melaCardW / 2,
          melaCardY + 120
        );
      } else {
        const medalCount = Math.min(displayBadges.length, 6);
        const medalSpacing = (melaCardW - 60) / medalCount;

        displayBadges.slice(0, 6).forEach((badge, idx) => {
          const mx = melaCardX + 30 + idx * medalSpacing + medalSpacing / 2;
          const my = melaCardY + 115;

          // Circular Medallion Gold Rim
          ctx.save();
          ctx.beginPath();
          ctx.arc(mx, my, 28, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(214, 173, 96, 0.2)';
          ctx.fill();
          ctx.strokeStyle = '#F4D995';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Icon
          ctx.font = '24px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(badge.icon, mx, my);
          ctx.restore();

          // Badge Name below medal
          ctx.fillStyle = '#FFF5DE';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(badge.name[currentLanguage] || badge.name.en, mx, my + 48);
        });
      }

      // 7. Bottom Card: Personalised Closing Message & Sacred Sanskrit Blessing
      const bottomX = 75;
      const bottomY = 745;
      const bottomW = 1445;
      const bottomH = 265;

      ctx.fillStyle = 'rgba(16, 23, 45, 0.95)';
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(bottomX, bottomY, bottomW, bottomH, 18);
      ctx.fill();
      ctx.stroke();

      // Gold top accent stripe
      const stripeGrad = ctx.createLinearGradient(bottomX, bottomY, bottomX + bottomW, bottomY);
      stripeGrad.addColorStop(0, '#FFB347');
      stripeGrad.addColorStop(0.5, '#D6AD60');
      stripeGrad.addColorStop(1, '#E91E63');
      ctx.fillStyle = stripeGrad;
      ctx.fillRect(bottomX + 1, bottomY + 1, bottomW - 2, 6);

      // Closing Text Left
      ctx.fillStyle = '#FFB347';
      ctx.font = 'bold 14px sans-serif';
      ctx.letterSpacing = '3px';
      ctx.textAlign = 'left';
      ctx.fillText('🪔 COMMEMORATIVE BLESSING & SIGN-OFF', bottomX + 40, bottomY + 45);

      ctx.fillStyle = '#FFF5DE';
      ctx.font = 'italic 22px serif';
      ctx.fillText(`“${customClosingMessage}”`, bottomX + 40, bottomY + 95);

      // Sacred Sanskrit Mantra
      ctx.fillStyle = '#F4D995';
      ctx.font = 'bold 20px serif';
      ctx.fillText('ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥', bottomX + 40, bottomY + 155);

      ctx.fillStyle = '#D6AD60';
      ctx.font = '14px sans-serif';
      ctx.fillText('From ignorance lead us to truth · From darkness lead us unto eternal light 🪔', bottomX + 40, bottomY + 185);

      // Official Stamp / Signature on the right side
      const sealX = bottomX + bottomW - 130;
      const sealY = bottomY + 130;

      // Wax Seal Circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(sealX, sealY, 52, 0, Math.PI * 2);
      ctx.fillStyle = '#991B1B';
      ctx.fill();
      ctx.strokeStyle = '#F4D995';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 217, 149, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.stroke();

      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪔', sealX, sealY);

      ctx.fillStyle = '#FFF5DE';
      ctx.font = 'bold 9px sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('SHUBH DIWALI', sealX, sealY + 32);
      ctx.restore();

      // Metadata line
      ctx.fillStyle = '#D6AD60';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Diwali Celebration 2026 · Indian Heritage Edition', bottomX + bottomW - 210, bottomY + 230);

      // Export to Data URL and download
      const dataUrl = canvas.toDataURL('image/png');
      const cleanFileName = `Shubh_Diwali_Keepsake_${visitorName.replace(/\s+/g, '_')}.png`;

      const link = document.createElement('a');
      link.download = cleanFileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Confetti burst on successful download
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F4D995', '#FFF5DE', '#E91E63', '#FFB347'],
      });
    } catch (err) {
      console.error('Failed to export keepsake collage:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareLink = async () => {
    audioManager.playClickSound();
    const shareUrl = window.location.href;
    const shareText = `Check out our Diwali Celebration Keepsake for ${visitorName} from ${visitorRegion}! 🪔✨`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Shubh Deepavali Keepsake · ${visitorName}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-4 px-2 sm:px-4 text-center">
      {/* Hidden offscreen canvas for rendering HD PNG */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Badge & Title */}
      <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/20 text-[#F4D995] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#D6AD60]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
          <span>
            {currentLanguage === 'hi'
              ? 'अंतिम दीपोत्सव संस्मरण कोलाज'
              : currentLanguage === 'bn'
              ? 'চূড়ান্ত দীপাবলি স্মারক কোলাজ'
              : 'Official Diwali Keepsake Collage'}
          </span>
        </div>
        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE]">
          {currentLanguage === 'hi'
            ? 'आपका संपूर्ण दिवाली संस्मरण'
            : currentLanguage === 'bn'
            ? 'আপনার সম্পূর্ণ দীপাবলি স্মারক চিত্র'
            : 'Your Personalized Diwali Keepsake'}
        </h2>
        <p className="font-editorial text-xs sm:text-sm md:text-base text-[#F4D995] italic mt-1 font-light max-w-xl mx-auto">
          {currentLanguage === 'hi'
            ? 'सजा हुआ घर, आपकी क्षेत्रीय पहचान, प्रिय शुभकामनाएं और मेले की उपलब्धियां — सब एक सुंदर डाउनलोड करने योग्य चित्र में!'
            : currentLanguage === 'bn'
            ? 'আলোকিত গৃহ, আঞ্চলিক পরিচয়, প্রিয় শুভেচ্ছা ও মেলার অর্জন — সব একত্রিত এক অপরূপ ডাউনলোডের ছবিতে!'
            : 'Combining your illuminated home, regional heritage, favourite wish, and Mela honours into one high-resolution keepsake.'}
        </p>
      </div>

      {/* Quick Visual Customization Controls Bar (Clean UI/UX) */}
      <div className="w-full max-w-3xl mb-5 p-3 sm:p-4 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/30 shadow-lg text-left space-y-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6AD60]/20 pb-2.5">
          <span className="text-xs font-bold text-[#FFB347] uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            <span>Customize Keepsake Elements</span>
          </span>
          <span className="text-[11px] text-[#FFF5DE]/70">
            Regional wish updates automatically with your cultural state
          </span>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#F4D995] mb-1">
              Visitor Name on Keepsake
            </label>
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-1.5 rounded-xl bg-[#10172D] border border-[#D6AD60]/40 text-xs text-[#FFF5DE] focus:border-[#F4D995] focus:outline-none"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#F4D995] mb-1">
              Cultural Region / State
            </label>
            <input
              type="text"
              value={visitorRegion}
              onChange={(e) => setVisitorRegion(e.target.value)}
              maxLength={40}
              className="w-full px-3 py-1.5 rounded-xl bg-[#10172D] border border-[#D6AD60]/40 text-xs text-[#FFF5DE] focus:border-[#F4D995] focus:outline-none"
              placeholder="e.g. West Bengal, Maharashtra, etc."
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* THE BEAUTIFUL COLLAGE PREVIEW (WYSIWYG REAL-TIME CANVAS UI)    */}
      {/* ============================================================== */}
      <div className="w-full max-w-4xl relative rounded-3xl p-4 sm:p-7 bg-gradient-to-br from-[#0B1120] via-[#10172D] to-[#16233E] border-2 border-[#D6AD60] shadow-2xl text-left overflow-hidden select-none">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#D6AD60]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

        {/* Ornate Gold Inner Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#F4D995]/30 pointer-events-none" />

        {/* Decorative Mandala Corner Icons */}
        <div className="absolute top-4 left-4 text-[#D6AD60]/60 text-lg pointer-events-none">❖</div>
        <div className="absolute top-4 right-4 text-[#D6AD60]/60 text-lg pointer-events-none">❖</div>
        <div className="absolute bottom-4 left-4 text-[#D6AD60]/60 text-lg pointer-events-none">❖</div>
        <div className="absolute bottom-4 right-4 text-[#D6AD60]/60 text-lg pointer-events-none">❖</div>

        {/* 1. Header Strip: Royal Title & Identity */}
        <div className="relative z-10 text-center mb-6">
          <div className="text-[10px] sm:text-xs text-[#D6AD60] font-bold tracking-[3px] uppercase">
            SHUBH DEEPAVALI 2026 · FESTIVAL OF LIGHTS KEEPSAKE
          </div>
          <h3 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE] tracking-wide mt-1">
            {visitorName}’s Diwali Celebration
          </h3>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-[#D6AD60]/20 border border-[#D6AD60]/50 text-xs font-bold text-[#F4D995]">
            <MapPin className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{visitorRegion} · {activePreset.title}</span>
          </div>
        </div>

        {/* 2. Visual Collage Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
          {/* Left Column: Framed Polaroid Photo of Decorated Home (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#FFFDF7] text-[#2C1B10] shadow-2xl border border-[#D6AD60]/50 flex flex-col justify-between h-full transform transition-transform hover:scale-[1.01]">
              {/* Photo Area with Real Decorations */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0F1D] border border-black/10">
                <svg
                  viewBox="0 0 1376 768"
                  preserveAspectRatio="xMidYMid slice"
                  className="w-full h-full block"
                >
                  <image
                    href="/images/diwali_home_exterior.webp"
                    x="0"
                    y="0"
                    width="1376"
                    height="768"
                    preserveAspectRatio="xMidYMid slice"
                  />

                  {/* 1. Roof Fairy String Lights & Step Lamps */}
                  <StepAndRoofLightsSvg
                    roofLightPath={DEFAULT_SCENE_ANCHORS.roofLightPath}
                    steps={DEFAULT_SCENE_ANCHORS.steps}
                    isRoofLit={currentDecor.fairyLights}
                    isStepsLit={currentDecor.diyasCount > 0 || currentDecor.fairyLights}
                  />

                  {/* 2. Traditional Toran along Door Lintel & Side Posts */}
                  {currentDecor.marigoldToran && (
                    <ToranSvg
                      lintelLeft={DEFAULT_SCENE_ANCHORS.lintelLeft}
                      lintelRight={DEFAULT_SCENE_ANCHORS.lintelRight}
                      sideStrings={DEFAULT_SCENE_ANCHORS.sideStrings}
                    />
                  )}

                  {/* 3. Traditional Rangoli on Courtyard Stone */}
                  {currentDecor.rangoli && (
                    <RangoliSvg
                      rangoliCenter={DEFAULT_SCENE_ANCHORS.rangoliCenter}
                      rangoliRadius={DEFAULT_SCENE_ANCHORS.rangoliRadius}
                    />
                  )}

                  {/* 4. Mitti Ka Diyas */}
                  {DEFAULT_SCENE_ANCHORS.diyaSlots.map((slot, idx) => {
                    const isLit = idx < (currentDecor.diyasCount || 0);
                    return isLit ? (
                      <MittiDiyaSvg
                        key={`keepsake-diya-${idx}`}
                        x={slot.x}
                        y={slot.y}
                        isLit={true}
                        scale={idx < 2 ? 1.05 : 1.15}
                      />
                    ) : null;
                  })}
                </svg>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                {/* Decoration Status Indicators */}
                <div className="absolute bottom-2 inset-x-2 flex flex-wrap gap-1 pointer-events-none z-10">
                  {currentDecor.fairyLights && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10172D]/90 text-[#F4D995] border border-[#D6AD60]/40">
                      💡 Fairy Lights
                    </span>
                  )}
                  {currentDecor.marigoldToran && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10172D]/90 text-[#F4D995] border border-[#D6AD60]/40">
                      🌼 Toran
                    </span>
                  )}
                  {currentDecor.rangoli && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10172D]/90 text-[#F4D995] border border-[#D6AD60]/40">
                      🌸 Rangoli
                    </span>
                  )}
                  {currentDecor.diyasCount > 0 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10172D]/90 text-[#F4D995] border border-[#D6AD60]/40">
                      🪔 {currentDecor.diyasCount} Lit Diyas
                    </span>
                  )}
                  {!currentDecor.fairyLights && !currentDecor.marigoldToran && !currentDecor.rangoli && currentDecor.diyasCount === 0 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#10172D]/90 text-slate-300 border border-slate-600">
                      Simple Haveli
                    </span>
                  )}
                </div>
              </div>

              {/* Handwritten style caption */}
              <div className="pt-3 pb-1 text-center font-handwriting text-xl sm:text-2xl font-bold text-[#3E2723]">
                “Our Illuminated Haveli · दीपावली दीपोत्सव”
              </div>
            </div>
          </div>

          {/* Right Column: Greetings & Mela Achievements (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 justify-between">
            {/* Top Right Card: Favourite Greeting */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#192747]/90 border border-[#D6AD60]/40 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D6AD60]/20 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB347] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-[#E91E63]" />
                    <span>Favourite Regional Wish</span>
                  </span>
                  <span className="text-xs text-[#D6AD60] font-royal font-semibold">
                    {activePreset.state}
                  </span>
                </div>

                <p className="font-editorial text-base sm:text-lg italic text-[#FFF5DE] leading-relaxed relative z-10">
                  “{activePreset.greetingText}”
                </p>
              </div>

              {/* Regional language script */}
              <div className="mt-3 p-2.5 rounded-xl bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-xs sm:text-sm font-bold text-[#F4D995]">
                {activePreset.nativeWish}
              </div>
            </div>

            {/* Bottom Right Card: Mela Achievements & Medallions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#192747]/90 border border-[#D6AD60]/40 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-[#D6AD60]/20 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB347] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#F4D995]" />
                  <span>
                    {currentLanguage === 'hi'
                      ? 'इको-दिवाली मेला उपलब्धियां'
                      : currentLanguage === 'bn'
                      ? 'ইকো-দীপাবলি মেলা অর্জন'
                      : 'Eco-Diwali Mela Achievements'}
                  </span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFB347]/20 border border-[#FFB347]/40 text-xs font-bold text-[#F4D995]">
                  ⭐ {totalStars}{' '}
                  {currentLanguage === 'hi'
                    ? 'दिवाली सितारे'
                    : currentLanguage === 'bn'
                    ? 'দীপাবলি তারা'
                    : 'Diwali Stars'}
                </span>
              </div>

              {/* Badges Display: When person has played nothing, show nothing / clean empty state */}
              {displayBadges.length === 0 ? (
                <div className="py-4 px-3 rounded-xl bg-[#10172D]/60 border border-dashed border-[#D6AD60]/30 flex flex-col items-center justify-center text-center">
                  <p className="text-xs sm:text-sm text-[#FFF5DE]/65 italic font-editorial">
                    {currentLanguage === 'hi'
                      ? 'अभी तक कोई मेला बैज अर्जित नहीं हुआ है।'
                      : currentLanguage === 'bn'
                      ? 'এখনও কোনও মেলা ব্যাজ অর্জিত হয়নি।'
                      : 'No Mela badges earned yet.'}
                  </p>
                  <p className="text-[11px] text-[#F4D995]/70 mt-1 max-w-sm">
                    {currentLanguage === 'hi'
                      ? 'इको-दिवाली मेले में खेलें (रंगोली, खजाने की खोज, क्विज़ आदि) और अपने बैज अनलॉक करें!'
                      : currentLanguage === 'bn'
                      ? 'ইকো-দীপাবলি মেলায় খেলা খেলুন এবং আপনার বিশেষ ব্যাজ অর্জন করুন!'
                      : 'Play games in the Eco-Diwali Mela to earn stars and unlock your festive honours!'}
                  </p>
                  {onOpenEcoMela && (
                    <button
                      onClick={() => {
                        audioManager.playSparkleSound();
                        onOpenEcoMela();
                      }}
                      className="mt-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D6AD60]/30 to-[#FFB347]/30 hover:from-[#D6AD60]/50 hover:to-[#FFB347]/50 border border-[#D6AD60]/60 text-xs font-bold text-[#F4D995] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:text-white"
                    >
                      <span>🎪</span>
                      <span>
                        {currentLanguage === 'hi'
                          ? 'इको-दिवाली मेला खेलें'
                          : currentLanguage === 'bn'
                          ? 'মেলায় অংশ নিন'
                          : 'Play Eco-Diwali Mela'}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                /* Badges Medallion Row for unlocked badges */
                <div
                  className={`grid gap-2 text-center ${
                    displayBadges.length === 1
                      ? 'grid-cols-1 max-w-[150px] mx-auto'
                      : displayBadges.length === 2
                      ? 'grid-cols-2'
                      : displayBadges.length === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-2 sm:grid-cols-4'
                  }`}
                >
                  {displayBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="p-2 rounded-xl bg-[#10172D]/90 border border-[#D6AD60]/30 flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#D6AD60]/20 border border-[#F4D995]/60 flex items-center justify-center text-xl shadow-inner">
                        {badge.icon}
                      </div>
                      <span className="text-[10px] font-bold text-[#FFF5DE] truncate w-full">
                        {badge.name[currentLanguage] || badge.name.en}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Bottom Banner: Closing Blessing & Sacred Sanskrit Mantra */}
        <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-[#10172D]/95 border border-[#D6AD60]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-left flex-1">
            <div className="text-[10px] font-bold text-[#FFB347] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F4D995]" />
              <span>Personalised Closing Blessing</span>
            </div>
            <p className="font-editorial text-sm sm:text-base italic text-[#FFF5DE]">
              “{customClosingMessage}”
            </p>
            <p className="font-royal text-xs sm:text-sm font-bold text-[#F4D995] pt-0.5">
              ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥
            </p>
          </div>

          {/* Stamped Wax Seal */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B71C1C] via-[#7F0000] to-[#4A0000] border-2 border-[#F4D995] shadow-xl flex flex-col items-center justify-center text-center">
              <span className="text-xl">🪔</span>
              <span className="text-[7px] font-bold text-[#F4D995] tracking-widest uppercase">
                DIWALI 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ACTION BAR: DOWNLOAD BUTTON & QUICK ACTIONS                   */}
      {/* ============================================================== */}
      <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        {/* Primary Download Button */}
        <button
          onClick={handleDownloadKeepsake}
          disabled={isGenerating}
          className="w-full sm:w-auto flex-1 min-h-[48px] px-6 py-3 rounded-2xl font-bold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#D6AD60]/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 text-[#10172D] animate-spin" />
              <span>
                {currentLanguage === 'hi'
                  ? 'चित्र तैयार हो रहा है...'
                  : currentLanguage === 'bn'
                  ? 'ছবি প্রস্তুত হচ্ছে...'
                  : 'Rendering HD Keepsake...'}
              </span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-[#10172D]" />
              <span>
                {currentLanguage === 'hi'
                  ? 'संस्मरण डाउनलोड करें (HD इमेज)'
                  : currentLanguage === 'bn'
                  ? 'স্মারক ডাউনলোড করুন (HD ছবি)'
                  : 'Download Keepsake (HD Image)'}
              </span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareLink}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-sm text-[#FFF5DE] bg-[#192747] hover:bg-[#203259] border border-[#D6AD60]/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          {copySuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>
                {currentLanguage === 'hi'
                  ? 'लिंक कॉपी हो गया!'
                  : currentLanguage === 'bn'
                  ? 'লিঙ্ক কপি হয়েছে!'
                  : 'Link Copied!'}
              </span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#F4D995]" />
              <span>
                {currentLanguage === 'hi'
                  ? 'संस्मरण शेयर करें'
                  : currentLanguage === 'bn'
                  ? 'স্মারক শেয়ার করুন'
                  : 'Share Keepsake'}
              </span>
            </>
          )}
        </button>

        {/* Celebrate Again */}
        {onCelebrateAgain && (
          <button
            onClick={onCelebrateAgain}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl text-xs sm:text-sm text-[#F4D995]/85 hover:text-[#FFF5DE] hover:bg-[#192747]/60 transition-all cursor-pointer"
          >
            {currentLanguage === 'hi'
              ? 'पुनः उत्सव मनाएं'
              : currentLanguage === 'bn'
              ? 'পুনরায় উৎসব শুরু করুন'
              : 'Restart Tour'}
          </button>
        )}
      </div>
    </div>
  );
};
