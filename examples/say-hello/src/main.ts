import { CliConnexion } from '@cameleo/cli';
import { Kernel } from '@cameleo/core';
import { SayHelloController } from './controllers';

async function main() {
    const kernel = await Kernel.create({ controllers: [SayHelloController] });
    await kernel.open(new CliConnexion());
}

main();
