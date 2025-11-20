import {exec} from 'child_process';
import Client from 'ssh2-sftp-client';

const config = {
    buildCommand: "yarn run build:prod",
    ssh:{
        host: '0.0.0.0',
        port: '22',
        username: 'root',
        password: 'password',
    },
    srcDir: "dist",
    dstDir: "/data/wwwroot/unknown-dir"
}

/**
 * 字符串生成使用的 https://patorjk.com/software/taag/ Star Wars
 */


// Step 1: Build project
console.log('[BUILD 1/3] Starting build process...')
exec(config.buildCommand, async (error, stdout, stderr) => {
    if (error) {
        console.error(`[BUILD ERROR] Message: ${error.message}`)
        return
    }
    if (stderr) {
        console.error(`[BUILD ERROR] Build stderr: ${stderr}`)
    }
    console.log(`[BUILD 2/3]Build stdout: ${stdout}`)
    console.log('[BUILD 3/3 Done]Build process complete.')
    console.log(".______    __    __   __   __       _______      _______   ______   .__   __.  _______ \n" +
        "|   _  \\  |  |  |  | |  | |  |     |       \\    |       \\ /  __  \\  |  \\ |  | |   ____|\n" +
        "|  |_)  | |  |  |  | |  | |  |     |  .--.  |   |  .--.  |  |  |  | |   \\|  | |  |__   \n" +
        "|   _  <  |  |  |  | |  | |  |     |  |  |  |   |  |  |  |  |  |  | |  . `  | |   __|  \n" +
        "|  |_)  | |  `--'  | |  | |  `----.|  '--'  |   |  '--'  |  `--'  | |  |\\   | |  |____ \n" +
        "|______/   \\______/  |__| |_______||_______/    |_______/ \\______/  |__| \\__| |_______|\n")
    await publishDist()
})


// Step 2: Upload to server
const publishDist = async () => {
    // Initialize SFTP client
    const sftp = new Client()

    try {
        await sftp.connect(config.ssh)
        console.log('[DEPLOY 1/3] Connected to SFTP server successfully!');

        // Check destination directory on server
        const isExists = await sftp.exists(config.dstDir)
        if (!isExists) {
            throw new Error(`Dir not exists: ${config.dstDir}`)
        }

        // Remove destination directory on server
        await sftp.rmdir(config.dstDir, true)
        console.log(`[DEPLOY 2/3] Directory deleted: ${config.dstDir}`);

        // Upload
        await sftp.uploadDir(config.srcDir, config.dstDir);
        console.log(`[DEPLOY 3/3 Done] File Upload successfully`);
        console.log(" _______   _______ .______    __        ______   ____    ____     _______   ______   .__   __.  _______ \n" +
            "|       \\ |   ____||   _  \\  |  |      /  __  \\  \\   \\  /   /    |       \\ /  __  \\  |  \\ |  | |   ____|\n" +
            "|  .--.  ||  |__   |  |_)  | |  |     |  |  |  |  \\   \\/   /     |  .--.  |  |  |  | |   \\|  | |  |__   \n" +
            "|  |  |  ||   __|  |   ___/  |  |     |  |  |  |   \\_    _/      |  |  |  |  |  |  | |  . `  | |   __|  \n" +
            "|  '--'  ||  |____ |  |      |  `----.|  `--'  |     |  |        |  '--'  |  `--'  | |  |\\   | |  |____ \n" +
            "|_______/ |_______|| _|      |_______| \\______/      |__|        |_______/ \\______/  |__| \\__| |_______|\n");

    } catch(err) {
        console.error(`[DEPLOY ERROR] ${err.message}`)
    }finally {
        await sftp.end();
    }
}
