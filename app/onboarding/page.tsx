import OnboardingForm from '@/components/forms/OnboaringForm';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export default function onboarding() {

    return (
        <Suspense fallback={<Loader />}>
            <div className='p-3 flex justify-between items-center align-center'>
                <h2 className='p-3 text-secondary font-bold text-xl md:text-3xl'>ONBOARDING PROFILE</h2>
            </div>
            <div className='p-6'>
                <OnboardingForm  />
            </div>

        </Suspense>
    )
}
