import {useApolloClient} from "@apollo/client";
import {useCallback} from "react";
import {useFetchRecipes} from "../hooks/fetch-recipes";
import {Recipe} from "../types/types";

interface RecipesProps {
  isVegetarian?: boolean;
}

const LOCAL_STORAGE_KEY = 'raa_starredRecipes';

export const Recipes = ({isVegetarian = false}: RecipesProps) => {
    const {data, loading, error} = useFetchRecipes(isVegetarian);

    if (loading) {return <div children='Loading...' />;}
    if (error) {return <div children={error} />;}

    return (
        <div>
            {
                data?.recipes
                    .map(({id, ...rest}) =>
                        (<OneRecipe key={id} id={id} {...rest} />)
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
