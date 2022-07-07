import { CustomParameterDecorator } from "./CustomParameterDecorator";

export const InjectCommand = CustomParameterDecorator(({ command }) => command);