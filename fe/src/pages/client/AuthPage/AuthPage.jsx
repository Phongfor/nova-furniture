import { useState } from "react";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import AuthHero from "../../../components/auth/AuthHero/AuthHero";
import AuthTabs from "../../../components/auth/AuthTabs/AuthTabs";
import LoginForm from "../../../components/auth/LoginForm/LoginForm";
import RegisterForm from "../../../components/auth/RegisterForm/RegisterForm";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Navbar/>
            <main className="min-h-screen flex flex-col md:flex-row pt-[88px] bg-[#FBFBF5] dark:bg-[#131313] transition-colors duration-300">

                {/* Left Image */}
                <AuthHero />

                {/* Right Form */}
                <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20">
                    <div className="w-full max-w-md space-y-12">

                        {/* Header */}
                        <div className="space-y-4">

                            <h2 className="text-5xl font-semibold text-black dark:text-white">
                                {isLogin
                                    ? "Welcome back."
                                    : "Create account."}
                            </h2>

                            <AuthTabs
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        </div>

                        {/* Form */}
                        {isLogin ? <LoginForm /> : <RegisterForm />}

                        {/* Bottom Text */}
                        <div className="text-center">
                            {isLogin ? (
                                <p className="text-gray-500 dark:text-gray-400">
                                    New to the Collective?{" "}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="text-black dark:text-white font-semibold underline underline-offset-4"
                                    >
                                        Join now
                                    </button>
                                </p>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="text-black dark:text-white font-semibold underline underline-offset-4"
                                    >
                                        Login
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </>
    );
};

export default AuthPage;