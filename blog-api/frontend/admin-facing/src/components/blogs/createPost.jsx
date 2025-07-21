/*
Form for title, content
Need userID
*/

import { useRef } from "react";
import { useNavigate } from "react-router-dom";



function CreatePost(){

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            published: document.querySelector('input[name="published"]').value === 'true' ? true : false
        }

        const response = await fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(postData)
        });

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
                <section className="create-post-form">
                    <div className="form-container">
                        <h2>Create new post</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="field-container">
                                <label htmlFor="title">Title</label>
                                <textarea ref={titleRef} name="title" defaultValue='' rows='2'></textarea>
                            </div>
                            <div className="field-container">
                                <label htmlFor="content">Content</label>
                                <textarea ref={contentRef} name="content" defaultValue='' rows='10'></textarea>
                            </div>
                            <div className="field-container">
                                <label htmlFor="published">Published</label>
                                <div className="radio-container">
                                    <label htmlFor="publishedYes">Yes</label>
                                    <input type="radio" name="published" id="publishedYes" value={true}></input>
                                </div>
                                <div className="radio-container">
                                    <label htmlFor="publishedNo">No</label>
                                    <input type="radio" name="published" id="publishedNo" value={false}></input>
                                </div>
                            </div>
                            <button type="submit">Create post</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )

}

export default CreatePost;