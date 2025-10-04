import { server } from "./server/Server";

server.listen(process.env.PORT || 5555, () =>
  console.log(`App running on port ${process.env.PORT}`),
);
