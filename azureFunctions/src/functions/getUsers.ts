import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { MongoClient, UUID } from "mongodb";
// import { UUID } from "mongodb";

const url =
  "mongodb://techop-rpa-db:t82Zs7yvvYhjmHxt2UP1ltSVeV5nXgjMGi1YkK2e2iENhU8L1btd5D2jkql39du00567Ikuh4louACDbIkXZVQ==@techop-rpa-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@techop-rpa-db@";
const client = new MongoClient(url);

// let myUsers = [
//   {
//       _id: UUID.generate(),
//       email: "halpert@techopsolutions.net",
//       firstName: 'Jim',
//       lastName: 'Halpert',
//       occupation: 'Sales',
//   },
//   {
//       _id: UUID.generate(),
//       email: "pam@techopsolutions.net",
//       firstName: 'Pam',
//       lastName: 'Beasley',
//       occupation: 'Receptionist',
//   },
//   {
//       _id: UUID.generate(),
//       email: "dwight@techopsolutions.net",
//       firstName: 'Dwight',
//       lastName: 'Schrute',
//       occupation: 'Assistant',
//   },
//   {
//       _id: UUID.generate(),
//       email: "oscar@techopsolutions.net",
//       firstName: 'Oscar',
//       lastName: 'Martinez',
//       occupation: 'Accountant',
//   },
//   {
//       _id: UUID.generate(),
//       email: "creed@techopsolutions.net",
//       firstName: 'Creed',
//       lastName: 'Bratton',
//       occupation: 'N/A',
//   },
// ]

export async function getUsers(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // KEEP this for seeding DB
  // context.log('SEEDING DB')
  // await usersCollection.deleteMany({})
  // await usersCollection.insertMany(myUsers)

  await client.connect();
  const db = client.db("techopRpaDemo");
  const usersCollection = db.collection("Users");
  const result = await usersCollection.find({}).toArray();
  context.log("USERS: ", result);

  return { status: 200, jsonBody: result };
}

app.http("getUsers", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getUsers,
});
