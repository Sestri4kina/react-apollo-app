This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project's using `react@v17.0.2`, `@apollo/client@v3.4.10` and `typescript@v4.4.2`.
It contains examples of fetching and updating data using `apollo` hooks - `useQuery` and `useMutation` correspondingly. Local-only fields is used for data for which there is no need to be persisted remotely, instead of `resolvers` (which were deprecated in `@apollo/client@v3`) `FieldPolicy` is used.

Idea for the project and it's server implemetation were taken from [GraphQL Data in React with Apollo Client by Nik Graf](https://github.com/nikgraf/graphql-apollo-client-course).
