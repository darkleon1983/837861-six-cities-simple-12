import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataOffers } from './data-offers/data-offers';
import { UiProcess } from './ui/ui-process';
import { userProcess } from './user-process/user-process';
import { commentsData } from './comments/comments';
import { notifications } from './notification/notification';
import { favoritesData } from './favorites/favorites';
import { appData } from './app-slice/app';
import { nearbyOffersData } from './nearby-offers/nearby-offers';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: dataOffers.reducer,
  [NameSpace.Ui]: UiProcess.reducer,
  [NameSpace.Notifications]: notifications.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Favorite]: favoritesData.reducer,
  [NameSpace.App]: appData.reducer,
  [NameSpace.Nearby]: nearbyOffersData.reducer,
});
