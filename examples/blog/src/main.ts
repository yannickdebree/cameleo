import { Kernel } from '@leo/core';
import { EjsTemplateEngine, HttpConnexion } from '@leo/http';
import { join } from 'path';
import { FakeArticlesRepository } from './repositories';
import { ARTICLES_REPOSITORY } from './utils/providers';

async function main() {
    const kernel = await Kernel.create({
        injectables: {
            [ARTICLES_REPOSITORY]: new FakeArticlesRepository()
        }
    });
    await kernel.open(new HttpConnexion({
        port: 3000,
        templateEngine: new EjsTemplateEngine({ viewsDirectories: [join(__dirname, '../views')] })
    }));
}

main();
