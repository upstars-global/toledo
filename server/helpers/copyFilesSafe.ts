const fs = require('fs/promises');
const path = require('path');

export async function copyFilesSafe(fromDir: string, toDir: string) {
    try {
        // does the source directory exist?
        await fs.access(fromDir);
    } catch {
        return;
    }

    // ensure that the target directory exists
    await fs.mkdir(toDir, { recursive: true });

    const files = await fs.readdir(fromDir);
    if (files.length === 0) return;

    for (const file of files) {
        const src = path.join(fromDir, file);
        const dest = path.join(toDir, file);

        const stat = await fs.stat(src);
        if (!stat.isFile()) continue; // skip folders
        console.log(src, 'copy to  -->', dest)
        await fs.copyFile(src, dest);
    }
}
