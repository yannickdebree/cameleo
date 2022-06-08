import { Cmd } from '@cameleo/cli';
import { Inject, Injectable, Logger } from '@cameleo/core';
import { spawn } from 'child_process';
import { } from 'typescript';
import { PROJECT_CONFIGURATION } from '../providers';
import { ProjectConfiguration } from '../WorkspaceConfiguration';

@Injectable()
export class ConsoleController {
    constructor(
        @Inject(PROJECT_CONFIGURATION)
        private projectConfiguration: ProjectConfiguration,
        private logger: Logger
    ) { }

    @Cmd('build')
    async build() {
        this.logger.info('Build in progress...');

        await new Promise<void>(resolve => {
            const ls = spawn('npx', ['tsc']);
            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve();
            });
        });

        this.logger.info('Build finished !');

        return 0;
    }

    @Cmd('serve')
    async serve() {
        await new Promise<void>(resolve => {
            const ls = spawn('npx', ['ts-node', `${this.projectConfiguration.root}/${this.projectConfiguration.main}`]);

            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                resolve();
            });
        })
        // let proc = test();

        // const watcher = watch(`${this.projectConfiguration.root}`);
        // for await (const event of watcher) {
        //     proc.kill();
        //     console.log("Files changed. Recompiling...");
        //     proc = test();
        // }

        return 0;

        // return new Promise<void>(resolve => {
        //     const daemon = nodemon({
        //         verbose: true,
        //         watch: ['src'],
        //         ext: "ts",
        //         exec: "tsc && node dist/main.js",
        //         stdin: true,
        //         stdout: true
        //     });

        //     daemon.on('stdout', (d) => {
        //         console.log(d);
        //     })

        //     daemon.on('restart', () => {
        //         console.log('Changes detected. Recompiling...');
        //     })

        //     daemon.on('quit', () => {
        //         resolve();
        //     });
        // })
    }
}