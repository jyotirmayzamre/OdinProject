import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { format } from 'date-fns';
import '../../../../user-facing/src/styles/postsList.css';

function Postslist(){
    const posts = useLoaderData();
    const { revalidate } = useRevalidator();

    const handleClick = async (e) => {
        const postId = e.target.dataset.id;

        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(!response.ok){
            const errorData = await response.json();
            throw new Response(
                JSON.stringify({
                    message: errorData.error || 'Could not fetch post.',
                    status: response.status 
                }),
                {
                    status: response.status, 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
        revalidate();
    }

    return (
        <main>
            <div className="post-container">
                {posts.length > 0 && posts.map((post, idx) => {
                    const date = format(post.timestamp, 'dd MMM yyyy, hh:mm a')
                    return (<div className="post" key={idx}>
                        <h3>{post.title}</h3>
                        <p className="email">{post.user.email}</p>
                        <p className="date">{date}</p>
                        <div className="options">
                            <button className="del-post" data-id={post.id} onClick={handleClick}>Delete</button>
                            <Link  className='read-more' to={`/posts/${post.id}`}>Edit</Link>
                        </div>
                        
                    </div>)
                })}
            </div>
        </main>
    )
}

export default Postslist;