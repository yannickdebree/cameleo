import { Command } from "@cameleo/cli";

export class SayHelloController {
    @Command()
    help() {
        return `You can control a robot and do speak it by using those commands :
    hi: The robot will say Hello.
    bye: The robot will say Bye.`;
    }

    @Command("hi")
    hello() {
        return 'The robot says "Hello !"'
    }

    @Command("bye")
    goodBye() {
        return 'The robot says "Good bye !"'
    }

    @Command('*')
    unknowCommand() {
        return 'Unknow command: ...'
    }
}