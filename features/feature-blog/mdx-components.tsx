// MDX components for blog posts
//! Please do not change the name of this file, as Next.js might throw a server component error

import React, { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { Code, Note, Tip, Warning } from '@/components/blog'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-zinc-100 mt-12 mb-6 leading-tight"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-zinc-200 mt-10 mb-4 border-b border-gray-200 dark:border-zinc-700 pb-2"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-xl md:text-2xl font-medium text-gray-800 dark:text-zinc-200 mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="text-lg font-medium text-gray-700 dark:text-zinc-300 mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800'
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  code: Code,

  Table: ({
    data,
    caption,
  }: {
    data: { headers: string[]; rows: string[][] }
    caption?: string
  }) => {
    // very minimal parser for inline markdown (``, **, *)
    const parseInlineMarkdown = (text: string) => {
      const html = text
        // inline code: `something`
        .replace(
          /`([^`]+)`/g,
          "<code class='px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono'>$1</code>"
        )
        // bold: **text**
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // italics: *text*
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      return html
    }

    return (
      <div className="my-6 overflow-x-auto scrollbar-hide">
        <table className="min-w-full border-collapse border border-gray-300 text-left text-sm dark:border-gray-700">
          {caption && (
            <caption className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {caption}
            </caption>
          )}
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800'
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: parseInlineMarkdown(cell),
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },

  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),

  Note,
  Tip,
  Warning,
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
