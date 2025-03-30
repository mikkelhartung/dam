# Digital Asset Management (DAM) system

## Overview

Primary focus areas for this case has been to provide a simple but functional overview of assets through either a grid or list layout. It should be easy to filter assets based on filename and/or filetypes. To elavate the filtering experience, all filters are present in the URL as search parameters.

This demo is deployed and available [here](https://dam-git-main-mikkelhartungs-projects.vercel.app/).

## Tech stack

### Choice: React with Next.js

- **Reasoning**: Next.js makes it easy to start building. A new project can be initialized tailwindcss and eslint out of the box. It provides built-in SSR, so we can fetch assets on the server to give a initial list of results.

- **Trade-off**: While Next.js allows for SSR optimizations, it adds complexity that may not be necessary for a prototype. A Vite + React setup might be simpler if everything should run on the client.

### Choice: URL search parameters for state management.

- **Reasoning**: URL search parameters is a browser standard and today we have modern API's like [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) that makes it easy to manage and sanitize search paramers. The search parameters works as a global state so there is no real need for a state management library. For places where we do need to manage some state, the native react state management is sufficient.

- **Trade-off**: To me, there is no real trade-off. Both the server and client can tap into this and start using the parameters via. URLSearchParams.

### Choice: shadcn/ui for component library

- **Reasoning**: This libray is more of a component distributor, because they do not provide pre-build fixed components, but fully-customizable components that you can change to your liking, because they are built with radix-ui and tailwindcss.

### Choice: Server-side filtering

- **Reasoning**: Works well for big datasets.

- **Trade-off**: Since the dataset is small and mocked, filtering could have been handled client side, but we would not be able to render initial results on page load.
