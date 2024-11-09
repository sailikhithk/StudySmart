import React from 'react';
import { SUMMARY_STYLES, type SummaryStyle } from '../types/summary';

interface SummaryStyleSelectorProps {
  selectedStyle: SummaryStyle;
  onStyleChange: (style: SummaryStyle) => void;
}

export default function SummaryStyleSelector({
  selectedStyle,
  onStyleChange
}: SummaryStyleSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {Object.values(SUMMARY_STYLES).map((style) => (
        <button
          key={style.style}
          onClick={() => onStyleChange(style.style)}
          className={`p-3 rounded-lg text-left transition-all ${
            selectedStyle === style.style
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-white border-2 border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{style.icon}</span>
            <div>
              <h3 className="font-medium text-gray-900">{style.label}</h3>
              <p className="text-sm text-gray-500">{style.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}