import { useEffect, useState } from 'react';
import { request_get_post, request_get_likers_of_post } from '../../lib/requests';

const usePostData = (pk) => {
    const [data, setData] = useState(null);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await request_get_post({pk}) 
                setData(response.data);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Ошибка при получении данных поста:', error);
            }
        };

        const fetchPostLikes = async () => {
            try {
                const response = await request_get_likers_of_post({pk})
                setLikes(response.data);
            } catch (error) {
                console.error('Ошибка при получении лайков поста:', error);
            }
        };

        fetchPostData();
        fetchPostLikes();
    }, [pk]);

    return { data, likes, comments, setLikes, setComments };
};

export default usePostData;