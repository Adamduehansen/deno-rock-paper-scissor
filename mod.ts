import { Application } from './deps.ts';
import * as log from 'https://deno.land/std@0.122.0/log/mod.ts';
import router from './index.router.ts';

const port = Number(Deno.env.get('PORT')) || 8080;
const application = new Application();

application.use(router.routes());

if (import.meta.main) {
  log.info(`Starting rock paper scissor server on port ${port}...`);
  await application.listen({
    port: port,
  });
}
