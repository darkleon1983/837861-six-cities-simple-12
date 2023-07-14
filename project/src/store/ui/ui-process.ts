import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SortingTypes } from '../../const';

type UiProcess = {
  city: string;
  sorting: string;
};

const initialState: UiProcess = {
  city: CITIES[0],
  sorting: SortingTypes[0],
};

export const UiProcess = createSlice({
  name: NameSpace.Ui,
  initialState,
  reducers: {
    changeSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    changeCity: (state, action: PayloadAction<string>) => {

      state.city = action.payload;
    }
  }
});

export const { changeSorting, changeCity } = UiProcess.actions;
