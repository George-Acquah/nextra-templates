import { slugify } from '@nextra-templates/utils';
import { useState, useEffect } from 'react';

export const useTableOfContent = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const observer = new MutationObserver(() => build());
    const article =
      document.querySelector('article') ||
      document.getElementById('article-body');
    if (!article) return;

    const build = () => {
      const els = Array.from(article.querySelectorAll<HTMLElement>('h2, h3'));
      const mapped: Heading[] = els.map((el) => {
        let id = el.id;
        const text = el.textContent?.trim() ?? '';
        if (!id) {
          id = slugify(text);
          // ensure unique
          let suffix = 1;
          while (document.getElementById(id)) {
            id = `${slugify(text)}-${suffix++}`;
          }
          el.id = id;
        }
        return { id, text, level: el.tagName === 'H2' ? 2 : 3 };
      });
      setHeadings(mapped);
    };

    build();
    observer.observe(article, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return headings;
};
