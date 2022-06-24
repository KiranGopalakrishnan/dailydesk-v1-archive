import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc

    val kotlin_version = "1.3.72"

    val coroutines_version = "1.6.1"

    val protobuf_plug_in_version = "0.8.16"
    val protobuf_version = "3.20.1"
    val grpc_version = "1.46.0"
    val grpc_kotlin_version = "1.3.0"

buildscript {


    repositories {
        mavenCentral()
    }
}

plugins {
    id("com.google.protobuf") version "0.8.16"
    id("idea")
    id("application")
}

group = "com.dailydesk.protobuf"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_1_8
java.targetCompatibility = JavaVersion.VERSION_1_8

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile>().all {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xopt-in=kotlin.RequiresOptIn")
    }
}

dependencies {

    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("javax.annotation:javax.annotation-api:1.3.2")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutines_version")


    // grpc and protobuf
    implementation("com.google.protobuf:protobuf-java:$protobuf_version")
    implementation("com.google.protobuf:protobuf-java-util:$protobuf_version")
    implementation("io.grpc:grpc-netty-shaded:$grpc_version")
    implementation("io.grpc:grpc-protobuf:$grpc_version")
    implementation("io.grpc:grpc-stub:$grpc_version")
    implementation("io.grpc:grpc-kotlin-stub:$grpc_kotlin_version")
}

idea {
    module {
     generatedSourceDirs.addAll(listOf(
       file("${projectDir}/main/grpc"),
       file("${projectDir}/main/java"),
       file("${projectDir}/src/generated/main/grpckt")
     ))
    }
}



 tasks.register<Exec>("local") {
   commandLine("echo", "Protobuf !")
 }

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:$protobuf_version"
    }

    plugins {

        id("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:$grpc_version"
        }

      id("grpckt") {
         artifact = "io.grpc:protoc-gen-grpc-kotlin:$grpc_kotlin_version:jdk8@jar"
      }
    }

    generateProtoTasks {
       all().forEach {
                   it.plugins {
                       id("grpc")
                       id("grpckt")
                   }
                   it.builtins {
                       id("kotlin")
                   }
               }
    }
}