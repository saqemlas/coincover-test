#!/bin/bash
set -Eeuxo pipefail

export AWS_PAGER=""

while :; do
  case "${1:-}" in
    --service)
      SERVICE="${2}"
      shift;;
    --env)
      ENVIRONMENT="${2}"
      shift;;
    *)
      break
  esac
  shift
done

function die () {
    echo "FATAL: ${*}" 1>&2
    exit 1
}

[[ -z "${SERVICE}" ]] && echo "docker image repository name must be set!"
[[ -z "${ENVIRONMENT}" ]] && echo "environment must be set!"
[[ -z "${SERVICE}" || -z "${ENVIRONMENT}" ]] && die "Required variables not provided"

PROJECT="test"
REPOSITORY="${SERVICE}-${ENVIRONMENT}"
TAG="0.0.1-alpha"
ACCOUNT="432067914186"
REGION="eu-west-1"

aws ecr describe-repositories --repository-name "$REPOSITORY" || \
  aws ecr create-repository --repository-name "$REPOSITORY" --image-scanning-configuration scanOnPush=true

docker tag "$REPOSITORY:$TAG" "$ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$REPOSITORY:$TAG"

aws ecr get-login-password | docker login --username AWS --password-stdin "$ACCOUNT.dkr.ecr.$REGION.amazonaws.com"

docker push $ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$REPOSITORY:$TAG

DIGEST="$(aws ecr describe-images --repository-name $REPOSITORY --image-ids imageTag=$TAG | jq -c '.imageDetails[0].imageDigest' -r)"

aws ssm put-parameter --name "/$PROJECT/$SERVICE/$ENVIRONMENT/repository" --type "SecureString" --value "$ACCOUNT.dkr.ecr.$REGION.amazonaws.com/$REPOSITORY@$DIGEST" --overwrite
