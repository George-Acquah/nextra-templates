import fs from 'fs';
import path from 'path';
import getReadingTime from 'reading-time';

const postsDir = path.join(process.cwd(), 'src', 'contents/blogs');

export const getBlogPosts = async (): Promise<
  Omit<BlogPostData, 'component'>[]
> => {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(postsDir, file);

      const source = fs.readFileSync(filePath, 'utf-8');
      const readingTime = getReadingTime(source);

      const post = await import(`@/contents/blogs/${slug}.mdx`);
      const metadata: BlogPostMetadata = {
        ...post.metadata,
        readingTime: Math.ceil(readingTime.minutes),
        wordCount: readingTime.words,
      };

      return { slug, metadata };
    }),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
};
