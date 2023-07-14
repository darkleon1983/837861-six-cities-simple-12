import { FetchStatus, NameSpace } from '../../const';
import { OfferType } from '../../types/offer';
import { State } from '../../types/state';

export const getNearbyOffers = (state: State): OfferType[] =>
  state[NameSpace.Nearby].offers;


export const getNearbyStatus = (state: State): FetchStatus =>
  state[NameSpace.Nearby].offersStatus;
