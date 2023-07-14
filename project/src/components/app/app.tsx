import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../const';
import { useAppSelector } from '../../hooks';
// import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOffersStatus } from '../../store/data-offers/selectors';
import PrivateRoute from '../private-route/private-route';
// import Favorites from '../../pages/favorites.tsx/favorites';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offersStatus = useAppSelector(getOffersStatus);

  const Favorites = lazy(() => import('../../pages/favorites/favorites'));
  const Login = lazy(() => import('../../pages/login/login'));
  const Room = lazy(() => import('../../pages/room/room-page'));
  const NotFound = lazy(() => import('../../components/not-found/not-found'));

  return (
    <Suspense fallback={<LoadingScreen type="big" />}>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Suspense fallback={<LoadingScreen type="big" />}>
                  <Favorites />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Room} element={<Room />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
      </HistoryRouter>
    </Suspense >
  );
}

export default App;
