import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Store } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2 text-violet-600 font-bold text-xl">
                        <Store className="w-8 h-8" />
                        <span>Admin Panel</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin')
                                ? 'bg-violet-50 text-violet-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Emprendimientos
                    </div>

                    <Link
                        to="/admin/emprendimientos/nuevo"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/emprendimientos/nuevo')
                                ? 'bg-violet-50 text-violet-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <PlusCircle className="w-5 h-5" />
                        Nuevo Emprendimiento
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link to="/" className="text-sm text-gray-500 hover:text-violet-600 flex items-center gap-2">
                        ← Volver a la web
                    </Link>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
                <span className="font-bold text-gray-800">Admin Panel</span>
                <Link to="/admin/emprendimientos/nuevo" className="p-2 bg-violet-100 rounded-full text-violet-600">
                    <PlusCircle className="w-6 h-6" />
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 mt-14 md:mt-0 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
