import { useState } from 'react';
import IngredientCard from './IngredientCard.js';
import IngredientForm from './IngredientForm.js';
import PrepStepCard from './PrepStepCard.js';
import PrepStepForm from './PrepStepForm.js';
import RatingCard from './RatingCard.js';
import RatingForm from './RatingForm.js';

function RecipeDetailsForm({ recipe: initialRecipe, notify }) {

    const [recipe, setRecipe] = useState(initialRecipe);
    const [ingredients, setIngredients] = useState(initialRecipe.ingredients);
    const [showIngredientForm, setShowIngredientForm] = useState(false);
    const [scopedIngredient, setScopedIngredient] = useState({});
    const [prepSteps, setPrepSteps] = useState(initialRecipe.prepSteps);
    const [showPrepStepForm, setShowPrepStepForm] = useState(false);
    const [scopedPrepStep, setScopedPrepStep] = useState({});
    const [ratings, setRatings] = useState(initialRecipe.ratings);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [scopedRating, setScopedRating] = useState({});
    const [error, setError] = useState();

    function addIngredientClick() {
        setScopedIngredient({ ingredientId: 0, recipeId: recipe.recipeId, name: "", description: "", amount: 0 });
        setShowIngredientForm(true);
    }

    function addPrepStepClick() {
        setScopedPrepStep({ prepStepId: 0, recipeId: recipe.recipeId, stepNumber: prepSteps.length + 1, text: "" });
        setShowPrepStepForm(true);
    }

    function addRatingClick() {
        setScopedRating({ ratingId: 0, recipeId: recipe.recipeId, recommended: true, numStars: 5, ratingText: "" });
        setShowRatingForm(true);
    }

    function detailsFormNotify({ action, ingredient, prepStep, rating, error }) {

        if (error) {
            setError(error);
            setShowIngredientForm(false);
            setShowPrepStepForm(false);
            setShowRatingForm(false);
            return;
        }

        switch (action) {
            case "add-ingredient":
                setIngredients([...ingredients, ingredient]);
                break;
            case "edit-ingredient":
                setIngredients(ingredients.map(e => {
                    if (e.ingredientId === ingredient.ingredientId) {
                        return ingredient;
                    }
                    return e;
                }));
                break;
            case "edit-ingredient-form":
                setScopedIngredient(ingredient);
                setShowIngredientForm(true);
                return;
            case "delete-ingredient":
                setIngredients(ingredients.filter(e => e.ingredientId !== ingredient.ingredientId));
                break;
            case "add-prepstep":
                setPrepSteps([...prepSteps, prepStep]);
                break;
            case "edit-prepstep":
                setPrepSteps(prepSteps.map(e => {
                    if (e.prepStepId === prepStep.prepStepId) {
                        return prepStep;
                    }
                    return e;
                }));
                break;
            case "edit-prepstep-form":
                setScopedPrepStep(prepStep);
                setShowPrepStepForm(true);
                return;
            case "delete-prepstep":
                setPrepSteps(prepSteps.filter(e => e.prepStepId !== prepStep.prepStepId));
                break;
            case "add-rating":
                setRatings([...ratings, rating]);
                break;
            case "delete-rating":
                setRatings(ratings.filter(e => e.ratingId !== rating.ratingId));
                break;
        }
        
        setError("");
        setShowIngredientForm(false);
        setShowPrepStepForm(false);
        setShowRatingForm(false);
    }

    if (showIngredientForm) {
        return <IngredientForm ingredient={scopedIngredient} subNotify={detailsFormNotify} />
    }
    else if (showPrepStepForm) {
        return <PrepStepForm prepStep={scopedPrepStep} subNotify={detailsFormNotify} />
    }
    else if (showRatingForm) {
        return <RatingForm rating={scopedRating} subNotify={detailsFormNotify} />
    }

    return (
        <>
            <h1>Recipe Details</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mt-2">
            <div className="col-8">
                <h1>Ingredients</h1>
            </div>
            </div>
            <div className="col">
                <button className="btn btn-primary" type="button" onClick={addIngredientClick}>Add an Ingredient</button>
                <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "exit-details-form" })}>Exit</button>
            </div>
            {ingredients.length === 0 ? <div className="alert alert-warning">No Ingredients</div>
                : (<div className="row row-cols-3">
                    {ingredients.map(x => <IngredientCard key={x.ingredientId} ingredient={x} subNotify={detailsFormNotify} />)}
                </div>)}
            <div className="row mt-2">
            <div className="col-8">
                <h1>Prep Steps</h1>
            </div>
            </div>
            <div className="col">
                {<button className="btn btn-primary" type="button" onClick={addPrepStepClick}>Add a Prep Step</button>}
            </div>
            {prepSteps.length === 0 ? <div className="alert alert-warning">No Prep Steps</div>
                : (<div className="row row-cols-3">
                    {prepSteps.map(x => <PrepStepCard key={x.prepStepId} prepStep={x} subNotify={detailsFormNotify} />)}
                </div>)}
            <div className="row mt-2">
            <div className="col-8">
                <h1>Ratings</h1>
            </div>
            </div>
            <div className="col">
                {<button className="btn btn-primary" type="button" onClick={addRatingClick}>Add a Rating</button>}
            </div>
            {ratings.length === 0 ? <div className="alert alert-warning">No Ratings</div>
                : (<div className="row row-cols-3">
                    {ratings.map(x => <RatingCard key={x.ratingId} rating={x} subNotify={detailsFormNotify} />)}
                </div>)}
        </>
    );
}

export default RecipeDetailsForm;