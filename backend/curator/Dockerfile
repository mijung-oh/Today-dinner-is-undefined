FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} curation.jar
ENTRYPOINT ["java","-jar","/curation.jar"]