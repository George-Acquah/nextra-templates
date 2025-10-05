'use client';

import {
  ClipboardDocumentIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { ComponentPropsWithoutRef, useState } from 'react';
import { highlight } from 'sugar-high';

export const Code = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'code'>) => {
  const [copied, setCopied] = useState(false);

  const rawCode = String(children).trim();
  const codeHTML = highlight(rawCode);

  const language = className?.replace('language-', '') || 'text';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!className) {
    return (
      <code className="px-1 py-0.5 rounded text-purple text-sm">
        {children}
      </code>
    );
  }

  return (
    <div className="group rounded-lg overflow-hidden">
      <div className="flex border-b py-2 px-4 border-b-gray-300 dark:border-b-gray-600 items-center justify-between">
        <span className="flex items-center gap-1 text-xs  rounded-md">
          <CodeBracketIcon />
          {language.toLowerCase()}
        </span>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 cursor-pointer text-xs hover:text-purple rounded-md transition"
        >
          <ClipboardDocumentIcon />
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 text-sm">
        <code
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          className={className}
          {...props}
        />
      </pre>
    </div>
  );
};
