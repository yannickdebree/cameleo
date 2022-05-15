export function isInProduction() {
    return process.env.NODE_ENV === "production";
}