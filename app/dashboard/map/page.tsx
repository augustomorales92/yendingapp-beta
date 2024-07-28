import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { MapProvider } from '@/lib/MapProvider';
import Map from '@/components/Map';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
    <MapProvider>
      <main className='flex justify-center items-center p-2'>
        <Map />
      </main>
    </MapProvider>
    </Suspense>
  );
}