import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedDatabase() {
  try {
    // Insert sample blog posts
    await pool.query(`
      INSERT INTO blog_posts (title, excerpt, content, image_url, category, read_time, featured, published) VALUES
      ('Building Scalable Microservices with Docker and Kubernetes', 
       'Dive deep into containerization strategies and orchestration patterns that power modern cloud-native applications.',
       'Full article content about microservices architecture, containerization best practices, and Kubernetes orchestration patterns. This comprehensive guide covers everything from basic Docker concepts to advanced Kubernetes deployment strategies.', 
       'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
       'DevOps', '12 min read', true, true),
      ('Advanced React Hooks Patterns', 
       'Exploring custom hooks, context patterns, and state management strategies for complex React applications.',
       'Deep dive into React hooks patterns, custom hooks creation, and advanced state management techniques for building scalable React applications.', 
       'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
       'React', '8 min read', false, true),
      ('Getting Started with TensorFlow 2.0', 
       'A comprehensive guide to building your first neural network with TensorFlow and understanding core concepts.',
       'Complete tutorial on TensorFlow 2.0, covering neural network fundamentals, model building, training, and deployment strategies.', 
       'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
       'AI/ML', '10 min read', false, true);
    `);

    // Insert sample projects
    await pool.query(`
      INSERT INTO projects (title, description, video_id, tech_stack, demo_url, github_url, featured, published) VALUES
      ('Full-Stack E-commerce Platform', 
       'A complete e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing with Stripe, inventory management, and admin dashboard. Deployed on AWS with CI/CD pipeline.',
       'dQw4w9WgXcQ', 
       '["React", "Node.js", "PostgreSQL", "AWS", "Stripe"]',
       'https://demo.example.com', 'https://github.com/user/ecommerce', true, true),
      ('AI-Powered Chat Application', 
       'An intelligent chat application using OpenAI GPT API with real-time messaging, conversation history, and custom AI personas. Features include message encryption, file sharing, and voice-to-text integration.',
       'dQw4w9WgXcQ', 
       '["Next.js", "OpenAI API", "Socket.io", "Redis", "TypeScript"]',
       'https://chat.example.com', 'https://github.com/user/ai-chat', false, true),
      ('Real-time Analytics Dashboard', 
       'A comprehensive analytics platform that processes millions of data points in real-time. Features interactive charts, custom report generation, data export capabilities, and machine learning-powered insights.',
       'dQw4w9WgXcQ', 
       '["React", "D3.js", "Python", "FastAPI", "MongoDB"]',
       'https://analytics.example.com', 'https://github.com/user/analytics', false, true);
    `);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
