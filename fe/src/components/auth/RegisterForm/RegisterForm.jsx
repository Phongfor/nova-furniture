import { useForm } from "react-hook-form";
import { registerApi } from "../../../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerApi(data);

      alert("Đăng ký thành công");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold mb-8 text-black dark:text-white">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName", {
              required: "Tên không được để trống",
            })}
            className="w-full border-b border-zinc-400 bg-transparent py-3 pl-3 outline-none focus:border-black dark:focus:border-white dark:text-white"
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Email
          </label>

          <input
            type="email"
            placeholder="email@example.com"
            {...register("email", {
              required: "Email không được để trống",
            })}
            className="w-full border-b border-zinc-400 bg-transparent py-3 pl-3 outline-none focus:border-black dark:focus:border-white dark:text-white"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu tối thiểu 6 ký tự",
              },
            })}
            className="w-full border-b border-zinc-400 bg-transparent py-3 pl-3 outline-none focus:border-black dark:focus:border-white dark:text-white"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Mật khẩu không khớp",
            })}
            className="w-full border-b border-zinc-400 bg-transparent py-3 outline-none focus:border-black dark:focus:border-white dark:text-white"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-black py-4 text-white uppercase tracking-widest transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          {isSubmitting ? "Loading..." : "Create Account"}
        </button>
      </form>

     
    </div>
  );
}