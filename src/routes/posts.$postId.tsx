import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchPostById } from '../lib/posts'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const post = await fetchPostById(postId)
      if (!post) throw notFound()
      return post
    },
  })

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(postQueryOptions(params.postId))
  },
  component: PostDetail,
})

function PostDetail() {
  const { postId } = Route.useParams()
  const { data: post } = useSuspenseQuery(postQueryOptions(postId))

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    'vi-VN',
    { day: '2-digit', month: '2-digit', year: 'numeric' },
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-8">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Quay lại trang chủ
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>

          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-6 w-full rounded-lg object-cover"
          />

          <div className="prose mt-8 max-w-none whitespace-pre-line text-gray-700">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}