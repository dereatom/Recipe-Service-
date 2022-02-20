function IngredientCard({ ingredient, subNotify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/ingredients/${ingredient.ingredientId}`, { method: "DELETE" })
            .then(() => subNotify({ action: "delete-ingredient", ingredient: ingredient }))
            .catch(error => subNotify({ action: "delete-ingredient", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Name: {ingredient.name}</h5>
                    <h5>Description: {ingredient.description}</h5>
                    <h5>Amount: {ingredient.amount}</h5>
                    <div className="card-footer d-flex justify-content-center">
                        <button className="btn btn-danger mr-3"  type="button" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "edit-ingredient-form", ingredient: ingredient })}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientCard;
