import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request_get_all_posts_of_user, request_get_relations,
         request_get_user } from "../../lib/requests.jsx";
import ListPosts from "../../lib/list-posts.jsx";
import UserInfo from "./user-info/user-info.jsx";
import "./user-page-style.css"


function UserPage({ pk: propPk }) {
    const { pk: paramsPk } = useParams();
    const pk = propPk || paramsPk;

    const [dataPosts, setDataPosts] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [dataRelations, setDataRelations] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {

            try {
                const [dataResponse, relationsResponse, userResponse] = await Promise.all([
                    request_get_all_posts_of_user({ pk }),
                    request_get_relations({ pk }),
                    request_get_user({ pk })
                ]);

                setDataPosts(Object.values(dataResponse.data))
                setDataUser(userResponse.data)
                setDataRelations(relationsResponse.data)

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [pk]);


    return (
        <div className="images-page">
            <div className="main-box-info">
                <UserInfo user={dataUser} dataRelations={dataRelations} setDataRelations={setDataRelations}/>
            </div>

            <div className="user-page-images">
                <ListPosts data={dataPosts} />
            </div>
        </div>
    );
}

export default UserPage