#!/bin/bash
REMOTE_USER="maxim"
REMOTE_HOST="139.144.178.100"
REMOTE_DIR_SERVER="/home/maxim/apps/servers/flashcards"
LOCAL_BUILD_DIR_SERVER="/c/projects/_my_projects/flashcards/dist"
PM2_PROCESS_NAME="your_pm2_process_name"

# Building server
echo -e "\e[36mRunning npm build command (Server)...\e[0m"
npm run build

# Connecting to server
echo -e "\e[36mConnecting to the server...\e[0m"



# echo -e "\e[36mStopping PM2 process: ${PM2_PROCESS_NAME}...\e[0m"
# pm2 stop ${PM2_PROCESS_NAME}

# Connect to the server via SSH
ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF
echo -e "\e[36mNavigating to project directory and removing existing build directory (Server)...\e[0m"
cd ${REMOTE_DIR_SERVER}
rm -rf dist
EOF

# Copy the build files to the remote server
echo -e "\e[36mCopying build files to the remote server...\e[0m"
scp -r ${LOCAL_BUILD_DIR_SERVER} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR_SERVER}/dist


# # Step 4: Connect to the server and start the PM2 process
# echo -e "\e[32mConnecting to the server and starting PM2 process...\e[0m"
# ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF
#     echo -e "\e[32mStarting PM2 process: ${PM2_PROCESS_NAME}...\e[0m"
#     pm2 start ${PM2_PROCESS_NAME}
# EOF