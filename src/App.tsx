import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Fragment, useCallback, useState} from 'react';
import {Checkbox} from './components/Checkbox';
import {Recipes} from './components/Recipes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const AppComponent = () => {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const onChange = useCallback((checked) => {
    setIsVegetarian(checked);
  }, [setIsVegetarian]);

  return (
    <Fragment>
      <div children='React Apollo App' />
      <br />
      <Checkbox onChange={onChange} />
      <Recipes isVegetarian={isVegetarian} />
    </Fragment>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  );
}

export default App;
