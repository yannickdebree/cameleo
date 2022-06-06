import { CustomParameterDecorator } from "./CustomParameterDecorator";

export function Param(parameter: string, ...pipes: any[]) {
    return CustomParameterDecorator(request => {
        let data = request.getParams()[parameter];
        pipes.forEach(pipe => {
            data = pipe(data);
        })
        return data;
    });
}