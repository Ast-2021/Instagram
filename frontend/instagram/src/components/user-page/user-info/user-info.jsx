import Followers from "./followers"
import Following from "./following"
import {
    request_add_or_remove_following,
    request_get_relations
} from "../../../lib/requests"
import get_pk from "../../../lib/pk"
import { useNavigate } from "react-router-dom"

const UserInfo = ({ user, dataRelations, setDataRelations }) => {
    const my_pk = get_pk();
    const navigate = useNavigate();

    const handleClick = async (pk) => {
        try {
            await request_add_or_remove_following(pk)
            const response = await request_get_relations({ pk })
            setDataRelations(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="my-page-info">
                <img className="my-page-user-image" src={user.image} alt="userImage" />
                <div className="box-username-plus-follow">
                    <h4>{user.username}</h4>
                    <div className="follow">
                        <Followers relations={dataRelations} />
                        <Following relations={dataRelations} />
                    </div>
                </div>
            </div>
            <div className="status-user">
                <p>{user.status}</p>
            </div>
            <div className="box-status-plus-button-follow">
                {Number(my_pk) === user.pk ? 
                (<button onClick={()=> {navigate('/edit-user/')}}>Edit profile</button>) 
                : 
                (<button onClick={() => handleClick(user.pk)}>Follow</button>)}
            </div>
        </>
    )
}

export default UserInfo