import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

const client = feathers();

const restClient = rest('http://localhost:3030');

client.configure(restClient.axios(axios))
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
