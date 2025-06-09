import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Blog() {
  const featuredPost = {
    title: "Building Scalable Microservices with Docker and Kubernetes",
    excerpt: "Dive deep into containerization strategies and orchestration patterns that power modern cloud-native applications. Learn how to design resilient systems that scale effortlessly.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    date: "March 15, 2024",
    readTime: "12 min read"
  };

  const blogPosts = [
    {
      title: "Advanced React Hooks Patterns",
      excerpt: "Exploring custom hooks, context patterns, and state management strategies for complex React applications.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "React",
      date: "March 10, 2024",
      readTime: "5 min read"
    },
    {
      title: "Getting Started with TensorFlow 2.0",
      excerpt: "A comprehensive guide to building your first neural network with TensorFlow and understanding core concepts.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "AI/ML",
      date: "March 5, 2024",
      readTime: "8 min read"
    },
    {
      title: "AWS Lambda Best Practices",
      excerpt: "Optimizing serverless functions for performance, cost, and reliability in production environments.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "DevOps",
      date: "February 28, 2024",
      readTime: "6 min read"
    },
    {
      title: "PostgreSQL Performance Tuning",
      excerpt: "Essential techniques for optimizing database queries and improving application performance at scale.",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "Database",
      date: "February 20, 2024",
      readTime: "7 min read"
    },
    {
      title: "Modern Web Security Practices",
      excerpt: "Protecting web applications from common vulnerabilities and implementing robust security measures.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "Security",
      date: "February 15, 2024",
      readTime: "9 min read"
    },
    {
      title: "React Native vs Flutter: 2024 Comparison",
      excerpt: "Comparing the leading cross-platform frameworks for mobile development in terms of performance and features.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      category: "Mobile",
      date: "February 10, 2024",
      readTime: "12 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "React": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "AI/ML": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "DevOps": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "Database": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Security": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "Mobile": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400"
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tech Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the latest in technology, sharing insights, and documenting my journey in software development.
          </p>
        </div>

        {/* Featured Hero Blog Post */}
        <Card className="mb-16 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-blue-500 text-white">Featured</Badge>
                <span className="text-blue-200 text-sm">{featuredPost.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-500 text-white">AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex Chen</p>
                    <p className="text-blue-200 text-sm">Senior Developer</p>
                  </div>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Read More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={featuredPost.image}
                alt="Container orchestration dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
          </div>
        </Card>

        {/* Recent Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="text-muted-foreground text-sm">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-tech-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-tech-blue to-blue-600 text-white text-sm">
                          AC
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground font-medium">Alex Chen</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button className="bg-tech-blue hover:bg-blue-600 text-white shadow-lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
}
