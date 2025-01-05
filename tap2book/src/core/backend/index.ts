import Client, { Environment, Local } from './client';

// Initialize the client with the appropriate base URL
const client = new Client(
    process.env.NODE_ENV === 'production'
        ? Environment('production') // Use production environment in prod
        : Local // Use local environment in development
);

export { client };