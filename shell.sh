#! /bin/bash

PATH_NAME=$(pwd)
echo $PATH_NAME

cd backend/curator

echo " > 프로젝트 빌드 시작 "
mvn clean package -P prod

echo " > 프로젝트 빌드 성공 "
