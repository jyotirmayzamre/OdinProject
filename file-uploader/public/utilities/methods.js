const createFolderForm = document.getElementById('createFolderForm');
const createFolderDialog = document.getElementById('createFolderDialog');
const createFolderButton = document.getElementById('createFolderbtn');

createFolderForm.addEventListener('submit', (e) => {
    createFolderDialog.close();
})

createFolderButton.addEventListener('click', (e) => {
    createFolderDialog.showModal();
})

const uploadFileForm = document.getElementById('uploadFileForm');
const uploadFileDialog = document.getElementById("uploadFileDialog");
const uploadFileButton = document.getElementById('uploadFilebtn');

uploadFileForm.addEventListener('submit', (e)=>{
    uploadFileDialog.close();
})

uploadFileButton.addEventListener('click', (e) => {
    console.log('clicked');
    uploadFileDialog.showModal();
})


const deleteFolderForm = document.getElementById('deleteFolderForm')
const deleteFolderDialog = document.getElementById('deleteFolderDialog')
const deleteFolderButton = document.getElementById('deleteFolderbtn')

if(deleteFolderButton && deleteFolderDialog && deleteFolderForm){
    deleteFolderForm.addEventListener('submit', (e) => {
        deleteFolderDialog.close();
    })

    deleteFolderButton.addEventListener('click', (e) => {
        deleteFolderDialog.showModal();
    })
}

const fileDetaislDialog = document.getElementById('fileDetailsDialog')

document.querySelectorAll('.file-link').forEach((link) => {
    link.addEventListener('click', async (e) => {
        const id = Number(link.dataset.id);

        try {
            const response = await fetch(`/file/${id}`);
            const data = await response.json();
            document.getElementById('fileName').textContent = data.name;
            document.getElementById('fileSize').textContent = data.size;
            document.getElementById('fileDate').textContent = new Date(data.timestamp).toLocaleDateString('en-GB');
            fileDetaislDialog.showModal();
        } catch(e){
            console.error(e);
        }
        
    })
    
})



