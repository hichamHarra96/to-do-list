module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testMatch: ["**/*.test.ts", "**/*.spec.ts"],
    extensionsToTreatAsEsm: [".ts"],
};