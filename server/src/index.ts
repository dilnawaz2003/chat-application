import "dotenv/config";
import server from "./app";
import connectDb from "./db/connectDb";

const main = async () => {
  const PORT = process.env.PORT;
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log("Server Listning On Port : ", PORT);
    });
  } catch (error) {
    console.log("Error Connecting DB");
    console.log(error);
    process.exit(1);
  }
};

main();
