"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { login } from "../lib/api"

type FormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data)
      if (response.role === "administrator") {
        router.push("/admin-dashboard")
      } else {
        router.push("/user-dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  )
}

