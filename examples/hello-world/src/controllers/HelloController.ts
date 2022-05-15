import { Get, Response } from "@leo/http";

export class HelloController {
    @Get()
    async hello() {
        return new Response({ status: 200, body: "Hello world" });
    }
}