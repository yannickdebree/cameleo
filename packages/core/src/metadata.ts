export function getMetadata<T, O>({ tag, constructor, propertyKey, defaultValue }: {
    tag: string,
    constructor: O,
    propertyKey?: string | symbol,
    defaultValue?: T
}) {
    let value = !!propertyKey ? Reflect.getMetadata(tag, constructor as any, propertyKey) : Reflect.getMetadata(tag, constructor as any);
    if (!value && !!defaultValue) {
        value = defaultValue;
    }
    return value as T;
}

export function setMetadata<T, O>({ tag, constructor, propertyKey, value }: {
    tag: string,
    constructor: O,
    propertyKey?: string | symbol,
    value: T
}) {
    if (!!propertyKey) {
        Reflect.defineMetadata(tag, value, constructor as any, propertyKey);
        return;
    }
    Reflect.defineMetadata(tag, value, constructor as any);
}