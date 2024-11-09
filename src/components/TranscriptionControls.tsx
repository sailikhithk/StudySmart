import React from 'react';
import { Mic, MicOff, Pause, Play, Save } from 'lucide-react';

interface TranscriptionControlsProps {
  isListening: boolean;
  isPaused: boolean;
  onStartStop: () => void;
  onPauseResume: () => void;
  onSave: () => void;
}

export default function TranscriptionControls({
  isListening,
  isPaused,
  onStartStop,
  onPauseResume,
  onSave,
}: TranscriptionControlsProps) {
  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        onClick={onStartStop}
        className={`p-4 rounded-full transition-all ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        title={isListening ? 'Stop Recording' : 'Start Recording'}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </button>
      
      {isListening && (
        <>
          <button
            onClick={onPauseResume}
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-800 transition-all"
            title={isPaused ? 'Resume Recording' : 'Pause Recording'}
          >
            {isPaused ? (
              <Play className="w-6 h-6 text-white" />
            ) : (
              <Pause className="w-6 h-6 text-white" />
            )}
          </button>
          
          <button
            onClick={onSave}
            className="p-4 rounded-full bg-green-600 hover:bg-green-700 transition-all"
            title="Save Transcript"
          >
            <Save className="w-6 h-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
}