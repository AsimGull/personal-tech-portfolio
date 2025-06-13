import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Cloud, Brain, Smartphone } from "lucide-react";

export default function Home() {
  const techImages = [
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      alt: "Modern coding workspace with multiple monitors",
      title: "Development Environment",
      description: "Modern tools for efficient coding"
    },
    {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      alt: "AI neural network visualization with glowing nodes",
      title: "AI & Machine Learning",
      description: "Exploring intelligent systems"
    },
    {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      alt: "Modern server room with blue lighting and organized cables",
      title: "Cloud Infrastructure",
      description: "Scalable solutions architecture"
    }
  ];

  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Python",
      description: "Backend & AI Development",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "React",
      description: "Frontend Development",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: <Cloud className="w-8 h-8 text-purple-600" />,
      title: "Cloud",
      description: "AWS & Azure",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: <Brain className="w-8 h-8 text-orange-600" />,
      title: "AI/ML",
      description: "Neural Networks",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  return (
    <div className="min-h-screen">
      { /* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6  ">
            Building the Future with {"AI"}
            {/* <span className="bg-gradient-to-r from-tech-blue to-blue-600 bg-clip-text text-transparent"> Technology</span> */}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to my digital space where I share insights, projects, and innovations in software development, 
            AI, and emerging technologies. Let's explore the possibilities together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/projects">
              <Button size="lg" className="bg-tech-blue hover:bg-blue-600 text-white shadow-lg hover:shadow-xl">
                View Projects
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Read Blog
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="text-tech-blue hover:text-blue-600">
                Get in Touch →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Images Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {techImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto ">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {skills.map((skill, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${skill.bgColor}`}>
                      {skill.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
