import { useState } from 'react';

function PrepStepForm({ prepStep: initialPrepStep, subNotify }) {

    const [prepStep, setPrepStep] = useState(initialPrepStep);
    const isAdd = initialPrepStep.prepStepId === 0;

    function handleChange(evt) {
        const clone = { ...prepStep };
        clone[evt.target.name] = evt.target.value;
        setPrepStep(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/prepsteps`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = 200;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(prepStep)
        };
        
        fetch(url, init)
            .then(response => {

                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return prepStep;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => subNotify({
                action: isAdd ? "add-prepstep" : "edit-prepstep",
                prepStep: result
            }))
            .catch(error => subNotify({ error: error }));

    }

    return (
        <>
            <h1>{prepStep.prepStepId > 0 ? "Edit" : "Add"} Prep Step</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="prepStepText">Prep Step</label>
                </div>
                <div className="mb-3">
                    <textarea name="prepStepText" cols="40" rows="5" value={prepStep.prepStepText} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default PrepStepForm;