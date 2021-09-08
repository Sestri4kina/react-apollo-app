import {gql} from "graphql-tag";

export const ADD_RECIPE = gql`
    mutation addRecipe($recipe: RecipeInput!) {
        addRecipe(recipe: $recipe) {
            id
            title
        }
    }
`;
