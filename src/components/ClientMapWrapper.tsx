"use client";

import dynamic from 'next/dynamic';

const ClientTravelMap = dynamic(() => import('@/components/ClientTravelMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  )
});

export default function ClientMapWrapper() {
  return <ClientTravelMap />;
} 