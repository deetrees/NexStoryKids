# NexStory: AI-Powered Personalized Storybook Generator

NexStory is a sophisticated, multi-agent AI system designed to create unique, personalized, and illustrated children's storybooks on demand. This project combines a powerful Python backend with a beautiful React frontend to deliver magical storytelling experiences.

## 🏗️ Project Structure

This repository contains both the frontend and backend components:

- **Frontend**: React + TypeScript landing page with interactive story creator
- **Backend**: Python ACP server with CrewAI multi-agent workflow

## ✨ Features

### Frontend (React Landing Page)
- 🎨 Beautiful, kid-friendly interface with animations
- 📱 Responsive design for all devices  
- 🎪 Interactive story creation wizard
- 🌈 Playful animations and micro-interactions
- 🔗 Direct integration with backend API

### Backend (Python ACP Server)
- 🤖 Multi-Agent Workflow: Five specialized AI agents working together
- 🧠 Strategic Multi-Model Backend: GPT-4o, Claude 3 Opus, Gemini 2.5 Flash
- 🎨 Custom Tool Integration: Replicate API for illustrations
- 🛡️ Built-in Safety and Compliance: COPPA compliant content review
- 🔌 ACP-Compliant Server: Ready for integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)
- uv package manager (`pip install uv`)
- API keys for: OpenAI, Anthropic, Google AI Studio, Replicate, AWS

### Backend Setup

1. **Clone and setup Python environment:**
```bash
git clone https://github.com/your-username/nexstory-agents.git
cd nexstory-agents
uv init
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. **Create .env file with your API keys:**
```bash
# .env file
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
REPLICATE_API_TOKEN=r8_...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=us-east-1
```

3. **Install dependencies and start server:**
```bash
uv sync
python crew_agent_server.py
```

The server will start on `http://localhost:8000`

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔗 Integration

The frontend automatically connects to the backend server running on `localhost:8000`. When users click "START YOUR STORY!", they'll go through an interactive wizard that:

1. Collects child's name and age
2. Gathers interests and preferences  
3. Lets them choose a story theme
4. Sends the request to the backend crew
5. Displays the generated story with illustrations

## 🧪 Testing

Test the backend independently:
```bash
python test_acp_client.py
```

## 🗺️ Future Roadmap

- [ ] User authentication and story saving
- [ ] Stripe payment integration
- [ ] Print-on-demand service integration
- [ ] Story sharing and social features
- [ ] Mobile app development
- [ ] Advanced illustration customization

## 💻 Technology Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls

**Backend:**
- Python with CrewAI orchestration
- Agent Communication Protocol (ACP)
- OpenAI GPT-4o, Anthropic Claude 3 Opus, Google Gemini 2.5 Flash
- Replicate for image generation
- AWS services for additional tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
