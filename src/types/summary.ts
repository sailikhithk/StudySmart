export type SummaryStyle = 
  | 'quick'      // AI Tools Quick Reference
  | 'executive'  // Executive Summary
  | 'detailed'   // Detailed Analysis
  | 'academic'   // Academic Summary
  | 'strategic'  // Strategic Overview
  | 'highlights' // Key Highlights
  | 'action';    // Action Plan

export interface SummaryConfig {
  style: SummaryStyle;
  icon: string;
  label: string;
  description: string;
}

export const SUMMARY_STYLES: Record<SummaryStyle, SummaryConfig> = {
  quick: {
    style: 'quick',
    icon: '📱',
    label: 'Quick Reference',
    description: 'Concise bullet points and key features'
  },
  executive: {
    style: 'executive',
    icon: '✨',
    label: 'Executive Summary',
    description: 'Brief overview with core concepts'
  },
  detailed: {
    style: 'detailed',
    icon: '📋',
    label: 'Detailed Analysis',
    description: 'Comprehensive breakdown with technical details'
  },
  academic: {
    style: 'academic',
    icon: '📚',
    label: 'Academic Summary',
    description: 'Full analysis with citations and methodology'
  },
  strategic: {
    style: 'strategic',
    icon: '🎯',
    label: 'Strategic Overview',
    description: 'Findings and actionable insights'
  },
  highlights: {
    style: 'highlights',
    icon: '🔑',
    label: 'Key Highlights',
    description: 'Major points and critical findings'
  },
  action: {
    style: 'action',
    icon: '⚡',
    label: 'Action Plan',
    description: 'Next steps and timeline milestones'
  }
};