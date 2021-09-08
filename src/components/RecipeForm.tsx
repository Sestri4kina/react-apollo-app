import {useMutation} from "@apollo/client";
import React, {useCallback, useState} from "react";
import {GET_RECIPES} from "../queries/queries";
import {ADD_RECIPE} from "../queries/updates";
import {Recipe} from "../types/types";
import {Button} from "./Button"
import {Checkbox} from "./Checkbox"
import {Input} from "./Input";
const REFETCH_QUERIES = [
    {query: GET_RECIPES, variables: {vegetarian: true}},
    {query: GET_RECIPES, variables: {vegetarian: false}}
];

export const RecipeForm = () => {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isRecipeVegetarian, setIsRecipeVegetarian] = useState(false);

    const [addRecipe, {error, loading}] = useMutation<
        {recipe: Recipe}, {recipe: {title: string; vegetarian: boolean}}
    >(ADD_RECIPE, {refetchQueries: REFETCH_QUERIES, awaitRefetchQueries: true});

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addRecipe({variables: {recipe: {title: recipeTitle, vegetarian: isRecipeVegetarian}}});
        setRecipeTitle('');
        setIsRecipeVegetarian(false);
    }, [addRecipe, recipeTitle, isRecipeVegetarian]);

    const onInputChange = useCallback((value: string) => {
        setRecipeTitle(value);
    }, [setRecipeTitle]);
    const onCheckboxChange = useCallback((value: boolean) => {
        setIsRecipeVegetarian(value);
    }, [setIsRecipeVegetarian]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input
                    value={recipeTitle}
                    labelText="Recipe's Title"
                    onChange={onInputChange}
                />
                <Checkbox
                    value={isRecipeVegetarian} 
                    children='Vegetarian'
                    onChange={onCheckboxChange}
                />
                <Button children='Add Recipe' />
            </form>
            {error &&  <p children={error} />}
            {loading && <p children={'Adding recipe...'} />}
        </div>
    );
}
