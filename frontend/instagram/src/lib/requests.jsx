import api from "./api";


const request_get_posts = async () => {
    return api.get('posts/all/')
};

const request_get_token = async ({data}) => {
    return api.post('/users/token/', data)
};

const request_create_post = async ({formData}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.post('/posts/create/', formData)
}

const request_patch_user = async ({pk, formData}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.patch(`/users/update/${pk}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const request_delete_post = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.delete(`posts/delete/${pk}/`);
}

const request_delete_comment = async ({comment}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.delete(`/posts/comment/${comment.id}/`);
}

const request_add_or_remove_like_for_post = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;

    return api.post(`posts/post_add_or_remove_like/${pk}/`);
}

const request_add_or_remove_like_for_comment = async ({comment}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    
    return api.post(`posts/comment_add_or_remove_like/${comment.id}/`)
}

const request_create_comment = async ({postId, formData}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.post(`/posts/${postId}/comment/create/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const request_get_post = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.get(`/posts/${pk}/`);
}

const request_get_likers_of_post = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.get(`posts/likers_of_post/${pk}/`);
}

const request_get_count_likes_of_comment = async ({comment}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.get(`posts/comment_count_likes/${comment.id}/`)
}

const request_get_all_users = async () => {
    return api.get('/users/list/')
}

const request_create_user = async ({data}) => {
    return api.post('/users/create/', data, {
        headers: {
            'Content-Type': 'application/json',
        }})
}

const request_get_user = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.get(`/users/get/${pk}/`)
}

const request_get_all_posts_of_user = async ({pk}) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.get(`posts/list_posts/${pk}/`)
}

const request_get_relations = async ({pk}) => {
    return api.get(`users/relations/${pk}/`)
}

const request_add_or_remove_following = async (pk) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.post(`users/add_or_remove_following/${pk}/`)
}

const request_edit_description_on_post = async (pk, formData) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
    return api.patch(`posts/update/${pk}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}


export {
    request_get_posts, request_get_token, request_create_post,
    request_patch_user, request_delete_post, 
    request_add_or_remove_like_for_post,
    request_add_or_remove_like_for_comment,
    request_delete_comment,request_create_comment, request_get_post, 
    request_get_likers_of_post, request_get_count_likes_of_comment, 
    request_get_all_users, request_get_relations,
    request_create_user, request_get_user, request_get_all_posts_of_user,
    request_add_or_remove_following, request_edit_description_on_post,
 };