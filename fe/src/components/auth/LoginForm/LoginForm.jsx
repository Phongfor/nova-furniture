import { useForm } from 'react-hook-form';
import { loginApi } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useContext } from 'react';

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginApi(data);

            console.log(response.data);

            const accessToken = response.data.result.accessToken;

            const refreshToken = response.data.result.refreshToken;

            login(accessToken);
          
            localStorage.setItem('refreshToken', refreshToken);

            alert('Login success');
            navigate('/');
        } catch (error) {
            alert('Sai tài khoản hoặc mật khẩu');
        }
    };

    return (
        <div className='w-full max-w-md'>
            <h2 className='text-4xl font-bold mb-8 text-black dark:text-white'>
                Welcome back
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                {/* Email */}
                <div>
                    <label className='block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                        Email
                    </label>

                    <input
                        type='email'
                        placeholder='email@example.com'
                        {...register('email', {
                            required: 'Email không được để trống'
                        })}
                        className='w-full border-b border-zinc-400 bg-transparent py-3 pl-3 outline-none focus:border-black dark:focus:border-white dark:text-white'
                    />

                    {errors.email && (
                        <p className='text-red-500 text-sm mt-2'>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className='block mb-2 text-sm uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                        Password
                    </label>

                    <input
                        type='password'
                        placeholder='••••••••'
                        {...register('password', {
                            required: 'Password không được để trống',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu tối thiểu 6 ký tự'
                            }
                        })}
                        className='w-full border-b border-zinc-400 bg-transparent py-3 pl-3 outline-none focus:border-black dark:focus:border-white dark:text-white'
                    />

                    {errors.password && (
                        <p className='text-red-500 text-sm mt-2'>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Button */}
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full rounded-full bg-black py-4 text-white uppercase tracking-widest transition hover:opacity-90 dark:bg-white dark:text-black'
                >
                    {isSubmitting ? 'Loading...' : 'Sign In'}
                </button>

                {/* Google */}
                <button
                    type='button'
                    className='w-full border border-zinc-300 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition'
                >
                    <FcGoogle size={22} />

                    <span className='uppercase text-sm tracking-wider dark:text-white'>
                        Continue with Google
                    </span>
                </button>
            </form>
        </div>
    );
}
