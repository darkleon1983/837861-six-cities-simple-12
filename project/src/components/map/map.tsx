// import cn from 'classnames';
// import { useRef, useEffect } from 'react';
// import useMap from '../../hooks/use-map';
// import { Icon, Marker } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
// import { OfferType } from '../../types/offer';

// type MapProps = {
//   offers: OfferType[];
//   selectedPointId: number | null;
//   className: string;
// };


// const defaultCustomIcon = new Icon({
//   iconUrl: URL_MARKER_DEFAULT,
//   iconSize: [27, 39],
//   iconAnchor: [20, 40]
// });

// const currentCustomIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [27, 39],
//   iconAnchor: [20, 40]
// });

// function Map({ offers, selectedPointId, className }: MapProps): JSX.Element {
//   const city = offers[0].city;
//   const mapRef = useRef(null);
//   const map = useMap(mapRef, city.location);

//   useEffect(() => {
//     if (map) {

//       offers.forEach((offer) => {
//         const marker = new Marker({
//           lat: offer.location.latitude,
//           lng: offer.location.longitude,
//         });

//         marker
//           .setIcon(
//             selectedPointId !== undefined && offer.id === selectedPointId
//               ? currentCustomIcon
//               : defaultCustomIcon
//           )
//           .addTo(map);
//       });
//     }
//   }, [map, offers, selectedPointId]);

//   return (
//     <section className={cn('map', className)}>
//       <div style={{ height: '100%' }} ref={mapRef} />
//     </section>
//   );
// }

// export default Map;
import React from 'react';
import cn from 'classnames';
import { Icon, Marker, LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, OfferType } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
  className: string;
  city: City;
  offers: OfferType[];
  selectedOfferId?: number | null;
  height: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const Map: React.FC<MapProps> = ({
  className,
  city,
  offers,
  selectedOfferId,
  height,
}) => {
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);
  const layer = new LayerGroup();

  React.useEffect(() => {
    if (map) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
        { animate: true, duration: 2 }
      );
    }
  }, [map, city]);

  React.useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          selectedOfferId && offer.id === selectedOfferId
            ? currentCustomIcon
            : defaultCustomIcon
        );
        layer.addLayer(marker);
      });

      layer.addTo(map);
    }
    return () => {
      layer.clearLayers();
    };
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={cn('map', className)}
      style={{ height: height }}
      ref={mapRef}
      data-testid="map"
    >
    </section>
  );
};

export default Map;
