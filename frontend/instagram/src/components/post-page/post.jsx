import { useParams, useNavigate } from 'react-router-dom';
import usePostData from './post-data';
import AuthorInfo from './author-info';
import PostImage from './post-image';
import ButtonLike from './button-like';
import CommentsSection from './comments-section/comment-section';
import { request_delete_post, request_get_likers_of_post, 
         request_add_or_remove_like_for_post } from '../../lib/requests';
import get_pk from '../../lib/pk';
import './post-style.css'


const Post = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const { data, likes, comments, setLikes, setComments } = usePostData(pk);
    const userPK = get_pk();

    if (!data) {
        return <div>Loading...</div>;
    }
    
    const handleDelete = async () => {
        try {
            await request_delete_post({ pk })
            navigate('/');
            alert('Пост успешно удалён!');
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
            alert('Не удалось удалить пост');
        }
    };

    const handleLike = async () => {
        try {
            await request_add_or_remove_like_for_post({ pk })
            const response = await request_get_likers_of_post({ pk })
            setLikes(response.data);
        } catch (error) {
            console.error('Ошибка при лайке поста:', error);
        }
    };

    return (
        <div className="image-page">
            <AuthorInfo author={data.author} />
            <PostImage image={data.image} />
            <ButtonLike likes={likes} onLike={handleLike} postDescription={data.description} postId={pk}
                commentSection={<CommentsSection postId={pk} comments={comments} setComments={setComments} />} />
            <div className="delete-post-box">
                {data.author === Number(userPK) && <button className="delete-button-post" onClick={handleDelete}>Delete post</button>}
            </div>
        </div>
    );
};

export default Post;