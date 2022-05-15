import { Kernel } from '@leo/core';
import { HttpConnexion } from '@leo/http';

async function main() {
    const kernel = await Kernel.create();
    await kernel.open(new HttpConnexion({
        port: 3001,
    }));
}

main();
