export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import { MapContent } from "@/components/map/MapContent";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MapContent />
    </Suspense>
  );
}
