'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGetBusiness } from 'src/api/business';
import { useGetOffers } from 'src/api/offer';
import BookingDetails from 'src/overview/booking-details';
import { IOffer } from 'src/types/offer';


// ----------------------------------------------------------------------

export default function BusinessInfoView({ id }: { id: number }) {
  const { business } = useGetBusiness(id);
  const { offers } = useGetOffers(id);
  const [selected, setSelected] = useState<IOffer[]>([]);
  const router = useRouter();

  function handleSelect(offer: IOffer, selected: boolean) {
    setSelected((prev) => (selected ? [...prev, offer] : prev.filter((item: IOffer) => item !== offer)));
  }

  function goNext() {
    const selectedIds = selected.map((item) => item.id).join(',');
    const duration = selected.reduce((acc, item) => acc + item.duration, 0);
    router.push(`/booking/${business.id}/time-slot?selected=${selectedIds}&duration=${duration}`);
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
