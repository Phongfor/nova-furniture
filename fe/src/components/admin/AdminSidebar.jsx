import { NavLink, useNavigate } from 'react-router-dom';
import {
    RiDashboardLine,
    RiShoppingBagLine,
    RiFileListLine,
    RiUserLine,
    RiSettings4Line,
    RiLogoutBoxLine,
} from 'react-icons/ri';

const NAV_ITEMS = [
    { to: '/admin', label: 'OVERVIEW', icon: RiDashboardLine, end: true },
    { to: '/admin/products', label: 'PRODUCTS', icon: RiShoppingBagLine },
    { to: '/admin/orders', label: 'ORDERS', icon: RiFileListLine },
    { to: '/admin/users', label: 'USERS', icon: RiUserLine },
    { to: '/admin/settings', label: 'SETTINGS', icon: RiSettings4Line },
];

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/auth');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-[200px] bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50">
            {/* Logo */}
            <div className="px-6 pt-7 pb-8">
                <div className="text-white font-black text-sm tracking-[0.2em]">
                    NOVAFURNITURE
                </div>
                <div className="text-white/20 text-[9px] tracking-[0.3em] mt-1">
                    ADMINISTRATION SHELL
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-0.5">
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.18em] transition-all duration-150 ${
                                isActive
                                    ? 'bg-white text-black'
                                    : 'text-white/30 hover:text-white/70 hover:bg-white/5'
                            }`
                        }
                    >
                        <Icon size={14} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* User + logout */}
            <div className="px-4 py-5 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xs font-bold">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-white text-[10px] font-semibold truncate">Admin</div>
                        <div className="text-white/25 text-[9px] tracking-widest">PRINCIPAL ADMIN</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-white/20 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <RiLogoutBoxLine size={14} />
                    </button>
                </div>
            </div>
        </aside>
    );
}