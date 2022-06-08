import { C, Cmd, Command, Out, Output } from "@cameleo/cli";

export class SayHelloController {
    @Cmd()
    help(
        @Out
        output: Output
    ) {
        output.push('You can control a robot and do speak it by using those commands :')
        output.push('  hi: The robot will say Hello.');
        output.push('  bye: The robot will say Bye.');
        return 0;
    }

    @Cmd("hi")
    hello(
        @Out
        output: Output
    ) {
        output.push('The robot says "Hello !"');
        return 0;
    }

    @Cmd("bye")
    goodBye(
        @Out
        output: Output
    ) {
        output.push('The robot says "Good bye !"');
        return 0;
    }

    @Cmd('*')
    unknowCommand(
        @C
        command: Command,
        @Out
        output: Output
    ) {
        output.push(`Unknow command: ${command.keyword}`);
        return 1;
    }
}