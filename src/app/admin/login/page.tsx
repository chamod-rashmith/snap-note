'use client';

import AdminSignInForm from '../../../components/auth/AdminSignInForm';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If already logged in, redirect to admin dashboard
        if (!loading && user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-indigo-500" />
            </div>
        );
    }

    // If user is logged in but not admin, show the form to re-authenticate
    // If not logged in at all, show the form
    return <AdminSignInForm />;
}
