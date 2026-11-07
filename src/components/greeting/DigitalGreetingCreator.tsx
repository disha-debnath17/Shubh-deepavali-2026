/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Download,
  Share2,
  Copy,
  Check,
  Edit3,
  Eye,
  RefreshCw,
  Heart,
  Flame,
  CheckCircle2,
  Send,
  Wand2,
  Loader2,
} from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  RelationshipCategory,
  RELATIONSHIP_CONFIG,
  GREETING_TEMPLATES,
  GreetingTemplateOption,
} from '../../config/greetingCards';
import { INDIAN_REGIONS, ALL_INDIA_REGION, getRegionByName } from '../../data/regionalData';

export type GreetingTone = 'emotional' | 'traditional' | 'heartwarming' | 'funny' | 'spiritual';

interface DigitalGreetingCreatorProps {
  currentLanguage: Language;
  defaultUserName?: string;
  defaultUserState?: string;
  onDone?: () => void;
}

export const DigitalGreetingCreator: React.FC<DigitalGreetingCreatorProps> = ({
  currentLanguage,
  defaultUserName = '',
  defaultUserState,
  onDone,
}) => {
  // 1. Relationship Selection (Parents, Grandparents, Siblings, Friends, Partner, Teachers, Other loved ones)
  const [selectedRelationship, setSelectedRelationship] = useState<RelationshipCategory>('parents');

  // Selected State / Region for the greeting card
  const [selectedCardState, setSelectedCardState] = useState<string>(
    defaultUserState || 'All of India'
  );

  // Gemini AI Personalized Greeting Composer State (5 tones: Emotional, Traditional, Heartwarming, Funny, Spiritual)
  const [isAiPanelOpen, setIsAiPanelOpen] = useState<boolean>(true);
  const [isGeminiGenerating, setIsGeminiGenerating] = useState<boolean>(false);
  const [geminiTone, setGeminiTone] = useState<GreetingTone>('emotional');
  const [personalMemory, setPersonalMemory] = useState<string>('');
  const [activeGenerationSource, setActiveGenerationSource] = useState<'gemini' | 'cultural-engine' | null>(null);
  const [geminiStatusMsg, setGeminiStatusMsg] = useState<{ text: string; isGemini: boolean } | null>(null);

  // 2. Template Theme Selection
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('royal-marigold');

  // 3. Form fields
  const currentRelConfig = RELATIONSHIP_CONFIG[selectedRelationship];
  const defaultMsg = currentRelConfig.messages[currentLanguage] || currentRelConfig.messages.en;

  const [toName, setToName] = useState<string>(
    currentRelConfig.defaultRecipient[currentLanguage] || currentRelConfig.defaultRecipient.en
  );
  const [fromName, setFromName] = useState<string>(defaultUserName || '');
  const [salutation, setSalutation] = useState<string>(defaultMsg.salutation);
  const [p1, setP1] = useState<string>(defaultMsg.p1);
  const [p2, setP2] = useState<string>(defaultMsg.p2);
  const [p3, setP3] = useState<string>(defaultMsg.p3);
  const [closing, setClosing] = useState<string>(defaultMsg.closing);

  // 4. View Mode: 'edit' or 'preview'
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const activeTemplate =
    GREETING_TEMPLATES.find((t) => t.id === selectedTemplateId) || GREETING_TEMPLATES[0];

  // When changing relationship, update default message
  const handleSelectRelationship = (rel: RelationshipCategory) => {
    audioManager.playClickSound();
    setSelectedRelationship(rel);
    const config = RELATIONSHIP_CONFIG[rel];
    const msg = config.messages[currentLanguage] || config.messages.en;
    setToName(config.defaultRecipient[currentLanguage] || config.defaultRecipient.en);
    setSalutation(msg.salutation);
    setP1(msg.p1);
    setP2(msg.p2);
    setP3(msg.p3);
    setClosing(msg.closing);
  };

  // Reset to default message for current relationship
  const handleResetToDefaultMessage = () => {
    audioManager.playSparkleSound();
    const config = RELATIONSHIP_CONFIG[selectedRelationship];
    const msg = config.messages[currentLanguage] || config.messages.en;
    setSalutation(msg.salutation);
    setP1(msg.p1);
    setP2(msg.p2);
    setP3(msg.p3);
    setClosing(msg.closing);
  };

  // Generate Personalized Greeting using Gemini AI
  const handleGenerateWithGemini = async () => {
    audioManager.playSparkleSound();
    setIsGeminiGenerating(true);
    setGeminiStatusMsg(null);

    try {
      const targetState = selectedCardState || defaultUserState || 'All of India';
      const apiUrl = import.meta.env.VITE_API_URL || '/api/gemini/greeting';
      let res: Response | null = null;
      try {
        res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            relationship: selectedRelationship,
            recipientName: toName,
            senderName: fromName,
            tone: geminiTone,
            language: currentLanguage,
            state: targetState,
            personalMemory: personalMemory.trim() || undefined,
          }),
        });
      } catch (fetchErr) {
        console.warn('API greeting service fetch failed, using fallback:', fetchErr);
      }

      if (res && res.status === 429) {
        setGeminiStatusMsg({
          text:
            currentLanguage === 'hi'
              ? '⏳ बहुत अधिक अनुरोध। कृपया कुछ सेकंड बाद पुनः प्रयास करें।'
              : currentLanguage === 'bn'
              ? '⏳ অত্যধিক অনুরোধ। অনুগ্রহ করে কয়েক সেকেন্ড পরে আবার চেষ্টা করুন।'
              : '⏳ High demand. Please wait a few seconds before generating another greeting.',
          isGemini: false,
        });
        setTimeout(() => setGeminiStatusMsg(null), 5000);
        return;
      }

      let handledSuccess = false;
      if (res && res.ok) {
        const data = await res.json();
        if (data.greeting) {
          const g = data.greeting;
          if (g.salutation) setSalutation(g.salutation);
          if (g.p1) setP1(g.p1);
          if (g.p2) setP2(g.p2);
          if (g.p3) setP3(g.p3);
          if (g.closing) setClosing(g.closing);

          audioManager.playSparkleSound();
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FFB347', '#D6AD60', '#F4D995', '#E91E63'],
            });
          } catch (e) {}

          const isRealGemini = Boolean(
            data.isGemini === true || (data.model && data.model.startsWith('gemini'))
          );
          setActiveGenerationSource(isRealGemini ? 'gemini' : 'cultural-engine');

          const regionLabel = targetState === 'All of India' ? 'Pan-India' : targetState;

          if (isRealGemini) {
            setGeminiStatusMsg({
              text:
                currentLanguage === 'hi'
                  ? `✨ गूगल जेमिनी द्वारा ${regionLabel} की सांस्कृतिक परंपराओं से सुसज्जित पावन शुभकामना रची गई!`
                  : currentLanguage === 'bn'
                  ? `✨ গুগল জেমিনি দ্বারা ${regionLabel}-এর ঐতিহ্যমণ্ডিত সাংস্কৃতিক ছোঁয়ায় আন্তরিক শুভেচ্ছা রচিত হলো!`
                  : `✨ Personalized greeting composed by Google Gemini (${regionLabel} cultural traditions)!`,
              isGemini: true,
            });
          } else {
            setGeminiStatusMsg({
              text:
                currentLanguage === 'hi'
                  ? `🪔 क्षेत्रीय सांस्कृतिक भंडार द्वारा तैयार विशेष शुभकामना (${regionLabel} परंपरा व यादों सहित)`
                  : currentLanguage === 'bn'
                  ? `🪔 সমৃদ্ধ আঞ্চলিক সাংস্কৃতিক ডেটাবেজ দ্বারা প্রস্তুত বিশেষ শুভেচ্ছা (${regionLabel} ঐতিহ্য ও স্মৃতির ছোঁয়া)`
                  : `🪔 Personalized greeting composed using Curated Cultural Repository (${regionLabel} traditions & memories)`,
              isGemini: false,
            });
          }
          setTimeout(() => setGeminiStatusMsg(null), 7000);
          handledSuccess = true;
        }
      }

      // If API was not reachable or call failed, gracefully use built-in sample text
      if (!handledSuccess) {
        const config = RELATIONSHIP_CONFIG[selectedRelationship];
        const defaultMsg = config.messages[currentLanguage] || config.messages.en;
        if (defaultMsg.salutation) setSalutation(defaultMsg.salutation);
        if (defaultMsg.p1) setP1(defaultMsg.p1);
        if (defaultMsg.p2) {
          setP2(
            personalMemory.trim()
              ? (currentLanguage === 'hi'
                  ? `आपकी वह प्यारी याद—"${personalMemory.trim()}"—इस उत्सव को और भी खास बना देती है। ${defaultMsg.p2}`
                  : currentLanguage === 'bn'
                  ? `সেই মধুর স্মৃতি—"${personalMemory.trim()}"—এই উৎসবের আনন্দ আরও দ্বিগুণ করে। ${defaultMsg.p2}`
                  : `Cherishing that fond memory—"${personalMemory.trim()}"—which makes this festival all the sweeter. ${defaultMsg.p2}`)
              : defaultMsg.p2
          );
        }
        if (defaultMsg.p3) setP3(defaultMsg.p3);
        if (defaultMsg.closing) setClosing(defaultMsg.closing);

        audioManager.playSparkleSound();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFB347', '#D6AD60', '#F4D995', '#E91E63'],
          });
        } catch (e) {}

        setActiveGenerationSource('cultural-engine');
        const regionLabel = targetState === 'All of India' ? 'Pan-India' : targetState;
        setGeminiStatusMsg({
          text:
            currentLanguage === 'hi'
              ? `🪔 क्षेत्रीय सांस्कृतिक भंडार द्वारा तैयार विशेष शुभकामना (${regionLabel} परंपरा व यादों सहित)`
              : currentLanguage === 'bn'
              ? `🪔 সমৃদ্ধ আঞ্চলিক সাংস্কৃতিক ডেটাবেজ দ্বারা প্রস্তুত বিশেষ শুভেচ্ছা (${regionLabel} ঐতিহ্য ও স্মৃতির ছোঁয়া)`
              : `🪔 Personalized greeting composed using Curated Cultural Repository (${regionLabel} traditions & memories)`,
          isGemini: false,
        });
        setTimeout(() => setGeminiStatusMsg(null), 7000);
      }
    } catch (err) {
      console.warn('Greeting generation error:', err);
      setActiveGenerationSource('cultural-engine');
      setGeminiStatusMsg({
        text:
          currentLanguage === 'hi'
            ? '🪔 पारंपरिक सांस्कृतिक टेम्पलेट द्वारा शुभकामना तैयार की गई।'
            : currentLanguage === 'bn'
            ? '🪔 ঐতিহ্যবাহী সাংস্কৃতিক টেমপ্লেট দ্বারা শুভেচ্ছা প্রস্তুত করা হয়েছে।'
            : '🪔 Generated with built-in cultural greeting template.',
        isGemini: false,
      });
      setTimeout(() => setGeminiStatusMsg(null), 5000);
    } finally {
      setIsGeminiGenerating(false);
    }
  };

  // Copy Full Message Text
  const handleCopyText = async () => {
    audioManager.playSparkleSound();
    const fullText = `${salutation}\n\n${p1}\n\n${p2}\n\n${p3}\n\n${closing}\n${fromName ? fromName : 'With love'}\n\n✨ Shubh Deepavali! ✨`;
    try {
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  // Share via Web Share API or WhatsApp
  const handleShare = async () => {
    audioManager.playSparkleSound();
    const shareText = `✨ Shubh Deepavali Greeting ✨\n\n${salutation}\n\n"${p1}"\n\n${closing} ${fromName || ''}\n\nSent with love via Shubh Deepavali`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Diwali Greeting for ${toName}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // user cancelled or failed, fallback to whatsapp
      }
    }

    // WhatsApp Fallback
    const encoded = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // High-Resolution Canvas Download Generator
  const handleDownloadCard = () => {
    audioManager.playSparkleSound();
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // Card Dimensions (1200 x 900 for sharp print / retina)
      const width = 1200;
      const height = 900;
      canvas.width = width;
      canvas.height = height;

      // 1. Draw Background
      if (selectedTemplateId === 'midnight-diya') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#10172D');
        bgGrad.addColorStop(0.5, '#162342');
        bgGrad.addColorStop(1, '#0B0F1C');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (selectedTemplateId === 'terracotta-chandan') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#2C1810');
        bgGrad.addColorStop(0.5, '#3E2415');
        bgGrad.addColorStop(1, '#1A0B05');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (selectedTemplateId === 'festive-rangoli') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#2A1224');
        bgGrad.addColorStop(0.5, '#1C0E22');
        bgGrad.addColorStop(1, '#0E0812');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Royal Marigold Ivory Parchment
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#FFFDF7');
        bgGrad.addColorStop(0.5, '#FAF2E3');
        bgGrad.addColorStop(1, '#F3E5CC');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw Elegant Double Gold Border
      ctx.strokeStyle = '#D6AD60';
      ctx.lineWidth = 6;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#F4D995';
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // Corner Corner Ornaments
      const cornerSize = 40;
      const corners = [
        { x: 36, y: 36 },
        { x: width - 36, y: 36 },
        { x: 36, y: height - 36 },
        { x: width - 36, y: height - 36 },
      ];
      corners.forEach((c) => {
        ctx.fillStyle = '#D6AD60';
        ctx.beginPath();
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Top Decorative Marigold Garland Strip
      const isDark = selectedTemplateId !== 'royal-marigold';
      const garlandY = 75;
      for (let x = 70; x < width - 70; x += 38) {
        ctx.fillStyle = (x / 38) % 2 === 0 ? '#F5A623' : '#FF7043';
        ctx.beginPath();
        ctx.arc(x, garlandY, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFE082';
        ctx.beginPath();
        ctx.arc(x, garlandY, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Header Badges
      ctx.fillStyle = '#D6AD60';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨  SHUBH DEEPAVALI GREETINGS  ✨', width / 2, 135);

      // 5. To: Recipient Name Banner
      ctx.fillStyle = isDark ? '#F4D995' : '#8A581A';
      ctx.font = 'italic bold 28px Georgia, serif';
      ctx.fillText(`To Dearest ${toName}`, width / 2, 185);

      // 6. Center Letter Text
      const textColor = isDark ? '#FFF5DE' : '#2A1810';
      const secondaryColor = isDark ? '#E0D0B0' : '#4E342E';
      ctx.fillStyle = textColor;
      ctx.font = 'bold 34px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'left';

      // Salutation
      const leftMargin = 100;
      let textY = 250;
      ctx.fillText(salutation, leftMargin, textY);
      textY += 50;

      // Wrap and draw Paragraphs
      ctx.font = '24px "Outfit", system-ui, sans-serif';
      ctx.fillStyle = secondaryColor;

      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        let curY = y;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, curY);
            line = words[n] + ' ';
            curY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, curY);
        return curY + lineHeight;
      };

      const maxTextWidth = width - leftMargin * 2;
      textY = wrapText(p1, leftMargin, textY, maxTextWidth, 36) + 12;
      textY = wrapText(p2, leftMargin, textY, maxTextWidth, 36) + 12;
      textY = wrapText(p3, leftMargin, textY, maxTextWidth, 36) + 20;

      // 7. Closing & Signature
      ctx.font = 'italic 26px Georgia, serif';
      ctx.fillStyle = isDark ? '#F4D995' : '#8A581A';
      ctx.fillText(closing, leftMargin, textY);
      textY += 40;

      ctx.font = 'bold 36px "Caveat", "Brush Script MT", cursive, sans-serif';
      ctx.fillStyle = textColor;
      ctx.fillText(fromName ? fromName : 'With Endless Love & Blessings', leftMargin, textY);

      // 8. Bottom Center Sacred Glowing Diya Drawing
      const diyaX = width / 2;
      const diyaY = height - 105;

      // Diya Flame Outer
      ctx.fillStyle = 'rgba(255, 179, 71, 0.5)';
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 25, 25, 0, Math.PI * 2);
      ctx.fill();

      // Flame
      ctx.fillStyle = '#FFE082';
      ctx.beginPath();
      ctx.moveTo(diyaX, diyaY - 50);
      ctx.quadraticCurveTo(diyaX + 12, diyaY - 30, diyaX + 10, diyaY - 15);
      ctx.quadraticCurveTo(diyaX, diyaY - 10, diyaX - 10, diyaY - 15);
      ctx.quadraticCurveTo(diyaX - 12, diyaY - 30, diyaX, diyaY - 50);
      ctx.fill();

      // Flame Core
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 20, 5, 0, Math.PI * 2);
      ctx.fill();

      // Clay Bowl
      ctx.fillStyle = '#823617';
      ctx.beginPath();
      ctx.ellipse(diyaX, diyaY, 40, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#D6AD60';
      ctx.beginPath();
      ctx.ellipse(diyaX, diyaY - 4, 34, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Trigger file download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const cleanFileName = (toName || 'Loved-One').replace(/[^a-zA-Z0-9]/g, '-');
      link.download = `Diwali-Greeting-For-${cleanFileName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5A623', '#F4D995', '#D6AD60'],
        });
      } catch (e) {}
    } catch (err) {
      console.warn('Canvas card export error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Feature Header */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-5 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-[#FFB347] fill-[#FFB347]" />
          <span>
            {currentLanguage === 'hi'
              ? 'डिजिटल बधाई पत्र सृजन'
              : currentLanguage === 'bn'
              ? 'ব্যক্তিগত ডিজিটাল শুভেচ্ছা চিঠি'
              : 'Create Personalized Digital Greeting Letters'}
          </span>
        </div>

        <h3 className="font-royal text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF5DE]">
          {currentLanguage === 'hi'
            ? 'अपनों के लिए दिल से लिखे दिवाली संदेश'
            : currentLanguage === 'bn'
            ? 'প্রিয়জনদের জন্য ভালোবাসায় ভরা দীপাবলি বার্তা'
            : 'Craft Heartfelt Festive Letters for People You Love'}
        </h3>

        <p className="text-xs sm:text-sm text-[#FFF5DE]/75 font-light">
          {currentLanguage === 'hi'
            ? 'रिश्ता चुनें, व्यक्तिगत नाम डालें, सुंदर टेम्पलेट चुनें और संपादित कर साझा करें।'
            : currentLanguage === 'bn'
            ? 'সম্পর্ক নির্বাচন করুন, প্রিয়জনের নাম লিখুন, সুন্দর টেমপ্লেট বেছে নিয়ে পাঠান।'
            : 'Select a relationship, customize personal names, pick a festive template, and download or share.'}
        </p>
      </div>

      {/* 1. Relationship Selector Bar */}
      <div className="w-full max-w-3xl mb-4 px-2">
        <div className="text-xs font-semibold text-[#F4D995] mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>💌</span>
            <span>
              {currentLanguage === 'hi'
                ? '१. रिश्ता चुनें:'
                : currentLanguage === 'bn'
                ? '১. সম্পর্ক নির্বাচন করুন:'
                : '1. Select Relationship:'}
            </span>
          </span>
          <span className="text-[11px] text-[#FFF5DE]/60 italic hidden sm:inline">
            {currentLanguage === 'hi'
              ? 'संदेश स्वतः अनुकूलित होगा'
              : currentLanguage === 'bn'
              ? 'বার্তা স্বয়ংক্রিয়ভাবে বদলাবে'
              : 'Auto-adapts heartfelt greeting'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 sm:gap-2">
          {(
            [
              'parents',
              'grandparents',
              'siblings',
              'friends',
              'partner',
              'teachers',
              'other',
            ] as RelationshipCategory[]
          ).map((relKey) => {
            const config = RELATIONSHIP_CONFIG[relKey];
            const isSelected = selectedRelationship === relKey;

            return (
              <button
                key={relKey}
                onClick={() => handleSelectRelationship(relKey)}
                className={`p-2 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#D6AD60]/30 to-[#192747] border-[#F4D995] text-[#F4D995] scale-102 ring-2 ring-[#D6AD60]/50'
                    : 'bg-[#192747]/70 border-slate-700/80 text-[#FFF5DE]/75 hover:border-[#D6AD60]/40 hover:text-white'
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <span className="truncate w-full text-center text-[11px]">
                  {config.label[currentLanguage]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual Template Selector Bar */}
      <div className="w-full max-w-3xl mb-4 px-2">
        <div className="text-xs font-semibold text-[#F4D995] mb-2 flex items-center gap-1.5">
          <span>🎨</span>
          <span>
            {currentLanguage === 'hi'
              ? '२. कार्ड शैली (टेम्पलेट):'
              : currentLanguage === 'bn'
              ? '২. কার্ডের স্টাইল (টেমপ্লেট):'
              : '2. Card Template & Atmosphere:'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GREETING_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplateId === tmpl.id;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  audioManager.playClickSound();
                  setSelectedTemplateId(tmpl.id);
                }}
                className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#192747] border-[#F4D995] ring-2 ring-[#F4D995]/40 shadow-md scale-102'
                    : 'bg-[#141E34]/80 border-slate-700/80 hover:border-[#D6AD60]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold text-[#F4D995]">
                    {tmpl.name[currentLanguage]}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#F4D995]" />}
                </div>
                <p className="text-[10px] text-[#FFF5DE]/70 leading-snug line-clamp-2">
                  {tmpl.description[currentLanguage]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2.5 Gemini AI Personalized Greeting Composer */}
      <div className="w-full max-w-3xl mb-4 px-2">
        <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B]/95 via-[#1E1838]/95 to-[#31103E]/95 border-2 border-[#D6AD60]/60 p-4 sm:p-5 shadow-xl relative overflow-hidden">
          {/* Subtle glowing animated background sparkles */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-[#FFB347]/20 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-3 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFB347] via-[#D6AD60] to-[#E91E63] p-0.5 flex items-center justify-center shrink-0 shadow-md">
                <div className="w-full h-full bg-[#10172D] rounded-[10px] flex items-center justify-center">
                  <Wand2 className="w-4 h-4 text-[#FFB347] animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-royal text-sm sm:text-base font-bold text-[#FFF5DE]">
                    {currentLanguage === 'hi'
                      ? '✨ जेमिनी AI से रची गई व्यक्तिगत शुभकामना'
                      : currentLanguage === 'bn'
                      ? '✨ জেমিনি AI দিয়ে ব্যক্তিগত শুভেচ্ছা রচনা'
                      : '✨ Compose with Google Gemini AI'}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 font-semibold hidden sm:inline">
                    Gemini 3.8 Flash
                  </span>
                </div>
                <p className="text-[11px] text-[#FFF5DE]/70 font-light">
                  {currentLanguage === 'hi'
                    ? 'अपने प्रियजन के लिए आत्मीय, मधुर व यादगार दीपावली संदेश तैयार करें'
                    : currentLanguage === 'bn'
                    ? 'আপনার প্রিয়জনের জন্য আন্তরিক ও মর্মস্পর্শী দীপাবলি শুভেচ্ছা তৈরি করুন'
                    : 'Craft authentic, emotionally resonant Diwali blessings tailored to your bond'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAiPanelOpen((prev) => !prev)}
              className="text-xs text-[#F4D995] hover:underline cursor-pointer font-medium shrink-0"
            >
              {isAiPanelOpen ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {isAiPanelOpen && (
            <div className="space-y-3 relative z-10 animate-fade-in">
              {/* Tone Selection (5 Curated Tones: Emotional, Traditional, Heartwarming, Funny, Spiritual) */}
              <div>
                <label className="text-[11px] font-semibold text-[#F4D995] block mb-1.5">
                  {currentLanguage === 'hi'
                    ? 'शुभकामना का भाव (Tone):'
                    : currentLanguage === 'bn'
                    ? 'বার্তার সুর (Tone):'
                    : 'Select Greeting Tone (5 Emotion Styles):'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {[
                    { id: 'emotional', label: '💖 Emotional', labelHi: '💖 भावुक व गहरा', labelBn: '💖 আবেগপূর্ণ ও গভীর' },
                    { id: 'traditional', label: '🪔 Traditional', labelHi: '🪔 पारंपरिक व पावन', labelBn: '🪔 ঐতিহ্যবাহী ও পবিত্র' },
                    { id: 'heartwarming', label: '🌸 Heartwarming', labelHi: '🌸 हृदयस्पर्शी व मधुर', labelBn: '🌸 হৃদয়গ্রাহী ও মধুর' },
                    { id: 'funny', label: '🎉 Funny', labelHi: '🎉 मजेदार व चंचल', labelBn: '🎉 হাস্যরসাত্মক ও মিষ্টি' },
                    { id: 'spiritual', label: '✨ Spiritual', labelHi: '✨ आध्यात्मिक व शांत', labelBn: '✨ আধ্যাত্মিক ও শান্ত' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        audioManager.playClickSound();
                        setGeminiTone(t.id as GreetingTone);
                      }}
                      className={`px-2 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        geminiTone === t.id
                          ? 'bg-[#D6AD60]/30 border-[#F4D995] text-[#F4D995] shadow-xs ring-1 ring-[#F4D995]/50'
                          : 'bg-[#141B33]/60 border-slate-700/60 text-[#FFF5DE]/70 hover:border-[#D6AD60]/40'
                      }`}
                    >
                      {currentLanguage === 'hi' ? t.labelHi : currentLanguage === 'bn' ? t.labelBn : t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regional Cultural Context Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#F4D995]">
                    {currentLanguage === 'hi'
                      ? 'क्षेत्रीय सांस्कृतिक परंपरा (Regional Tradition):'
                      : currentLanguage === 'bn'
                      ? 'আঞ্চলিক ঐতিহ্য ও সংস্কৃতি (Regional Tradition):'
                      : 'Regional Cultural Tradition for AI Context:'}
                  </label>
                  <span className="text-[10px] text-[#D6AD60] font-mono">
                    {selectedCardState || 'All of India'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={selectedCardState}
                    onChange={(e) => {
                      audioManager.playClickSound();
                      setSelectedCardState(e.target.value);
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#0F162B] border border-[#D6AD60]/40 text-xs text-[#FFF5DE] focus:outline-none focus:border-[#F4D995] cursor-pointer"
                  >
                    <option value="All of India">🇮🇳 Pan-India (All of India Traditions)</option>
                    <optgroup label="States & Union Territories">
                      {INDIAN_REGIONS.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name} ({r.festivalName[currentLanguage] || r.festivalName.en})
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  {/* Curated Preview Badge */}
                  {(() => {
                    const reg = getRegionByName(selectedCardState);
                    if (!reg) return null;
                    const festName = reg.festivalName[currentLanguage] || reg.festivalName.en;
                    const meaningText = reg.meaning[currentLanguage] || reg.meaning.en;
                    const sweetName = reg.foodSpecialty?.name[currentLanguage] || reg.foodSpecialty?.name.en || 'Festive Mithai';
                    const decorName = reg.decorTradition?.artName[currentLanguage] || reg.decorTradition?.artName.en || 'Diwali Decor';

                    return (
                      <div className="px-3 py-1.5 rounded-xl bg-[#10172D]/90 border border-slate-700/70 text-[10px] text-[#FFF5DE]/80 flex flex-col justify-center leading-tight">
                        <span className="text-[#F4D995] font-semibold truncate">
                          🪔 {festName}: <span className="font-normal text-slate-300">{meaningText}</span>
                        </span>
                        <span className="text-[#FFF5DE]/65 truncate">
                          🍬 {sweetName} • 🎨 {decorName}
                        </span>
                      </div>
                    );
                  })() || (
                    <div className="px-3 py-1.5 rounded-xl bg-[#10172D]/90 border border-slate-700/70 text-[10px] text-[#FFF5DE]/80 flex flex-col justify-center leading-tight">
                      <span className="text-[#F4D995] font-semibold">
                        🪔 Deepavali across India: Victory of Light over Darkness
                      </span>
                      <span className="text-[#FFF5DE]/65">
                        🍬 Kaju Katli, Laddoos • 🎨 Rangoli, Diyas & Marigold Torans
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Touch / Memory Input */}
              <div>
                <label className="text-[11px] font-semibold text-[#F4D995] block mb-1">
                  {currentLanguage === 'hi'
                    ? 'कोई विशेष स्मृति या संदेश (वैकल्पिक):'
                    : currentLanguage === 'bn'
                    ? 'কোনো বিশেষ স্মৃতি বা বার্তা (ঐচ্ছিক):'
                    : 'Personal Memory or Special Note (Optional):'}
                </label>
                <input
                  type="text"
                  value={personalMemory}
                  onChange={(e) => setPersonalMemory(e.target.value)}
                  placeholder={
                    currentLanguage === 'hi'
                      ? 'जैसे: माँ के हाथ के बेसन के लड्डू, छत पर दीये सजाना, बचपन की हँसी...'
                      : currentLanguage === 'bn'
                      ? 'যেমন: মায়ের হাতের নাড়ু, ছাদে প্রদীপ সাজানো, ছেলেবেলার হাসি...'
                      : "e.g. missing Maa's homemade sweets, lighting diyas on the terrace..."
                  }
                  className="w-full h-9 px-3 rounded-xl bg-[#0F162B] border border-[#D6AD60]/40 text-xs text-[#FFF5DE] placeholder-[#FFF5DE]/40 focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              {/* Action Buttons: Generate & Regenerate */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                <span className="text-[10px] text-[#FFF5DE]/60 italic">
                  {currentLanguage === 'hi'
                    ? 'चुने हुए राज्य की संस्कृति, रिश्ते और यादों के आधार पर पत्र रचा जाएगा'
                    : currentLanguage === 'bn'
                    ? 'নির্বাচিত রাজ্যের সংস্কৃতি, সম্পর্ক ও স্মৃতির ভিত্তিতে চিঠি রচিত হবে'
                    : 'Authentic letter composed using regional traditions and personal memories'}
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {activeGenerationSource && (
                    <button
                      type="button"
                      onClick={handleGenerateWithGemini}
                      disabled={isGeminiGenerating}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/50 hover:bg-[#D6AD60]/20 text-[#F4D995] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Generate a fresh variation with Gemini"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGeminiGenerating ? 'animate-spin' : ''}`} />
                      <span>
                        {currentLanguage === 'hi' ? 'पुनः लिखें' : currentLanguage === 'bn' ? 'পুনরায় লিখুন' : 'Regenerate'}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleGenerateWithGemini}
                    disabled={isGeminiGenerating}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFB347] via-[#D6AD60] to-[#E91E63] text-slate-950 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isGeminiGenerating ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>
                          {currentLanguage === 'hi'
                            ? 'रचना हो रही है...'
                            : currentLanguage === 'bn'
                            ? 'রচনা হচ্ছে...'
                            : 'Composing with Gemini...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-950" />
                        <span>
                          {activeGenerationSource
                            ? (currentLanguage === 'hi'
                                ? 'नया जेमिनी पत्र लिखें ✨'
                                : currentLanguage === 'bn'
                                ? 'নতুন জেমিনি চিঠি রচনা করুন ✨'
                                : 'Compose New Greeting ✨')
                            : (currentLanguage === 'hi'
                                ? 'जेमिनी से पत्र लिखें ✨'
                                : currentLanguage === 'bn'
                                ? 'জেমিনি দিয়ে চিঠি রচনা করুন ✨'
                                : 'Generate Personalized Greeting ✨')}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {geminiStatusMsg && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
                    geminiStatusMsg.isGemini
                      ? 'bg-indigo-950/90 border border-indigo-400/50 text-indigo-200'
                      : 'bg-amber-950/90 border border-amber-500/50 text-amber-200'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      geminiStatusMsg.isGemini ? 'text-indigo-400' : 'text-amber-400'
                    }`}
                  />
                  <span className="font-medium">{geminiStatusMsg.text}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Toolbar (Edit / Preview Toggle, Reset Message) */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 mb-3 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playClickSound();
              setViewMode(viewMode === 'preview' ? 'edit' : 'preview');
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#192747] border border-[#D6AD60]/50 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {viewMode === 'preview' ? (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>
                  {currentLanguage === 'hi'
                    ? 'संदेश संपादित करें'
                    : currentLanguage === 'bn'
                    ? 'বার্তা সম্পাদনা'
                    : 'Edit Letter Text'}
                </span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {currentLanguage === 'hi'
                    ? 'कार्ड का पूर्वावलोकन'
                    : currentLanguage === 'bn'
                    ? 'কার্ড প্রিভিউ'
                    : 'Preview Card'}
                </span>
              </>
            )}
          </button>

          <button
            onClick={handleResetToDefaultMessage}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-700 bg-[#10172D] hover:bg-[#192747] text-[#FFF5DE]/70 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset to default heartfelt wording"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">
              {currentLanguage === 'hi'
                ? 'मूल संदेश पुनर्स्थापित करें'
                : currentLanguage === 'bn'
                ? 'আসল বার্তা ফিরিয়ে আনুন'
                : 'Reset Wording'}
            </span>
          </button>
        </div>

        {/* Action Buttons: Download & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy text to clipboard"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isCopied
                ? (currentLanguage === 'hi' ? 'कॉपी हुआ!' : currentLanguage === 'bn' ? 'কপি হয়েছে!' : 'Copied!')
                : (currentLanguage === 'hi' ? 'कॉपी करें' : currentLanguage === 'bn' ? 'কপি করুন' : 'Copy Text')}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-[#192747] border border-[#D6AD60] text-[#F4D995] hover:bg-[#D6AD60]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {currentLanguage === 'hi' ? 'साझा करें' : currentLanguage === 'bn' ? 'শেয়ার করুন' : 'Share'}
            </span>
          </button>

          <button
            onClick={handleDownloadCard}
            disabled={isDownloading}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] hover:brightness-110 active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {isDownloading
                ? (currentLanguage === 'hi' ? 'डाउनलोड हो रहा है...' : currentLanguage === 'bn' ? 'ডাউনলোড হচ্ছে...' : 'Saving...')
                : (currentLanguage === 'hi' ? 'कार्ड डाउनलोड करें' : currentLanguage === 'bn' ? 'কার্ড ডাউনলোড' : 'Download Card')}
            </span>
          </button>
        </div>
      </div>

      {/* 4. MAIN CARD VIEWPORT (EDIT MODE or PREVIEW MODE) */}
      <div className="w-full max-w-3xl px-2">
        {viewMode === 'edit' ? (
          /* ================= EDIT MODE ================= */
          <div className="w-full rounded-3xl bg-[#141F38] border-2 border-[#D6AD60]/40 p-4 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#D6AD60]/20">
              <span className="font-royal text-sm font-bold text-[#F4D995] flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-[#FFB347]" />
                <span>
                  {currentLanguage === 'hi'
                    ? 'पत्र के विवरण संपादित करें'
                    : currentLanguage === 'bn'
                    ? 'চিঠির তথ্য সম্পাদনা করুন'
                    : 'Edit Letter Content & Personal Names'}
                </span>
              </span>
              <span className="text-[11px] text-[#FFF5DE]/60 italic">
                {currentLanguage === 'hi' ? 'सभी परिवर्तन तुरंत दिखेंगे' : currentLanguage === 'bn' ? 'সব পরিবর্তন সরাসরি প্রযোজ্য' : 'Live preview updates instantly'}
              </span>
            </div>

            {/* Names row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                  {currentLanguage === 'hi'
                    ? 'किसे भेज रहे हैं (नाम / उपाधि):'
                    : currentLanguage === 'bn'
                    ? 'কার উদ্দেশ্যে (নাম / সম্বোধন):'
                    : 'Recipient Name / Title:'}
                </label>
                <input
                  type="text"
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="e.g. Dearest Maa, Grandma, Ananya..."
                  className="w-full h-10 px-3 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                  {currentLanguage === 'hi'
                    ? 'भेजने वाले का नाम (आपका नाम):'
                    : currentLanguage === 'bn'
                    ? 'প্রেরকের নাম (আপনার নাম):'
                    : 'Your Name (Sender Signature):'}
                </label>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="e.g. Aarav, Tanya & Family..."
                  className="w-full h-10 px-3 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995]"
                />
              </div>
            </div>

            {/* Salutation */}
            <div>
              <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                {currentLanguage === 'hi' ? 'आरंभिक संबोधन:' : currentLanguage === 'bn' ? 'শুরুর সম্বোধন:' : 'Salutation Greeting:'}
              </label>
              <input
                type="text"
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995]"
              />
            </div>

            {/* Paragraph 1 */}
            <div>
              <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                {currentLanguage === 'hi' ? 'पहला अनुच्छेद (भावनाएं):' : currentLanguage === 'bn' ? 'প্রথম অনুচ্ছেদ (অনুভূতি):' : 'Paragraph 1 (Opening Affection):'}
              </label>
              <textarea
                rows={2}
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995] leading-relaxed"
              />
            </div>

            {/* Paragraph 2 */}
            <div>
              <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                {currentLanguage === 'hi' ? 'दूसरा अनुच्छेद (कृतज्ञता व यादें):' : currentLanguage === 'bn' ? 'দ্বিতীয় অনুচ্ছেদ (স্মৃতি ও কৃতজ্ঞতা):' : 'Paragraph 2 (Gratitude & Connection):'}
              </label>
              <textarea
                rows={2}
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995] leading-relaxed"
              />
            </div>

            {/* Paragraph 3 */}
            <div>
              <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                {currentLanguage === 'hi' ? 'तीसरा अनुच्छेद (दीपावली मंगलकामना):' : currentLanguage === 'bn' ? 'তৃতীয় অনুচ্ছেদ (শুভকামনা):' : 'Paragraph 3 (Festive Blessings):'}
              </label>
              <textarea
                rows={2}
                value={p3}
                onChange={(e) => setP3(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995] leading-relaxed"
              />
            </div>

            {/* Closing */}
            <div>
              <label className="block text-xs font-semibold text-[#F4D995] mb-1">
                {currentLanguage === 'hi' ? 'समापन शब्द:' : currentLanguage === 'bn' ? 'শেষের কথা:' : 'Closing Sign-off:'}
              </label>
              <input
                type="text"
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#0B1020] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewMode('preview')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 cursor-pointer shadow-md"
              >
                {currentLanguage === 'hi' ? 'कार्ड देखें (पूर्वावलोकन) ✨' : currentLanguage === 'bn' ? 'কার্ড প্রিভিউ দেখুন ✨' : 'View Finished Card ✨'}
              </button>
            </div>
          </div>
        ) : (
          /* ================= PREVIEW MODE (RENDERED BEAUTIFUL CARD) ================= */
          <div
            ref={cardRef}
            className={`relative w-full rounded-3xl p-5 sm:p-8 md:p-10 border-4 ${activeTemplate.borderClass} shadow-2xl transition-all duration-500 overflow-hidden text-left`}
            style={{
              backgroundColor: activeTemplate.cardBg,
              color: activeTemplate.textColor,
            }}
          >
            {/* Template Specific Ambient Overlay */}
            {selectedTemplateId === 'royal-marigold' && (
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 31px, rgba(138, 103, 38, 0.15) 31px, rgba(138, 103, 38, 0.15) 32px)',
                  lineHeight: '32px',
                }}
              />
            )}

            {/* Top Marigold Garland Arch */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#D6AD60]/40">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D6AD60]">
                <span>🌼</span>
                <span>SHUBH DEEPAVALI</span>
                <span>🪔</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#FFB347]">
                <span>🌸</span>
                <span>🌼</span>
                <span>🌸</span>
              </div>
            </div>

            {/* Recipient Dedicated Header Tag */}
            <div className="mt-4 mb-2 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#D6AD60] block">
                  A Heartfelt Diwali Note
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D6AD60] tracking-wide mt-0.5">
                  To Dearest {toName}
                </h4>
                {activeGenerationSource === 'gemini' && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Composed by Google Gemini 3.8 Flash</span>
                  </span>
                )}
                {activeGenerationSource === 'cultural-engine' && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    <span>🪔</span>
                    <span>Built-in Cultural Template</span>
                  </span>
                )}
              </div>

              {/* Decorative Postage Stamp */}
              <div className="flex flex-col items-center p-1.5 rounded-xl border border-[#D6AD60]/50 bg-[#10172D]/20 shadow-xs">
                <span className="text-xl">🪔</span>
                <span className="text-[8px] font-bold tracking-widest text-[#D6AD60]">2026 · INDIA</span>
              </div>
            </div>

            {/* Letter Body in Handwritten / Editorial Typography */}
            <div className={`my-4 space-y-3 sm:space-y-4 ${activeTemplate.fontClass} text-base sm:text-lg md:text-xl leading-relaxed`}>
              {/* Salutation */}
              <p className="font-bold text-lg sm:text-xl text-[#F4D995] pt-1">
                {salutation}
              </p>

              {/* Paragraphs */}
              <p className="font-light">{p1}</p>
              <p className="font-light">{p2}</p>
              <p className="font-light">{p3}</p>

              {/* Closing & Signature */}
              <div className="pt-4 border-t border-[#D6AD60]/30 space-y-1">
                <p className="italic text-sm sm:text-base text-[#D6AD60]">{closing}</p>
                <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#F4D995]">
                  {fromName ? fromName : (currentLanguage === 'hi' ? 'सस्नेह आपका' : currentLanguage === 'bn' ? 'স্নেহের সাথে' : 'With Endless Love')}
                </p>
              </div>
            </div>

            {/* Bottom Sacred Earthen Diya with Flickering Flame */}
            <div className="pt-3 border-t border-[#D6AD60]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <svg viewBox="0 0 60 50" className="w-12 sm:w-14 h-auto drop-shadow-md">
                    <g className="animate-flame origin-bottom">
                      <circle cx="30" cy="14" r="10" fill="rgba(255, 179, 71, 0.5)" filter="blur(4px)" />
                      <path d="M 30 2 C 26 9, 24 15, 26 21 C 28 25, 32 25, 34 21 C 36 15, 34 9, 30 2 Z" fill="#FFE082" />
                      <circle cx="30" cy="18" r="3" fill="#FFFFFF" className="animate-flame-core" />
                    </g>
                    <path d="M 8 32 Q 30 46 52 32 C 44 38 16 38 8 32 Z" fill="#823617" />
                    <ellipse cx="30" cy="30" rx="20" ry="6" fill="#B5532A" />
                    <circle cx="30" cy="24" r="2" fill="#FFE082" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs text-[#D6AD60] italic">
                  "May divine light bring health, peace, and eternal joy."
                </span>
              </div>

              {/* Edit Shortcut */}
              <button
                onClick={() => setViewMode('edit')}
                className="text-xs text-[#D6AD60] hover:text-[#FFF5DE] underline decoration-dotted flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{currentLanguage === 'hi' ? 'संपादित करें' : currentLanguage === 'bn' ? 'সম্পাদনা' : 'Edit'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Done / Continue Footer */}
      {onDone && (
        <div className="mt-5">
          <button
            onClick={onDone}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] transition-all cursor-pointer shadow-md"
          >
            {currentLanguage === 'hi' ? 'वापस पत्र पर जाएं' : currentLanguage === 'bn' ? 'চিঠিতে ফিরে যান' : 'Back to Sealed Note'}
          </button>
        </div>
      )}
    </div>
  );
};
