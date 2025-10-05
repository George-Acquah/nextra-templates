import fs from 'fs';
import path from 'path';
import { getBlogPosts } from './';

export const getAuthors = (): AuthorData[] => {
  const authorsPath = path.join(process.cwd(), 'src', 'data', 'authors.json');
  const fileContents = fs.readFileSync(authorsPath, 'utf-8');
  return JSON.parse(fileContents);
};

export const getAuthorPosts = async (authorSlug: string) => {
  const allPosts = await getBlogPosts();

  const authorPosts = allPosts.filter((post) =>
    post.metadata?.authorSlugs?.includes(authorSlug),
  );

  return authorPosts;
};
