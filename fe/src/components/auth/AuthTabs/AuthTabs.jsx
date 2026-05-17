const AuthTabs = ({ isLogin, setIsLogin }) => {
    return (
        <div className="flex gap-8 border-b border-gray-300 dark:border-gray-700">

            {/* LOGIN */}
            <button
                onClick={() => setIsLogin(true)}
                className={`pb-3 uppercase text-sm tracking-widest transition-all
                ${
                    isLogin
                        ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                        : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
            >
                Login
            </button>

            {/* REGISTER */}
            <button
                onClick={() => setIsLogin(false)}
                className={`pb-3 uppercase text-sm tracking-widest transition-all
                ${
                    !isLogin
                        ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                        : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
            >
                Create Account
            </button>
        </div>
    );
};

export default AuthTabs;