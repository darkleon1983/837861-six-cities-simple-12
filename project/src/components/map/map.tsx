import cn from 'classnames';

type MapProps = {
  className: string;
}

function Map({ className }: MapProps): JSX.Element {
  return (
    <section className={cn('map', className)}></section>
  );
}

export default Map;
