

FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 3001

CMD ["bun", "index.ts"]