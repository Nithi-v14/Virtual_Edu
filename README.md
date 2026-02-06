# 🎓 VirtualEdu

**Low-Cost AR-Based Learning Platform for STEM & Vocational Training**

VirtualEdu is a web-based learning platform integrated with **Augmented Reality (AR)** simulations designed to help students learn STEM and vocational concepts through interactive, hands-on practice.
The platform tracks performance, errors, time, and progress, helping learners achieve competency faster than traditional instruction.

---

## 🚀 Problem Statement

Traditional classroom and lab-based learning:

- ❌ Lacks hands-on experience
- 💰 Is costly and risky for real-world practice (chemicals, machines, medical tools)
- 📉 Makes it hard to measure real skill competency
- 😴 Is not engaging for today's learners

---

## 💡 Solution

VirtualEdu solves this by providing:

- 🧪 **AR simulations** (Chemistry experiments, STEM tasks)
- 📊 **Performance tracking** (score, time, errors)
- 🧠 **Gamified quizzes** with instant feedback
- 📈 **Student dashboard** with progress, streaks, ranks & badges
- 🌐 **Web-based access** (Unity WebGL + React)

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| ⚛️ React.js | UI Framework |
| 🎨 Tailwind CSS | Styling |
| 🧩 ShadCN UI | Component Library |
| 🌐 Unity WebGL | AR Simulations |

### Backend

| Technology | Purpose |
|------------|---------|
| ☕ Spring Boot | Backend Framework |
| 🔐 Spring Security | Authentication |
| 🧠 REST APIs | API Layer |
| 🗄️ PostgreSQL | Database |

### AR / Simulation

| Technology | Purpose |
|------------|---------|
| 🎮 Unity | Game Engine |
| 🧪 Physics & Interaction Logic | Simulation |
| 🌈 Color-mixing & Task Validation | Feedback |

---

## 🧩 System Architecture
## System Architecture
![Architecture]([./screenshots/simulation.png](https://github.com/Nithi-v14/Virtual_Edu/blob/519a0d055ffd5714433afdebb28435fab18d1aa2/WhatsApp%20Image%202026-02-06%20at%206.01.23%20PM.jpeg))
---

## ✨ Features

### 🎮 AR Simulation

- Interactive beaker experiments
- Object grabbing & mixing
- Real-time visual feedback
- WebGL support (no headset required)

### 📝 Quiz System

- Multi-language questions
- Randomized quizzes
- Score calculation
- Backend-based evaluation

### 📊 Student Dashboard

- Overall score
- Modules completed
- Learning streak
- Weekly progress
- Achievements & badges
- Class leaderboard

### 🔐 Secure Backend

- User-based data tracking
- RESTful APIs
- Database-driven analytics

---

## 📷 Screenshots
## Login
![Login]([./screenshots/simulation.png](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20175006.png))
### Dashboard
![Dashboard](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20174742.png)

### Quiz Page
![Quiz]([./screenshots/quiz.png](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20174805.png))

### AR Simulation
![Simulation]([./screenshots/simulation.png](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20174834.png))
![Simulation]([./screenshots/simulation.png](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20174857.png))
![Simulation]([./screenshots/simulation.png](https://github.com/Nithi-v14/Virtual_Edu/blob/5a90aae918703ef1aedbbd4a93fd8e9aac7af11a/Screenshot%202026-02-06%20174952.png))


---

## 📦 Project Structure

```
virtual-edu/
├── frontend/        # React app
├── backend/         # Spring Boot API
├── unity-webgl/     # AR simulation build
├── database/        # SQL schema
├── screenshots/     # Images for README
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Nithi-v14/Virtual_Edu.git
cd Virtual_Edu
```

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

📍 Runs at: `http://localhost:8081`

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

📍 Runs at: `http://localhost:5173`

### 4️⃣ Unity WebGL

1. Build project as **WebGL**
2. Place build inside `frontend/public/` folder
3. Load via iframe or route

---

## 📊 Data Tracked

| Metric | Description |
|--------|-------------|
| ⏱️ Completion Time | Time taken to finish tasks |
| ❌ Errors Made | Mistakes during simulation |
| ⭐ Score | Performance rating |
| 📅 Activity Dates | Learning consistency |
| 🏆 Rank & Achievements | Gamification metrics |

> All data is stored and analyzed using **Spring Boot + PostgreSQL**.

---

## 🎯 Use Cases

- 🏫 School STEM learning
- 🔧 Vocational training
- 🧪 Chemistry & lab safety practice
- ✅ Skill assessment before real labs
- 💻 Hackathons & EdTech demos

---

## 🧪 Validation (Hackathon Ready)

- ✅ Reduces learning risk
- ✅ Improves engagement
- ✅ Measurable performance metrics
- ✅ Scalable & low-cost

**TRL Level:** ➡️ **TRL 6** – Prototype demonstrated in relevant environment

---

## 📌 Future Enhancements

- 🔐 JWT Authentication
- 🕶️ VR headset support
- 🗣️ Voice-based interaction
- 🌍 Multi-language expansion
- 📊 AI-based performance analytics

---

## 👨‍💻 Author

Nithish.V
🎓 Computer Science Student
💡 AR/VR & Full-Stack Developer

---

## ⭐ Support

If you like this project:

- ⭐ **Star** this repository
- 🍴 **Fork** and contribute
- 🧠 **Share** feedback

---
> Built with ❤️ for education and innovation.
