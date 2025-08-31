// import Fastify from 'fastify';
// import fastifyCors from '@fastify/cors';
// import fastifyFormbody from '@fastify/formbody';
// import fastifyMultipart from "@fastify/multipart";
// import corsOptions from './config/corsOptions.js';

// import userRoutes from './routes/user.routes.js';
// import eventRoutes from './routes/event.routes.js';
// import registrationRoutes from './routes/registration.routes.js';
// import feedbackRoutes from './routes/feedback.routes.js';
// // import authRoutes from './routes/auth.routes.js';
// import reminderRoutes from './routes/reminder.routes.js';

// // import { authenticate } from './middlewares/auth.js';

// const app = Fastify({ logger: true });

// await app.register(fastifyCors, corsOptions);
// await app.register(fastifyFormbody);
// await app.register(fastifyMultipart);


// // app.decorate("authenticate", authenticate);

// // app.register(authRoutes, { prefix: '/api' });
// app.register(userRoutes, { prefix: '/api' });
// app.register(eventRoutes, { prefix: '/api' });
// app.register(registrationRoutes, { prefix: '/api' });
// app.register(feedbackRoutes, { prefix: '/api' });
// app.register(reminderRoutes, { prefix: '/api' });
// fastify.register(fastifyFormbody);
// fastify.register(fastifyMultipart);


// export default app;
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyMultipart from "@fastify/multipart";
import corsOptions from './config/corsOptions.js';

import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import registrationRoutes from './routes/registration.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import reminderRoutes from './routes/reminder.routes.js';

// import authRoutes from './routes/auth.routes.js';
// import { authenticate } from './middlewares/auth.js';



const app = Fastify({ logger: true });

await app.register(fastifyCors, corsOptions);
await app.register(fastifyFormbody);
await app.register(fastifyMultipart);

// app.decorate("authenticate", authenticate);

// app.register(authRoutes, { prefix: '/api' });
app.register(userRoutes, { prefix: '/api' });
app.register(eventRoutes, { prefix: '/api' });
app.register(registrationRoutes, { prefix: '/api' });
app.register(feedbackRoutes, { prefix: '/api' });
app.register(reminderRoutes, { prefix: '/api' });

export default app;
