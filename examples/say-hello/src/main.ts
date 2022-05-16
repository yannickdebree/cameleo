import { CliConnexion } from '@leo/cli';
import { Kernel } from '@leo/core';

async function main() {
    const kernel = await Kernel.create();
    await kernel.open(new CliConnexion());
}

main();
