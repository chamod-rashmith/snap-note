'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            // If accessing admin route, redirect to admin login
            if (requireAdmin) {
                router.push('/admin/login');
            } else {
                router.push('/');
            }
        }
    }, [user, loading, requireAdmin, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 space-y-4">
                <Loader2 size={40} className="animate-spin text-indigo-600" />
                <p className="text-slate-500 font-medium">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}

