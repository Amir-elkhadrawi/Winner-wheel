import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    // Ensure modal appears above the fixed header (which uses z-50), and leave top padding so content isn't hidden
    <div className="fixed inset-0 bg-black/50 z-60 flex items-start sm:items-center justify-center p-4 overflow-y-auto pt-20">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full my-8 relative max-h-[calc(100vh-6rem)] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6 text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">1. Data Collection</h3>
            <p>
              WinnerWheel does not collect, store, or transmit any personal data to external servers. All your participant lists and preferences are stored exclusively on your browser's local storage. No information is sent to our servers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">2. Local Storage Only</h3>
            <p>
              Your data is stored locally on your device using browser localStorage. This data is never transmitted over the internet or shared with third parties. You have full control over your data and can clear it at any time by clearing your browser's cache.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">3. Cookies</h3>
            <p>
              WinnerWheel does not use cookies for tracking or analytics. We do not collect any information about your browsing habits or usage patterns.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">4. Third-Party Services</h3>
            <p>
              WinnerWheel uses the following third-party services:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 text-slate-400">
              <li>Tailwind CSS CDN for styling</li>
              <li>ESM.sh for loading JavaScript libraries</li>
              <li>Google Fonts for typography</li>
            </ul>
            <p className="mt-2">
              These services may collect technical information like IP addresses, but WinnerWheel does not share any personal data with them.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">5. Security</h3>
            <p>
              Since your data never leaves your device, it is protected by your device's security measures. We recommend keeping your browser and device updated with the latest security patches.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">6. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any significant changes by posting the updated policy on this page with an updated "Last Modified" date.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">7. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a 
                href="mailto:amir.elkhadrawi@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline"
              >
                amir.elkhadrawi@gmail.com
              </a>
            </p>
          </div>

          <div className="pt-4 border-t border-slate-700 text-sm text-slate-500">
            <p>Last Modified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;