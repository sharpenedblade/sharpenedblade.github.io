deps:
    npm install
build:
    # Outputs to ./build
    npx vite build
dev:
    npx vite dev
check:
    npx prettier --check .
    npx eslint .
    npx svelte-kit sync
    npx svelte-check --tsconfig ./tsconfig.json
format:
    npx prettier --write .
