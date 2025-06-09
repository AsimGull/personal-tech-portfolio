import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  // Fetch featured blog post
  const { data: featuredPost } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/featured"],
  });

  // Fetch all blog posts
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

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
        {featuredPost && (
          <Card className="mb-16 overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-blue-500 text-white">Featured</Badge>
                  <span className="text-blue-200 text-sm">
                    {new Date(featuredPost.createdAt!).toLocaleDateString()}
                  </span>
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
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20"></div>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.filter(post => !post.featured).map((post: BlogPost) => (
                <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
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
