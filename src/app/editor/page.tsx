'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/lib/auth';

// Types
interface ReleaseNote {
  date: string;
  version: string;
  features: string[];
}

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyD_N1NLrRVXJsvsTUKvCXqmw-ujWDpXwZQ';

export default function EditorPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<ReleaseNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  // Load data
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace('/login');
      return;
    }

    const saved = localStorage.getItem('releaseNotes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Parse error');
      }
    } else {
      setNotes([
        {
          date: '2025-10-20',
          version: 'Grok 4.2',
          features: ['New voice mode', '2× SuperGrok usage', 'Faster API'],
        },
      ]);
    }
    setLoading(false);
  }, [router]);

  // Save
  const saveNotes = () => {
    localStorage.setItem('releaseNotes', JSON.stringify(notes));
    alert('Saved!');
  };

  // Add new release
  const addRelease = () => {
    setNotes(prev => [...prev, { date: '', version: '', features: [''] }]);
  };

  // Update field
  const updateField = (i: number, field: 'date' | 'version', value: string) => {
    setNotes(prev => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  // Update feature
  const updateFeature = (noteIdx: number, featIdx: number, value: string) => {
    setNotes(prev => {
      const updated = [...prev];
      updated[noteIdx] = { ...updated[noteIdx] };
      updated[noteIdx].features = [...updated[noteIdx].features];
      updated[noteIdx].features[featIdx] = value;
      return updated;
    });
  };

  // Add feature
  const addFeature = (noteIdx: number) => {
    setNotes(prev => {
      const updated = [...prev];
      updated[noteIdx] = { ...updated[noteIdx] };
      updated[noteIdx].features = [...updated[noteIdx].features, ''];
      return updated;
    });
  };

  // Remove feature
  const removeFeature = (noteIdx: number, featIdx: number) => {
    setNotes(prev => {
      const updated = [...prev];
      updated[noteIdx] = { ...updated[noteIdx] };
      updated[noteIdx].features = updated[noteIdx].features.filter((_, i) => i !== featIdx);
      return updated;
    });
  };

  // Remove release
  const removeRelease = (noteIdx: number) => {
    setNotes(prev => prev.filter((_, i) => i !== noteIdx));
  };

  // AI Suggest
  const suggestFeature = async (noteIdx: number) => {
    setAiLoading(true);
    try {
      const prompt = `Suggest one new feature for Grok AI in 1 short sentence.`;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      const suggestion =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'AI suggestion failed.';
      setNotes(prev => {
        const updated = [...prev];
        updated[noteIdx].features = [...updated[noteIdx].features, suggestion];
        return updated;
      });
    } catch (err) {
      alert('AI failed');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Edit Release Notes</h1>
          <div className="flex gap-3">
            <button onClick={saveNotes} className="px-6 py-2 bg-green-600 rounded-lg">
              Save
            </button>
            <button onClick={() => router.push('/card')} className="px-6 py-2 bg-blue-600 rounded-lg">
              View
            </button>
            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="px-6 py-2 bg-red-600 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {notes.map((note, noteIdx) => (
            <div key={noteIdx} className="bg-gray-800 p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <input
                  type="text"
                  placeholder="Date"
                  value={note.date}
                  onChange={(e) => updateField(noteIdx, 'date', e.target.value)}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                />
                <input
                  type="text"
                  placeholder="Version"
                  value={note.version}
                  onChange={(e) => updateField(noteIdx, 'version', e.target.value)}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="font-semibold">Features:</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => suggestFeature(noteIdx)}
                      disabled={aiLoading}
                      className="text-xs px-2 py-1 bg-cyan-600 rounded"
                    >
                      {aiLoading ? '...' : 'AI Suggest'}
                    </button>
                    <button
                      onClick={() => removeRelease(noteIdx)}
                      className="text-red-400 text-sm"
                    >
                      Remove Release
                    </button>
                  </div>
                </div>

                {note.features.map((feat, featIdx) => (
                  <div key={featIdx} className="flex gap-2 items-center">
                    <span className="text-green-400">Checkmark</span>
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => updateFeature(noteIdx, featIdx, e.target.value)}
                      placeholder="Feature..."
                      className="flex-1 px-4 py-2 bg-gray-700 rounded text-white"
                    />
                    {note.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(noteIdx, featIdx)}
                        className="text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => addFeature(noteIdx)}
                  className="text-sm text-blue-400"
                >
                  + Add Feature
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addRelease}
          className="mt-10 w-full py-3 bg-amber-600 rounded-lg font-bold"
        >
          + Add New Release
        </button>

        <div className="mt-12 text-center text-gray-400">
          Logged in as <span className="text-blue-400">{getCurrentUser()?.id}</span>
        </div>
      </div>
    </div>
  );
}