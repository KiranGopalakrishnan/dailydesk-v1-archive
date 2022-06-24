plugins {
    id("com.moowork.node") version "1.3.1"
}

tasks.register<Exec>("local") {
    commandLine("echo", "bifrost")
}

node {
    // Version of node to use.
    version = "14.17"

    // Version of npm to use.
    npmVersion = "7.6.0"

    // If true, it will download node using above parameters.
    // If false, it will try to use globally installed node.
    download = true

    // Set the work directory for unpacking node
    workDir = file("${project.buildDir}/nodejs")

    // Set the work directory for NPM
    npmWorkDir = file("${project.buildDir}/npm")

    // Set the work directory where node_modules should be located
    nodeModulesDir = file("${project.projectDir}")
}

//tasks.register<com.moowork.gradle.node.npm.NpmTask>("compileTS"){
//    dependsOn("build")
//    setArgs(listOf("build"))
//}