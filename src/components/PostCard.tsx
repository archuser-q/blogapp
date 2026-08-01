import { Link } from '@tanstack/react-router'
import type { Post } from '../lib/posts'

export function PostCard({ post }: { post: Post }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    'vi-VN',
    { day: '2-digit', month: '2-digit', year: 'numeric' },
  )

  return (
    <Link
      to="/posts/$postId"
      params={{ postId: post.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md"
    >
      <img
        src={post.coverImage}
        alt={post.title}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-gray-400">
          <span>{post.author}</span>
          <span>·</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}