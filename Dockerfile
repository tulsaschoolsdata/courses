FROM cypress/browsers:node18.12.0-chrome106-ff106

ARG APP_DIR
ENV CYPRESS_CACHE_FOLDER "/home/node/.cache"

RUN apt update && apt install -y ffmpeg

USER node
WORKDIR $APP_DIR

RUN mkdir -p $CYPRESS_CACHE_FOLDER
