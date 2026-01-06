import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'od' | 'hi' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    login: 'Login',
    username: 'Username/ID',
    password: 'Password',
    selectLanguage: 'Select Language',
    rememberMe: 'Remember me',
    loginButton: 'Login to Learn',
    welcome: 'Welcome to STEM Learning',
    selectGrade: 'Select Your Grade',
    selectSubject: 'Choose Subject',
    math: 'Mathematics',
    science: 'Science',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    progress: 'Progress',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    logout: 'Logout',
    quiz: 'Quiz',
    games: 'Interactive Games',
    points: 'Points',
    level: 'Level',
    achievements: 'Achievements',
    askAI: 'Ask AI Assistant',
    totalPoints: 'Total Points',
    currentLevel: 'Current Level',
    badges: 'Badges Earned',
    rank: 'Your Rank',
    startQuiz: 'Start Quiz',
    nextQuestion: 'Next Question',
    submitAnswer: 'Submit Answer',
    correctAnswer: 'Correct Answer!',
    wrongAnswer: 'Try Again!',
    quizComplete: 'Quiz Complete!',
    yourScore: 'Your Score',
    playAgain: 'Play Again',
    backToSubjects: 'Back to Subjects',
    voiceAssistant: 'Voice Assistant',
  },
  od: {
    login: 'ଲଗଇନ',
    username: 'ଚାଳକ ନାମ/ଆଇଡି',
    password: 'ପାସୱର୍ଡ',
    selectLanguage: 'ଭାଷା ବାଛନ୍ତୁ',
    rememberMe: 'ମୋତେ ମନେ ରଖ',
    loginButton: 'ଶିଖିବା ପାଇଁ ଲଗଇନ',
    welcome: 'STEM ଶିକ୍ଷାରେ ସ୍ୱାଗତ',
    selectGrade: 'ତୁମର ଶ୍ରେଣୀ ବାଛ',
    selectSubject: 'ବିଷୟ ବାଛ',
    math: 'ଗଣିତ',
    science: 'ବିଜ୍ଞାନ',
    physics: 'ପଦାର୍ଥ ବିଜ୍ଞାନ',
    chemistry: 'ରସାୟନ ବିଜ୍ଞାନ',
    biology: 'ଜୀବ ବିଜ୍ଞାନ',
    progress: 'ଅଗ୍ରଗତି',
    leaderboard: 'ଲିଡରବୋର୍ଡ',
    profile: 'ପ୍ରୋଫାଇଲ',
    logout: 'ଲଗଆଉଟ',
    quiz: 'କୁଇଜ',
    games: 'ଇଣ୍ଟରାକ୍ଟିଭ ଗେମ',
    points: 'ପଏଣ୍ଟ',
    level: 'ସ୍ତର',
    achievements: 'ସଫଳତା',
    askAI: 'AI ସହାୟକକୁ ପଚାର',
    totalPoints: 'ମୋଟ ପଏଣ୍ଟ',
    currentLevel: 'ବର୍ତ୍ତମାନ ସ୍ତର',
    badges: 'ବ୍ୟାଜ ପାଇଛ',
    rank: 'ତୁମର ସ୍ଥାନ',
    startQuiz: 'କୁଇଜ ଆରମ୍ଭ କର',
    nextQuestion: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ',
    submitAnswer: 'ଉତ୍ତର ଦିଅ',
    correctAnswer: 'ସଠିକ ଉତ୍ତର!',
    wrongAnswer: 'ପୁଣି ଚେଷ୍ଟା କର!',
    quizComplete: 'କୁଇଜ ସମ୍ପୂର୍ଣ୍ଣ!',
    yourScore: 'ତୁମର ସ୍କୋର',
    playAgain: 'ପୁଣି ଖେଳ',
    backToSubjects: 'ବିଷୟକୁ ଫେରିଯାଅ',
    voiceAssistant: 'ସ୍ୱର ସହାୟକ',
  },
  hi: {
    login: 'लॉगिन',
    username: 'उपयोगकर्ता नाम/आईडी',
    password: 'पासवर्ड',
    selectLanguage: 'भाषा चुनें',
    rememberMe: 'मुझे याद रखें',
    loginButton: 'सीखने के लिए लॉगिन',
    welcome: 'STEM शिक्षा में आपका स्वागत है',
    selectGrade: 'अपनी कक्षा चुनें',
    selectSubject: 'विषय चुनें',
    math: 'गणित',
    science: 'विज्ञान',
    physics: 'भौतिक विज्ञान',
    chemistry: 'रसायन विज्ञान',
    biology: 'जीव विज्ञान',
    progress: 'प्रगति',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉगआउट',
    quiz: 'क्विज़',
    games: 'इंटरैक्टिव गेम्स',
    points: 'अंक',
    level: 'स्तर',
    achievements: 'उपलब्धियां',
    askAI: 'AI सहायक से पूछें',
    totalPoints: 'कुल अंक',
    currentLevel: 'वर्तमान स्तर',
    badges: 'बैज अर्जित',
    rank: 'आपकी रैंक',
    startQuiz: 'क्विज़ शुरू करें',
    nextQuestion: 'अगला प्रश्न',
    submitAnswer: 'उत्तर जमा करें',
    correctAnswer: 'सही उत्तर!',
    wrongAnswer: 'फिर से कोशिश करें!',
    quizComplete: 'क्विज़ पूरा!',
    yourScore: 'आपका स्कोर',
    playAgain: 'फिर से खेलें',
    backToSubjects: 'विषयों पर वापस जाएं',
    voiceAssistant: 'वॉयस असिस्टेंट',
  },
  ta: {
    login: 'உள்நுழை',
    username: 'பயனர் பெயர்/ஐடி',
    password: 'கடவுச்சொல்',
    selectLanguage: 'மொழி தேர்ந்தெடுக்கவும்',
    rememberMe: 'என்னை நினைவில் கொள்',
    loginButton: 'கற்க உள்நுழைக',
    welcome: 'STEM கல்விக்கு வரவேற்கிறோம்',
    selectGrade: 'உங்கள் வகுப்பு தேர்ந்தெடுக்கவும்',
    selectSubject: 'பாடம் தேர்ந்தெடுக்கவும்',
    math: 'கணிதம்',
    science: 'அறிவியல்',
    physics: 'இயற்பியல்',
    chemistry: 'வேதியியல்',
    biology: 'உயிரியல்',
    progress: 'முன்னேற்றம்',
    leaderboard: 'தலைமை பலகை',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    quiz: 'வினாடி வினா',
    games: 'ஊடாடும் விளையாட்டுகள்',
    points: 'புள்ளிகள்',
    level: 'நிலை',
    achievements: 'சாதனைகள்',
    askAI: 'AI உதவியாளரிடம் கேளுங்கள்',
    totalPoints: 'மொத்த புள்ளிகள்',
    currentLevel: 'தற்போதைய நிலை',
    badges: 'பெற்ற பேட்ஜ்கள்',
    rank: 'உங்கள் தரவரிசை',
    startQuiz: 'வினாடி வினா தொடங்கு',
    nextQuestion: 'அடுத்த கேள்வி',
    submitAnswer: 'பதில் சமர்ப்பிக்கவும்',
    correctAnswer: 'சரியான பதில்!',
    wrongAnswer: 'மீண்டும் முயற்சிக்கவும்!',
    quizComplete: 'வினாடி வினா முடிந்தது!',
    yourScore: 'உங்கள் மதிப்பெண்',
    playAgain: 'மீண்டும் விளையாடு',
    backToSubjects: 'பாடங்களுக்கு திரும்பு',
    voiceAssistant: 'குரல் உதவியாளர்',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};