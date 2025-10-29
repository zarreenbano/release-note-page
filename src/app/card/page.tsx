'use client';

import { useEffect,useState} from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/lib/auth';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ReleaseNote {
  date: string;
  version: string;
  features: string[];
  
}




export default function CardPage() {
  const router = useRouter();
  const user = getCurrentUser();
    const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);


  useEffect(() => {
    const saved = localStorage.getItem('releaseNotes');
    if (saved) {
      setReleaseNotes(JSON.parse(saved));
    } else {
      setReleaseNotes([
        {
          date: '2025-10-20',
          version: 'Grok 4.2',
          features: ['New voice mode', '2× usage', 'Faster API'],
        },
      ]);
    }
  }, []);
  
  useEffect(() => {
    const saved = localStorage.getItem('releaseNotes');
    if (saved) {
      setReleaseNotes(JSON.parse(saved));
    } else {
      setReleaseNotes([
        {
          date: '2025-10-20',
          version: 'Grok 4.2',
          features: ['New voice mode', '2× usage', 'Faster API'],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;

 
  const sidebarItems = releaseNotes.map(note => note.date);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">OpenAI</h1>
          <div className="flex items-center gap-4">
            <select className="text-sm bg-gray-900 text-white border border-gray-700 rounded px-3 py-1">
              <option>English (United States)</option>
            </select>
                     <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="text-sm font-medium hover:underline"
            >
              Log out
            </button>
            <button
  onClick={() => router.push('/editor')}
  className="text-sm font-medium hover:underline mr-4"
>
  Edit
</button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <input
          type="text"
          placeholder="Search for articles..."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-lg text-white placeholder-gray-500 focus:outline-none focus:border-white"
        />
      </div>

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto px-6 mt-6 text-sm text-gray-400">
        All collections › ExamConnect › ExamConnect — Release Notes
      </nav>

      {/* Main Content + Sidebar */}
      <div className="max-w-5xl mx-auto px-6 mt-8 flex gap-8 pb-20">
        {/* Left: Main Content */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold mb-2">ExamConnect — Release Notes</h2>
          <p className="text-gray-400 mb-1">
            A changelog of the latest updates for ExamConnect
          </p>
          <p className="text-sm text-gray-500">Updated: 5 hours ago</p>

          {/* Release Notes */}
          <div className="mt-10 space-y-12">
  {releaseNotes.map((note, idx) => (
    <article key={idx} className="border-b border-gray-8 pb-12 last:border-0">
      <time className="text-xl font-semibold text-white">
        {note.date}
      </time>

      <h3 className="text-2xl font-bold mt-3 mb-2">{note.version}</h3>

      <ul className="mt-4 space-y-2">
        {note.features.map((feat, i) => (
          <li key={i} className="flex items-start text-gray-300">
            <CheckIcon className="h-5 w-5 text-white mr-2 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </article>
  ))}
</div> </main>

        {/* Right: Scrollable Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className=" absolute top-80 right-80 w-[385px] h-[650px] bg-gray-900 p-4 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 border border-gray-700">
            <ul className="space-y-3 text-sm">
              {sidebarItems.map((item, i) => (
                <li
                  key={i}
                  className={`pb-2 ${i % 2 === 0 ? 'font-semibold text-white' : 'text-gray-400'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer - User ID */}
      <footer className=" mt-96 border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        Logged in as{' '}
        <span className="font-medium text-white">User ID: {user.id}</span>
      </footer>
    </div>
  );
}