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
import { insertBlogPostSchema, type BlogPost } from "@shared/schema";
import { X } from "lucide-react";

const blogPostFormSchema = insertBlogPostSchema.extend({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  category: z.string().min(1, "Category is required"),
  readTime: z.string().min(1, "Read time is required"),
});

type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

interface BlogPostFormProps {
  blogPost: BlogPost | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function BlogPostForm({ blogPost, onClose, onSuccess }: BlogPostFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!blogPost;

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: blogPost?.title || "",
      excerpt: blogPost?.excerpt || "",
      content: blogPost?.content || "",
      imageUrl: blogPost?.imageUrl || "",
      category: blogPost?.category || "",
      readTime: blogPost?.readTime || "",
      featured: blogPost?.featured || false,
      published: blogPost?.published || true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      if (isEditing) {
        const response = await apiRequest("PUT", `/api/blog-posts/${blogPost.id}`, data);
        return response.json();
      } else {
        const response = await apiRequest("POST", "/api/blog-posts", data);
        return response.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts/featured"] });
      toast({
        title: isEditing ? "Blog post updated" : "Blog post created",
        description: `The blog post has been successfully ${isEditing ? "updated" : "created"}.`,
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} blog post.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogPostFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
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
                placeholder="Enter blog post title"
                className="mt-2"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                {...form.register("excerpt")}
                placeholder="Brief description of the blog post"
                className="mt-2"
                rows={3}
              />
              {form.formState.errors.excerpt && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.excerpt.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                placeholder="Full blog post content (supports markdown)"
                className="mt-2"
                rows={8}
              />
              {form.formState.errors.content && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  {...form.register("category")}
                  placeholder="e.g., React, AI/ML, DevOps"
                  className="mt-2"
                />
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="readTime">Read Time *</Label>
                <Input
                  id="readTime"
                  {...form.register("readTime")}
                  placeholder="e.g., 5 min read"
                  className="mt-2"
                />
                {form.formState.errors.readTime && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.readTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                {...form.register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className="mt-2"
              />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.imageUrl.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={form.watch("featured")}
                  onCheckedChange={(checked) => form.setValue("featured", checked)}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={form.watch("published")}
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
                  isEditing ? "Update Blog Post" : "Create Blog Post"
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