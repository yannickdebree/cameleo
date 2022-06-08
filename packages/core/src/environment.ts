export function isInProduction() {
    return process.env.CAMELEO_ENV !== "development";
}