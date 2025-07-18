export async function getPosts(){
    try {
        const response = await fetch('http://localhost:3000/posts', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();

        if(!response.ok){
            throw new Error('something went wrong')
        }
        
        return data;
    } catch(err){
        console.error(err);
    }
}

export async function getPost({ params }){
    try {
        const response = await fetch(`http://localhost:3000/posts/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();

        if(!response.ok){
            throw new Error('something went wrong')
        }
        return data.post;
    } catch(err){
        console.error(err);
    }
}


