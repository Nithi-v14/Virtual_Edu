const BASE_URL = "http://localhost:8080";

export const registerApi = async (data: any) => {
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
