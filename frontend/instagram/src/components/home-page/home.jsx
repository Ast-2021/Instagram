import { useEffect, useState } from "react"
import { request_get_posts } from "../../lib/requests";
import ListPosts from "../../lib/list-posts";
import "./home-style.css"


function Home() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await request_get_posts();
            setData(response.data)
        }

        fetchData();
    }, [])


    return (
        <div>
            <ListPosts data={data}/>
        </div>
    )
}

export default Home