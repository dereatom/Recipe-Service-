import { useState } from 'react';

function RatingForm({ rating: initialRating, subNotify }) {

    const [rating, setRating] = useState(initialRating);
    const isAdd = initialRating.ratingId === 0;

    function handleChange(evt) {
        const clone = { ...rating };

        if (evt.target.name === 'numStars') {
            clone[evt.target.name] = parseInt(evt.target.value);
        } else if (evt.target.name === 'recommended') {
            clone[evt.target.name] = (evt.target.value === 'true');
        } else {
            clone[evt.target.name] = evt.target.value;
        }

        setRating(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/ratings`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = 200;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(rating)
        };
        
        fetch(url, init)
            .then(response => {

                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return rating;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => subNotify({
                action: isAdd ? "add-rating" : "edit-rating",
                rating: result
            }))
            .catch(error => subNotify({ error: error }));

    }

    return (
        <>
            <h1>{rating.ratingId > 0 ? "Edit" : "Add"} Rating</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="recommended">Is Recommended</label>
                    <select name="recommended" value={rating.recommended} onChange={handleChange}>
                        <option value="true">Y</option>
                        <option value="false">N</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="numStars">Number of Stars</label>
                    <select name="numStars" value={rating.numStars} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="ratingText">Rating Text</label>
                </div>
                <div className="mb-3">
                    <textarea name="ratingText" cols="40" rows="5" value={rating.ratingText} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default RatingForm;