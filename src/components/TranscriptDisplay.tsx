import React from 'react';

interface TranscriptDisplayProps {
  transcript: string;
  interim: string;
}

export default function TranscriptDisplay({ transcript, interim }: TranscriptDisplayProps) {
  return (
    <div className="w-full h-[60vh] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
      <div className="space-y-4">
        {transcript && (
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
            {transcript}
          </p>
        )}
        {interim && (
          <p className="text-gray-500 italic text-lg leading-relaxed whitespace-pre-wrap">
            {interim}
          </p>
        )}
        {!transcript && !interim && (
          <p className="text-gray-400 text-center mt-8">
            Click the microphone button to start transcribing...
          </p>
        )}
      </div>
    </div>
  );
}