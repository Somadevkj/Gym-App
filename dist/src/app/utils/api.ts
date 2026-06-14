import type { UserInputs, Recommendation } from './expertLogic';

const API_BASE = '/api';

export interface HistoryEntry {
  id: number;
  created_at: string;
  goal: string;
  experience: string;
  days: number;
  duration: string;
  injury: string;
  split: string;
  focus: string;
  intensity: string;
  explanation: string;
  safety_advice: string | null;
  schedule: Recommendation['schedule'];
}

export async function saveHistory(
  inputs: UserInputs,
  recommendation: Recommendation
): Promise<void> {
  await fetch(`${API_BASE}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      goal: inputs.goal,
      experience: inputs.experience,
      days: inputs.days,
      duration: inputs.duration,
      injury: inputs.injury,
      split: recommendation.split,
      focus: recommendation.focus,
      intensity: recommendation.intensity,
      explanation: recommendation.explanation,
      safetyAdvice: recommendation.safetyAdvice ?? null,
      schedule: recommendation.schedule,
    }),
  });
}

export async function fetchHistory(): Promise<HistoryEntry[]> {
  const res = await fetch(`${API_BASE}/history`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}

export async function deleteHistory(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete entry');
}
