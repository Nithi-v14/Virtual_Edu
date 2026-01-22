const BASE_URL = "http://localhost:8081";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    grade?: number;
}

export interface LoginData {
    name: string;
    email?: string;
    password: string;
}

export const registerApi = async (data: RegisterData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const text = await res.text();
    if (!res.ok) {
        throw new Error(text || "Registration failed");
    }

    return text;
};

export const loginApi = async (data: LoginData) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
    }

    return res.json();
};
