FROM node:12

RUN git clone https://github.com/ruigouveiamaciel/gdocs.git /gdocs && cd /gdocs && yarn install
