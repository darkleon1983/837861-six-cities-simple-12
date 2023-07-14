import React from 'react';

// import Layout from '../../components/layout/layout';
// import Logo from '../../components/logo/logo';
import Card from '../../components/card/card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getFavoritesStatus,
  selectGroupedOffers,
} from '../../store/favorites/selectors';
import { fetchFavoritesAction } from '../../store/api-actions';
import LoadingScreen from '../../components/loading-screen/loading-screen';
// import { type } from './../../types/user';

const FavoritesEmpty: React.FC = () => (
  <section className="favorites favorites--empty">
    <h1 className="visually-hidden">Favorites (empty)</h1>
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">
        Save properties to narrow down search or plan your future trips.
      </p>
    </div>
  </section>
);

const Favorites: React.FC = () => {
  const groupedOffers = useAppSelector(selectGroupedOffers);
  const status = useAppSelector(getFavoritesStatus);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (status.isLoading) {
    return <LoadingScreen type="big" />;
  }

  const isEmpty = !Object.keys(groupedOffers).length;

  return (
    // <Layout pageTitle="Favorites">
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isEmpty ? (
            <FavoritesEmpty />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([name, cards]) => (
                  <li className="favorites__locations-items" key={name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cards.map((offer) => (
                        <Card
                          key={offer.id}
                          offer={offer}
                          cardType="favorite"
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        {/* <Logo type="footer" /> */}
      </footer>
    </>
    // </Layout>
  );
};

export default Favorites;
