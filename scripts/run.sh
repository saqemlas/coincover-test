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

[[ -z "${SERVICE}" ]] && echo "docker image repository name must be set!"
[[ -z "${ENVIRONMENT}" ]] && echo "environment must be set!"
[[ -z "${SERVICE}" || -z "${ENVIRONMENT}" ]] && die "Required variables not provided"

REPOSITORY="${SERVICE}-${ENVIRONMENT}"

docker run -it --rm --name $REPOSITORY $REPOSITORY
