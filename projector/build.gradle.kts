import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.0"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	kotlin("plugin.spring") version "1.3.61"
	id ("com.google.protobuf") version "0.8.16"
	application
}

val kotlinVersion = "1.3.72"
val coroutinesVersion = "1.3.7"
val protobufPlugInVersion = "0.8.16"
val protobufVersion = "3.12.2"
val grpcVersion = "1.38.0"
val grpcKotlinVersion = "1.1.0"

group = "com.dailydesk.projector"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_1_8

application {
    mainClassName = "com.dailydesk.projector.ApplicationKt"
}


repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
}



dependencies {
	implementation(project(":common-service-utils"))

	implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
	implementation("org.springframework.boot:spring-boot-starter-jersey")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("com.google.code.gson:gson:2.8.6")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}


 tasks.register<Exec>("local") {
   commandLine("echo", "Projector !")
 }
//tasks.register("package") {
//	//dependsOn("build")
//	exec {
//		executable("./actions/package.sh")
//	}
//}
//
//tasks.register("push") {
//    exec {
//		executable("./actions/push.sh")
//	}
//}
