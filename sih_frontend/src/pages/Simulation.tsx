import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Zap, Atom, FlaskConical, Calculator, Clock, Search, BookOpen, Microscope, Dna, Lightbulb, Beaker } from "lucide-react";
import { EarthquakeSimulation } from "@/components/simulations/PhysicsSimulation";
import { FireSimulation } from "@/components/simulations/ChemistrySimuation";
import { FloodSimulation } from "@/components/simulations/MathsSimuation";

const simulations = [
    // Grade 6-8 (Beginner)
    {
        id: "basic-physics",
        title: "Basic Motion Lab",
        description: "Learn about speed, velocity, and simple machines through fun interactive experiments",
        icon: <Atom className="h-8 w-8" />,
        duration: "10 min",
        difficulty: "Beginner",
        gradeLevel: "6-8",
        participants: "8,420",
        variant: "earthquake",
        isAvailable: true,
        topics: ["Motion", "Speed", "Simple Machines"],
    },
    {
        id: "chemistry-basics",
        title: "Elements & Compounds Lab",
        description: "Discover the building blocks of matter and learn about basic chemical reactions",
        icon: <FlaskConical className="h-8 w-8" />,
        duration: "12 min",
        difficulty: "Beginner",
        gradeLevel: "6-8",
        participants: "6,230",
        variant: "fire",
        isAvailable: true,
        topics: ["Elements", "Compounds", "Periodic Table"],
    },
    {
        id: "basic-math",
        title: "Geometry Explorer",
        description: "Explore shapes, angles, and basic geometric concepts through interactive activities",
        icon: <Calculator className="h-8 w-8" />,
        duration: "8 min",
        difficulty: "Beginner",
        gradeLevel: "6-8",
        participants: "4,100",
        variant: "flood",
        isAvailable: true,
        topics: ["Shapes", "Angles", "Area"],
    },
    {
        id: "cell-basics",
        title: "Cell Structure Explorer",
        description: "Take a virtual journey inside plant and animal cells to understand their parts",
        icon: <Microscope className="h-8 w-8" />,
        duration: "15 min",
        difficulty: "Beginner",
        gradeLevel: "6-8",
        participants: "7,890",
        variant: "success",
        isAvailable: true,
        topics: ["Cell Parts", "Organelles", "Microscopy"],
    },

    // Grade 9-10 (Intermediate)  
    {
        id: "physics-lab",
        title: "Physics Virtual Laboratory",
        description: "Explore motion, force, and energy through interactive physics experiments and simulations",
        icon: <Atom className="h-8 w-8" />,
        duration: "18 min",
        difficulty: "Intermediate",
        gradeLevel: "9-10",
        participants: "15,420",
        variant: "earthquake",
        isAvailable: true,
        topics: ["Newton's Laws", "Energy", "Motion"],
    },
    {
        id: "chemistry-lab",
        title: "Chemistry Experiment Lab",
        description: "Conduct safe virtual chemical reactions and learn about elements and compounds",
        icon: <FlaskConical className="h-8 w-8" />,
        duration: "16 min",
        difficulty: "Intermediate",
        gradeLevel: "9-10",
        participants: "11,230",
        variant: "fire",
        isAvailable: true,
        topics: ["Chemical Reactions", "Acids & Bases", "pH"],
    },
    {
        id: "math-playground",
        title: "Mathematics Problem Solver",
        description: "Practice algebra, geometry, and problem-solving through interactive mathematical challenges",
        icon: <Calculator className="h-8 w-8" />,
        duration: "14 min",
        difficulty: "Intermediate",
        gradeLevel: "9-10",
        participants: "9,650",
        variant: "flood",
        isAvailable: true,
        topics: ["Algebra", "Geometry", "Problem Solving"],
    },
    {
        id: "genetics-lab",
        title: "Genetics & Heredity Lab",
        description: "Explore DNA, genes, and inheritance patterns through virtual breeding experiments",
        icon: <Dna className="h-8 w-8" />,
        duration: "22 min",
        difficulty: "Intermediate",
        gradeLevel: "9-10",
        participants: "6,780",
        variant: "success",
        isAvailable: true,
        topics: ["DNA", "Genes", "Heredity"],
    },

    // Grade 11-12 (Advanced)
    {
        id: "quantum-physics",
        title: "Quantum Physics Explorer",
        description: "Dive into the fascinating world of quantum mechanics and atomic behavior",
        icon: <Lightbulb className="h-8 w-8" />,
        duration: "25 min",
        difficulty: "Advanced",
        gradeLevel: "11-12",
        participants: "4,230",
        variant: "earthquake",
        isAvailable: true,
        topics: ["Quantum Mechanics", "Atomic Orbitals", "Energy Levels"],
    },
    {
        id: "organic-chemistry",
        title: "Organic Chemistry Lab",
        description: "Study carbon compounds, molecular structures, and organic reactions",
        icon: <Beaker className="h-8 w-8" />,
        duration: "28 min",
        difficulty: "Advanced",
        gradeLevel: "11-12",
        participants: "5,120",
        variant: "fire",
        isAvailable: true,
        topics: ["Carbon Compounds", "Functional Groups", "Molecular Models"],
    },
    {
        id: "calculus-lab",
        title: "Calculus Visualization Lab",
        description: "Understand derivatives, integrals, and limits through interactive graphing",
        icon: <Calculator className="h-8 w-8" />,
        duration: "30 min",
        difficulty: "Advanced",
        gradeLevel: "11-12",
        participants: "3,890",
        variant: "flood",
        isAvailable: true,
        topics: ["Derivatives", "Integrals", "Limits"],
    },
    {
        id: "molecular-biology",
        title: "Molecular Biology Lab",
        description: "Explore protein synthesis, gene expression, and cellular processes at the molecular level",
        icon: <Dna className="h-8 w-8" />,
        duration: "32 min",
        difficulty: "Advanced",
        gradeLevel: "11-12",
        participants: "4,560",
        variant: "success",
        isAvailable: true,
        topics: ["Protein Synthesis", "Gene Expression", "DNA Replication"],
    },
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "Beginner":
            return "success";
        case "Intermediate":
            return "warning";
        case "Advanced":
            return "destructive";
        default:
            return "secondary";
    }
};

