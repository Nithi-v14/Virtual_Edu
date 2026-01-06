import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  Users, 
  LucideBookOpenText, 
  Eye, 
  EyeOff,
  AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translations } from "@/data/translations";

type Language = 'english' | 'tamil' | 'hindi';

interface LoginFormData {
  name: string;
  email?: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Login = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const t = translations[currentLanguage];

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };
  const [studentForm, setStudentForm] = useState<LoginFormData>({
    name: '',
    password: ''
  });
  
  const [otherUserForm, setOtherUserForm] = useState<LoginFormData>({
    name: '',
    email: '',
    password: ''
  });

  const [studentErrors, setStudentErrors] = useState<FormErrors>({});
  const [otherUserErrors, setOtherUserErrors] = useState<FormErrors>({});
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showOtherPassword, setShowOtherPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const validateStudentForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!studentForm.name.trim()) {
      errors.name = 'Name is required';
    } else if (studentForm.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!studentForm.password) {
      errors.password = 'Password is required';
    } else if (studentForm.password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
    
    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOtherUserForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!otherUserForm.name.trim()) {
      errors.name = 'Name is required';
    } else if (otherUserForm.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!otherUserForm.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(otherUserForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!otherUserForm.password) {
      errors.password = 'Password is required';
    } else if (otherUserForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setOtherUserErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStudentForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user data in localStorage (replace with actual auth later)
    const userData = {
      id: Date.now().toString(),
      name: studentForm.name,
      type: 'student',
      loginTime: new Date().toISOString(),
      progress: {
        overallScore: 0,
        modulesCompleted: 0,
        totalModules: 9,
        timeSpent: "0h 0m",
        streak: 0,
        rank: 0,
        totalUsers: 1247,
        badges: [],
        recentActivity: [],
        weeklyProgress: [
          { day: "Mon", modules: 0, quizzes: 0 },
          { day: "Tue", modules: 0, quizzes: 0 },
          { day: "Wed", modules: 0, quizzes: 0 },
          { day: "Thu", modules: 0, quizzes: 0 },
          { day: "Fri", modules: 0, quizzes: 0 },
          { day: "Sat", modules: 0, quizzes: 0 },
          { day: "Sun", modules: 0, quizzes: 0 },
        ]
      }
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    toast({
      title: "Welcome back! 🎉",
      description: `Hello ${studentForm.name}, ready to learn about disaster preparedness?`,
    });
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleOtherUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOtherUserForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user data in localStorage
    const userData = {
      id: Date.now().toString(),
      name: otherUserForm.name,
      email: otherUserForm.email,
      type: 'other',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    toast({
      title: "Welcome! 👋",
      description: `Hello ${otherUserForm.name}, you're now logged in.`,
    });
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
          <Select onValueChange={(value: Language) => handleLanguageChange(value)} defaultValue={currentLanguage}>
            <SelectTrigger className="w-[180px] bg-white/20 text-white border-white/30">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">हिंदी</SelectItem>
              <SelectItem value="tamil">தமிழ்</SelectItem>
              <SelectItem value="odia">ଓଡ଼ିଆ</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
                <SelectItem value="telugu">తెలుగు</SelectItem>
                <SelectItem value="malayalam">മലയാളം</SelectItem>
                <SelectItem value="bengali">বাংলা</SelectItem>
                <SelectItem value="marathi">मराठी</SelectItem>
                <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                <SelectItem value="punjabi">ਪੰਜਾਬੀ</SelectItem>
                <SelectItem value="assamese">অসমীয়া</SelectItem>
                <SelectItem value="urdu">اردو</SelectItem>
                <SelectItem value="sanskrit">संस्कृतम्</SelectItem>
                <SelectItem value="nepali">नेपाली</SelectItem>
                <SelectItem value="bhutanese">འབྲུག་ཡིག</SelectItem>
                <SelectItem value="maithili">मैथिली</SelectItem>
                <SelectItem value="dogri">डोगरी</SelectItem>
                <SelectItem value="kashmiri">कश्मीरी</SelectItem>
                <SelectItem value="manipuri">মণিপুরী</SelectItem>
                <SelectItem value="sindhi">سنڌي</SelectItem>
                <SelectItem value="konkani">कोंकणी</SelectItem>
                <SelectItem value="bodo">बड़ो</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <LucideBookOpenText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t.loginTitle}
          </h1>
          <p className="text-white/80">
            {t.loginSubtitle}
          </p>
        </div>

        {/* Login Forms */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-foreground">
              Choose Your Login Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {t.studentTab}
                </TabsTrigger>
                <TabsTrigger value="others" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t.otherUserTab}
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student" className="space-y-4">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">{t.nameLabel}</Label>
                    <Input
                      id="student-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={studentForm.name}
                      onChange={(e) => {
                        setStudentForm({ ...studentForm, name: e.target.value });
                        if (studentErrors.name) {
                          setStudentErrors({ ...studentErrors, name: undefined });
                        }
                      }}
                      className={studentErrors.name ? "border-destructive" : ""}
                    />
                    {studentErrors.name && (
                      <div className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {studentErrors.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-password">{t.passwordLabel}</Label>
                    <div className="relative">
                      <Input
                        id="student-password"
                        type={showStudentPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={studentForm.password}
                        onChange={(e) => {
                          setStudentForm({ ...studentForm, password: e.target.value });
                          if (studentErrors.password) {
                            setStudentErrors({ ...studentErrors, password: undefined });
                          }
                        }}
                        className={studentErrors.password ? "border-destructive pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowStudentPassword(!showStudentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showStudentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {studentErrors.password && (
                      <div className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {studentErrors.password}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Logging in...
                      </div>
                    ) : (
                      t.loginButton
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Teacher Login */}
              <TabsContent value="others" className="space-y-4">
                <form onSubmit={handleOtherUserLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="other-name">{t.nameLabel}</Label>
                    <Input
                      id="other-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={otherUserForm.name}
                      onChange={(e) => {
                        setOtherUserForm({ ...otherUserForm, name: e.target.value });
                        if (otherUserErrors.name) {
                          setOtherUserErrors({ ...otherUserErrors, name: undefined });
                        }
                      }}
                      className={otherUserErrors.name ? "border-destructive" : ""}
                    />
                    {otherUserErrors.name && (
                      <div className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {otherUserErrors.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="other-email">{t.emailLabel}</Label>
                    <Input
                      id="other-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={otherUserForm.email}
                      onChange={(e) => {
                        setOtherUserForm({ ...otherUserForm, email: e.target.value });
                        if (otherUserErrors.email) {
                          setOtherUserErrors({ ...otherUserErrors, email: undefined });
                        }
                      }}
                      className={otherUserErrors.email ? "border-destructive" : ""}
                    />
                    {otherUserErrors.email && (
                      <div className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {otherUserErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="other-password">{t.passwordLabel}</Label>
                    <div className="relative">
                      <Input
                        id="other-password"
                        type={showOtherPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={otherUserForm.password}
                        onChange={(e) => {
                          setOtherUserForm({ ...otherUserForm, password: e.target.value });
                          if (otherUserErrors.password) {
                            setOtherUserErrors({ ...otherUserErrors, password: undefined });
                          }
                        }}
                        className={otherUserErrors.password ? "border-destructive pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOtherPassword(!showOtherPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showOtherPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {otherUserErrors.password && (
                      <div className="flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        {otherUserErrors.password}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Logging in...
                      </div>
                    ) : (
                      t.loginButton
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Demo Info */}
            {/* <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo Mode:</strong> Use any name and password to login. 
                Student progress starts empty and builds as you complete activities.
              </p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
