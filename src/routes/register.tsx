import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { registerSchema, type RegisterFormValues } from '../lib/schemas/auth'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/register')({ component: RegisterPage })

function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null)

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    })

    if (error) {
      setServerError(error.message)
      return
    }

    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900">Đăng ký</h1>

          {isSubmitted ? (
            <p className="mt-6 rounded-md bg-green-50 p-4 text-sm text-green-700">
              Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài
              khoản trước khi đăng nhập.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </form>
          )}

          <p className="mt-4 text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-gray-900 underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}