const getVariantGradient = (variant: string) => {
    switch (variant) {
        case "earthquake":
            return "from-earthquake/10 to-warning/5";
        case "fire":
            return "from-fire/10 to-secondary/5";
        case "flood":
            return "from-flood/10 to-primary/5";
        case "success":
            return "from-success/10 to-primary/5";
        default:
            return "from-accent/10 to-primary/5";
    }
};

const Simulation = () => {
    const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
    const [selectedGrade, setSelectedGrade] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Calculate counts for each grade level
    const getGradeCount = (gradeLevel: string) => {
        if (gradeLevel === "all") return simulations.length;
        return simulations.filter(sim => sim.gradeLevel === gradeLevel).length;
    };

    const gradeFilters = [
        { id: "all", label: "All Grades", count: getGradeCount("all") },
        { id: "6-8", label: "Grade 6-8", count: getGradeCount("6-8") },
        { id: "9-10", label: "Grade 9-10", count: getGradeCount("9-10") },
        { id: "11-12", label: "Grade 11-12", count: getGradeCount("11-12") }
    ];

    const filteredSimulations = simulations.filter(sim => {
        const gradeMatch = selectedGrade === "all" || sim.gradeLevel === selectedGrade;
        const searchMatch = searchQuery === "" || 
            sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sim.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
        return gradeMatch && searchMatch;
    });

    const renderSimulation = () => {
        switch (activeSimulation) {
            case "physics-lab":
            case "basic-physics":
            case "quantum-physics":
                return <EarthquakeSimulation />;
            case "chemistry-lab":
            case "chemistry-basics":
            case "organic-chemistry":
                return <FireSimulation />;
            case "math-playground":
            case "basic-math":
            case "calculus-lab":
                return <FloodSimulation />;
            default:
                return (
                    <Card className="p-8">
                        <div className="text-center space-y-4">
                            <Play className="h-16 w-16 mx-auto text-primary" />
                            <h3 className="text-2xl font-bold">Simulation Loading...</h3>
                            <p className="text-muted-foreground">
                                This simulation is being prepared for you. Advanced interactive labs are coming soon!
                            </p>
                        </div>
                    </Card>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-gradient-to-r from-orange-500 via-white to-green-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-blue-900">
                        <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Virtual Learning Labs
                        </h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Interactive science and mathematics laboratories to practice and
                            learn STEM concepts in a safe virtual environment
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Info Card */}
                <Card className="mb-12 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
                    <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-hero rounded-xl">
                                <Play className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">
                                    How Virtual Labs Work
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Our virtual Learning laboratories use Unity WebGL technology to
                                    create immersive learning scenarios. Conduct experiments, solve
                                    problems, earn points, and learn with classmates safely online.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">Unity WebGL</Badge>
                                    <Badge variant="outline">Real-time Learning</Badge>
                                    <Badge variant="outline">Collaborative Learning</Badge>
                                    <Badge variant="outline">Mobile Compatible</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Search and Grade Filters */}
                {!activeSimulation && (
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search labs, topics, or concepts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>

                                {/* Grade Level Filters with Counts */}
                                <div>
                                    <h3 className="font-medium mb-3">Select Grade Level:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {gradeFilters.map((filter) => (
                                            <Button
                                                key={filter.id}
                                                variant={selectedGrade === filter.id ? "default" : "outline"}
                                                onClick={() => setSelectedGrade(filter.id)}
                                                size="sm"
                                                className="flex items-center gap-2"
                                            >
                                                {filter.label}
                                                <Badge 
                                                    variant={ "secondary" } 
                                                    className="ml-1 text-xs"
                                                >
                                                    {filter.count}
                                                </Badge>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Simulations Grid or Active Simulation */}
                {activeSimulation ? (
                    <div className="space-y-6 h-full ">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">
                                {
                                    simulations.find((s) => s.id === activeSimulation)?.title
                                }{" "}
                                Experience
                            </h2>
                            <Button
                                variant="outline"
                                onClick={() => setActiveSimulation(null)}
                            >
                                Back to Virtual Labs
                            </Button>
                        </div>
                        {renderSimulation()}
                    </div>
                ) : (
                    <>
                        {/* Results Info */}
                        {/* <div className="mb-6">
                            <p className="text-muted-foreground">
                                Showing {filteredSimulations.length} lab{filteredSimulations.length !== 1 ? 's' : ''} available
                                {selectedGrade !== "all" && ` for ${gradeFilters.find(g => g.id === selectedGrade)?.label}`}
                                {searchQuery && ` matching "${searchQuery}"`}
                            </p>
                        </div> */}

                        {filteredSimulations.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                                {filteredSimulations.map((simulation, index) => (
                                    <Card
                                        key={simulation.id}
                                        className={`group hover:shadow-medium transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br ${getVariantGradient(
                                            simulation.variant
                                        )} border-${simulation.variant}/20 animate-slide-up`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div
                                                    className={`p-3 rounded-xl bg-gradient-${simulation.variant} text-white shadow-soft`}
                                                >
                                                    {simulation.icon}
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant="outline"
                                                        className={`mb-2 ${
                                                            getDifficultyColor(simulation.difficulty) === "success"
                                                                ? "border-success text-success"
                                                                : getDifficultyColor(simulation.difficulty) ===
                                                                "warning"
                                                                ? "border-warning text-warning"
                                                                : "border-secondary text-secondary"
                                                        }`}
                                                    >
                                                        {simulation.difficulty}
                                                    </Badge>
                                                    <div className="text-xs text-muted-foreground">
                                                        Grade {simulation.gradeLevel}
                                                    </div>
                                                </div>
                                            </div>
                                            <CardTitle className="text-lg mt-4">
                                                {simulation.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {simulation.description}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{simulation.duration}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    {/* <BookOpen className="h-3 w-3" /> */}
                                                    {/* <span>{simulation.participants} students</span> */}
                                                </div>
                                            </div>

                                            {/* Topics */}
                                            <div className="flex flex-wrap gap-1">
                                                {simulation.topics.slice(0, 3).map((topic, i) => (
                                                    <Badge key={i} variant="secondary" className="text-xs">
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <Button
                                                className="w-full mt-4"
                                                variant={
                                                    simulation.variant as
                                                        | "earthquake"
                                                        | "fire"
                                                        | "flood"
                                                        | "link"
                                                        | "success"
                                                        | "warning"
                                                        | "destructive"
                                                        | "secondary"
                                                        | "default"
                                                        | "outline"
                                                        | "ghost"
                                                        | "hero"
                                                        | "emergency"
                                                }
                                                disabled={!simulation.isAvailable}
                                                onClick={() => setActiveSimulation(simulation.id)}
                                            >
                                                <Play className="h-4 w-4 mr-2" />
                                                {simulation.isAvailable
                                                    ? "Start Lab Experience"
                                                    : "Coming Soon"}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12">
                                <div className="text-center space-y-4">
                                    <Search className="h-16 w-16 mx-auto text-muted-foreground" />
                                    <h3 className="text-xl font-semibold">No Labs Found</h3>
                                    <p className="text-muted-foreground">
                                        No labs match your current search and filters.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedGrade("all");
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Simulation;