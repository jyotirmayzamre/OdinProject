import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import { format } from 'date-fns';
import '../../styles/post.css';
import { useRef } from "react";
import { jwtDecode } from 'jwt-decode';

function Post(){
    const post = useLoaderData();
    const commentRef = useRef(null);
    const postId = useParams().id;
    const token = localStorage.getItem('token');
    const { revalidate } = useRevalidator();
    let userId;
    if(token){
        const decoded = jwtDecode(token);
        userId = decoded.id;
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        const commentData = {
            content: commentRef.current.value,
            postId: postId,
            userId: userId
        }
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(commentData),
            });

            const data = await response.json();

            if(!response.ok){
                console.error(data.error);
            }
            revalidate();
        } catch(err){
            console.error(err);
        }
    }


    return (
        <main>
            <article className='post-content-area'>
                <h1 className='post-title'>{post.title}</h1>
                <div className="post-meta">
                    <span className="post-author">{post.user.email}</span>
                    <span className="post-date">{format(post.timestamp, 'dd MMM yyyy, hh:mm a')}</span>
                </div>
                <div className="post-body">
                    <p>{post.content}</p>
                </div>
            </article>
            <section className="comments-section">
                <h2>Comments</h2>
                <div className="new-comment-form">
                    <h3>Leave a Comment</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea ref={commentRef} placeholder="Write your comment here..." rows="5"></textarea>
                        <button type="submit">Post Comment</button>
                    </form>
                </div>
                <div className="comment-list">
                    {post.comments.length > 0 && post.comments.map((comment, idx) => {
                        return (
                            <div className="comment-item" key={idx}>
                                <p className="comment-author"><strong>{comment.user.email}</strong> on {format(comment.timestamp, 'dd MMM yyyy, hh:mm a')}</p>
                                <p className="comment-content">{comment.content}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default Post;