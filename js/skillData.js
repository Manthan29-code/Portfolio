/**
 * Skills Data - Edit this file to add/remove/update skills and categories
 * Categories match the resume:
 * - Languages
 * - Frontend
 * - Backend
 * - Tools & AI Technologies
 * - Core Skills
 * - Soft Skills
 * - Currently Learning
 */

const skillCategories = [
    { id: "all", name: "All Skills", icon: "fas fa-th-large" },
    { id: "languages", name: "Languages", icon: "fas fa-code" },
    { id: "frontend", name: "Frontend", icon: "fas fa-laptop-code" },
    { id: "backend", name: "Backend", icon: "fas fa-server" },
    { id: "tools-ai", name: "Tools & AI", icon: "fas fa-robot" },
    { id: "core", name: "Core Skills", icon: "fas fa-microchip" },
    { id: "soft", name: "Soft Skills", icon: "fas fa-lightbulb" },
    { id: "learning", name: "Currently Learning", icon: "fas fa-graduation-cap" }
];

const skillsData = [
    // Languages
    {
        name: "C",
        category: "languages",
        categoryName: "Languages",
        icon: "fas fa-code",
        description: "Procedural programming & memory management fundamentals"
    },
    {
        name: "C++",
        category: "languages",
        categoryName: "Languages",
        icon: "fas fa-file-code",
        description: "Object-oriented programming, STL, and algorithmic problem solving"
    },
    {
        name: "Java",
        category: "languages",
        categoryName: "Languages",
        icon: "fab fa-java",
        description: "OOP architecture, robust application development, and data structures"
    },
    {
        name: "Python",
        category: "languages",
        categoryName: "Languages",
        icon: "fab fa-python",
        description: "Scripting, AI pipeline development, Streamlit, and FastAPI"
    },
    {
        name: "JavaScript",
        category: "languages",
        categoryName: "Languages",
        icon: "fab fa-js-square",
        description: "Modern ES6+, asynchronous programming, and DOM manipulation"
    },
    {
        name: "TypeScript",
        category: "languages",
        categoryName: "Languages",
        icon: "fas fa-shield-alt",
        description: "Strongly typed JavaScript for scalable, maintainable codebases"
    },
    {
        name: "HTML5",
        category: "languages",
        categoryName: "Languages",
        icon: "fab fa-html5",
        description: "Semantic web structure, accessibility, and modern SEO standards"
    },
    {
        name: "CSS3",
        category: "languages",
        categoryName: "Languages",
        icon: "fab fa-css3-alt",
        description: "Responsive layouts, Flexbox, Grid, keyframe animations, and styling"
    },
    {
        name: "SQL",
        category: "languages",
        categoryName: "Languages",
        icon: "fas fa-database",
        description: "Relational database querying, schema design, and query optimization"
    },

    // Frontend
    {
        name: "React.js",
        category: "frontend",
        categoryName: "Frontend",
        icon: "fab fa-react",
        description: "Component-driven architecture, custom hooks, and state management"
    },
    {
        name: "Redux / Redux Toolkit",
        category: "frontend",
        categoryName: "Frontend",
        icon: "fas fa-cubes",
        description: "Predictable global state management, reducers, and async thunks"
    },
    {
        name: "Tailwind CSS",
        category: "frontend",
        categoryName: "Frontend",
        icon: "fas fa-wind",
        description: "Utility-first rapid UI development with clean responsive design"
    },
    {
        name: "Bootstrap",
        category: "frontend",
        categoryName: "Frontend",
        icon: "fab fa-bootstrap",
        description: "Responsive grid layout systems and pre-built UI components"
    },

    // Backend
    {
        name: "Node.js",
        category: "backend",
        categoryName: "Backend",
        icon: "fab fa-node-js",
        description: "Event-driven asynchronous server-side runtime environment"
    },
    {
        name: "Express.js",
        category: "backend",
        categoryName: "Backend",
        icon: "fas fa-network-wired",
        description: "RESTful API development, JWT authentication, and middleware pipelines"
    },
    {
        name: "FastAPI",
        category: "backend",
        categoryName: "Backend",
        icon: "fas fa-bolt",
        description: "High-performance Python asynchronous APIs with automatic OpenAPI docs"
    },
    {
        name: "MongoDB",
        category: "backend",
        categoryName: "Backend",
        icon: "fas fa-leaf",
        description: "NoSQL document database, aggregation pipelines, and Mongoose ORM"
    },
    {
        name: "Django",
        category: "backend",
        categoryName: "Backend",
        icon: "fas fa-layer-group",
        description: "Full-stack Python web framework with ORM and built-in auth"
    },
    {
        name: "Redis",
        category: "backend",
        categoryName: "Backend",
        icon: "fas fa-memory",
        description: "In-memory data store, high-speed caching, and pub/sub messaging"
    },

    // Tools & AI Technologies
    {
        name: "LangChain",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fas fa-link",
        description: "Building LLM-powered chains, agents, memory, and retrieval pipelines"
    },
    {
        name: "LangGraph",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fas fa-project-diagram",
        description: "Multi-agent orchestration and cyclical graph-based AI workflows"
    },
    {
        name: "Docker",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fab fa-docker",
        description: "Containerization, reproducible environments, and multi-stage builds"
    },
    {
        name: "Git",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fab fa-git-alt",
        description: "Distributed version control, branch management, and conflict resolution"
    },
    {
        name: "GitHub",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fab fa-github",
        description: "Open-source collaboration, pull requests, issues, and repository hosting"
    },
    {
        name: "Postman",
        category: "tools-ai",
        categoryName: "Tools & AI",
        icon: "fas fa-paper-plane",
        description: "API testing, automated endpoint collections, and Student Expert certified"
    },

    // Core Skills
    {
        name: "DSA",
        category: "core",
        categoryName: "Core Skills",
        icon: "fas fa-sitemap",
        description: "Data Structures & Algorithms with active problem solving on LeetCode"
    },
    {
        name: "DBMS",
        category: "core",
        categoryName: "Core Skills",
        icon: "fas fa-database",
        description: "Database normalization, indexing, transactions, and ACID properties"
    },
    {
        name: "Operating Systems",
        category: "core",
        categoryName: "Core Skills",
        icon: "fas fa-microchip",
        description: "Process synchronization, threading, memory management, and paging"
    },
    {
        name: "Computer Networks",
        category: "core",
        categoryName: "Core Skills",
        icon: "fas fa-wifi",
        description: "TCP/IP protocol suite, OSI model, HTTP/HTTPS, DNS, and sockets"
    },
    {
        name: "API Design",
        category: "core",
        categoryName: "Core Skills",
        icon: "fas fa-plug",
        description: "RESTful architecture, status codes, JWT security, and endpoint structuring"
    },

    // Soft Skills
    {
        name: "Problem Solving",
        category: "soft",
        categoryName: "Soft Skills",
        icon: "fas fa-puzzle-piece",
        description: "Systematic debugging, root-cause analysis, and optimal solution finding"
    },
    {
        name: "Analytical Thinking",
        category: "soft",
        categoryName: "Soft Skills",
        icon: "fas fa-brain",
        description: "Evaluating complex system requirements and architectural trade-offs"
    },
    {
        name: "Adaptability",
        category: "soft",
        categoryName: "Soft Skills",
        icon: "fas fa-sync-alt",
        description: "Quickly learning new tech stacks, frameworks, and AI paradigms"
    },
    {
        name: "Continuous Learning",
        category: "soft",
        categoryName: "Soft Skills",
        icon: "fas fa-book-reader",
        description: "Consistently exploring cutting-edge AI, system design, and open-source"
    },

    // Currently Learning
    {
        name: "Cloud Fundamentals",
        category: "learning",
        categoryName: "Currently Learning",
        icon: "fas fa-cloud",
        description: "Google Cloud Platform (GDG Study Jam graduate) & cloud deployment"
    },
    {
        name: "System Design",
        category: "learning",
        categoryName: "Currently Learning",
        icon: "fas fa-drafting-compass",
        description: "High-level architecture, scalability, load balancers, and caching tiers"
    }
];
