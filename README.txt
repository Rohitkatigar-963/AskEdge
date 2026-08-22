# ⚡ AskEDGE

### **AI-Powered Engineering Learning & Placement Assistant**

> **Ask smarter. Learn deeper. Prepare better.**

AskEDGE is an **AI-powered educational assistant for engineering students** that provides **department-specific technical explanations, placement preparation, interactive quizzes, and web-assisted answers** through an automated AI workflow built with **n8n + Google Gemini**.

Instead of sending every question to the same generic AI, AskEDGE intelligently routes the student's request based on their engineering department and applies a specialized AI instruction set.

---

<div align="center">

### 🎓 Learn • 🧠 Practice • 🚀 Prepare

**CSE · ECE · Mechanical · Civil**

</div>

---

## 🌟 What Makes AskEDGE Different?

Most educational chatbots simply answer questions.

**AskEDGE focuses on HOW the student should learn.**

```text
                STUDENT
                   │
                   ▼
          ┌─────────────────┐
          │   AskEDGE UI    │
          └────────┬────────┘
                   │
          Department + Question
                   │
                   ▼
          ┌─────────────────┐
          │   n8n Webhook   │
          └────────┬────────┘
                   │
                   ▼
          ┌─────────────────┐
          │ Department      │
          │ Router          │
          └───────┬─────────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
     CSE         ECE         ME        CE
       │          │          │          │
       └──────────┴──────────┴──────────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   AI Agent    │
                 └───────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Google Gemini            SerpAPI
              │                     │
              └──────────┬──────────┘
                         ▼
                  AI Generated Answer
                         │
                         ▼
                     STUDENT
```

---

# ✨ Features

### 🎓 Department-Aware AI

Choose your engineering discipline and get responses specifically designed for that domain.

| 💻 CSE           | ⚡ ECE                       | ⚙️ ME                  | 🏗️ CE            |
| ---------------- | --------------------------- | ---------------------- | ----------------- |
| Computer Science | Electronics & Communication | Mechanical Engineering | Civil Engineering |

The n8n workflow uses a **Switch node** to route the request to the appropriate department assistant.

---

### 🧠 AI Agent Architecture

AskEDGE is powered by an **n8n AI Agent** connected to **Google Gemini**.

```text
Student Question
       ↓
Department Context
       ↓
Specialized Prompt
       ↓
n8n AI Agent
       ↓
Google Gemini
       ↓
Structured Response
```

The workflow contains a dedicated AI Agent and Google Gemini chat model.

---

### 🔎 Web-Assisted Intelligence

AskEDGE integrates **SerpAPI as an AI tool**, allowing the AI Agent to perform web searches when additional information is required.

This gives the system access to information beyond the language model's static knowledge.

---

### 🎯 Placement Preparation Mode

AskEDGE can switch into an interactive quiz experience.

Students can use commands such as:

```text
"Quiz me"

"Give questions"

"Ask me"

"Practice"

"Test me"
```

The CSE assistant is instructed to ask **one question at a time**, evaluate the student's answer, explain the result, and then continue with the next question.

---

### 🧩 EDGE Learning Framework

The specialized engineering assistants use the **EDGE Taxonomy**:

```text
E → EXPLORE
    Understand the fundamentals.

D → DEMONSTRATE
    See the concept through an example.

G → GENERATE
    Produce relevant technical knowledge.

E → EVALUATE
    Analyze advantages, limitations and use cases.

E → ENGINEER
    Connect knowledge with real-world engineering.
```

For example, the Mechanical Engineering assistant is explicitly structured around this framework.

---

### 🗃️ Notion Interaction Logging

AskEDGE also connects to **Notion** to record student interactions.

The workflow stores:

* Student question
* Department
* Timestamp

This creates the foundation for future learning analytics and personalized student progress tracking.

---

# 🏗️ Architecture

```text
┌──────────────────────────────────────────────────┐
│                  ASKEDGE FRONTEND                 │
│                                                  │
│            HTML + CSS + JavaScript               │
└───────────────────────┬──────────────────────────┘
                        │
                        │ HTTP POST
                        ▼
┌──────────────────────────────────────────────────┐
│                     n8n                          │
│                                                  │
│  ┌──────────────┐                                │
│  │   Webhook    │                                │
│  └──────┬───────┘                                │
│         ▼                                        │
│  ┌──────────────┐                                │
│  │ Set Request  │                                │
│  └──────┬───────┘                                │
│         ▼                                        │
│  ┌──────────────┐                                │
│  │    Switch    │                                │
│  └──────┬───────┘                                │
│         │                                        │
│    ┌────┼────┬────┐                              │
│    ▼    ▼    ▼    ▼                              │
│   CSE  ECE   ME   CE                             │
│    │    │    │    │                              │
│    └────┴────┴────┘                              │
│             │                                    │
│             ▼                                    │
│       ┌─────────────┐                            │
│       │  AI Agent   │                            │
│       └──────┬──────┘                            │
│              │                                   │
│       ┌──────┴───────┐                           │
│       ▼              ▼                           │
│   Gemini          SerpAPI                        │
│       │              │                           │
│       └──────┬───────┘                           │
│              ▼                                   │
│      Respond to Webhook                          │
└──────────────┬───────────────────────────────────┘
               │
               ▼
          AskEDGE UI

               +
               
        ┌──────────────┐
        │    Notion    │
        │  Interaction │
        │    Logging   │
        └──────────────┘
```

