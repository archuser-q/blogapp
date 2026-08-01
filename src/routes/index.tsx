import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { PostList } from '../components/PostList'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PostList />
      </main>
      <Footer />
    </div>
  )
}