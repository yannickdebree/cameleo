import { CustomParameterDecorator } from "./CustomParameterDecorator";

export const Req = CustomParameterDecorator(({ request }) => request);