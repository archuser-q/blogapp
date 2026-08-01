import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { fetchPosts } from '../lib/posts'
import { PostCard } from './PostCard'

export function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {isPending ? (
        <p className="py-8 text-center text-sm text-gray-400">
          Đang tải bài viết...
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="flex items-center justify-center py-8 text-sm text-gray-400"
        >
          {isFetchingNextPage ? 'Đang tải thêm...' : ''}
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <p className="py-8 text-center text-sm text-gray-400">
          Đã hiển thị tất cả bài viết
        </p>
      )}
    </div>
  )
}