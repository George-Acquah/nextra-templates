import getReadingTime from 'reading-time';
import fs from 'fs';
import path from 'path';

export const getBlogPost = async (slug: string): Promise<BlogPostData> => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'contents/blogs',
    `${slug}.mdx`,
  );
  const source = fs.readFileSync(filePath, 'utf-8');

  const readingTime = getReadingTime(source);
  const wordCount = readingTime.words;

  const post = await import(`@/contents/blogs/${slug}.mdx`);

  const metadata: BlogPostMetadata = {
    ...post.metadata,
    readingTime: Math.ceil(readingTime.minutes),
    wordCount,
  };

  if (!metadata.title || !metadata.description) {
    throw new Error(`Missing required metadata fields in: ${slug}`);
  }

  return {
    slug,
    metadata,
    component: post.default,
  };
};
