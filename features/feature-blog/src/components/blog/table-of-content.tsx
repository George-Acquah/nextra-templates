'use client';

import { useTableOfContent } from '@/hooks';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const ToC = ({
  headings,
  classname,
}: {
  headings: Heading[]
  classname: string
}) => (
  <div className={`bg-[var(--code-bg)] rounded-lg text-sm ${classname}`}>
    <h4 className="text-sm px-4 py-2 font-semibold text-purple mb-2 border-b border-b-gray-300 dark:border-b-gray-600">
      On this page
    </h4>
    <ul className="space-y-1 px-4 py-2">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.replaceState(null, '', `#${h.id}`);
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-purple transition"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export function TableOfContents() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headings = useTableOfContent();

  if (!headings.length) return null;

  return (
    <>
      {/* Desktop Sidebar TOC */}
      <aside className="hidden md:block w-64 shrink-0">
        <ToC headings={headings} classname="sticky top-24" />
      </aside>

      {/* Mobile Floating TOC */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-3 rounded-full bg-purple-600 text-white shadow-lg"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        {mobileOpen && (
          <ToC
            headings={headings}
            classname="absolute bottom-16 right-0 w-64 max-h-96 overflow-y-auto shadow-lg"
          />
        )}
      </div>
    </>
  );
}
