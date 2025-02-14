import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';

const app = fastify({
    logger: true,
    disableRequestLogging: true
});

app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
});

app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
});

app.register(fastifyCors);
app.register(fastifyMultipart);

export default app;
