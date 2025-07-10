const fs = require('fs/promises');
const path = require('path');

async function deleteFiles(locs){
    await Promise.all(
        locs.map(async (temp) => {
            try {
                const newPath = path.join(__dirname, '../..', temp.location);
                await fs.unlink(newPath);
            } catch(err){
                console.error(err);
            }
        })
    )
}

module.exports = deleteFiles;