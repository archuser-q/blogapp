export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  author: string
}

const TOPICS = [
  'React Server Components thay đổi cách ta nghĩ về rendering',
  'Tối ưu hiệu năng ứng dụng Vite trong production',
  'TanStack Router: file-based routing có gì hay',
  'Supabase vs Firebase: nên chọn gì cho blog cá nhân',
  'Thiết kế hệ thống authentication an toàn với JWT',
  'Lazy loading và infinite scroll đúng cách',
  'Zod + React Hook Form: validate form không đau đầu',
  'ClickHouse cho audit log: vì sao và như thế nào',
]

function generateMockPosts(count: number): Post[] {
  return Array.from({ length: count }, (_, i) => {
    const topic = TOPICS[i % TOPICS.length]
    return {
      id: String(i + 1),
      title: `${topic} (Bài ${i + 1})`,
      excerpt:
        'Đây là đoạn mô tả ngắn cho bài viết, tóm tắt nội dung chính để người đọc biết bài viết nói về điều gì trước khi click vào đọc chi tiết.',
      content: `
Đây là nội dung đầy đủ của bài viết. Trong giai đoạn này nội dung là dữ liệu giả (mock), sau khi nối Supabase sẽ thay bằng nội dung thật lưu trong database, có thể ở dạng Markdown hoặc rich text.

Phần này thường sẽ có nhiều đoạn văn, có thể chèn code block, hình ảnh, danh sách... tùy theo nội dung bài viết thực tế.

Chủ đề bài viết: ${topic}.
      `.trim(),
      coverImage: `https://picsum.photos/seed/post-${i + 1}/1200/600`,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      author: 'Admin',
    }
  })
}

const ALL_POSTS = generateMockPosts(42)

const PAGE_SIZE = 6

export async function fetchPosts(pageParam: number): Promise<{
  posts: Post[]
  nextPage: number | null
}> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const start = pageParam * PAGE_SIZE
  const end = start + PAGE_SIZE
  const posts = ALL_POSTS.slice(start, end)
  const hasMore = end < ALL_POSTS.length

  return {
    posts,
    nextPage: hasMore ? pageParam + 1 : null,
  }
}

export async function fetchPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return ALL_POSTS.find((post) => post.id === id) ?? null
}