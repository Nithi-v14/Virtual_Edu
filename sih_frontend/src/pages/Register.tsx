import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {GraduationCap, LucideBookOpenText, Users} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { translations } from "@/data/translations";
import { registerApi } from "@/api/authApi.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
type Language = 'english' | 'tamil' | 'hindi';
const Register = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentLanguage,setCurrentLanguage]=useState<Language>('english');
    const handleLanguageChange = (language: Language) => {
        setCurrentLanguage(language);
    };
const[apiError,setApiError]=useState< string |null>(null);
    const t = translations[currentLanguage]||translations.english;
    const [student, setStudent] = useState({
        fullName: "",
        email: "",
        password: "",
        grade: "",
        // language: "",
        schoolName: "",
    });

    const [teacher, setTeacher] = useState({
        fullName: "",
        email: "",
        password: "",
        subject: "",
        schoolName: "",
    });
    type RegisterPayload = {
        fullName: string;
        email: string;
        password: string;
        schoolName: string;
        role: "STUDENT" | "TEACHER";
        grade?: string;
        subject?: string;
    };

    const handleRegister = async (
        e: React.FormEvent,
        role: "STUDENT" | "TEACHER"
    ) => {
        e.preventDefault();
        setApiError(null);

        const payload: RegisterPayload =
            role === "STUDENT"
                ? { ...student, role }
                : { ...teacher, role };

        try {
            setLoading(true);
            await registerApi(payload);

            toast({
                title: "Registration Successful",
                description: "You can now login using your credentials",
            });

            navigate("/login");
        } catch (err: any) {
            setApiError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
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

            <Card className="w-full max-w-lg bg-white/95 ">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Create Your Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {apiError && (
                        <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-300 text-red-700">
                            {apiError}
                        </div>
                    )}

                    <Tabs defaultValue="student">
                        <TabsList className="grid grid-cols-2 mb-6">
                            <TabsTrigger value="student">
                                <GraduationCap className="w-4 h-4 mr-2" />
                                Student
                            </TabsTrigger>
                            <TabsTrigger value="teacher">
                                <Users className="w-4 h-4 mr-2" />
                                Teacher
                            </TabsTrigger>
                        </TabsList>

                        {/* STUDENT REGISTER */}
                        <TabsContent value="student">
                            <form className="space-y-3" onSubmit={(e)=>handleRegister(e,"STUDENT")}>
                                <Label>Full Name</Label>
                                <Input onChange={(e) => setStudent({ ...student, fullName: e.target.value })} />

                                <Label>Email</Label>
                                <Input type="email" onChange={(e) => setStudent({ ...student, email: e.target.value })} />

                                <Label>Password</Label>
                                <Input type="password" onChange={(e) => setStudent({ ...student, password: e.target.value })} />

                                <Label>Grade</Label>
                                <Input onChange={(e) => setStudent({ ...student, grade: e.target.value })} />

                                {/*<Label>Language</Label>*/}
                                {/*<Input onChange={(e) => setStudent({ ...student, language: e.target.value })} />*/}

                                {/*<Label>Guardian Name</Label>*/}
                                {/*<Input onChange={(e) => setStudent({ ...student, guardianName: e.target.value })} />*/}

                                {/*<Label>Guardian Phone</Label>*/}
                                {/*<Input onChange={(e) => setStudent({ ...student, guardianPhone: e.target.value })} />*/}

                                <Label>School Name</Label>
                                <Input onChange={(e) => setStudent({ ...student, schoolName: e.target.value })} />

                                <Button type="submit" className="w-full" disabled={loading}>
                                    Register as Student
                                </Button>
                            </form>
                        </TabsContent>

                        {/* TEACHER REGISTER */}
                        <TabsContent value="teacher">
                            <form className="space-y-3" onSubmit={(e)=>handleRegister(e,"TEACHER")}>
                                <Label>Full Name</Label>
                                <Input onChange={(e) => setTeacher({ ...teacher, fullName: e.target.value })} />

                                <Label>Email</Label>
                                <Input type="email" onChange={(e) => setTeacher({ ...teacher, email: e.target.value })} />

                                <Label>Password</Label>
                                <Input type="password" onChange={(e) => setTeacher({ ...teacher, password: e.target.value })} />

                                <Label>Subject</Label>
                                <Input onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })} />


                                <Label>School Name</Label>
                                <Input onChange={(e) => setTeacher({ ...teacher, schoolName: e.target.value })} />

                                <Button type="submit" className="w-full" disabled={loading}>
                                    Register as Teacher
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                    <div className="mt-3">
                        <div className="text-x "><button type="button" onClick={()=>navigate("/login")} className="text-blue-700 hover:underline font-medium">Already having an account?</button></div>

                    </div>
                </CardContent>

            </Card>
        </div>
        </div>
    );
};

export default Register;
