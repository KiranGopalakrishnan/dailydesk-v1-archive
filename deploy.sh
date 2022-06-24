set -e

IMAGE_PREFIX=349142834852.dkr.ecr.us-east-2.amazonaws.com
COMMIT_HASH="$(git rev-parse HEAD)"
cd ./deployments
kustomize edit set image "$IMAGE_PREFIX/projector-frontend:$COMMIT_HASH"
kustomize edit set image "$IMAGE_PREFIX/projector-backend:$COMMIT_HASH"
kustomize build
kubectl apply -k .