import { useState, useCallback } from 'react';
import OpenAI from 'openai';
import { type SummaryStyle } from '../types/summary';

const STYLE_PROMPTS: Record<SummaryStyle, string> = {
  quick: `Create a quick reference summary with:
• Concise bullet points
• Key features only
• Essential commands`,
  
  executive: `Provide an executive summary with:
• 2-3 sentence overview
• Core concepts
• Key takeaways`,
  
  detailed: `Generate a detailed analysis including:
• Comprehensive breakdown
• Technical details
• Implementation steps
• Best practices`,
  
  academic: `Create an academic summary with:
• Full analysis with citations
• Research background
• Methodology
• References`,
  
  strategic: `Provide a strategic overview including:
• Summary of findings
• Actionable insights
• Priority tasks
• Timeline recommendations`,
  
  highlights: `List key highlights including:
• Major points
• Critical findings
• Notable metrics`,
  
  action: `Create an action plan with:
• Immediate next steps
• Resource requirements
• Success metrics
• Timeline milestones`
};

export default function useAISummary() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [selectedStyle, setSelectedStyle] = useState<SummaryStyle>('quick');

  const updateApiKey = useCallback((newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('openai_api_key', newKey);
  }, []);

  const generateSummary = useCallback(async (transcript: string) => {
    if (!transcript.trim()) {
      alert('Please record some text before generating a summary.');
      return;
    }

    if (!apiKey) {
      alert('Please configure your OpenAI API key first.');
      return;
    }

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that creates summaries in specific formats. ${STYLE_PROMPTS[selectedStyle]}`
          },
          {
            role: "user",
            content: `Please summarize the following transcript using the specified format:\n\n${transcript}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      setSummary(response.choices[0]?.message?.content || '');
    } catch (error: any) {
      console.error('Error generating summary:', error);
      if (error?.error?.code === 'invalid_api_key') {
        alert('Invalid API key. Please check your OpenAI API key and try again.');
      } else {
        alert('Failed to generate summary. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, selectedStyle]);

  return {
    summary,
    isLoading,
    generateSummary,
    updateApiKey,
    isApiKeyConfigured: Boolean(apiKey),
    selectedStyle,
    setSelectedStyle
  };
}