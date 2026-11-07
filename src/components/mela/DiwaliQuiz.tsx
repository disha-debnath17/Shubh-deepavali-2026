/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Compass, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Language } from '../../utils/translations';
import { QuizQuestion, getQuizQuestionsForState, awardMelaReward } from '../../data/melaData';
import { audioManager } from '../../utils/audio';

interface DiwaliQuizProps {
  language: Language;
  selectedState?: string;
  onRewardUpdate: () => void;
  onNextGame?: () => void;
}

export const DiwaliQuiz: React.FC<DiwaliQuizProps> = ({
  language,
  selectedState = 'West Bengal',
  onRewardUpdate,
  onNextGame,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize questions
  useEffect(() => {
    initQuiz();
  }, [selectedState]);

  const initQuiz = () => {
    const list = getQuizQuestionsForState(selectedState, 5);
    setQuestions(list);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered || !currentQ) return;

    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      audioManager.playPoojaBell();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F59E0B', '#10B981'],
      });
    } else {
      audioManager.playButtonChime();
    }
  };

  const handleNext = () => {
    audioManager.playButtonChime();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Quiz finished
      setIsCompleted(true);
      awardMelaReward('diwali_quiz', 25, 'diwali_explorer');
      onRewardUpdate();

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#D6AD60', '#F59E0B', '#EF4444', '#10B981'],
      });
    }
  };

  if (!currentQ && !isCompleted) {
    return (
      <div className="p-8 text-center text-amber-200">
        Loading auspicious questions...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold flex items-center gap-2">
            <span>🧭</span>
            {language === 'hi'
              ? 'दिवाली ज्ञान एवं परंपरा प्रश्नोत्तरी'
              : language === 'bn'
              ? 'দীপাবলি জ্ঞান ও ঐতিহ্য কুইজ'
              : 'Diwali Wisdom & Traditions Quiz'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/70">
            {language === 'hi'
              ? 'भारतीय पौराणिक कथाओं व आपके चुने हुए राज्य की परंपराओं पर आधारित प्रश्न'
              : language === 'bn'
              ? 'ভারতীয় পৌরাণিক কথা ও আপনার নির্বাচিত রাজ্যের উৎসব ঐতিহ্যের প্রশ্ন'
              : `Deepen your knowledge of pan-Indian & ${selectedState} Diwali celebrations`}
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-amber-200/80">
              {language === 'hi' ? 'प्रश्न' : language === 'bn' ? 'প্রশ্ন' : 'Question'}{' '}
              <strong className="text-amber-400 font-mono text-sm">
                {currentIndex + 1}
              </strong>{' '}
              / {questions.length}
            </span>
            <div className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-xs font-bold text-amber-300">
              {language === 'hi' ? 'अंक' : language === 'bn' ? 'স্কোর' : 'Score'}: {score}
            </div>
          </div>
        )}
      </div>

      {/* Main Quiz Card */}
      {!isCompleted ? (
        <div className="bg-gradient-to-b from-[#0e142e] to-[#181c37] border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* Progress bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Regional Tag if applicable */}
          {currentQ.stateSpecific && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentQ.stateSpecific} {language === 'hi' ? 'परंपरा' : language === 'bn' ? 'ঐতিহ্য' : 'Tradition'}</span>
            </div>
          )}

          {/* Question Text */}
          <h4 className="font-serif text-lg sm:text-2xl text-amber-200 font-bold leading-relaxed mb-6">
            {currentQ.question[language]}
          </h4>

          {/* Answer Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options[language].map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-white/5 border-amber-500/20 hover:border-amber-400 hover:bg-white/10 text-amber-100';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnStyle =
                    'bg-emerald-950/70 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500/40 shadow-lg';
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle =
                    'bg-red-950/70 border-red-400 text-red-200 ring-2 ring-red-500/40';
                } else {
                  btnStyle = 'opacity-40 border-white/10 text-white/40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-sm sm:text-base ${btnStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center text-xs font-mono font-bold text-amber-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium leading-normal">{optionText}</span>
                  </span>

                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {hasAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-amber-950/50 border border-amber-500/30 backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {language === 'hi'
                    ? 'महत्व व व्याख्या'
                    : language === 'bn'
                    ? 'তাৎপর্য ও ব্যাখ্যা'
                    : 'Auspicious Significance'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                {currentQ.explanation[language]}
              </p>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>
                  {currentIndex + 1 < questions.length
                    ? language === 'hi'
                      ? 'अगला प्रश्न'
                      : language === 'bn'
                      ? 'পরবর্তী প্রশ্ন'
                      : 'Next Question'
                    : language === 'hi'
                    ? 'परिणाम देखें'
                    : language === 'bn'
                    ? 'ফলাফল দেখুন'
                    : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="bg-gradient-to-b from-[#0e142e] to-[#181c37] border-2 border-amber-500/30 rounded-2xl p-8 sm:p-12 text-center shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl mb-4 mx-auto shadow-xl shadow-amber-500/40 animate-bounce">
            <Trophy className="w-10 h-10 text-amber-950" />
          </div>

          <h4 className="font-serif text-2xl sm:text-3xl text-amber-300 font-bold mb-2">
            {language === 'hi'
              ? 'प्रश्नोत्तरी संपन्न!'
              : language === 'bn'
              ? 'কুইজ সম্পন্ন!'
              : 'Diwali Wisdom Mastered!'}
          </h4>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 font-bold text-lg mb-4">
            <span>{language === 'hi' ? 'अंतिम अंक' : language === 'bn' ? 'চূড়ান্ত স্কোর' : 'Final Score'}:</span>
            <span className="text-amber-400 font-mono text-2xl">
              {score} / {questions.length}
            </span>
          </div>

          <p className="text-amber-100/90 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
            {score >= 3
              ? language === 'hi'
                ? 'अद्भुत ज्ञान! आपने भारतीय संस्कृति और दीपोत्सव के पावन मर्म को गहराई से समझा। "दिवाली अन्वेषक" बैज व २५ सितारे अनलॉक!'
                : language === 'bn'
                ? 'চমৎকার জ্ঞান! আপনি ভারতীয় সংস্কৃতি ও দীপাবলির গভীর ঐতিহ্য অনুধাবন করেছেন। "দীপাবলি অভিযাত্রী" ব্যাজ ও ২৫টি তারা আনলক!'
                : 'Superb festive insight! You unlocked the "Diwali Explorer" badge and earned +25 Diwali Stars!'
              : language === 'hi'
              ? 'अच्छा प्रयास! हर परंपरा भारत के हृदय को जोड़ती है। २५ सितारे आपके उत्सव खाते में जोड़ दिए गए हैं!'
              : language === 'bn'
              ? 'ভালো প্রচেষ্টা! প্রতিটি ঐতিহ্য ভারতের হৃদয়কে যুক্ত করে। আপনার উৎসব অ্যাকাউন্টে ২৫টি তারা যোগ করা হলো!'
              : 'Great festive effort! Every tradition connects the heart of India. +25 Diwali Stars added to your festive score!'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={initQuiz}
              className="px-5 py-2.5 rounded-xl border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {language === 'hi' ? 'पुनः प्रयास करें' : language === 'bn' ? 'আবার খেলুন' : 'Retake Quiz'}
            </button>

            {onNextGame && (
              <button
                onClick={onNextGame}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
              >
                {language === 'hi'
                  ? 'अगला खेल: डिजिटल आतिशबाजी ➔'
                  : language === 'bn'
                  ? 'পরের খেলা: ডিজিটাল আতশবাজি ➔'
                  : 'Next Game: Eco Fireworks ➔'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
