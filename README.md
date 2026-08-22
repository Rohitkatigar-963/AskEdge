<div align="center">

# ⚡ AskEDGE

### AI-Powered Engineering Learning & Placement Assistant

**Ask smarter. Learn deeper. Prepare better.**

<br>

[![n8n](https://img.shields.io/badge/Workflow-n8n-EA4B71?style=for-the-badge\&logo=n8n\&logoColor=white)](https://n8n.io/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge\&logo=google\&logoColor=white)](https://ai.google.dev/)
[![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![SerpAPI](https://img.shields.io/badge/Search-SerpAPI-111827?style=for-the-badge)](https://serpapi.com/)
[![Notion](https://img.shields.io/badge/Logging-Notion-000000?style=for-the-badge\&logo=notion\&logoColor=white)](https://www.notion.so/)

<br>

**CSE • ECE • Mechanical • Civil**

</div>

---

## 🚀 What is AskEDGE?

**AskEDGE** is an AI-powered engineering learning assistant designed to help students **learn technical concepts, practice for placements, and interact with department-specific AI assistants**.

Unlike a generic chatbot, AskEDGE understands the student's selected engineering department and routes the question through a specialized AI workflow built with **n8n + Google Gemini**.

The system combines:

**Department-Aware AI + AI Agents + Workflow Automation + Web Search + Interactive Quizzes + Notion Logging**

---

## ✨ Why AskEDGE?

Most educational chatbots simply answer a question.

**AskEDGE focuses on delivering the right type of answer for the student's engineering discipline.**

### 🎓 Department-Specific Assistance

|      💻 CSE      |            ⚡ ECE            |      ⚙️ ME      |   🏗️ CE   |
| :--------------: | :-------------------------: | :-------------: | :--------: |
| Computer Science | Electronics & Communication |    Mechanical   |    Civil   |
|    Algorithms    |     Digital Electronics     |  Thermodynamics | Structures |
|  Data Structures |      Signal Processing      | Fluid Mechanics |  Concrete  |
|    Programming   |       Embedded Systems      |  Manufacturing  |  Surveying |

---

## 🧠 AI-Powered Architecture

```text
                    ┌──────────────────────┐
                    │       STUDENT        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     AskEDGE UI       │
                    │     HTML / CSS / JS   │
                    └──────────┬───────────┘
                               │
                     Department + Question
                               │
                               ▼
                    ┌──────────────────────┐
                    │     n8n Webhook      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Department Router   │
                    │     Switch Node      │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
       ┌──────┐             ┌──────┐             ┌──────┐
       │  CSE │             │  ECE │             │ ME/CE│
       └───┬──┘             └───┬──┘             └───┬──┘
           │                    │                    │
           └────────────────────┼────────────────────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │      AI Agent      │
                     └─────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             ┌─────────────┐       ┌─────────────┐
             │   Gemini    │       │   SerpAPI   │
             │ AI Model    │       │ Web Search  │
             └──────┬──────┘       └──────┬──────┘
                    │                     │
                    └──────────┬──────────┘
                               ▼
                    ┌──────────────────────┐
                    │  Webhook Response    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     AskEDGE UI       │
                    └──────────────────────┘

                               +
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Notion         │
                    │ Interaction Logging  │
                    └──────────────────────┘
```

---

## 🔥 Core Features

### 🎓 Department-Aware AI

Select a department and AskEDGE routes the request to the corresponding specialized assistant.

```text
CSE → CSE Assistant
ECE → ECE Assistant
ME  → Mechanical Assistant
CE  → Civil Assistant
```

---

### 🤖 AI Agent with Google Gemini

The n8n workflow uses an **AI Agent** connected to the **Google Gemini Chat Model** to generate responses.

The department-specific prompt is passed to the AI Agent before the answer is generated.

---

### 🎯 Interactive Placement & Quiz Mode

AskEDGE can switch from normal answer mode into an interactive quiz mode.

Try:

```text
Quiz me
Give questions
Ask me
Practice
Test me
```

The assistant is designed to:

```text
Ask Question
     ↓
Wait for Answer
     ↓
Evaluate Answer
     ↓
Explain
     ↓
Ask Next Question
```

This makes the system useful for **placement preparation**, not just academic questions.

---

### 🧩 EDGE Learning Framework

Engineering assistants use the EDGE learning approach:

```text
E → EXPLORE
    Understand the fundamentals

D → DEMONSTRATE
    Learn through examples

G → GENERATE
    Create relevant technical knowledge

E → EVALUATE
    Analyze advantages, limitations and use cases

E → ENGINEER
    Connect concepts to real-world applications
```

---

### 🔎 Web Search with SerpAPI

AskEDGE integrates **SerpAPI** as an AI tool inside the n8n workflow.

This allows the AI Agent to use web-search capabilities when additional information is required.

```text
AI Agent
    │
    ├── Google Gemini
    │
    └── SerpAPI
```

---

### 🗃️ Notion Interaction Logging

Student interactions are logged through Notion.

The workflow records:

```text
Question
Department
Timestamp
```

This creates the foundation for future:

* Learning history
* Student analytics
* Personalized learning
* Performance tracking

---

## ⚙️ How AskEDGE Works

```text
01  Student selects department
              ↓
02  Student enters question
              ↓
03  Frontend sends request
              ↓
04  n8n Webhook receives request
              ↓
05  Department Switch identifies department
              ↓
06  Specialized prompt is selected
              ↓
07  AI Agent processes request
              ↓
08  Google Gemini generates response
              ↓
09  SerpAPI provides web-search support when required
              ↓
10  Response is returned to frontend
              ↓
11  Question is logged in Notion
```

---

## 🛠️ Technology Stack

### Frontend

`HTML5` `CSS3` `JavaScript` `Tailwind CSS`

### AI & Automation

`n8n` `n8n AI Agent` `Google Gemini`

### Integrations

`SerpAPI` `Notion` `HTTP Webhooks`

---

## 📂 Project Structure

```text
AskEdge/
│
├── index.html
│
├── style.css
│
├── script.js
│
├── Askedge.json
│
└── README.md
```

| File           | Purpose                                    |
| -------------- | ------------------------------------------ |
| `index.html`   | Chatbot interface and department selection |
| `style.css`    | Custom styling, animations and UI effects  |
| `script.js`    | Frontend logic and n8n communication       |
| `Askedge.json` | Exported n8n AI workflow                   |
| `README.md`    | Project documentation                      |

---

## 🔌 n8n Workflow

The main automation pipeline:

```text
Webhook
   ↓
Set Department + Question
   ↓
Switch
   ├── CSE
   ├── ECE
   ├── ME
   └── CE
         ↓
      AI Agent
       ↙     ↘
   Gemini   SerpAPI
       ↘     ↙
       Response
          ↓
Respond to Webhook
```

At the same time:

```text
Question + Department + Timestamp
                 ↓
               Notion
```

---

## 💬 Example Prompts

### 💻 CSE

```text
What is machine learning?

Explain binary search.

Quiz me on data structures.

Explain operating system scheduling.
```

### ⚡ ECE

```text
What is signal processing?

Explain digital circuits.

What are embedded systems?
```

### ⚙️ Mechanical

```text
Explain thermodynamics.

What is fluid mechanics?

Explain manufacturing processes.
```

### 🏗️ Civil

```text
What is structural engineering?

Explain concrete design.

What is surveying?
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rohitkatigar-963/AskEdge.git
cd AskEdge
```

### 2. Start the Frontend

You can open `index.html` directly.

Or run a local server:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

### 3. Import the n8n Workflow

Open your n8n instance and import:

```text
Askedge.json
```

### 4. Configure the Webhook

Update the webhook URL inside:

```text
script.js
```

```javascript
const WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL";
```

Then activate your n8n workflow.

---

## 🔐 Security

Before deploying publicly:

* Keep Gemini credentials inside n8n.
* Keep SerpAPI credentials inside n8n.
* Keep Notion credentials inside n8n.
* Never expose API keys in frontend JavaScript.
* Use HTTPS in production.
* Secure the n8n webhook.
* Configure appropriate CORS policies.

---

## 🗺️ Roadmap

### ✅ Completed

* [x] Department selection
* [x] Department-specific AI prompts
* [x] n8n webhook integration
* [x] Department routing
* [x] n8n AI Agent
* [x] Google Gemini integration
* [x] SerpAPI integration
* [x] Interactive quiz behavior
* [x] Notion interaction logging
* [x] Chatbot UI
* [x] Typewriter response effect

### 🔮 Coming Next

* [ ] User authentication
* [ ] Student profiles
* [ ] Conversation history
* [ ] Quiz scoring
* [ ] Learning analytics
* [ ] Personalized learning paths
* [ ] RAG-based engineering knowledge base
* [ ] PDF / notes ingestion
* [ ] Multi-agent architecture
* [ ] Production deployment

---

## 🎯 Project Vision

AskEDGE aims to evolve from an engineering chatbot into a **complete AI learning companion for engineering students**.

The long-term vision is to combine:

```text
Academic Assistance
        +
Placement Preparation
        +
Interactive Practice
        +
Personalized Learning
        +
AI Agents
        +
Automation
        +
Learning Analytics
```

---

<div align="center">

## ⚡ AskEDGE

### **Ask smarter. Learn deeper. Prepare better.**

Built with ❤️ by **Rohit Katigar**

⭐ **If you like the project, consider starring the repository!**

</div>
