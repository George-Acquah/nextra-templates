import { ReactNode } from 'react';

function Callout({
  type = 'note',
  children,
}: {
  type?: 'note' | 'tip' | 'warning'
  children: ReactNode
}) {
  const styles = {
    note: 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    tip: 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    warning:
      'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
  };

  // 🔹 Minimal inline markdown parser (same logic as in Table)
  const parseInlineMarkdown = (text: string) => {
    return text
      .replace(
        /`([^`]+)`/g,
        '<code class=\'px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono\'>$1</code>',
      )
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  return (
    <div
      className={`my-6 border-l-4 p-4 rounded-md ${styles[type]}`}
      role="alert"
    >
      {/* if plain string, parse markdown; if ReactNode, just render */}
      {typeof children === 'string' ? (
        <div
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(children) }}
        />
      ) : (
        children
      )}
    </div>
  );
}

export const Note = ({ children }: { children: ReactNode }) => (
  <Callout type="note">{children}</Callout>
);

export const Tip = ({ children }: { children: ReactNode }) => (
  <Callout type="tip">{children}</Callout>
);

export const Warning = ({ children }: { children: ReactNode }) => (
  <Callout type="warning">{children}</Callout>
);
