import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

interface APIKeyInputProps {
  onSave: (apiKey: string) => void;
  isConfigured: boolean;
}

export default function APIKeyInput({ onSave, isConfigured }: APIKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(!isConfigured);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Key className="w-4 h-4" />
        {isConfigured ? 'Change API Key' : 'Add API Key'}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2">
        <Key className="w-4 h-4 text-gray-500" />
        <div className="relative flex-1">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="w-full pr-10 px-3 py-2 border rounded-md text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
        >
          Save Key
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Your API key will be stored securely in your browser's local storage.
      </p>
    </form>
  );
}