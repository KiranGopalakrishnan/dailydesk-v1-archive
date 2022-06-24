FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM mhart/alpine-node
RUN npm install serve -g
WORKDIR /app
COPY --from=builder /src/static .
CMD serve -p 3000 -s .