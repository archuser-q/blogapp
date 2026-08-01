export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  )
}