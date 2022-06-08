import { ConfigurationAnalyzer } from "./ConfigurationAnalyzer";

async function main() {
    const a = await ConfigurationAnalyzer.fromGlobals();
    console.log(a);

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