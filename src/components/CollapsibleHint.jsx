import React, { useState } from 'react';

/**
 * Reusable collapsible hint component
 * Shows/hides experience map hints for conversation topics
 */
const CollapsibleHint = ({ hint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full bg-practizio-beige rounded-xl p-4 hover:bg-opacity-80 transition-all"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-practizio-orange rounded-full p-2">
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-practizio-navy">
            {isExpanded ? 'Hide' : 'Show'} Hint: Experience Map
          </span>
        </div>
        <svg 
          className={`w-6 h-6 text-practizio-navy transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-3 bg-white border-2 border-practizio-beige rounded-xl p-6 animate-fadeIn">
          <p className="text-gray-700 leading-relaxed text-lg">
            {hint}
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> Use this experience map to guide your conversation. 
              Ask about different stages of their journey!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleHint;

