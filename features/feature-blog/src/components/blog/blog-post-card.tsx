import Link from 'next/link';
import Image from 'next/image';
import { ArrowTurnUpRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@nextra-templates/utils';

export const BlogPostCard = ({
  slug,
  metadata,
  isFeatured = false,
}: {
  slug: string
  metadata: BlogPostMetadata
  isFeatured?: boolean
}) => {
  return (
    <div className="relative group transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg w-full h-full">
      <div
        className={cn(
          'p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/5 backdrop-blur',
          'transition-colors duration-200 hover:border-gray-300 dark:hover:border-white/20',
        )}
      >
        <Link href={`/blog/${slug}`} className="block">
          <div className="flex flex-col h-full w-full">
            {/* Image */}
            <div
              className={`relative flex items-center justify-center w-full overflow-hidden ${
                isFeatured ? 'h-[40vh]' : 'h-[30vh]'
              } mb-4`}
            >
              <div className="relative w-full h-full overflow-hidden lg:rounded-xl bg-[#13162D]">
                <Image
                  src={`/og${metadata.ogImage}`}
                  alt={`${metadata.title} cover`}
                  fill
                  sizes={
                    isFeatured
                      ? '80vw'
                      : '(max-width: 768px) 90vw, (max-width: 1200px) 23rem, 368px'
                  }
                  className="object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className={`font-bold ${
                isFeatured ? 'text-3xl' : 'lg:text-2xl h-16'
              } md:text-xl text-base line-clamp-2`}
            >
              {metadata.title}
            </h3>

            {/* Excerpt */}
            <p
              className="lg:text-lg lg:font-normal font-light text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
              style={{ margin: '1vh 0' }}
            >
              {metadata.excerpt}
            </p>

            {/* Meta + Link */}
            <div className="flex items-center justify-between mt-auto pt-4">
              <p className="text-xs text-gray-400">
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                • {metadata.readingTime} min read
              </p>
              <div className="flex items-center text-purple group-hover:underline text-sm">
                Read More{' '}
                <ArrowTurnUpRightIcon className="ms-2" width={24} height={24} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
