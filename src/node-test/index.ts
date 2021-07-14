import express, { Application} from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
// import indexRoutes from './routes/index';

import { users} from './routes';

const app: Application = express();

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/user', graphqlHTTP({
  rootValue: users.rootValue,
  schema: users.schema,
  graphiql: true
}));

app.listen(3000);
console.log('Server on port', 3000);