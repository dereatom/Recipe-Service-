function PrepStepCard({ prepStep, subNotify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/prepsteps/${prepStep.prepStepId}`, { method: "DELETE" })
            .then(() => subNotify({ action: "delete-prepstep", prepStep: prepStep }))
            .catch(error => subNotify({ action: "delete-prepstep", error: error }));
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5>Step Number: {prepStep.stepNumber}</h5>
                    <h5>Text: {prepStep.prepStepText}</h5>
                    <div className="card-footer d-flex justify-content-center">
                        <button className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                        <button className="btn btn-secondary" type="button" onClick={() => subNotify({ action: "edit-prepstep-form", prepStep: prepStep })}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrepStepCard;
