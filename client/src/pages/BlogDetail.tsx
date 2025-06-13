import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:id");
  const id = params?.id;

  const { data: blogPost, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", id],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog post");
      return res.json();
    },
    enabled: !!id,
  });

  if (!match) return <div>Invalid URL</div>;
  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !blogPost) return <div className="p-8 text-center">Blog post not found.</div>;

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
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge className={getCategoryColor(blogPost.category)}>{blogPost.category}</Badge>
        <p className="text-sm text-muted-foreground mt-2">
          {new Date(blogPost.createdAt!).toLocaleDateString()} · {blogPost.readTime}
        </p>
      </div>
      <h1 className="text-4xl font-bold mb-6">{blogPost.title}</h1>
      <img
        src={blogPost.imageUrl}
        alt={blogPost.title}
        className="w-full rounded-lg mb-8 object-cover"
      />
      <div className="prose prose-xl prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      <div className="mt-12 flex items-center space-x-3">
        <Avatar>
          <AvatarFallback className="bg-tech-blue text-white">AG</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Asim Gul</p>
          <p className="text-muted-foreground text-sm">Author</p>
        </div>
      </div>
    </div>
  );
}
