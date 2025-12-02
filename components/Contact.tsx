import React, { useState } from 'react';
import { X, Mail, Copy, CheckCircle } from 'lucide-react';

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const email = 'amir.elkhadrawi@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${email}?subject=WinnerWheel Inquiry&body=Hello,\n\nI have a question about WinnerWheel:\n\n`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full relative">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Mail className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6">
          {/* Introduction */}
          <div>
            <p className="text-slate-300 text-lg">
              Have a question, suggestion, or feedback about WinnerWheel? We'd love to hear from you!
            </p>
          </div>

          {/* Email Section */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mail size={20} className="text-blue-400" />
              Email
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-900 rounded-lg p-4 border border-slate-700">
                <a 
                  href={`mailto:${email}`}
                  className="text-blue-400 hover:text-blue-300 font-medium flex-1 truncate"
                >
                  {email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className={`ml-4 p-2 rounded-lg transition-all ${
                    copied 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  }`}
                  title="Copy email"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleSendEmail}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </button>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg transition-all border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
            >
              <Copy size={20} />
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-4">How We Can Help</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Report bugs or technical issues</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Suggest new features or improvements</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Ask questions about using WinnerWheel</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Share your feedback and user experience</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>Inquire about partnerships or collaborations</span>
              </li>
            </ul>
          </div>

          {/* Response Time */}
          <div className="text-sm text-slate-400 text-center border-t border-slate-700 pt-4">
            <p>
              We aim to respond to all inquiries within <span className="text-blue-400 font-medium">24-48 hours</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;