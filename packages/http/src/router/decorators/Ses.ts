import { CustomParameterDecorator } from "./CustomParameterDecorator";

export const Ses = CustomParameterDecorator(({ session }) => session);