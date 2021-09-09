import React, {useCallback, useState} from "react";
import {useAddRecipe} from "../hooks/add-recipe";
import {Button} from "./Button"
import {Checkbox} from "./Checkbox"
import {Input} from "./Input";

export const RecipeForm = () => {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [isRecipeVegetarian, setIsRecipeVegetarian] = useState(false);

    const {addRecipe, error, loading} = useAddRecipe();

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addRecipe({title: recipeTitle, vegetarian: isRecipeVegetarian});
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
