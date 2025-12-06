deps:
    pnpm install --frozen-lockfile
build:
    # Outputs to ./build
    pnpm vite build
    ./font-subset.py './content/**/*.md' build/fonts/*.woff2
dev:
    pnpm vite dev
check:
    pnpm prettier --check .
    pnpm eslint .
    pnpm svelte-kit sync
    pnpm svelte-check --tsconfig ./tsconfig.json
format:
    pnpm prettier --write .
