import { Cmd } from '@cameleo/cli';
import { Inject, Injectable, Logger } from '@cameleo/core';
import { spawn } from 'child_process';
import { watch } from 'fs';
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
            const proc = spawn('tsc');
            proc.on('exit', () => {
                resolve();
            })
        });

        this.logger.info('Build finished !');

        return 0;
    }

    @Cmd('serve')
    async serve() {
        new Promise<void>(resolve => {
            const watcher = watch(`${this.projectConfiguration.root}`, (event, filename) => {
                console.log('Changes detected. Recompiling...');
            });

            process.on('exit', () => {
                watcher.close();
                console.log('Process killed !');
                resolve();
            })
        });

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