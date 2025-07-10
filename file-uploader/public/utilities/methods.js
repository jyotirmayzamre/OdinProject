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

const fileDetaislDialog = document.getElementById('fileDetailsDialog');
const deleteFileForm = document.getElementById('deleteFileForm');
const container = document.querySelector('.children-container');

container.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if(!link.classList.contains('file-link')) return;

    e.preventDefault();
    const id = Number(link.dataset.id);
    try {
        const response = await fetch(`/file/${id}`);
        const data = await response.json();
        document.getElementById('fileName').textContent = data.name;
        document.getElementById('fileSize').textContent = data.size;
        document.getElementById('fileDate').textContent = new Date(data.timestamp).toLocaleDateString('en-GB');
        const downloadButton = document.getElementById('download');
        downloadButton.href = '/' + data.location.split('/')[1];
        downloadButton.download = data.name;
        fileDetaislDialog.showModal();
        deleteFileForm.action = `/file/${id}/delete`;
        if(deleteFileForm.dataset.parent !== ''){
            deleteFileForm.action += `?parent=${deleteFileForm.dataset.parent}`;
        }

    } catch(e){
        console.error(e);
    }
})

const deleteFileBtn = document.getElementById('deleteFileBtn');

deleteFileBtn.addEventListener('click', (e)=>{
    fileDetaislDialog.close();
})





