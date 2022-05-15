
import { Kernel } from '@leo/core';
import { HttpConnexion } from '@leo/http';
import { BlogController } from './controllers/BlogController';

async function main() {
    const kernel = Kernel.create({ controllers: [BlogController] });
    await kernel.open(new HttpConnexion({ port: 3000 }));
}

main();
