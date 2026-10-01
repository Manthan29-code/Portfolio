import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERNAME = 'Manthan29-code'
const API_URL = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`

// Curated descriptions mapped by repository name
const projectDescriptions = {
    "Portfolio": "A personal portfolio website showcasing my technical skills, projects, experience, and achievements.",
    "slashsnip": "A web-based productivity tool designed to help users quickly manage, save, and reuse useful text snippets.",
    "CodeScope-MCP": "A developer-focused project for exploring and analyzing code using AI-assisted tools and Model Context Protocol concepts.",
    "KnowledgeForge": "An intelligent knowledge management platform that combines AI and web technologies to organize, process, and retrieve useful information.",
    "ML": "A machine learning project collection containing data analysis, model training, and predictive modeling experiments implemented in Jupyter Notebooks.",
    "cloudBox": "A cloud storage web application that allows users to upload, manage, and organize files through a JavaScript-based interface.",
    "EaseMotion-css": "A lightweight, animation-first CSS framework providing reusable UI components, modern effects, and smooth animations.",
    "P2P_-app": "A peer-to-peer application demonstrating direct communication and data sharing between connected users or systems.",
    "P2P App": "A peer-to-peer application demonstrating direct communication and data sharing between connected users or systems.",
    "The Lighthouse": "A web project focused on providing guidance, information, or useful services through a clean and accessible interface.",
    "DevPath": "An open-source platform that recommends coding projects based on a developer’s skills, interests, experience, and available time.",
    "Checkora": "An online chess platform featuring an AI opponent powered by minimax search and alpha-beta pruning, built with Django and C++.",
    "learn_deploy": "A practical project for learning application deployment, hosting, configuration, and basic DevOps workflows.",
    "UltimateHealth": "A health and wellness platform offering articles, podcasts, AI chat support, and helpful healthcare-related resources.",
    "Q-Classify": "A machine learning classification project that analyzes input data and categorizes it into relevant classes through a simple web interface.",
    "InterviewAI": "An AI-based interview preparation platform designed to help users practice interviews and improve their technical and communication skills.",
    "pdf-merger-ext": "A browser extension that allows users to combine multiple PDF files into a single document quickly and conveniently.",
    "systemDesign_LLD": "A collection of low-level system design implementations in C++, demonstrating object-oriented programming, design patterns, and software architecture concepts.",
    "System Design LLD": "A collection of low-level system design implementations in C++, demonstrating object-oriented programming, design patterns, and software architecture concepts.",
    "FastApi_basic": "A beginner-friendly backend application demonstrating API development, routing, request handling, and server-side functionality using FastAPI.",
    "FastAPI Basic": "A beginner-friendly backend application demonstrating API development, routing, request handling, and server-side functionality using FastAPI.",
    "design-extractor": "A tool for extracting and analyzing design information from digital interfaces or web pages.",
    "SGH_CLEANBAG": "A project focused on promoting cleanliness and responsible waste management through a digital solution.",
    "Manthan29-code": "A GitHub profile repository containing personal information, developer highlights, and portfolio content.",
    "LangChain": "A project exploring LangChain concepts for building applications powered by large language models and AI workflows.",
    "AgroVista": "An agriculture-focused application designed to provide useful farming insights, resources, or technology-based solutions.",
    "PRODIGY_WD_04": "A web development project created as part of an internship task, showcasing frontend development and interactive UI design.",
    "Manthan29-CPP": "A repository containing C++ learning resources, programming practice, and configuration files for development.",
    "CodeAlpha_ConnectVibe": "A social networking or communication-based web application designed to connect users through an interactive digital platform.",
    "CodeAlpha_SnapNShop": "An e-commerce project that provides a shopping experience with product browsing, selection, and user interaction features.",
    "first_Node": "A beginner Node.js project demonstrating server-side JavaScript, backend setup, and basic application development.",
    "Django_REST": "A backend project demonstrating RESTful API development using Django and Django REST Framework.",
    "GTU_PYQ": "A resource platform for accessing and organizing Gujarat Technological University previous-year question papers.",
    "Threejs_model": "A 3D web project that uses Three.js to create and display interactive three-dimensional models.",
    "Data_visualization": "A data analysis project that presents information through charts, graphs, and visual representations.",
    "pandasBook": "A learning repository covering data manipulation, analysis, and processing using the Pandas library in Python.",
    "NumpyBook": "A Python learning repository focused on numerical computing and array operations using NumPy.",
    "PRODIGY_WD_05": "A web development project created during an internship, demonstrating frontend design, functionality, and responsive user interfaces.",
    "expensesManager": "An expense management application that helps users record, organize, and track their personal finances.",
    "PRODIGY_WD_03": "A frontend web development project showcasing interactive components, user input handling, and responsive design.",
    "PRODIGY_WD_02": "A web development project focused on building a functional and user-friendly frontend application.",
    "PRODIGY_WD_01": "An introductory web development project demonstrating HTML, CSS, JavaScript, and basic responsive design principles.",
    "first_git": "A beginner repository created to practice Git, GitHub, version control, and repository management.",
    "Manthan29-JavaScript": "A JavaScript learning repository containing programming exercises, concepts, and practical examples.",
    "python-beginners": "A beginner-friendly Python repository covering programming fundamentals, syntax, and basic problem-solving.",
    "manthan29-java": "A Java learning repository containing Java fundamentals, object-oriented programming, and coding practice.",
    "manthan-SQL": "A SQL learning repository covering database queries, data manipulation, filtering, joins, and database concepts.",
    "Manthan29-C-language": "A C programming repository containing fundamental concepts, syntax, problem-solving exercises, and coding practice.",
    "Manthan29-html": "An HTML learning repository demonstrating webpage structure, forms, elements, and basic frontend development concepts.",
    "Research Agent": "An AI-powered research assistant that automates information gathering, analysis, and generation of structured research results using Python and JavaScript.",
    "Agentic AI": "A collection of experiments and implementations focused on autonomous AI agents, machine learning workflows, and intelligent task automation.",
    "Airbnb Clone": "A full-stack accommodation booking platform inspired by Airbnb, featuring property listings, search functionality, and a user-friendly booking interface."
}

function getProjectDescription(repoName) {
    if (!repoName) return ""

    // Exact match
    if (projectDescriptions[repoName]) {
        return projectDescriptions[repoName]
    }

    // Normalized match (case-insensitive & stripping underscores/hyphens/spaces)
    const normalizedTarget = repoName.toLowerCase().replace(/[-_\s]/g, '')
    for (const [key, desc] of Object.entries(projectDescriptions)) {
        const normalizedKey = key.toLowerCase().replace(/[-_\s]/g, '')
        if (normalizedKey === normalizedTarget) {
            return desc
        }
    }

    return ""
}

async function fetchAndSaveRepos() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'User-Agent': 'Portfolio-App'
            }
        })

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }

        const repos = await response.json()

        // Filter out forks and keep only clean fields required for portfolio cards
        const cleanedRepos = repos
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                id: repo.id,
                name: repo.name,
                description: getProjectDescription(repo.name),
                repoUrl: repo.html_url,
                liveUrl: repo.homepage || null,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                topics: repo.topics || [],
                updatedAt: repo.updated_at
            }))

        // Generate valid JavaScript file content with export and global window fallback
        const fileContent = `// Auto-generated by fetch-repos.js\nexport const repos = ${JSON.stringify(cleanedRepos, null, 2)};\nif (typeof window !== 'undefined') {\n    window.repos = repos;\n}\n`

        const targetPath = path.join(__dirname, 'repo.js')
        await fs.writeFile(targetPath, fileContent, 'utf-8')
        console.log(`Successfully saved ${cleanedRepos.length} repos to ${targetPath}`)
    } catch (error) {
        console.error('Failed to fetch repositories:', error.message)
    }
}

fetchAndSaveRepos()