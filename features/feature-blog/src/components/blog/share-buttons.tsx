'use client';

import { useState } from 'react';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const tweet = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(title)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={tweet}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg hover:text-white hover:bg-purple transition"
      >
        Share on Twitter
      </a>

      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg  hover:text-white hover:bg-purple transition"
      >
        Share on LinkedIn
      </a>

      <button
        onClick={handleCopy}
        className="px-3 py-2 dark:bg-gray-800 rounded-lg hover:text-white hover:bg-purple transition"
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
