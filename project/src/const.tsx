import { OfferType } from './types/offer';
import dayjs from 'dayjs';
import { Review } from './types/review';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer/:id',
  NotFound = '/*',
  Favorites = '/favorites',
}

export function convertRating(value: number): number {
  return Math.round(value) * 20;
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorites',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum FetchStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export enum NameSpace {
  Offers = 'OFFERS',
  Ui = 'UI',
  Offer = 'OFFER',
  User = 'USER',
  App = 'APP',
  Comments = 'COMMENTS',
  Notifications = 'NOTIFICATIONS',
  Property = 'PROPERTY',
  Nearby = 'NEARBY',
  Favorite = 'FAVORITE',
  Data = 'DATA',
}

const Url = {
  Main: '/',
  Favorites: '/favorites',
  Login: '/login',
  Offer: '/offer/:id',
} as const;

const OfferKind = {
  PrivateRoom: 'privat room',
  Apartment: 'apartment'
} as const;

const CardType = {
  Main: 'main',
  Favorites: 'favorites'
} as const;

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const SORTING_METHODS = {
  Popular: {
    name: 'Popular',
    method: (offers: OfferType[]) => offers
  },
  priceAsc: {
    name: 'Price: low to high',
    method: (offers: OfferType[]) => offers.sort((a: OfferType, b: OfferType) => a.price - b.price)
  },
  priceDesc: {
    name: 'Price: high to low',
    method: (offers: OfferType[]) => offers.sort((a: OfferType, b: OfferType) => b.price - a.price)
  },
  topRated: {
    name: 'Top rated first',
    method: (offers: OfferType[]) => offers.sort((a: OfferType, b: OfferType) => b.rating - a.rating)
  }
};

const sortOffers = (offers: OfferType[], activeSorting: string) => {
  const sortingMethod = SORTING_METHODS[activeSorting as keyof typeof SORTING_METHODS].method;
  return sortingMethod(offers);
};

export const getSortingComments = (a: Review, b: Review) =>
  dayjs(b.date).diff(dayjs(a.date));

export const getRatingColor = (rating: number) =>
  (Math.round(rating) * 100) / 5;

export const humanizeDate = (date: string, format: string) =>
  dayjs(date).format(format);

const MAX_NEARBY_OBJECTS = 3;
export const COUNT_NEAR_OFFER = 3;

const MAX_OFFER_IMAGES = 6;

const DEFAULT_SORTING = 'Popular';

const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_COMMENTS = 10;
export const SortingTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export const MAX_PHOTOS = 6;
export const ACTIVE_CLASSNAME = '__bookmark-button--active';
export const getSortingOffers = (offers: OfferType[], activeSort: string) => {
  const sortingOffers = offers.slice();

  switch (activeSort) {
    case SortingTypes[1]:
      return sortingOffers.sort((a: OfferType, b: OfferType) => a.price - b.price);
    case SortingTypes[2]:
      return sortingOffers.sort((a: OfferType, b: OfferType) => b.price - a.price);
    case SortingTypes[3]:
      return sortingOffers.sort((a: OfferType, b: OfferType) => b.rating - a.rating);
    default:
      return sortingOffers;
  }
};

export type AppData = {
  city: string;
  sortName: string;
};

export {
  Url,
  OfferKind,
  CardType,
  MAX_NEARBY_OBJECTS,
  MAX_OFFER_IMAGES,
  CITIES,
  SORTING_METHODS,
  sortOffers,
  DEFAULT_SORTING,
  TIMEOUT_SHOW_ERROR,
};
