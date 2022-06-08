import { C, Cmd, Command } from "@cameleo/cli";

export class SayHelloController {
    @Cmd()
    help() {
        console.log(`You can control a robot and do speak it by using those commands :
    hi: The robot will say Hello.
    bye: The robot will say Bye.`);
        return 0;
    }

    @Cmd("hi")
    hello() {
        console.log('The robot says "Hello !"');
        return 0;
    }

    @Cmd("bye")
    goodBye() {
        console.log('The robot says "Good bye !"');
        return 0;
    }

    @Cmd('*')
    unknowCommand(
        @C
        command: Command
    ) {
        console.log(`Unknow command: ${command.keyword}`);
        return 1;
    }
}