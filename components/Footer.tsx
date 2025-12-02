import React from 'react';
import { Zap, Mail, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onTermsClick, onContactClick }) => {
  return (
    <footer className="py-12 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                <Zap className="text-white fill-white" size={20} />
              </div>
              <span className="text-lg font-bold text-white">WinnerWheel</span>
            </div>
            <p className="text-slate-400 text-sm">
              The #1 random name picker for raffles, events, and decision making.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  onClick={(e) => { e.preventDefault(); document.getElementById('wheel-app')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  The Wheel
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={onContactClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} />
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={onPrivacyClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Shield size={16} />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={onTermsClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <FileText size={16} />
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} WinnerWheel. All rights reserved.
            </p>
            <p>
              Made with ⚡ by <span className="text-blue-400 font-medium">Amir Elkhadrawi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;