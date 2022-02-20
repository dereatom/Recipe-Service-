import { useState } from 'react';

function IngredientForm({ ingredient: initialIngredient, subNotify }) {

    const [ingredient, setIngredient] = useState(initialIngredient);
    const isAdd = initialIngredient.ingredientId === 0;

    function handleChange(evt) {
        const clone = { ...ingredient };
        clone[evt.target.name] = evt.target.value;
        setIngredient(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/ingredients`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 200;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(ingredient)
        };
        
        fetch(url, init)
            .then(response => {

                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return ingredient;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => subNotify({
                action: isAdd ? "add-ingredient" : "edit-ingredient",
                ingredient: result
            }))
            .catch(error => subNotify({ error: error }));

    }

    return (
        <>
            <h1>{ingredient.ingredientId > 0 ? "Edit" : "Add"} Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"
                        className="form-control"
                        value={ingredient.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" name="amount"
                        className="form-control"
                        value={ingredient.amount} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                </div>
                <div className="mb-3">
                    <textarea name="description" cols="40" rows="5" value={ingredient.description} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default IngredientForm;