const createFolderForm = document.getElementById('createFolderForm');
const createFolderDialog = document.getElementById('createFolderDialog');
const createFolderButton = document.getElementById('createFolderbtn');

createFolderForm.addEventListener('submit', (e) => {
    createFolderDialog.close();
})

createFolderButton.addEventListener('click', (e) => {
    createFolderDialog.showModal();
})


const deleteFolderForm = document.getElementById('deleteFolderForm')
const deleteFolderDialog = document.getElementById('deleteFolderDialog')
const deleteFolderButton = document.getElementById('deleteFolderbtn')

deleteFolderForm.addEventListener('submit', (e) => {
    deleteFolderDialog.close();
})

deleteFolderButton.addEventListener('click', (e) => {
    deleteFolderDialog.showModal();
})