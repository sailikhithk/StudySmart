import React, { useState, useCallback } from 'react';
import { FileText, Video, Mic, Image as ImageIcon, Upload } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { type InputType } from '../types/learning';

interface ContentInputProps {
  onContentSubmit: (content: string, type: InputType) => void;
}

export default function ContentInput({ onContentSubmit }: ContentInputProps) {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<InputType>('text');

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const result = await Tesseract.recognize(file, 'eng');
      onContentSubmit(result.data.text, 'image');
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [onContentSubmit]);

  const handleVideoUrl = useCallback(async (url: string) => {
    try {
      const response = await fetch(`/api/youtube-transcript?url=${encodeURIComponent(url)}`);
      const transcript = await response.json();
      onContentSubmit(transcript.text, 'video');
    } catch (error) {
      console.error('Video Transcript Error:', error);
      alert('Failed to fetch video transcript. Please check the URL and try again.');
    }
  }, [onContentSubmit]);

  const tabs = [
    { type: 'text' as InputType, icon: FileText, label: 'Text' },
    { type: 'video' as InputType, icon: Video, label: 'Video' },
    { type: 'voice' as InputType, icon: Mic, label: 'Voice' },
    { type: 'image' as InputType, icon: ImageIcon, label: 'Image' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex space-x-2 mb-4">
        {tabs.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'text' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter or paste your text here..."
            className="w-full h-40 p-3 border rounded-md"
          />
        )}

        {activeTab === 'video' && (
          <input
            type="url"
            placeholder="Enter YouTube URL..."
            className="w-full p-3 border rounded-md"
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {activeTab === 'image' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-gray-600">
                {isProcessing ? 'Processing...' : 'Click to upload an image'}
              </span>
            </label>
          </div>
        )}

        <button
          onClick={() => {
            if (activeTab === 'video') {
              handleVideoUrl(content);
            } else if (activeTab === 'text') {
              onContentSubmit(content, 'text');
            }
          }}
          disabled={!content || isProcessing || activeTab === 'image'}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Process Content
        </button>
      </div>
    </div>
  );
}