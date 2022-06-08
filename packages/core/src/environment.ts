export function isInProduction() {
    const fileRunnerPath = process.argv[1].split('/');
    const fileRunner = fileRunnerPath[fileRunnerPath.length - 1];
    return fileRunner.includes('.js') || process.env.NODE_ENV === "production";
}