import { CliConnexion } from "@cameleo/cli";
import { Kernel } from "@cameleo/core";
import { join } from 'path';

async function main() {
    const kernel = await Kernel.create({ controllersDirectory: join(__filename, './commands') });
    await kernel.open(new CliConnexion());
}

main();