import { spawn } from "child_process";

async function main() {
    // const a = await ConfigurationAnalyzer.fromGlobals();
    // console.log(a);
    // Build command
    await new Promise<void>(resolve => {
        const proc = spawn('tsc');
        proc.on('exit', () => {
            console.log('Build finished !');
            resolve();
        })
    })

    // return new Promise<void>(resolve => {
    //     const daemon = nodemon({
    //         verbose: true,
    //         watch: ['src'],
    //         ext: "ts",
    //         exec: "tsc && node dist/main.js",
    //         stdin: true,
    //         stdout: true
    //     });

    //     daemon.on('restart', () => {
    //         console.log('Changes detected. Recompiling...');
    //     })

    //     daemon.on('quit', () => {
    //         resolve();
    //     });
    // })
}

main();