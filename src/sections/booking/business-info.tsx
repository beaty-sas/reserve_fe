'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGetOffers } from 'src/api/offer';
import BookingDetails from 'src/overview/booking-details';
import { IOffer } from 'src/types/offer';


// ----------------------------------------------------------------------

export default function BusinessInfoView({ slug }: { slug: string }) {
  const { offers } = useGetOffers(slug);
  const [selected, setSelected] = useState<IOffer[]>([]);
  const router = useRouter();

  function handleSelect(offer: IOffer, selected: boolean) {
    setSelected((prev) => (selected ? [...prev, offer] : prev.filter((item: IOffer) => item !== offer)));
  }

  function goNext() {
    const selectedIds = selected.map((item) => item.id).join(',');
    const duration = selected.reduce((acc, item) => acc + item.duration, 0);
    const withPhoto = selected.some((item) => item.allow_photo) ? 'true' : 'false';
    router.push(`/link/${slug}/time-slot?selected=${selectedIds}&duration=${duration}&withPhoto=${withPhoto}`);
  }

  return (
    <BookingDetails
      title="Послуги"
      tableData={offers}
      selected={selected}
      handleSelect={handleSelect}
      handleNext={goNext}
    />
  );
}
