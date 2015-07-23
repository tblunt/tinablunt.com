#!/bin/bash

set -e

DEPLOY_USER=deploy
DEPLOY_HOST=deagol
echo "SCP files ${DEPLOY_HOST} "
scp ./* deploy@deagol:bloggportalen-api/
echo "SCP:ed files ${DEPLOY_HOST} "
#DEPLOY_DIR=/opt/websites/api.bloggportalen.se/web
#PYTHON=/opt/websites/api.bloggportalen.se/env/bin/pypy
#WEB_PROC_NAME=api:*

#echo "Stopping ${WEB_PROC_NAME}..."
#supervisorctl stop $WEB_PROC_NAME
#cp -r *.py static templates /home/deploy/bloggportalen-api
#chown -R www-data /home/deploy/bloggportalen-api
#echo "Starting ${WEB_PROC_NAME}..."
#supervisorctl start $WEB_PROC_NAME
#echo "Done!"
