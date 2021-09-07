import {useQuery} from "@apollo/client";
import {gql} from "graphql-tag";
import {Recipe} from "../types/types";

const GET_RECIPES = gql`
query recipes($vegetarian: Boolean!) {
  recipes(vegetarian: $vegetarian) {
    id
    title
  }
}
`;

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
