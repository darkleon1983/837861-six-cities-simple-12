import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { FavoritesData } from '../../types/state';
import { fetchFavoritesAction, changeFavoriteAction } from '../api-actions';

const initialState: FavoritesData = {
  favorites: [],
  favoritesStatus: FetchStatus.Idle,
  changeFavoriteStatus: FetchStatus.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesStatus = FetchStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesStatus = FetchStatus.Success;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesStatus = FetchStatus.Failed;
      })
      .addCase(changeFavoriteAction.pending, (state) => {
        state.changeFavoriteStatus = FetchStatus.Loading;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        state.changeFavoriteStatus = FetchStatus.Success;
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(
            ({ id }) => id !== action.payload.id
          );
        }
      })
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.changeFavoriteStatus = FetchStatus.Failed;
      });
  },
});
