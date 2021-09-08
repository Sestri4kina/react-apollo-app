import {Fragment, useCallback, useState} from 'react';
import {Checkbox} from './components/Checkbox';
import {RecipeForm} from './components/RecipeForm';
import {Recipes} from './components/Recipes';

export const AppComponent = () => {
    const [isVegetarian, setIsVegetarian] = useState(false);
    const onChange = useCallback((checked) => {
        setIsVegetarian(checked);
    }, [setIsVegetarian]);

    return (
        <Fragment>
            <div children='React Apollo App' />
            <br />
            <hr />
            <RecipeForm />
            <br />
            <hr />
            <Checkbox children='Vegetarian' onChange={onChange} />
            <Recipes isVegetarian={isVegetarian} />
        </Fragment>
    );
}
