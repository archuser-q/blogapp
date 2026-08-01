import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          My Blog
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            to="/"
            className="hover:text-gray-900 [&.active]:text-gray-900"
          >
            Trang chủ
          </Link>
          <Link
            to="/profile"
            className="hover:text-gray-900 [&.active]:text-gray-900"
          >
            Giới thiệu
          </Link>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
            <Link
              to="/login"
              className="hover:text-gray-900 [&.active]:text-gray-900"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
            >
              Đăng ký
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}