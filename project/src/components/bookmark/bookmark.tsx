import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {
  ACTIVE_CLASSNAME,
  AppRoute,
  AuthorizationStatus,
} from '../../const';
import { redirectToRoute } from '../../store/action';
import { getFavoritesStatus } from '../../store/favorites/selectors';

type BookmarkProps = {
  className: string;
  classNameSVG: string;
  type: 'card' | 'room';
  onClick: () => void;
  isActive: boolean;
};

const sizes = {
  card: {
    width: 18,
    height: 19,
  },
  room: {
    width: 31,
    height: 33,
  },
};

const Bookmark: React.FC<BookmarkProps> = ({
  className,
  classNameSVG,
  type,
  onClick,
  isActive,
}) => {
  const size = sizes[type];
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const activeClass = `${className}${ACTIVE_CLASSNAME}`;
  const status = useAppSelector(getFavoritesStatus);

  return (
    <button
      className={cn(
        `${className}__bookmark-button button`,
        isActive && activeClass
      )}
      type="button"
      onClick={() => {
        if (authorizationStatus === AuthorizationStatus.Auth) {
          onClick();
        } else {
          dispatch(redirectToRoute(AppRoute.Login));
        }
      }}
      disabled={!!status.isLoading}
      data-testid="bookmark"
    >
      <svg className={cn(classNameSVG)} width={size.width} height={size.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default Bookmark;
