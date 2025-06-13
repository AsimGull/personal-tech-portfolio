import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, Phone } from "lucide-react";

const contactFormSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "m.asimgull@gmail.com",
      href: "mailto:m.asimgull@gmail.com",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "London, UK",
      color: "bg-green-100 dark:bg-green-900/20 text-green-600"
    },
    /*{
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+1 (234) 567-8900",
      href: "tel:+1234567890",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600"
    },*/{
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "Usually within 24 hours",
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      href: "https://linkedin.com/in/asimgulkhan",
      color: "hover:bg-blue-100 dark:hover:bg-blue-900/20"
    },
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub", 
      href: "https://github.com/alexchen",
      color: "hover:bg-gray-100 dark:hover:bg-gray-900/20"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "X",
      href: "https://twitter.com/Asim__Gul",
      color: "hover:bg-blue-100 dark:hover:bg-blue-900/20"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      name: "Email",
      href: "mailto:m.asimgull@gmail.com",
      color: "hover:bg-red-100 dark:hover:bg-red-900/20"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send Message</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your name"
                    className="mt-2"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    className="mt-2"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    placeholder="What's this about?"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    placeholder="Tell me about your project or inquiry..."
                    className="mt-2 min-h-[120px]"
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-tech-blue hover:bg-blue-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. 
                  Feel free to reach out through any of these channels.
                </p>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.color}`}>
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        {method.href ? (
                          <a 
                            href={method.href}
                            className="text-tech-blue hover:text-blue-600 transition-colors"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{method.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time Notice */}
            <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-400">Quick Response</span>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                  I typically respond to emails within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center p-4 bg-muted rounded-xl transition-colors duration-200 group ${link.color}`}
                    >
                      {link.icon}
                      <span className="font-medium ml-3">{link.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
