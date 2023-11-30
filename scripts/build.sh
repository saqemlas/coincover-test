#!/bin/bash
set -Eeuxo pipefail

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

[[ -z "${SERVICE}" ]] && echo "docker image service name must be set!"
[[ -z "${ENVIRONMENT}" ]] && echo "environment must be set!"
[[ -z "${SERVICE}" || -z "${ENVIRONMENT}" ]] && die "Required variables not provided"

REPOSITORY="${SERVICE}-${ENVIRONMENT}"
TAG="0.0.1-alpha"

docker build --build-arg "ENVIRONMENT=${ENVIRONMENT}" -t "${REPOSITORY}:${TAG}" .
