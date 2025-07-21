import { useRef } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import '../../styles/post.css';

function Post(){
    const post = useLoaderData();
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const postId = useParams().id;
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedPost = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            published: document.querySelector('input[name="published"]:checked').value === 'true' ? true : false
        }

        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedPost),
            })
            const data = await response.json();

            if(!response.ok){
                console.error(data.error);
            }
            navigate('/posts');
        } catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <main>
                <section className="edit-post">
                    <h2>Edit post</h2>
                    <div className="edit-post-form">
                        <form onSubmit={handleSubmit}>
                            <div className="field-container">
                                <label htmlFor="title">Title</label>
                                <textarea ref={titleRef} name='title' id='title' value={post.title} rows="2"></textarea>
                            </div>
                            <div className="field-container">
                                <label htmlFor="content">Content</label>
                                <textarea ref={contentRef} name='content' id='content' value={post.content} rows="10"></textarea>
                            </div>
                            <div className="field-container">
                                <label htmlFor="published">Published</label>
                                <div className="radio-container">
                                    <input type='radio' name="published" id="publishedYes" value={true} ></input>
                                    <label htmlFor="publishedYes">Yes</label>
                                </div>
                                <div className="radio-container">
                                    <input type="radio" name="published" id="publishedNo" value={false} ></input>
                                    <label htmlFor="publishedNo">No</label>
                                </div>
                            </div> 
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Post;

