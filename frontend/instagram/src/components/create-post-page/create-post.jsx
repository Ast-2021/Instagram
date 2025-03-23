import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request_create_post } from "../../lib/requests";
import "./create-post-style.css"

function CreatePost() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('image', image);
        formData.append('description', description);

        try {
          const response = await request_create_post({formData})
          navigate(`/post/${response.data.pk}/`);
        } catch (error) {
          setError(error.response.request.responseText)
        };
  };

  return (
    <div className="create">
      <h2>Create Post</h2>
      {console.log(error)}
      <p className="error-text">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input
            className="input-create-post-file"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            className="input-create-post-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
