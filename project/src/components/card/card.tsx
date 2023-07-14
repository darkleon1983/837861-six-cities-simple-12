import React from 'react';
import { getRatingColor } from '../../const';
import Badge from '../badge/badge';
import Bookmark from '../bookmark/bookmark';
import { OfferType } from '../../types/offer';
import ImagePlace from '../image-place/image-place';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteAction } from '../../store/api-actions';

type CardProps = {
  offer: OfferType;
  onCardHover?: (id: number | null) => void;
  cardType: 'favorite' | 'home' | 'property';
};

const cardClassnames = {
  home: {
    article: 'cities__card place-card',
    image: 'cities__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },

  favorite: {
    article: 'favorites__card place-card',
    image: 'favorites__image-wrapper place-card__image-wrapper',
    cardInfo: 'favorites__card-info place-card__info',
  },

  property: {
    article: 'near-places__card place-card',
    image: 'near-places__image-wrapper place-card__image-wrapper',
    cardInfo: 'place-card__info',
  },
};

const Card: React.FC<CardProps> = ({ offer, onCardHover, cardType }) => {
  const {
    price,
    previewImage,
    title,
    type,
    isPremium,
    rating,
    id,
    isFavorite,
  } = offer;

  const link = generatePath(AppRoute.Room, {
    id: `${id}`,
  });
  const dispatch = useAppDispatch();

  const { article, image, cardInfo } = cardClassnames[cardType];
  const typePlace = type.replace(type[0], type[0].toUpperCase());

  return (
    <article
      className={article}
      onMouseOver={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
      data-testid="offerItem"
    >
      {isPremium && <Badge className="place-card__mark" />}
      <div className={image}>
        <ImagePlace
          previewImage={previewImage}
          title={title}
          type={cardType}
          id={id}
        />
      </div>
      <div className={cardInfo}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            className="place-card"
            type="card"
            classNameSVG="place-card__bookmark-icon"
            isActive={isFavorite}
            onClick={() => {
              dispatch(
                changeFavoriteAction({
                  id,
                  status: Number(!isFavorite),
                })
              );
            }}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingColor(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{title}</Link>
        </h2>
        <p className="place-card__type">{typePlace}</p>
      </div>
    </article>
  );
};

export default React.memo(Card);
