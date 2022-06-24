source ./ENV
REV=$(git rev-parse --verify HEAD)
docker build -t "${ECR_TAG}:${REV}" -f ./Dockerfile .
