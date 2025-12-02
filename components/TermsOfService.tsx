import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsOfServiceProps {
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    // Ensure modal appears above the fixed header (which uses z-50), and leave top padding so content isn't hidden
    <div className="fixed inset-0 bg-black/50 z-60 flex items-start sm:items-center justify-center p-4 overflow-y-auto pt-20">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full my-8 relative max-h-[calc(100vh-6rem)] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
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
            <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing and using WinnerWheel, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on WinnerWheel for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 text-slate-400 mt-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to reverse engineer any software on WinnerWheel</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">3. Disclaimer</h3>
            <p>
              The materials on WinnerWheel are provided on an 'as is' basis. WinnerWheel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">4. Limitations</h3>
            <p>
              In no event shall WinnerWheel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WinnerWheel, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">5. Accuracy of Materials</h3>
            <p>
              The materials appearing on WinnerWheel could include technical, typographical, or photographic errors. WinnerWheel does not warrant that any of the materials on its website are accurate, complete, or current. WinnerWheel may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">6. Links</h3>
            <p>
              WinnerWheel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WinnerWheel of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">7. Modifications</h3>
            <p>
              WinnerWheel may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">8. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which WinnerWheel operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">9. Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfService;