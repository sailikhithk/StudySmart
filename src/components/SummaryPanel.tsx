import React from 'react';
import { Bot, Loader2 } from 'lucide-react';
import APIKeyInput from './APIKeyInput';
import SummaryStyleSelector from './SummaryStyleSelector';
import { SUMMARY_STYLES, type SummaryStyle } from '../types/summary';

interface SummaryPanelProps {
  summary: string;
  isLoading: boolean;
  onGenerateSummary: () => void;
  onUpdateApiKey: (key: string) => void;
  isApiKeyConfigured: boolean;
  selectedStyle: SummaryStyle;
  onStyleChange: (style: SummaryStyle) => void;
}

export default function SummaryPanel({
  summary,
  isLoading,
  onGenerateSummary,
  onUpdateApiKey,
  isApiKeyConfigured,
  selectedStyle,
  onStyleChange
}: SummaryPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">AI Summary</h2>
        </div>
        <div className="flex items-center gap-4">
          <APIKeyInput 
            onSave={onUpdateApiKey}
            isConfigured={isApiKeyConfigured}
          />
          <button
            onClick={onGenerateSummary}
            disabled={isLoading || !isApiKeyConfigured}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Summary Style</h3>
        <SummaryStyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={onStyleChange}
        />
      </div>

      <div className="bg-gray-50 rounded-md p-4 min-h-[200px]">
        {summary ? (
          <div className="prose prose-sm max-w-none">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{SUMMARY_STYLES[selectedStyle].icon}</span>
              <h3 className="text-lg font-semibold m-0">
                {SUMMARY_STYLES[selectedStyle].label}
              </h3>
            </div>
            <div className="whitespace-pre-wrap">{summary}</div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            {isApiKeyConfigured 
              ? "Click \"Generate Summary\" to create an AI summary of your transcript"
              : "Configure your OpenAI API key to enable AI summaries"}
          </p>
        )}
      </div>
    </div>
  );
}