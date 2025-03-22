import PropTypes from 'prop-types';
import {
    request_add_or_remove_like_for_comment, request_delete_comment,
    request_get_count_likes_of_comment
       } from '../../../lib/requests';
import get_pk from '../../../lib/pk';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Comment = ({ comment, setListOfComments }) => {
    const pk = Number(get_pk());

    const handleLike = async () => {
        try {
            await request_add_or_remove_like_for_comment({ comment })
            const response = await request_get_count_likes_of_comment({ comment })
            setListOfComments(prevComments => 
                prevComments.map(c => 
                    c.id === comment.id ? { ...c, liked_users_pk_list: response.data.liked_users_pk_list } : c
                )
            );            
        } catch (error) {
            console.error('Ошибка при лайке комментария:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await request_delete_comment({ comment })
            setListOfComments(prevComments => prevComments.filter(c => c.id !== comment.id));
        } catch (error) {
            console.error('Ошибка при удалении комментария:', error);
        }
    };
    return (
        <div className="comment-block">
            <div className="comment-data">
                <h5>{comment.username}</h5>
                <p className="comment-text">{comment.text}</p>
                <div className="rating-comment">
                    {comment.liked_users_pk_list && comment.liked_users_pk_list.includes(pk) ? (
                        <FontAwesomeIcon className="like" onClick={handleLike} icon={faHeartSolid} />
                    ) : (
                        <FontAwesomeIcon className="like" onClick={handleLike} icon={faHeartRegular} />
                    )}
                    <h5 className="count-likes">
                    {comment.liked_users_pk_list && comment.liked_users_pk_list.length}
                </h5>
                </div>
            </div>
            <div className="delete-button-block">
                {comment.author === pk && <button className="button-delete-comment" onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        liked: PropTypes.bool.isRequired,
    }).isRequired,
    setListOfComments: PropTypes.func.isRequired,
};

export default Comment;