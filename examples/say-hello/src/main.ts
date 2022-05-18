import { CliConnexion } from '@cameleo/cli';
import { Kernel } from '@cameleo/core';

async function main() {
    const kernel = await Kernel.create();
    await kernel.open(new CliConnexion());
}

main();
