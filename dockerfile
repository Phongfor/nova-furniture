# STAGE 1: BUILD
# Dùng image có sẵn Maven + Java 21 để build project
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy pom.xml trước — để Docker cache dependencies
# Lần sau build lại không cần download lại nếu pom không đổi
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy toàn bộ source code
COPY src ./src

# Build thành file .jar, bỏ qua test
RUN mvn clean package -DskipTests -B

# ================================

# STAGE 2: RUNTIME
# Chỉ cần JRE (nhẹ hơn JDK) để chạy file .jar
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy file .jar từ stage build sang
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]