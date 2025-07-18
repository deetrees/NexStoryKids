from dotenv import load_dotenv
load_dotenv()

import yaml
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI

# ✅ Import decorated tool functions!
from src.nexstory.tools.image_tools import ImageGenerationTool
from src.nexstory.tools.aws_tools import face_detection_tool

try:
    from yaml import CLoader as Loader
except ImportError:
    from yaml import Loader

def load_llms():
    return {
        "openai/gpt-4o": ChatOpenAI(model_name="gpt-4o", temperature=0.7),
        "anthropic/claude-3-opus": ChatAnthropic(model_name="claude-3-opus-20240229"),
        "google/gemini-pro": ChatGoogleGenerativeAI(model="gemini-pro"),
    }

def load_tools():
    return {
        "image_generation_tool": ImageGenerationTool(),
        "face_detection_tool": face_detection_tool,
    }

def load_yaml(path):
    with open(path, 'r') as f:
        return yaml.load(f, Loader=Loader)

def build_agents(agents_config, llms, tools):
    agents = {}
    for name, agent_data in agents_config.items():
        llm_key = agent_data.pop("llm")
        agent_llm = llms.get(llm_key)
        if not agent_llm:
            raise ValueError(f"LLM key '{llm_key}' not found in llms dictionary.")

        agent_tools = []
        if 'tools' in agent_data:
            for tool_path in agent_data.pop('tools'):
                if tool_path in tools:
                    agent_tools.append(tools[tool_path])

        agents[name] = Agent(
            **agent_data,
            llm=agent_llm,
            tools=agent_tools,
            allow_delegation=False
        )
    return agents

def build_tasks(tasks_config, agents):
    tasks = []
    task_objects = {}
    
    # First pass: create tasks without context
    for task_name, task_data in tasks_config.items():
        print(f"Processing task: {task_name}")
        # Make a copy to avoid modifying the original
        task_data_copy = task_data.copy()
        agent_name = task_data_copy.pop('agent')
        task_agent = agents[agent_name]
        
        # Handle optional fields
        if 'human_input' in task_data_copy:
            task_data_copy['human_input'] = task_data_copy.pop('human_input')
        
        # Skip context for now - we'll handle it in the second pass
        context_names = task_data_copy.pop('context', None)
        
        try:
            task_obj = Task(**task_data_copy, agent=task_agent)
            tasks.append(task_obj)
            task_objects[task_name] = task_obj
            print(f"✅ Task {task_name} created successfully")
        except Exception as e:
            print(f"❌ Error creating task {task_name}: {e}")
            raise
    
    # Second pass: resolve context references
    for task_name, task_data in tasks_config.items():
        context_names = task_data.get('context', None)
        if context_names:
            context_tasks = [task_objects[name] for name in context_names]
            task_objects[task_name].context = context_tasks
    
    return tasks

def crew():
    llms = load_llms()
    tools = load_tools()

    agents_config = load_yaml('src/nexstory/config/agents.yaml')
    tasks_config = load_yaml('src/nexstory/config/tasks.yaml')

    agents = build_agents(agents_config, llms, tools)
    tasks = build_tasks(tasks_config, agents)

    return Crew(
        agents=list(agents.values()),
        tasks=tasks,
        process=Process.sequential,
        verbose=True
    )

