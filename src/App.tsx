import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {AppComponent} from './AppComponent';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  );
}

export default App;
