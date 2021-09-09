import {useQuery} from "@apollo/client";
import {GET_RECIPES} from "../queries/queries";
import {Recipe} from "../types/types";

export const useFetchRecipes = (isVegetarian: boolean) => {
    return useQuery<
        {recipes: Recipe[]}, {vegetarian: boolean}
    >(GET_RECIPES, {variables: {vegetarian: isVegetarian}});
}
