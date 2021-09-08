import {useQuery} from "@apollo/client";
import {GET_RECIPES} from "../queries/queries";
import {Recipe} from "../types/types";

interface RecipesProps {
  isVegetarian?: boolean;
}

export const Recipes = ({isVegetarian = false}: RecipesProps) => {
    const {data, loading, error} = useQuery<
        {recipes: Recipe[]}, {vegetarian: boolean}
    >(GET_RECIPES, {variables: {vegetarian: isVegetarian}});

    if (loading) {return <div children='Loading...' />;}
    if (error) {return <div children={error} />;}

    return (
        <div>
            {data && data.recipes.map(({title, id}) => (<div key={id}>{title}</div>))}
        </div>
    );
}
