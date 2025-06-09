import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Bot, TrendingUp, Gamepad2 } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Full-Stack E-commerce Platform",
      description: "A complete e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing with Stripe, inventory management, and admin dashboard. Deployed on AWS with CI/CD pipeline.",
      videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "AI-Powered Chat Application",
      description: "An intelligent chat application using OpenAI's GPT API with real-time messaging, conversation history, and custom AI personas. Features include message encryption, file sharing, and voice-to-text integration.",
      videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      techStack: ["Next.js", "OpenAI API", "Socket.io", "Redis", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
      reversed: true
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "A comprehensive analytics platform that processes millions of data points in real-time. Features interactive charts, custom report generation, data export capabilities, and machine learning-powered insights.",
      videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      techStack: ["React", "D3.js", "Python", "FastAPI", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Cross-Platform Fitness Tracking App",
      description: "A comprehensive fitness application built with React Native that tracks workouts, nutrition, and progress. Integrates with wearable devices, includes social features, and provides personalized workout recommendations.",
      videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
      techStack: ["React Native", "Expo", "Firebase", "GraphQL", "Apollo"],
      demoUrl: "#",
      githubUrl: "#",
      reversed: true
    }
  ];

  const additionalProjects = [
    {
      icon: <Bot className="text-blue-600" />,
      title: "Chatbot Framework",
      description: "Open-source conversational AI framework"
    },
    {
      icon: <TrendingUp className="text-green-600" />,
      title: "Stock Predictor",
      description: "ML model for financial market analysis"
    },
    {
      icon: <Gamepad2 className="text-purple-600" />,
      title: "Browser Game",
      description: "WebGL-based multiplayer game"
    }
  ];

  const getTechStackColor = (tech: string) => {
    const colors: Record<string, string> = {
      "React": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Node.js": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "PostgreSQL": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "AWS": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "Stripe": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Next.js": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      "OpenAI API": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Socket.io": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "Redis": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "TypeScript": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      "D3.js": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Python": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      "FastAPI": "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400",
      "MongoDB": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "React Native": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Expo": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Firebase": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "GraphQL": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "Apollo": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400"
    };
    return colors[tech] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work in software development, from web applications to AI experiments.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden shadow-xl">
              <div className={`grid lg:grid-cols-2 gap-8 ${project.reversed ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`aspect-video bg-black ${project.reversed ? 'lg:col-start-2' : ''}`}>
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${project.videoId}`}
                    title={`${project.title} Demo`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <CardContent className={`p-8 ${project.reversed ? 'lg:col-start-1' : ''}`}>
                  <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} className={getTechStackColor(tech)}>
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button className="bg-tech-blue hover:bg-blue-600 text-white">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Projects Preview */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8">More Projects</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {additionalProjects.map((project, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    {project.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="text-tech-blue hover:text-blue-600">
            View All Projects on GitHub →
          </Button>
        </div>
      </div>
    </div>
  );
}
