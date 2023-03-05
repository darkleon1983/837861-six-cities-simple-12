import Main from '../../pages/main/main';

type AppScreenProps = {
  offersCount: number;
}

function App({ offersCount }: AppScreenProps): JSX.Element {
  return (
    <Main offersCount={offersCount} />
  );
}

export default App;
