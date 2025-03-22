import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faComment as faCommentRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as faCommentSolid, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import get_pk from "../../lib/pk"
import EditDescriptionPost from "./edit-description-post";


const ButtonLike = ({ likes, onLike, postDescription, commentSection, postId }) => {
    const [description, setDescription] = useState(postDescription)
    const [showComment, setShowComment] = useState(false);
    const [showFormEditDescription, setShowFowmEditDescription] = useState(false);
    const pk = Number(get_pk());

    const handleClick = () => {
        setShowComment(!showComment);
    };

    const handleEditForm = () => {
        setShowFowmEditDescription(!showFormEditDescription)
    }

    return (
        <div>
            <div className="like-button">
                {likes.liked_users_pk_list && likes.liked_users_pk_list.includes(pk) ? (
                    <FontAwesomeIcon className="like" onClick={onLike} icon={faHeartSolid} />
                ) :
                    (
                        <FontAwesomeIcon className="like" onClick={onLike} icon={faHeartRegular} />
                    )}

                <h5 className="count-likes">
                    {likes.liked_users_pk_list && likes.liked_users_pk_list.length}
                </h5>
                
                {showComment ? (
                    <FontAwesomeIcon icon={faCommentSolid} className="comment" onClick={handleClick} />
                ) : (
                    <FontAwesomeIcon icon={faCommentRegular} className="comment" onClick={handleClick} />
                )}

                <h5>{likes.count_comments}</h5>
                
                {showFormEditDescription ? 
                (<EditDescriptionPost pk={postId} showForm={setShowFowmEditDescription}
                description={description} setDescription={setDescription}/>) 
                : 
                (<div className="description-box">
                    <p className="description">{description}</p>
                        <FontAwesomeIcon icon={faPenToSquare} className="edit-description" onClick={handleEditForm}/>
                </div>)}
            </div>
            {showComment && commentSection}
        </div>
    )
};

ButtonLike.propTypes = {
    likes: PropTypes.shape({
        likers_of_post: PropTypes.array,
        count_comments: PropTypes.number,
    }),
    onLike: PropTypes.func,
    description: PropTypes.string,
    commentSection: PropTypes.func,
}

export default ButtonLike;