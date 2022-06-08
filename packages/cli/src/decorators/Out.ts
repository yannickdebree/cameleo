import { CustomParameterDecorator } from "./CustomParameterDecorator";

export const Out = CustomParameterDecorator(({ output }) => output);