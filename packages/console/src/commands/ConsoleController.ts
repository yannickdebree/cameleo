import { Cmd } from "@cameleo/cli";
import nodemon from "nodemon";

export class ConsoleController {
    @Cmd()
    default() {
        return 'default';
    }

    @Cmd('serve')
    serve() {
        return new Promise<void>(resolve => {
            const daemon = nodemon({
                verbose: true,
                watch: ['src'],
                ext: "ts",
                exec: "tsc && node dist/main.js",
                stdin: true,
                stdout: true
            });

            daemon.on('restart', () => {
                console.log('Changes detected. Recompiling...');
            })

            daemon.on('quit', () => {
                resolve();
            });
        })
    }
}