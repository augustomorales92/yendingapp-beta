'use client'

import OnboardingForm from '@/components/forms/OnboaringForm';
import { useSession } from 'next-auth/react';


export default function onboarding() {
    // eslint-disable-next-line no-unused-vars
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className='text-black'>Loading...</div>;
    }

    if (!session) {
        return <div className='text-black'>Please sign in to access the dashboard.</div>;
    }

    return (
        <>
            <div className='p-3 flex justify-between items-center align-center'>
                <h2 className='p-3 text-primary font-bold text-xl md:text-3xl'>ONBOARDING PROFILE</h2>
            </div>
            <div className='p-6'>
                <OnboardingForm />
            </div>

        </>
    )
}
