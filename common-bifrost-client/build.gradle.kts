
plugins {
    // Apply the java-library plugin for API and implementation separation.
    `java-library`
}

val kotlinVersion = "1.3.72"
val coroutinesVersion = "1.3.7"
val protobufPlugInVersion = "0.8.16"
val protobufVersion = "3.12.2"
val grpcVersion = "1.38.0"
val grpcKotlinVersion = "1.1.0"

group = "com.dailydesk.common"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_1_8
java.targetCompatibility = JavaVersion.VERSION_1_8

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

 tasks.register<Exec>("local") {
   commandLine("echo", "common-bifrost-client!")
 }


sourceSets {
    main {
        java {
            setSrcDirs(listOf("src/**"))
        }
    }
}

dependencies {

    implementation(project(":protobuf"))

    // Use the Kotlin JDK 8 standard library.
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("io.grpc:grpc-core:${grpcVersion}")
    runtimeOnly("io.grpc:grpc-netty:${grpcVersion}")

    runtimeOnly("io.grpc:grpc-okhttp:${grpcVersion}")
    // This dependency is used internally, and not exposed to consumers on their own compile classpath.
    implementation("com.google.guava:guava:29.0-jre")

    api("org.jetbrains.kotlinx:kotlinx-coroutines-core:${coroutinesVersion}")

    api("io.grpc:grpc-protobuf:${grpcVersion}")
    api("com.google.protobuf:protobuf-java-util:${protobufVersion}")
    api("io.grpc:grpc-kotlin-stub:${grpcKotlinVersion}")

    // This dependency is exported to consumers, that is to say found on their compile classpath.
    api("org.apache.commons:commons-math3:3.6.1")
}
