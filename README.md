# Zuno — AI-Powered Labour Market Intelligence & Curriculum Alignment Platform

> *"Bridging Skills. Building Futures."*  
> Preparing India for the jobs of tomorrow.

---

## 🚀 Overview

**Zuno** is a production-quality SaaS platform designed for **Government, Educational Institutions, Colleges, and Employers** to bridge the widening gap between industry skill demand and higher-education curriculum delivery.

Educational institutions frequently teach outdated syllabus modules, leaving graduates unprepared for day-1 engineering and technical roles. Zuno solves this by continuously ingesting labour market telemetry, deconstructing role competency requirements, and using an AI pipeline (**Curriculum Doctor**) to analyze and modernize course syllabi.

---

## 🔑 Key Features & Architecture

### 1. **Core Modules**
1. **Overview Dashboard (`/overview`)**: Macro telemetry overview, hiring momentum pulse, emerging skills radar, and quick action launchpads.
2. **Labour Market Intelligence (`/labour-market`)**: Real-time hiring volume, multi-criteria filtering (role, skill, location, industry, experience), and skill demand distribution.
3. **Skill Intelligence (`/skills`)**: Central taxonomy database with deep-dive inspection of capabilities, required proficiency levels, and related competencies.
4. **Curriculum Doctor (`/curriculum`)**: Step-by-step AI workflow:
   - Syllabus upload (`.pdf`, `.doc`, `.docx`, `.txt`)
   - 6-stage AI telemetry analysis
   - Alignment scoring & breakdown (Aligned, Missing, Outdated topics)
   - Prescriptive recommendations categorized by priority
   - **"Improve My Curriculum"** side-by-side modular modernization diff generator.
5. **Zuno Forecast (`/forecast`)**: Forward-looking technology signals and skill demand forecasting across 6M, 12M, 18M, and 24M horizons.
6. **Skill Crisis Radar (`/crisis`)**: Interactive national vector map of India with state and district shortage severity tracking (Low, Medium, High, Critical) and policy recommendations.
7. **Skill DNA (`/dna`)**: Role capability blueprints mapping core competencies, supporting tools, foundational knowledge, and importance weights.
8. **Future Jobs Map (`/future-jobs`)**: Geographic economic clusters mapping tech hub expansion, industrial readiness, and policy directives.
9. **Employer Pulse (`/employer`)**: Direct industry intake form capturing real-time skill shortages, hiring bottlenecks, and candidate readiness feedback.
10. **Student Skill Gap (`/student`)**: Diagnostic self-assessment evaluating candidate competencies against target industry role baselines.
11. **Government Dashboard (`/government`)**: Macro workforce development oversight, institutional allocation, and budget recommendations.
12. **District Training Plan (`/district-plan`)**: Actionable capacity workbench generating training program specs, lab equipment checklists, and trainer upskilling plans.
13. **Intelligence Reports (`/reports`)**: Template-based document generator, print/PDF export, and executive briefing engine.
14. **System & API Settings (`/settings`)**: Endpoint management (`VITE_API_BASE_URL`), LLM key configuration (Gemini/OpenAI), and multi-role switcher.

---

## 🛡️ Real Data & Zero Fake Numbers Principle

Zuno strictly adheres to a **zero-fabrication policy**:
- In the absence of live backend telemetry, the UI presents elegant, informative **empty states**, **skeleton shimmer loaders**, and explicit connection prompts rather than inventing fake sample statistics or misleading numbers.
- The frontend includes a modular, production-ready service layer (`marketService`, `curriculumService`, `forecastService`, `crisisService`, `skillService`, `employerService`, `governmentService`, `reportService`, `aiService`) ready for instant REST / GraphQL / AI microservice connection.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Modern SaaS Vanilla CSS Design System with custom CSS tokens, Plus Jakarta Sans typography, and subtle micro-animations
- **Icons**: Lucide React
- **Architecture**: Modular Services, Centralized API Client, Context-Driven State, Fully Responsive Desktop/Mobile Layouts

---

## 💻 Local Development

```bash
# Clone repository
git clone https://github.com/letheshsudhakar-wq/SIH-2.git
cd SIH-2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Configurable Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## 📄 License

MIT License © 2026 Zuno Platform.
