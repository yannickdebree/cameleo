export function isInProduction() {
    const runningFileAbsolutePath = process.argv[1].split('/');
    const runningFileName = runningFileAbsolutePath[runningFileAbsolutePath.length - 1];
    return runningFileName.includes('.js') || process.env.NODE_ENV === "production";
}