---

# 🛠️ Tech Stack

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

### AI & Automation

![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge\&logo=n8n\&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge\&logo=google\&logoColor=white)

### Integrations

![SerpAPI](https://img.shields.io/badge/SerpAPI-Web_Search-111827?style=for-the-badge)
![Notion](https://img.shields.io/badge/Notion-Integration-000000?style=for-the-badge\&logo=notion\&logoColor=white)

---

# 📂 Project Structure

```text
AskEdge/
│
├── index.html          # Frontend interface
├── style.css           # Custom styling & animations
├── script.js           # Chatbot & webhook logic
├── Askedge.json        # n8n workflow
└── README.md           # Documentation
```

---

# 🔄 Request Flow

When a student asks:

> **"Explain linked lists"**

AskEDGE processes the request like this:

```text
User
 │
 │ "Explain linked lists"
 ▼
Frontend
 │
 │ department = CSE
 ▼
n8n Webhook
 │
 ▼
Department Router
 │
 │ CSE
 ▼
CSE Prompt
 │
 ▼
AI Agent
 │
 ├──── Google Gemini
 │
 └──── SerpAPI
 │
 ▼
Generated Answer
 │
 ▼
Webhook Response
 │
 ▼
AskEDGE Chat Interface
```

The n8n workflow receives the department and question through the webhook before routing the request.

---

# 💻 Example Use Cases

### 👨‍💻 CSE Student

```text
Explain binary search.

Quiz me on data structures.

What is machine learning?

Explain operating system scheduling.
```

### 🔌 ECE Student

```text
Explain digital circuits.

What is signal processing?

Explain embedded systems.
```

### ⚙️ Mechanical Student

```text
Explain thermodynamics.

What is fluid mechanics?

Explain manufacturing processes.
```

### 🏗️ Civil Student

```text
Explain concrete design.

What is structural engineering?

Explain surveying.
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rohitkatigar-963/AskEdge.git
cd AskEdge
```

## 2️⃣ Start the Frontend

You can open:

```text
index.html
```

or serve it using a local server.

For example:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

# 🔗 Configure n8n

Import:

```text
Askedge.json
```

into your n8n instance.

The workflow contains the webhook, department routing, AI Agent, Gemini model, SerpAPI integration, Notion logging, and webhook response nodes.

Then update the webhook endpoint in:

```text
script.js
```

```javascript
const WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL";
```

---

# 🔐 Security

**Never commit API keys or private credentials to GitHub.**

For production:

* Use environment variables.
* Protect the n8n webhook.
* Configure CORS correctly.
* Use HTTPS.
* Secure Gemini credentials.
* Secure SerpAPI credentials.
* Secure Notion credentials.

## The exported n8n workflow references credentials for Gemini, SerpAPI, and Notion, so those credentials should be configured in your own n8n environment rather than exposed publicly.

# 🔮 Future Roadmap

```text
[✓] Department-specific AI
[✓] n8n AI workflow
[✓] Google Gemini integration
[✓] Web search integration
[✓] Interactive quiz mode
[✓] Notion interaction logging
[✓] Modern chatbot interface

[ ] Authentication
[ ] Student profiles
[ ] Conversation history
[ ] Quiz scoring
[ ] Learning analytics
[ ] Personalized learning paths
[ ] RAG knowledge bases
[ ] Engineering PDF/notes ingestion
[ ] Multi-agent architecture
[ ] Production deployment
```

---

# 📊 Current Architecture

AskEDGE demonstrates how an AI application can combine:

```text
       FRONTEND
           │
           ▼
       WEBHOOK
           │
           ▼
   WORKFLOW AUTOMATION
           │
           ▼
    DEPARTMENT ROUTING
           │
           ▼
       AI AGENT
        /     \
       /       \
   GEMINI     SERPAPI
       \       /
        \     /
         ▼   ▼
      RESPONSE
           │
           ▼
       STUDENT

           +

         NOTION
      DATA LOGGING
```

---

# 🎯 Project Vision

AskEDGE aims to evolve into a **complete AI learning companion for engineering students** — combining academic assistance, placement preparation, interactive practice, personalized learning, and intelligent automation in one platform.

> **Don't just ask AI. Ask the right AI.**

---

# 👨‍💻 Author

### **Rohit Katigar**

🎓 Computer Science Engineering Student
🤖 AI & Generative AI Enthusiast
🧠 AI Agents & Agentic Systems
⚙️ Workflow Automation
🚀 Building practical AI applications

---

<div align="center">

## ⭐ Star the Repository

If you found **AskEDGE** interesting, consider giving the project a ⭐

### **Built with ❤️ using AI, n8n & code**

</div>
