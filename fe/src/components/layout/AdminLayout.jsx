import AdminSidebar from "../admin/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#111111] text-white">
            <AdminSidebar />
            <main className="ml-[200px] min-h-screen">
                {children}
            </main>
        </div>
    );
}