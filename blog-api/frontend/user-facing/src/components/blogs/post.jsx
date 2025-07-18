import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { format } from 'date-fns';
import '../../styles/post.css';

function Post(){
    const post = useLoaderData();
    return (
        <Suspense fallback={<p>Loading post...</p>}>
            <Await resolve={post}>
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
                            <form>
                                <textarea placeholder="Write your comment here..." rows="5"></textarea>
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
            </Await>
        </Suspense>
    )
}

export default Post;