import { CustomParameterDecorator } from "./CustomParameterDecorator";

export function Body(key: string, ...parsers: any[]) {
    return CustomParameterDecorator(({ request }) => {
        let data = request.getBody()[key];
        parsers.forEach(pipe => {
            data = pipe(data);
        })
        return data;
    });
}