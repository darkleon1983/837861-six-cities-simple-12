import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { FavoritePayload, OfferType, Offers } from '../types/offer';
import { redirectToRoute, requireAuthorization } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CreateReviewPayload, Review } from '../types/review';
import { pushNotification } from './notification/notification';


type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offers>(APIRoute.Hotels);
      return data;
    } catch (err) {
      dispatch(
        pushNotification({
          // id: nanoid(),
          type: 'error',
          message: 'Unfortunatly, we can\'t show offers',
        })
      );
      throw err;
    }
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Room));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  number,
  ThunkOptions
>('data/comments', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show comments',
      })
    );
    throw err;
  }
});

export const fetchNearbyAction = createAsyncThunk<
  Offers,
  string,
  ThunkOptions
>('data/fetchNearbyOffers', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offers>(`${APIRoute.Hotels}/${id}/nearby`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show nearby offers',
      })
    );
    throw err;
  }
});

export const fetchPropertyOfferAction = createAsyncThunk<
  Offers,
  string,
  ThunkOptions
>('data/fetchPropertyOffer', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Offers>(`${APIRoute.Hotels}/${id}`);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show room page',
      })
    );
    throw err;
  }
});

export const changeFavoriteAction = createAsyncThunk<
  OfferType,
  FavoritePayload,
  ThunkOptions
>(
  'data/changeFavoriteOffers',
  async ({ id, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OfferType>(
        `${APIRoute.Favorite}/${id}/${status}`
      );
      return data;
    } catch (err) {
      dispatch(
        pushNotification({
          type: 'error',
          message: 'Unfortunately, we can\'t add/remove favorite offer',
        })
      );
      throw err;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<
  OfferType[],
  undefined,
  ThunkOptions
>('data/fetchFavoritesOffers', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  } catch (err) {
    dispatch(
      pushNotification({
        type: 'error',
        message: 'Unfortunately, we can\'t show favorite offers',
      })
    );
    throw err;
  }
});

export const postCommentAction = createAsyncThunk<
  Review[],
  CreateReviewPayload,
  ThunkOptions
>('data/comment', async ({ comment, rating, id }, { dispatch, extra: api }) => {
  try {
    const { data } = await api.post<Review[]>(`${APIRoute.Comments}${id}`, {
      comment,
      rating,
    });
    return data;
  } catch (err) {
    dispatch(
      pushNotification({ type: 'error', message: 'Please repeat send comment' })
    );
    throw err;
  }
});
