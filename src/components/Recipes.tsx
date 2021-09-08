import {useApolloClient, useQuery} from "@apollo/client";
import {useCallback} from "react";
import {GET_RECIPES} from "../queries/queries";
import {Recipe} from "../types/types";

interface RecipesProps {
  isVegetarian?: boolean;
}

const LOCAL_STORAGE_KEY = 'raa_starredRecipes';

export const Recipes = ({isVegetarian = false}: RecipesProps) => {
    const {data, loading, error} = useQuery<
        {recipes: Recipe[]}, {vegetarian: boolean}
    >(GET_RECIPES, {variables: {vegetarian: isVegetarian}});

    if (loading) {return <div children='Loading...' />;}
    if (error) {return <div children={error} />;}

    return (
        <div>
            {
                data?.recipes
                    .map(({title, id, isStarred}) =>
                        (<OneRecipe key={id} id={id} title={title} isStarred={isStarred} />)
                    )
            }
        </div>
    );
}

const OneRecipe = ({id, title, isStarred}: Recipe) => {
    const client = useApolloClient();

    const onUpdateStarredStatus = useCallback(() => {
        if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
            localStorage.setItem(LOCAL_STORAGE_KEY, '');
        }

        const starredRecipeIds = (localStorage.getItem(LOCAL_STORAGE_KEY) ?? '').split(',');

        if (starredRecipeIds.includes(id)) {
            const index = starredRecipeIds.findIndex(_id => _id === id);
            if (index === -1) {
                return;
            }
            starredRecipeIds.splice(index, 1);
            localStorage.setItem(LOCAL_STORAGE_KEY, starredRecipeIds.join(','));
        } else {
            starredRecipeIds.push(id);
            localStorage.setItem(LOCAL_STORAGE_KEY, starredRecipeIds.join(','));
        }

        client.cache.evict({id: `Recipe:${id}`, fieldName: 'isStarred'});
        client.cache.gc();
    }, [id, client.cache]);

    return (
        <div>
            {title}
            <div
                className={isStarred ? 'starred': undefined}
                onClick={onUpdateStarredStatus}
            >
                ☆
            </div>
        </div>
    );
}
