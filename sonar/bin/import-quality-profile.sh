#!/bin/bash

set -e

THIS_SCRIPT_DIR=$(dirname "$0")
REL_BASE_DIR='../..'
BASE_DIR=$(cd "${THIS_SCRIPT_DIR}/${REL_BASE_DIR}" && pwd)

cd "${BASE_DIR}/sonar" || exit

set -a
source .env
set +a

QUALITY_PROFILE_FILE=conf/niji-typescript-quality-profile.xml

echo "Import quality profile…"
curl -s -u "${SONAR_USERNAME}:${SONAR_PASSWORD}" -F "backup=@${QUALITY_PROFILE_FILE}" "${SONAR_HOST_URL}/api/qualityprofiles/restore" > /dev/null
echo "Ok."
