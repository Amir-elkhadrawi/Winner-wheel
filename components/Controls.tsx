import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Users, RefreshCw, List, Settings, FileText } from 'lucide-react';
import { WheelSettings } from '../constants';

interface ControlsProps {
  segments: string[];
  setSegments: (segments: string[]) => void;
  settings: WheelSettings;
  setSettings: (settings: WheelSettings) => void;
  isSpinning: boolean;
}

const Controls: React.FC<ControlsProps> = ({ segments, setSegments, settings, setSettings, isSpinning }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'import'>('manual');
  const [textInput, setTextInput] = useState(segments.join('\n'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTextInput(val);

    // Sync immediately so pasted content reflects in the wheel/count without needing blur
    let lines = val.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const MAX_CAPACITY = 100;
    if (lines.length > MAX_CAPACITY) {
      lines = lines.slice(0, MAX_CAPACITY);
      alert(`Maximum capacity is ${MAX_CAPACITY} names. Extra entries have been removed.`);
      const truncated = lines.join('\n');
      setTextInput(truncated);
      setSegments(lines);
    } else {
      setSegments(lines);
    }
  };

  const syncTextToSegments = () => {
    let lines = textInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const MAX_CAPACITY = 100;
    if (lines.length > MAX_CAPACITY) {
      lines = lines.slice(0, MAX_CAPACITY);
      alert(`Maximum capacity is ${MAX_CAPACITY} names. Extra entries have been removed.`);
      setTextInput(lines.join('\n'));
    }
    setSegments(lines);
  };

  const handleClear = () => {
    if(window.confirm("Are you sure you want to clear the list?")) {
        setTextInput('');
        setSegments([]);
    }
  };

  const handleRemoveDuplicates = () => {
    const unique = Array.from(new Set(
      textInput.split('\n').map(s => s.trim()).filter(s => s.length > 0)
    ));
    setTextInput(unique.join('\n'));
    setSegments(unique);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      let lines = content.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
      
      const MAX_CAPACITY = 100;
      if (lines.length > MAX_CAPACITY) {
        lines = lines.slice(0, MAX_CAPACITY);
        alert(`Maximum capacity is ${MAX_CAPACITY} names. File was truncated to fit the limit.`);
      }
      
      const filteredContent = lines.join('\n');
      setTextInput(filteredContent);
      setSegments(lines);
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleExport = () => {
    const element = document.createElement("a");
    const file = new Blob([segments.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "winner_wheel_participants.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, duration: Number(e.target.value) });
  };

  const handleRemoveWinnerToggle = () => {
    setSettings({ ...settings, removeWinner: !settings.removeWinner });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full flex flex-col shadow-xl backdrop-blur-sm">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-900/50 rounded-lg">
        <button 
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'manual' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <List size={16} className="inline mr-2" />
          Edit List
        </button>
        <button 
          onClick={() => setActiveTab('import')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'import' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <FileText size={16} className="inline mr-2" />
          Import / Export
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === 'manual' ? (
          <div className="flex-1 flex flex-col min-h-0">
            <textarea
              rows={10}
              className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y font-mono text-sm leading-relaxed overflow-y-auto max-h-72"
              placeholder="Paste names here (one per line)..."
              value={textInput}
              onChange={handleTextChange}
              onBlur={syncTextToSegments}
              disabled={isSpinning}
            />
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button 
                onClick={handleRemoveDuplicates}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors"
                disabled={isSpinning}
              >
                <RefreshCw size={14} />
                Dedup
              </button>
              <button 
                onClick={handleClear}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 rounded-lg text-sm font-medium transition-colors"
                disabled={isSpinning}
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-slate-400 text-xs px-1">
              <span>{segments.length} / 100 participants</span>
              <span className="text-slate-500">Auto-saves locally</span>
            </div>
            
            <div className="mt-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg text-xs text-blue-300">
              <span className="font-medium">📋 Capacity Limit:</span> Maximum 100 names allowed per wheel. This ensures optimal performance and visual clarity.
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="p-6 border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500/50 transition-colors bg-slate-900/30 text-center">
              <input 
                type="file" 
                accept=".txt,.csv" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                disabled={isSpinning}
              />
              <Upload size={32} className="mx-auto text-slate-500 mb-2" />
              <h3 className="text-slate-200 font-medium mb-1">Import Names</h3>
              <p className="text-slate-500 text-sm mb-4">Supports .txt and .csv files</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                disabled={isSpinning}
              >
                Select File
              </button>
            </div>

            <div className="p-6 bg-slate-900/30 border border-slate-700 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-slate-200 font-medium">Export List</h3>
                <Download size={20} className="text-slate-500" />
              </div>
              <p className="text-slate-500 text-sm mb-4">Download current participants as .txt</p>
              <button 
                onClick={handleExport}
                className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors"
                disabled={isSpinning || segments.length === 0}
              >
                Download List
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Section */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex items-center gap-2 mb-4 text-slate-200 font-medium">
          <Settings size={18} className="text-blue-400" />
          <h3>Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Spin Duration</span>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={settings.duration} 
                onChange={handleDurationChange}
                className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                disabled={isSpinning}
              />
              <span className="text-sm text-slate-200 w-8 text-right">{settings.duration}s</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Remove Winner</span>
            <button 
              onClick={handleRemoveWinnerToggle}
              disabled={isSpinning}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.removeWinner ? 'bg-green-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.removeWinner ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;