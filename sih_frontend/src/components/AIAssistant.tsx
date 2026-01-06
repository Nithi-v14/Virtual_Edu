import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle, 
  Mic, 
  Send, 
  X, 
  Volume2,
  Brain
} from 'lucide-react';

const AIAssistant = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: `Hello! I'm your AI study assistant. Ask me anything about your STEM subjects!`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      timestamp: new Date().toISOString()
    };

    const aiResponse = {
      id: messages.length + 2,
      type: 'ai',
      text: getAIResponse(inputText),
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputText('');
  };

  const getAIResponse = (question: string) => {
    // Mock AI responses based on common questions
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('algebra') || lowerQuestion.includes('equation')) {
      return "Great question about algebra! Remember, when solving equations, always perform the same operation on both sides. For example, in 2x + 5 = 15, subtract 5 from both sides first, then divide by 2. Would you like me to explain a specific algebraic concept?";
    }
    
    if (lowerQuestion.includes('physics') || lowerQuestion.includes('force')) {
      return "Physics is fascinating! Newton's laws are fundamental: 1) Objects at rest stay at rest, 2) Force = mass × acceleration, 3) Every action has an equal and opposite reaction. What specific physics topic are you studying?";
    }
    
    if (lowerQuestion.includes('chemistry') || lowerQuestion.includes('atom')) {
      return "Chemistry is all about atoms and their interactions! Remember that atoms consist of protons (positive), neutrons (neutral), and electrons (negative). The periodic table organizes elements by their atomic number. What chemistry concept would you like help with?";
    }
    
    if (lowerQuestion.includes('biology') || lowerQuestion.includes('cell')) {
      return "Biology is the study of life! Cells are the basic units of life. Plant cells have cell walls and chloroplasts, while animal cells don't. Both have nuclei, mitochondria, and other organelles. What biological process interests you?";
    }
    
    if (lowerQuestion.includes('help') || lowerQuestion.includes('stuck')) {
      return "I'm here to help! Try breaking down complex problems into smaller steps. Review the basic concepts first, then apply them to specific examples. Don't hesitate to ask for hints or explanations!";
    }
    
    return "That's an interesting question! I'd be happy to help you understand this concept better. Can you provide more details about what specific part you're finding challenging? Remember, learning is a process, and asking questions is a great way to deepen your understanding!";
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice input - in real app, would use Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputText("Can you help me with quadratic equations?");
      }, 3000);
    }
  };

  const speakResponse = (text: string) => {
    // Mock text-to-speech - in real app, would use Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-assistant-fab"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Brain className="h-6 w-6 text-white" />}
      </Button>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 z-50">
          <Card className="card-elevated h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-primary to-accent text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <h3 className="font-semibold">{t('voiceAssistant')}</h3>
              </div>
              <p className="text-xs opacity-90">Ask me anything about your studies!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {message.text}
                    {message.type === 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakResponse(message.text)}
                        className="ml-2 p-1 h-6 w-6 hover:bg-white/10"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <div className="flex-1 flex">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('askAI')}
                    className="flex-1 px-3 py-2 border border-border rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    onClick={handleVoiceInput}
                    variant="outline"
                    size="sm"
                    className={`rounded-none border-l-0 ${isListening ? 'bg-destructive text-white' : ''}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  size="sm"
                  className="btn-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                  Listening... Speak now!
                </p>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistant;