const configs = {
    "alpa": require("./alpa").default,
    "thor": require("./thor").default,
}

export default function (project: "alpa" | "thor") {
    return configs[project];
}