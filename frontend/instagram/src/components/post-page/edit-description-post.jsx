import { request_edit_description_on_post } from "../../lib/requests";

const EditDescriptionPost = ({ pk, showForm, description, setDescription }) => {

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('description', description);

        try {
            await request_edit_description_on_post(pk, formData)
            showForm(false)
        } catch {
            console.error('Failed to update user');
        }
    };

    return (
        <div>
            <form className="form-for-edit-description" onSubmit={handleSubmit}>
                <div className="label-plus-button-of-edit-post">
                    <label>
                        <input className="input-edit-post" type="text" value={description} onChange={handleDescriptionChange} />
                    </label><br /><br />

                    <div className="box-for-button-edit-profile-user">
                        <button className="button-for-edit-description" type="submit">Edit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditDescriptionPost