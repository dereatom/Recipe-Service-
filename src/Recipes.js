import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard.js';
import RecipeForm from './RecipeForm.js';
import RecipeDetailsForm from './RecipeDetailsForm.js';

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [scopedRecipe, setScopedRecipe] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetchFromAPI();
    }, []);

    function fetchFromAPI() {
        fetch("http://localhost:8080/recipes")
            .then(response => response.json())
            .then(result => { console.log(JSON.stringify(result)); setRecipes(result); })
            .catch(console.log);
    }

    function addClick() {
        setScopedRecipe({ recipeId: 0, title: "", category: "Carnivore", description: "", prepTime: 0, cookTime: 0, servings: 0 });
        setShowForm(true);
    }

    function notify({ action, recipe, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            setShowDetailsForm(false);
            return;
        }

        switch (action) {
            case "add":
                setRecipes([...recipes, recipe]);
                break;
            case "edit":
                setRecipes(recipes.map(e => {
                    if (e.recipeId === recipe.recipeId) {
                        return recipe;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedRecipe(recipe);
                setShowForm(true);
                return;
            case "details":
                setScopedRecipe(recipe);
                setShowDetailsForm(true);
                return;
            case "delete":
                setRecipes(recipes.filter(e => e.recipeId !== recipe.recipeId));
                break;
            case "exit-details-form":
                fetchFromAPI();
                break;
        }
        
        setError("");
        setShowForm(false);
        setShowDetailsForm(false);
    }

    if (showForm) {
        return <RecipeForm recipe={scopedRecipe} notify={notify} />
    } else if (showDetailsForm) {
        return <RecipeDetailsForm recipe={scopedRecipe} notify={notify} />
    }

    return (
        <>
            <div className="row mt-2">
                <div className="col-8">
                    <h1>Recipes</h1>
                </div>
                <div className="col">
                    <button className="btn btn-primary" type="button" onClick={addClick}>Add a Recipe</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {recipes.length === 0 ? <div className="alert alert-warning">No Recipes</div>
                : (<div className="row row-cols-3">
                    {recipes.map(r => <RecipeCard key={r.recipeId} recipe={r} notify={notify} />)}
                </div>)}
        </>
    )
}

export default Recipes;