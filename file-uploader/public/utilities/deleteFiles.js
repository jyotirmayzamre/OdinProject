const fs = require('fs/promises');
const path = require('path');

/*
Things to note: no need to return await fs.link because each async function returns a promise once fully resolved
If a single delete fails, the async function promise is still resolved because error is caught and logged
This ensures that other deletes are not affected
*/
async function deleteFiles(locs){
    const promises = locs.map(async (temp) => {
        try {
            const newPath = path.join(__dirname, '../..', temp.location);
            await fs.unlink(newPath);
        } catch(e){
            console.error(e);
        }
        
    })
    await Promise.all(promises);
}

module.exports = deleteFiles;