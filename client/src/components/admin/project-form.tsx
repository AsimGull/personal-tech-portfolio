import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertProjectSchema, type Project } from "@shared/schema";
import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const projectFormSchema = insertProjectSchema.extend({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  videoId: z.string().min(1, "Video ID is required"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!project;
  const [newTech, setNewTech] = useState("");

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      videoId: project?.videoId || "",
      techStack: project?.techStack || [],
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
      featured: project?.featured || false,
      published: project?.published || true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      if (isEditing) {
        const response = await apiRequest("PUT", `/api/projects/${project.id}`, data);
        return response.json();
      } else {
        const response = await apiRequest("POST", "/api/projects", data);
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: isEditing ? "Project updated" : "Project created",
        description: `The project has been successfully ${isEditing ? "updated" : "created"}.`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} project.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    mutation.mutate(data);
  };

  const addTech = () => {
    if (newTech.trim()) {
      const currentTechStack = form.getValues("techStack");
      if (!currentTechStack.includes(newTech.trim())) {
        form.setValue("techStack", [...currentTechStack, newTech.trim()]);
        setNewTech("");
      }
    }
  };

  const removeTech = (techToRemove: string) => {
    const currentTechStack = form.getValues("techStack");
    form.setValue("techStack", currentTechStack.filter(tech => tech !== techToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isEditing ? "Edit Project" : "Create New Project"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Enter project title"
                className="mt-2"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Detailed description of the project"
                className="mt-2"
                rows={4}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="videoId">YouTube Video ID *</Label>
              <Input
                id="videoId"
                {...form.register("videoId")}
                placeholder="e.g., dQw4w9WgXcQ"
                className="mt-2"
              />
              {form.formState.errors.videoId && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.videoId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  {...form.register("demoUrl")}
                  placeholder="https://demo.example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  {...form.register("githubUrl")}
                  placeholder="https://github.com/user/repo"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Tech Stack *</Label>
              <div className="mt-2 space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology (e.g., React, Node.js)"
                    onKeyPress={handleKeyPress}
                  />
                  <Button type="button" onClick={addTech} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("techStack").map((tech, index) => (
                    <div key={index} className="bg-muted px-3 py-1 rounded-md flex items-center space-x-2">
                      <span className="text-sm">{tech}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTech(tech)}
                        className="h-auto p-0 hover:bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {form.formState.errors.techStack && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.techStack.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={form.watch("featured") || false}
                  onCheckedChange={(checked) => form.setValue("featured", checked)}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={form.watch("published") || false}
                  onCheckedChange={(checked) => form.setValue("published", checked)}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                className="bg-tech-blue hover:bg-blue-600 text-white"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditing ? "Update Project" : "Create Project"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}