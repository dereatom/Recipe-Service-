function RecipeCard({ recipe, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/recipes/${recipe.recipeId}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", recipe: recipe }))
            .catch(error => notify({ action: "delete", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Title: {recipe.title}</h5>
                    <h5>Servings: {recipe.servings}</h5>
                    <h5>Prep Time: {recipe.prepTime}</h5>
                    <h5>Cook Time: {recipe.cookTime}</h5>
                    <h5>Category: {recipe.category}</h5>
                    <h5>Description: {recipe.description}</h5>
                    <div className="card-footer d-flex justify-content-center">
                        <button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", recipe: recipe })}>Edit</button>
                        <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "details", recipe: recipe })}>Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
