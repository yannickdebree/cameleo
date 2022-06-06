import { Cmd, Command } from "@cameleo/cli";

export class SayHelloController {
    @Cmd()
    help() {
        return `You can control a robot and do speak it by using those commands :
    hi: The robot will say Hello.
    bye: The robot will say Bye.`;
    }

    @Cmd("hi")
    hello() {
        return 'The robot says "Hello !"'
    }

    @Cmd("bye")
    goodBye() {
        return 'The robot says "Good bye !"'
    }

    @Cmd('*')
    unknowCommand(command: Command) {
        return `Unknow command: ${command.keyword}`
    }
}