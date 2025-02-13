module.exports = {
    ruleArchive: "latest",
    policies: ["IBM_Accessibility"],
    failLevels: ["violation", "potentialviolation"],
    reportLevels: [
        "violation",
        "potentialviolation",
        "recommendation",
        "potentialrecommendation",
        "manual",
        "pass",
    ],
    outputFormat: ["html", "json"],
    outputFilenameTimestamp: true,
    label: "Seleniumconf",
    outputFolder: "ibm-results",
    baselineFolder: "ibm-baselines",
    cacheFolder: "/tmp/accessibility-checker"
};