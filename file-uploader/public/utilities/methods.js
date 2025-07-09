const createFolderForm = document.getElementById('createFolderForm');
const createFolderDialog = document.getElementById('createFolderDialog');
const createFolderButton = document.getElementById('createFolderbtn');

createFolderForm.addEventListener('submit', (e) => {
    createFolderDialog.close();
})

createFolderButton.addEventListener('click', (e) => {
    console.log('Clicked');
    createFolderDialog.showModal();
})