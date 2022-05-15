export function getMetadata<T, O>({ tag, target, propertyKey, defaultValue }: {
    tag: string,
    target: O,
    propertyKey?: string | symbol,
    defaultValue?: T
}) {
    let value = !!propertyKey ? Reflect.getMetadata(tag, target, propertyKey) : Reflect.getMetadata(tag, target);
    if (!value && !!defaultValue) {
        value = defaultValue;
    }
    return value as T;
}

export function setMetadata<T, O>({ tag, target, propertyKey, value }: {
    tag: string,
    target: O,
    propertyKey?: string | symbol,
    value: T
}) {
    if (!!propertyKey) {
        Reflect.defineMetadata(tag, value, target, propertyKey);
        return;
    }
    Reflect.defineMetadata(tag, value, target);
}