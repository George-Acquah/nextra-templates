'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useOutsideClick } from '@/hooks';
import { Avatar } from '../ui/avatar';

export const BlogSidebar = ({
  author,
  popularPosts = [],
}: {
  author: AuthorData
  popularPosts?: { slug: string; title: string }[]
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const createTagLink = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tag', tag);
    return `?${params.toString()}`;
  };

  useOutsideClick(sidebarRef, () => setMobileOpen(false));

  const categories = ['React', 'Next.js', 'TypeScript', 'UI/UX'];

  const SidebarContent = () => (
    <div className="w-full lg:w-80 space-y-8 bg-gray-50 dark:bg-gray-900 px-2 py-4 md:p-6 rounded-xl shadow-sm">
      {/* Author info */}
      <div className="flex items-center gap-4">
        <Avatar imageUrl={author.avatar} name={author.name} size={60} />
        <div>
          <h4 className="font-semibold text-lg">{author.name}</h4>
          <p className="text-xs lg:text-sm text-gray-500">
            {author.description}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{author.bio}</p>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <ul className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                // href={`?tag=${encodeURIComponent(cat)}`}
                href={createTagLink(cat)}
                className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-[#1f2336] text-purple hover:bg-purple-700/20 dark:hover:bg-purple-700/40 transition-all duration-200"
              >
                #{cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div>
        <h4 className="font-semibold mb-3">Popular Posts</h4>
        <ul className="space-y-2">
          {popularPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 line-clamp-1"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start h-fit">
        <SidebarContent />
      </aside>

      {/* Mobile Floating Button */}
      <div ref={sidebarRef} className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-3 rounded-full bg-purple-600 text-white shadow-lg cursor-pointer"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        {mobileOpen && (
          <div className="absolute bottom-20 right-0 w-80 max-h-[80vh] overflow-y-auto shadow-lg rounded-lg">
            <SidebarContent />
          </div>
        )}
      </div>
    </>
  );
};
