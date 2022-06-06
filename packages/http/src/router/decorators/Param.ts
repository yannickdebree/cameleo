import { CustomParameterDecorator } from "./CustomParameterDecorator";

export function Param(parameter: string) {
    return CustomParameterDecorator(request => request.getParams()[parameter]);
}