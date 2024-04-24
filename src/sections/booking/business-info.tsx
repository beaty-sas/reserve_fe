'use client';

import { useGetOffers } from 'src/api/offer';
import BookingDetails from 'src/overview/BookingDetails';
import { IOffer } from 'src/types/offer';
import { useSharedState } from 'src/hooks/state';


// ----------------------------------------------------------------------

export default function BusinessInfoView({ slug }: { slug: string }) {
  const { offers } = useGetOffers(slug);
  const { setSelectedOffers, selectedOffers } = useSharedState();

  function handleSelect(offer: IOffer, isSelected: boolean) {
    setSelectedOffers(isSelected ? [...selectedOffers, offer] : selectedOffers.filter((item: IOffer) => item.id !== offer.id));
  }

  return (
    <BookingDetails
      title="Послуги"
      tableData={offers}
      selected={selectedOffers}
      handleSelect={handleSelect}
    />
  );
}
