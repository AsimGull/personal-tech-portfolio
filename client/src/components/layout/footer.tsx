import { Link } from "wouter";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tech-dark text-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-tech-blue to-blue-600 rounded-lg flex items-center justify-center">
                <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
              </div>
              <span className="font-semibold text-xl">Asim Gul</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Passionate software developer focused on building innovative solutions with modern technologies. 
              Always learning, always creating.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/AsimGull" 
                target="https://github.com/AsimGull" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/asimgulkhan/" 
                target="https://www.linkedin.com/in/asimgulkhan/" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="mailto:m.asimgull@gmail.com"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/projects" className="text-slate-300 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Web Development</span></li>
              <li><span className="text-slate-300">AI/ML Solutions</span></li>
              <li><span className="text-slate-300">Cloud Architecture</span></li>
              <li><span className="text-slate-300">Technical Consulting</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-300">
            &copy; {currentYear} Asim Gul. All rights reserved. Built with ❤️ and modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
