plugins {
    kotlin("jvm") version "1.7.0" apply false
}

allprojects {
    repositories {
        mavenLocal()
        mavenCentral()
        google()
    }
}

 tasks.register<Exec>("startAll") {
    subprojects.forEach { pr -> this.dependsOn("${pr.path}:local") }
 }