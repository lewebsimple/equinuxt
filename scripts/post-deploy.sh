#!/usr/bin/env bash
set -e

#export PATH=$PATH:/opt/plesk/node/20/bin
LOG=~/logs/deploy.log

# Check for pnpm
if ! command -v pnpm &> /dev/null
then
    echo "Error: pnpm could not be found"
    exit -1
fi

echo "Running post-deploy script" > $LOG
pnpm install >> $LOG
pnpm build >> $LOG
pnpm prisma migrate deploy >> $LOG
touch tmp/restart.txt
echo "Finished post-deploy script" >> $LOG
