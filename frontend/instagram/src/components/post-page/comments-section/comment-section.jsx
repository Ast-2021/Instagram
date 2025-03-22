import { useState } from 'react';
import Comment from './comment';
import PropTypes from 'prop-types';
import { request_create_comment } from '../../../lib/requests';


const CommentsSection = ({ postId, comments, setComments }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('text', commentText);

            const response = await request_create_comment({postId, formData})
            console.log(response)

            const newComment = { ...response.data, liked_users_pk_list: [] };

            setComments((prevComments) => [...prevComments, newComment]);
            setCommentText('');
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
        }
    };

    return (
        <div className="comments-section">
            <form className="form-create-comment" onSubmit={handleSubmit}>
                <input
                    className="input-create-comment"
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Введитe комментарий"
                />
                <button className="button-create-comment" type="submit">Отправить</button>
            </form>

            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}
                setListOfComments={setComments}/>
            ))}
        </div>
    );
};

CommentsSection.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
    setComments: PropTypes.func.isRequired
};

export default CommentsSection;
