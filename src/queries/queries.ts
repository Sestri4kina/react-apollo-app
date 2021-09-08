import {gql} from "graphql-tag";

export const GET_RECIPES = gql`
query recipes($vegetarian: Boolean!) {
  recipes(vegetarian: $vegetarian) {
    id
    title
  }
}
`;
