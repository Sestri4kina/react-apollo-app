import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {AppComponent} from './AppComponent';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Recipe: {
        fields: {
          isStarred: {
            read(_, {readField}) {
              const id = String(readField('id'));
              return localStorage.getItem('raa_starredRecipes')?.includes(id);
            }
          }
        }
      }
    }
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  );
}

export default App;
