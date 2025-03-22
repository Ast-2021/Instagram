import { Link } from "react-router-dom"

const ListPosts = ({ data }) => {

    return (
        <div className="images">
            {data && data.map((item, index) => (
                <Link to={`/post/${item.pk}`} key={index}>
                    <div key={index} className="image-block">
                        <img key={index} src={item.image} alt="img" className="thumbnail" />
                    </div>
                </Link>
            ))
            }
        </div >
    )
}

export default ListPosts;