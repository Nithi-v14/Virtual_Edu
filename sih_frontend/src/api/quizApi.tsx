const BASE_URL = "http://localhost:8081";

export interface QuizAnswer {
  questionId: number;
  selectedOption: number;
}

export interface QuizSubmissionPayload {
  level: string;
  answers: QuizAnswer[];
}

export interface QuizModule {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  icon: string;
  color: string;
  progress?: number;
}

export const fetchQuizQuestions = async (
    level: string,
    language: string,
    limit: number,
    moduleId?: string,
    userId?: number
) => {
    const params = new URLSearchParams({
        level,
        language,
        limit: limit.toString(),
    });

    // Note: moduleId is not used by the backend, but kept for frontend compatibility

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (userId) {
        headers["X-USER-ID"] = userId.toString();
    }

    const res = await fetch(
        `${BASE_URL}/quiz/questions?${params.toString()}`,
        {
            headers,
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch quiz questions: ${res.status}`);
    }

    return res.json();
};

export const submitQuiz = async (
    userId: number,
    payload: QuizSubmissionPayload
) => {
    const res = await fetch(`${BASE_URL}/quiz/submit?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId.toString(),
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Failed to submit quiz: ${res.status}`);
    }

    return res.json();
};

export const completeQuiz = async (
    userId: number,
    payload: QuizSubmissionPayload
) => {
    const res = await fetch(`${BASE_URL}/quiz/complete?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-USER-ID": userId.toString(),
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Failed to complete quiz: ${res.status}`);
    }

    return res.json();
};

export const fetchModuleInfo = async (moduleId: string, userId?: number): Promise<QuizModule> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (userId) {
        headers["X-USER-ID"] = userId.toString();
    }

    const res = await fetch(
        `${BASE_URL}/modules/${moduleId}`,
        {
            headers,
        }
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch module info: ${res.status}`);
    }

    return res.json();
};
