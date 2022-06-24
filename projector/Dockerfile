FROM gradle:jdk13 as builder
USER root
WORKDIR /builder
ADD . /builder
RUN gradle build

FROM adoptopenjdk/openjdk13:alpine-jre
WORKDIR /app
EXPOSE 8080
COPY --from=builder /builder/build/libs/projector-0.0.1.jar .
CMD ["java", "-jar", "projector-0.0.1.jar"]