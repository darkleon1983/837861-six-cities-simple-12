import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: State): OfferType[] =>
  state[NameSpace.Favorite].favorites;

export const getStatus = (state: State): FetchStatus =>
  state[NameSpace.Favorite].favoritesStatus;

export const selectGroupedOffers = createSelector(getFavorites, (offers) =>
  offers.reduce<{ [key: string]: OfferType[] }>((acc, offer) => {
    if (!acc[offer.city.name]) {
      acc[offer.city.name] = [];
    }

    acc[offer.city.name].push(offer);
    return acc;
  }, {})
);

export const getFavoritesStatus = createSelector([getStatus], (status) => ({
  isSuccess: status === FetchStatus.Success,
  isLoading: status === FetchStatus.Loading,
  isError: status === FetchStatus.Failed,
}));
