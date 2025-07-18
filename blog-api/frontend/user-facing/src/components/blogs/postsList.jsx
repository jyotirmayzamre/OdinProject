import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { format } from 'date-fns';
import '../../styles/postsList.css';

function Postslist(){
    const posts = useLoaderData();

    return (
        <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={posts}>
                <main>
                    <div className="post-container">
                        {posts.length > 0 && posts.map((post, idx) => {
                            const date = format(post.timestamp, 'dd MMM yyyy, hh:mm a')
                            return (<div className="post" key={idx}>
                                <h3>{post.title}</h3>
                                <p className="email">{post.user.email}</p>
                                <p className="date">{date}</p>
                                <Link  className='read-more' to={`/posts/${post.id}`}>Read More</Link>
                            </div>)
                        })}
                    </div>
                </main>
            </Await>
        </Suspense>
    )
}

export default Postslist;