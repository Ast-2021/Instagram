import get_pk from "../../../lib/pk";
import UserPage from "../user-page";


const MyPage = () => {
    const pk = get_pk();
    return (
        <UserPage pk={pk}/>
    )
}

export default MyPage