import { CustomParameterDecorator } from "./CustomParameterDecorator";

export function Param(parameter: string, ...parsers: any[]) {
    return CustomParameterDecorator(({ request }) => {
        let data = request.getParams()[parameter];
        parsers.forEach(pipe => {
            data = pipe(data);
        })
        return data;
    });
}