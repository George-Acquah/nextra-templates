import { Pagination } from '../ui';
import { BlogPostCard, BlogSidebar } from './';

const Blogs = async ({
  paginated,
  author,
}: {
  paginated: PaginatedResult<Omit<BlogPostData, 'component'>>
  author: AuthorData
}) => {
  const { data: posts, ...meta } = paginated;
  const [featured, ...rest] = posts;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)] gap-8">
      {/* Sidebar (responsive inside component) */}
      <BlogSidebar
        author={author}
        popularPosts={posts
          .sort(
            (a, b) =>
              (b.metadata?.wordCount || 0) - (a.metadata?.wordCount || 0),
          )
          .slice(0, 3)
          .map((post) => ({
            slug: post.slug,
            title: post.metadata.title,
          }))}
      />

      {/* Main blog content */}
      <div>
        {/* Featured + posts + pagination */}
        <div className="space-y-8 max-w-3xl">
          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featured && (
                <div className="mb-12">
                  <BlogPostCard
                    slug={featured.slug}
                    metadata={featured.metadata}
                    isFeatured
                  />
                </div>
              )}

              {/* Other Posts */}
              <div className="grid gap-8 sm:grid-cols-2">
                {rest.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    slug={post.slug}
                    metadata={post.metadata}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
              />
            </>
          ) : (
            <p>No posts found for this author.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
