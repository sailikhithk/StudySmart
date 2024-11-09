import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import useAISummary from './hooks/useAISummary';
import TranscriptionControls from './components/TranscriptionControls';
import TranscriptDisplay from './components/TranscriptDisplay';
import SummaryPanel from './components/SummaryPanel';
import ContentInput from './components/ContentInput';
import OutputSelector from './components/OutputSelector';
import FlashcardView from './components/FlashcardView';
import MindMapView from './components/MindMapView';
import QuizView from './components/QuizView';
import type { InputType, OutputType } from './types/learning';

function App() {
  const {
    transcript,
    interimTranscript,
    isListening,
    isPaused,
    toggleListening,
    togglePause,
    saveTranscript,
  } = useSpeechRecognition();

  const {
    summary,
    isLoading,
    generateSummary,
    updateApiKey,
    isApiKeyConfigured,
    selectedStyle,
    setSelectedStyle
  } = useAISummary();

  const [selectedOutput, setSelectedOutput] = useState<OutputType>('summary');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<InputType>('text');

  const handleContentSubmit = (newContent: string, type: InputType) => {
    setContent(newContent);
    setContentType(type);
    generateSummary(newContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Headphones className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Learning Assistant</h1>
          </div>
          <p className="text-gray-600">Transform any content into personalized learning materials</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <ContentInput onContentSubmit={handleContentSubmit} />
          
          <OutputSelector
            selectedOutput={selectedOutput}
            onOutputChange={setSelectedOutput}
          />

          {selectedOutput === 'summary' && (
            <>
              <TranscriptDisplay 
                transcript={transcript || content} 
                interim={interimTranscript}
              />
              
              <SummaryPanel
                summary={summary}
                isLoading={isLoading}
                onGenerateSummary={() => generateSummary(transcript || content)}
                onUpdateApiKey={updateApiKey}
                isApiKeyConfigured={isApiKeyConfigured}
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
              />
            </>
          )}

          {selectedOutput === 'flashcards' && (
            <FlashcardView
              flashcards={[
                { id: '1', front: 'What is AI?', back: 'Artificial Intelligence is...', category: 'tech' },
                { id: '2', front: 'What is ML?', back: 'Machine Learning is...', category: 'tech' },
              ]}
            />
          )}

          {selectedOutput === 'mindmap' && (
            <MindMapView
              nodes={[
                { id: 'ai', name: 'AI', val: 20 },
                { id: 'ml', name: 'Machine Learning', val: 15 },
                { id: 'dl', name: 'Deep Learning', val: 10 },
              ]}
              links={[
                { source: 'ai', target: 'ml', value: 1 },
                { source: 'ml', target: 'dl', value: 1 },
              ]}
            />
          )}

          {selectedOutput === 'quiz' && (
            <QuizView
              questions={[
                {
                  id: '1',
                  question: 'What is AI?',
                  options: ['Artificial Intelligence', 'Automated Integration', 'Advanced Interface', 'Algorithmic Implementation'],
                  correctAnswer: 0,
                  explanation: 'AI stands for Artificial Intelligence...',
                },
              ]}
            />
          )}
          
          <div className="flex justify-center mt-8">
            <TranscriptionControls
              isListening={isListening}
              isPaused={isPaused}
              onStartStop={toggleListening}
              onPauseResume={togglePause}
              onSave={saveTranscript}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;