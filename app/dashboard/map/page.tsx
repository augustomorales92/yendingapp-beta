import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import { MapProvider } from "@/lib/MapProvider";
import Map from "@/components/map/Map";
import { getPrevias } from "@/services/previas";

export async function MapContent() {
  const previas = await getPrevias();
  return (
    <MapProvider>
      <main className="flex justify-center items-center p-2">
        <Map previas={previas} />
      </main>
    </MapProvider>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MapContent />
    </Suspense>
  );
}
