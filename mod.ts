import 'https://deno.land/x/dotenv/load.ts';
import { log } from './deps.ts';
import application from './server.ts';

const port = Number(Deno.env.get('PORT'));

if (import.meta.main) {
  log.info(`Starting rock paper scissor server on port ${port}...`);
  await application.listen({
    port: port,
  });
}
