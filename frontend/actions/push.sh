source ./ENV
REV=$(git rev-parse --verify HEAD)
docker push "${ECR_TAG}:${REV}"