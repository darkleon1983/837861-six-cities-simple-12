// import { AuthorizationStatus, FetchStatus } from '../const';
// import { store } from '../store';
// import { OfferType } from './offer';
// import { Review } from './review';
// import { appData } from './../store/app-slice/app';

// export type State = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// export type UserProcess = {
//   authorizationStatus: AuthorizationStatus;
// }

// export type NearbyOffersData = {
//   offers: OfferType[];
//   offersStatus: FetchStatus;
// };

// export type FavoritesData = {
//   favorites: OfferType[];
//   favoritesStatus: FetchStatus;
//   changeFavoriteStatus: FetchStatus;
// };

// export type CommentsData = {
//   comments: Review[];
//   commentsStatus: FetchStatus;
//   commentStatus: FetchStatus;
// };

// export type AppData = {
//   city: string;
//   sortName: string;
// };
import { AuthorizationStatus, FetchStatus } from '../const';
import { store } from '../store/index';
import { OfferType } from './offer';
import { Review } from './review.js';
import { UserData } from './user-data.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  info: null | UserData;
  fetchStatus: FetchStatus;
};

export type NearbyOffersData = {
  offers: OfferType[];
  offersStatus: FetchStatus;
};

export type AppData = {
  city: string;
  sortName: string;
};

export type CommentsData = {
  comments: Review[];
  commentsStatus: FetchStatus;
  commentStatus: FetchStatus;
};

export type FavoritesData = {
  favorites: OfferType[];
  favoritesStatus: FetchStatus;
  changeFavoriteStatus: FetchStatus;
};

export type OffersData = {
  offers: OfferType[];
  offersStatus: FetchStatus;
  offer: OfferType | null;
  offerStatus: FetchStatus;
};

