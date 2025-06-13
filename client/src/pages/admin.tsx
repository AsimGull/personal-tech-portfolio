import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import type { BlogPost, Project } from "@shared/schema";
import { BlogPostForm } from "../components/admin/blog-post-form";
import { ProjectForm } from "../components/admin/project-form";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

 // ===== 🔐 Admin Access Prompt =====
useEffect(() => {
  const password = prompt("Enter admin password:");
  if (password?.trim() === import.meta.env.VITE_ADMIN_PASSWORD?.trim()) {
    setIsAuthenticated(true);
  } else {
    console.log("Entered:", password);
    console.log("Expected:", import.meta.env.VITE_ADMIN_PASSWORD);
    alert("Access denied");
    window.location.href = "/";
  }
}, []);


  // ===== Data Fetching =====
  const { data: blogPosts, isLoading: blogPostsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // ===== CRUD Operations =====
  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/blog-posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project deleted",
        description: "The project has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive",
      });
    },
  });

  // ===== Handlers =====
  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setShowBlogForm(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectForm(true);
  };

  const handleNewBlogPost = () => {
    setSelectedBlogPost(null);
    setShowBlogForm(true);
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setShowProjectForm(true);
  };

  const handleFormClose = () => {
    setShowBlogForm(false);
    setShowProjectForm(false);
    setSelectedBlogPost(null);
    setSelectedProject(null);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your blog posts and projects</p>
        </div>

        <Tabs defaultValue="blog-posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* ==== Blog Posts Tab ==== */}
          <TabsContent value="blog-posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Blog Posts</h2>
              <Button onClick={handleNewBlogPost} className="bg-tech-blue hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </div>

            <div className="grid gap-6">
              {blogPosts?.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span>{post.category}</span>
                          <span>{post.readTime}</span>
                          <span>{new Date(post.createdAt!).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditBlogPost(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteBlogPostMutation.mutate(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ==== Projects Tab ==== */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Button onClick={handleNewProject} className="bg-tech-blue hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid gap-6">
              {projects?.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          <span>{project.techStack.join(", ")}</span>
                          <span>{new Date(project.createdAt!).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProjectMutation.mutate(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ===== Modals ===== */}
        {showBlogForm && (
          <BlogPostForm
            blogPost={selectedBlogPost}
            onClose={handleFormClose}
            onSuccess={handleFormClose}
          />
        )}
        {showProjectForm && (
          <ProjectForm
            project={selectedProject}
            onClose={handleFormClose}
            onSuccess={handleFormClose}
          />
        )}
      </div>
    </div>
  );
}
