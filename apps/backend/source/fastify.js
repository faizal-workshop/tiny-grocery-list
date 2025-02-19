import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';

const app = fastify({
    logger: true,
    disableRequestLogging: true,
});

app.register(fastifyCors);

app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups',
    },
});

app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
});

export default app;
