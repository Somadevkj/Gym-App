import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dumbbell, Trash2, ChevronDown, ChevronUp, Clock, Activity,
  AlertTriangle, Calendar, History as HistoryIcon, Loader2
} from "lucide-react";
import { fetchHistory, deleteHistory, type HistoryEntry } from "../utils/api";

const GOAL_LABELS: Record<string, string> = {
  "fat-loss": "Fat Loss",
  "muscle-gain": "Muscle Gain",
  "endurance": "Endurance",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const INJURY_LABELS: Record<string, string> = {
  none: "None",
  upper: "Upper Body",
  lower: "Lower Body",
  back: "Back / Spinal",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoryCard({ entry, onDelete }: { entry: HistoryEntry; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteHistory(entry.id);
      onDelete();
    } catch {
      setDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors"
    >
      {/* Card Header */}
      <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 min-w-0">
          {/* Date */}
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar size={13} />
            {formatDate(entry.created_at)}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase border border-red-500/20">
              {GOAL_LABELS[entry.goal]}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase border border-zinc-700">
              {EXPERIENCE_LABELS[entry.experience]}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase border border-zinc-700 flex items-center gap-1">
              <Clock size={11} />
              {entry.days} day{entry.days !== 1 ? "s" : ""}/wk
            </span>
            {entry.injury !== "none" && (
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase border border-orange-500/20 flex items-center gap-1">
                <AlertTriangle size={11} />
                {INJURY_LABELS[entry.injury]}
              </span>
            )}
          </div>

          {/* Split + Focus */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-zinc-400">
              <span className="text-zinc-500">Split: </span>
              <span className="text-white font-semibold">{entry.split}</span>
            </span>
            <span className="text-zinc-400">
              <span className="text-zinc-500">Focus: </span>
              <span className="text-white font-semibold">{entry.focus}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-bold transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Hide" : "View"} Plan
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-40"
            aria-label="Delete entry"
          >
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Schedule */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-zinc-800 p-6 space-y-4">
              {/* Explanation */}
              <p className="text-zinc-400 text-sm leading-relaxed border-l-4 border-red-500 pl-4 italic">
                {entry.explanation}
              </p>

              {/* Safety advice */}
              {entry.safety_advice && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex gap-3 items-start">
                  <AlertTriangle size={18} className="text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-zinc-300 text-sm">{entry.safety_advice}</p>
                </div>
              )}

              {/* Weekly schedule */}
              <div className="grid gap-2">
                {entry.schedule.map((day, idx) => {
                  const isRest = day.type === "rest";
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row rounded-xl overflow-hidden border ${
                        isRest
                          ? "bg-zinc-950 border-zinc-900 text-zinc-600"
                          : "bg-zinc-800 border-zinc-700 text-white"
                      }`}
                    >
                      <div className={`px-4 py-3 sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r ${isRest ? "border-zinc-900" : "border-zinc-700"}`}>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-60 mb-0.5">Day {idx + 1}</div>
                        <div className={`font-bold text-sm uppercase ${isRest ? "text-zinc-600" : "text-red-400"}`}>
                          {day.title}
                        </div>
                      </div>
                      <div className="px-4 py-3 flex-1">
                        {isRest ? (
                          <span className="text-xs italic">Rest, light stretching, or active recovery.</span>
                        ) : (
                          <ul className="flex flex-wrap gap-x-4 gap-y-1">
                            {day.exercises.map((ex, i) => (
                              <li key={i} className="text-xs text-zinc-300 flex items-center gap-1">
                                <span className="text-red-500">•</span> {ex}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function History() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHistory();
      setEntries(data);
    } catch {
      setError("Could not connect to the backend. Make sure the Python server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = (id: number) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="flex-1 bg-zinc-950 py-16 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-sm mb-5">
            <HistoryIcon size={14} />
            Workout History
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-3">
            Your Past Plans
          </h1>
          <p className="text-zinc-400 text-lg">
            Every plan you generate is automatically saved here for future reference.
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-24 gap-3 text-zinc-500">
            <Loader2 size={24} className="animate-spin" />
            <span>Loading history…</span>
          </div>
        )}

        {!loading && error && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
            <AlertTriangle size={32} className="text-orange-400 mx-auto mb-3" />
            <p className="text-orange-300 font-semibold mb-1">Backend not reachable</p>
            <p className="text-zinc-400 text-sm">{error}</p>
            <button
              onClick={load}
              className="mt-4 px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-bold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Dumbbell size={28} className="text-zinc-600" />
            </div>
            <p className="text-zinc-500 text-lg font-semibold mb-2">No history yet</p>
            <p className="text-zinc-600 text-sm">Generate your first plan and it will appear here.</p>
          </div>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-500 text-sm font-semibold">
                {entries.length} saved plan{entries.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-1 text-zinc-600 text-xs">
                <Activity size={12} />
                Newest first
              </div>
            </div>
            <AnimatePresence mode="popLayout">
              {entries.map(entry => (
                <HistoryCard
                  key={entry.id}
                  entry={entry}
                  onDelete={() => handleDelete(entry.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
