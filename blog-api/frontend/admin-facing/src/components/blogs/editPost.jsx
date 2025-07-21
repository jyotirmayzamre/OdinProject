import { useRef } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import '../../styles/post.css';

function EditPost(){
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

        const response = await fetch(`http://localhost:3000/posts/${postId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedPost),
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
        navigate('/posts');
    
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
                                <textarea ref={titleRef} name='title' id='title' defaultValue={post.title} rows="2"></textarea>
                            </div>
                            <div className="field-container">
                                <label htmlFor="content">Content</label>
                                <textarea ref={contentRef} name='content' id='content' defaultValue={post.content} rows="10"></textarea>
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

export default EditPost;

