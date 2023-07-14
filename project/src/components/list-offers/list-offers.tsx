import React from 'react';
import cn from 'classnames';

import Card from '../card/card';
import { OfferType } from '../../types/offer';

type ListOffersProps = {
  offers: OfferType[];
  cardType: 'favorite' | 'home' | 'property';
  classNames: string;
  onListItemHover?: (listItemName: number | null) => void;
};

const ListOffers: React.FC<ListOffersProps> = ({
  offers,
  onListItemHover,
  cardType,
  classNames,
}) => (
  <div className={cn('places__list', classNames)}>
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        cardType={cardType}
        onCardHover={onListItemHover}
      />
    ))}
  </div>
);

export default React.memo(ListOffers);
