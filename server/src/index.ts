import {TodoListApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {TodoListApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TodoListApplication(options);

  // busca e instancia los artecfacto
  await app.boot();

  // para que mysql sea capaz de crear todos los modelos/schemas
  // de la base de datos
  await app.migrateSchema();

  // inicia la app
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
