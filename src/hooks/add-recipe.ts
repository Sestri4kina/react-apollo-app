import {useMutation} from "@apollo/client";
import {GET_RECIPES} from "../queries/queries";
import {ADD_RECIPE} from "../queries/updates";
import {Recipe} from "../types/types";

const REFETCH_QUERIES = [
    {query: GET_RECIPES, variables: {vegetarian: true}},
    {query: GET_RECIPES, variables: {vegetarian: false}}
];

interface RecipeInput {
    title: string;
    vegetarian: boolean;
}

export const useAddRecipe = () => {
    const [_addRecipe, {error, loading}] = useMutation<
        {recipe: Recipe}, {recipe: RecipeInput}
    >(ADD_RECIPE, {refetchQueries: REFETCH_QUERIES, awaitRefetchQueries: true});

    return {
        error,
        loading,
        addRecipe: (recipeInput: RecipeInput) => _addRecipe({variables: {recipe: recipeInput}})
    };
}
