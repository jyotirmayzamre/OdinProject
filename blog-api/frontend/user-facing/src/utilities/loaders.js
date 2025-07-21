export async function getPosts(){
    const response = await fetch('http://localhost:3000/posts', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Response(
            JSON.stringify({
                message: errorData.error || 'Could not fetch posts.',
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
    const data = await response.json();
    return data;
    
}

export async function getPost({ params }){
    const response = await fetch(`http://localhost:3000/posts/${params.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Response(
            JSON.stringify({
                message: errorData.error || 'Could not fetch post details.',
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
    const data = await response.json();
    return data.post;
}


