FROM koosiedemoer/netty-tcnative-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} curation.jar
ENTRYPOINT ["java","-jar","/curation.jar"]
