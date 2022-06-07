import { Cmd } from "@cameleo/cli";

export class ConsoleController {
    @Cmd()
    default() {
        return 'default';
    }

    @Cmd('serve')
    serve() {
        return 'serve'
        // nodemon({
        //     verbose: true,
        //     watch: ['src'],
        //     ext: "ts",
        //     exec: "tsc"
        // });
    }

    @Cmd("build")
    build() {
        return 'build'
    }
}