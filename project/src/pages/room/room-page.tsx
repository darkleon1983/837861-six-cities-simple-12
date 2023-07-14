import ReviewForm from '../../components/review-form/review-form';
import { AuthorizationStatus, COUNT_NEAR_OFFER, MAX_PHOTOS, getRatingColor } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPropertyOffer, getPropertyOfferStatus } from '../../store/data-offers/selectors';
import { useParams } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeFavoriteAction, fetchCommentsAction, fetchNearbyAction, fetchPropertyOfferAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { sortComments } from '../../store/comments/selectors';
import { getNearbyOffers } from '../../store/nearby-offers/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import PropertyImage from '../../components/property-image/property-image';
import Badge from '../../components/badge/badge';
import Bookmark from '../../components/bookmark/bookmark';
import PropertyItem from '../../components/property-item/property-item';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import ListOffers from '../../components/list-offers/list-offers';
import FullPageError from '../full-page-error/full-page-error';
import Layout from '../../components/layout/layout';


function Room(): JSX.Element {
  // const offers = useAppSelector(getOffers);
  const { id } = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { isLoading, isError } = useAppSelector(getPropertyOfferStatus);
  const dispatch = useAppDispatch();
  const statusLogout = authorizationStatus === AuthorizationStatus.NoAuth;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsAction(Number(id)));
      dispatch(fetchNearbyAction(id));
      dispatch(fetchPropertyOfferAction(id));
    }
  }, [id, dispatch, statusLogout]);

  const comments = useAppSelector(sortComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const room = useAppSelector(getPropertyOffer);

  if (isLoading || !room) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <FullPageError />;
  }

  const cityLocation = room.city;

  const {
    images,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    isFavorite,
  } = room;

  const { avatarUrl, name, isPro } = host;
  const nearOffers = [...nearbyOffers.slice(0, COUNT_NEAR_OFFER), room];

  const onFavoriteClick = () => {
    dispatch(
      changeFavoriteAction({
        id: Number(id),
        status: Number(!isFavorite),
      })
    );
  };

  return (
    // <Layout pageTitle="Property">
    //   <Header />
    //   <main className="page__main page__main--property">
    //     <section className="property">
    //       <div className="property__gallery-container container">
    //         <div className="property__gallery">
    //           {images.slice(0, MAX_PHOTOS).map((img) => (
    //             <PropertyImage key={img} img={img} />
    //           ))}
    //         </div>
    //       </div>
    //       <div className="property__container container">
    //         <div className="property__wrapper">
    //           <div className="property__mark">
    //             {isPremium && <Badge className="property__mark" />}
    //           </div>
    //           <div className="property__name-wrapper">
    //             <h1 className="property__name">
    //               {title}
    //             </h1>
    //             <Bookmark
    //               className="property"
    //               type="room"
    //               classNameSVG="property__bookmark-icon"
    //               isActive={isFavorite}
    //               onClick={onFavoriteClick}
    //             />
    //           </div>
    //           <div className="property__rating rating">
    //             <div className="property__stars rating__stars">
    //               <span style={{ width: convertRating(rating) }}></span>
    //               <span className="visually-hidden">Rating</span>
    //             </div>
    //             <span className="property__rating-value rating__value">{rating}</span>
    //           </div>
    //           <ul className="property__features">
    //             <li className="property__feature property__feature--entire">
    //               {type.replace(type[0], type[0].toUpperCase())}
    //             </li>
    //             <li className="property__feature property__feature--bedrooms">
    //               {bedrooms}{' '}Bedrooms
    //             </li>
    //             <li className="property__feature property__feature--adults">
    //               Max {' '} {maxAdults} {' '}adults
    //             </li>
    //           </ul>
    //           <div className="property__price">
    //             <b className="property__price-value">&euro;{price}</b>
    //             <span className="property__price-text">&nbsp;night</span>
    //           </div>
    //           <div className="property__inside">
    //             <h2 className="property__inside-title">What&apos;s inside</h2>
    //             <ul className="property__inside-list">
    //               {goods.map((item) => (
    //                 <PropertyItem
    //                   key={item} item={item}
    //                 />
    //               ))}
    //               {/* {offers[id].goods.map((offer) => (
    //                 <li className="property__inside-item" key={offer}>
    //                   {offer}
    //                 </li>
    //               ))} */}
    //             </ul>
    //           </div>
    //           <div className="property__host">
    //             <h2 className="property__host-title">Meet the host</h2>
    //             <div className="property__host-user user">
    //               <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
    //                 <img
    //                   className="property__avatar user__avatar"
    //                   src={avatarUrl}
    //                   width="74"
    //                   height="74"
    //                   alt="Host avatar"
    //                 />
    //               </div>
    //               <span className="property__user-name">{name}</span>
    //               <span className="property__user-status">{isPro}</span>
    //             </div>
    //             <div className="property__description">
    //               <p className="property__text">
    //                 A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
    //               </p>
    //               <p className="property__text">
    //                 An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
    //               </p>
    //             </div>
    //           </div>
    //           <section className="property__reviews reviews">
    //             <h2 className="reviews__title">Reviews &middot;{' '}
    //               <span className="reviews__amount">{comments.length}</span>
    //             </h2>
    //             <ul className="reviews__list">
    //               <ReviewList comments={comments} />
    //               {/* <li className="reviews__item">
    //                 <div className="reviews__user user">
    //                   <div className="reviews__avatar-wrapper user__avatar-wrapper">
    //                     <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
    //                   </div>
    //                   <span className="reviews__user-name">
    //                     Max
    //                   </span>
    //                 </div>
    //                 <div className="reviews__info">
    //                   <div className="reviews__rating rating">
    //                     <div className="reviews__stars rating__stars">
    //                       <span style={{ width: '80%' }}></span>
    //                       <span className="visually-hidden">Rating</span>
    //                     </div>
    //                   </div>
    //                   <p className="reviews__text">
    //                     A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
    //                   </p>
    //                   <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
    //                 </div>
    //               </li> */}
    //             </ul>
    //             {/* <isAuth && ReviewForm /> */}
    //             <ReviewForm />
    //           </section>
    //         </div>
    //       </div>
    //       <Map
    //         city={cityLocation}
    //         offers={nearOffers}
    //         selectedOfferId={room.id}
    //         className="property__map"
    //         height="560px"
    //       />
    //     </section>
    //     <div className="container">
    //       <section className="near-places places">
    //         <h2 className="near-places__title">Other places in the neighbourhood</h2>
    //         <ListOffers
    //           offers={nearbyOffers}
    //           cardType="property"
    //           classNames="near-places__list"
    //         />
    //       </section>
    //     </div>
    //   </main>
    // </Layout>
    <Layout pageTitle="Property">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_PHOTOS).map((img) => (
                <PropertyImage key={img} img={img} />
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <Badge className="property__mark" />}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>

                <Bookmark
                  className="property"
                  type="room"
                  classNameSVG="property__bookmark-icon"
                  isActive={isFavorite}
                  onClick={onFavoriteClick}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${getRatingColor(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type.replace(type[0], type[0].toUpperCase())}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((item) => (
                    <PropertyItem key={item} item={item} />
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  <span className="property__user-status">{isPro}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewList comments={comments} />
                {isAuth && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            className="property__map"
            city={cityLocation}
            offers={nearOffers}
            selectedOfferId={room.id}
            height="560px"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <ListOffers
              offers={nearbyOffers}
              cardType="property"
              classNames="near-places__list"
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Room;
