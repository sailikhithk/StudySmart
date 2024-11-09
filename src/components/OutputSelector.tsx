import React from "react";
import { FileText, ScrollText, Network, BookOpen } from "lucide-react";
import { type OutputType } from "../types/learning";

interface OutputSelectorProps {
  selectedOutput: OutputType;
  onOutputChange: (type: OutputType) => void;
}

export default function OutputSelector({
  selectedOutput,
  onOutputChange,
}: OutputSelectorProps) {
  const outputs = [
    { type: "summary" as OutputType, icon: FileText, label: "Summary" },
    { type: "flashcards" as OutputType, icon: ScrollText, label: "Flashcards" },
    { type: "mindmap" as OutputType, icon: Network, label: "Mind Map" },
    { type: "quiz" as OutputType, icon: BookOpen, label: "Quiz" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {outputs.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onOutputChange(type)}
          className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${
            selectedOutput === type
              ? "bg-blue-50 border-2 border-blue-500"
              : "bg-white border-2 border-gray-200 hover:border-blue-300"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              selectedOutput === type ? "text-blue-500" : "text-gray-600"
            }`}
          />
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
