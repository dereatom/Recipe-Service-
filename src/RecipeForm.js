import { useState } from 'react';

function RecipeForm({ recipe: initialRecipe, notify }) {

    const [recipe, setRecipe] = useState(initialRecipe);
    const isAdd = initialRecipe.recipeId === 0;

    function handleChange(evt) {
        const clone = { ...recipe };
        clone[evt.target.name] = evt.target.value;
        setRecipe(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/recipes`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 200;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(recipe)
        };

        fetch(url, init)
            .then(response => {

                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return recipe;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                recipe: result
            }))
            .catch(error => notify({ error: error }));
    }

    return (
        <>
            <h1>{isAdd ? "Add" : "Edit"} Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title"
                        className="form-control"
                        value={recipe.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="servings">Servings</label>
                    <input type="text" id="servings" name="servings"
                        className="form-control"
                        value={recipe.servings} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="prepTime">Prep Time</label>
                    <input type="text" id="prepTime" name="prepTime"
                        className="form-control"
                        value={recipe.prepTime} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cookTime">Cook Time</label>
                    <input type="text" id="cookTime" name="cookTime"
                        className="form-control"
                        value={recipe.cookTime} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={recipe.category} onChange={handleChange}>
                        <option value="Carnivore">Carnivore</option>
                        <option value="Herbivore">Herbivore</option>
                        <option value="Omnivore">Omnivore</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                </div>
                <div className="mb-3">
                    <textarea name="description" cols="40" rows="5" value={recipe.description} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
           </form>
        </>
    );
}

export default RecipeForm;