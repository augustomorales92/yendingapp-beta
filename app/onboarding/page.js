'use client'
import OnboardingForm from '@/components/forms/OnboaringForm';

export default function onboarding() {

    return (
        <>
            <div className='p-3 flex justify-between items-center align-center'>
                <h2 className='p-3 text-secondary font-bold text-xl md:text-3xl'>ONBOARDING PROFILE</h2>
            </div>
            <div className='p-6'>
                <OnboardingForm />
            </div>

        </>
    )
}
