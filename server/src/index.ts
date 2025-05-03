import server from "./app";
import "dotenv/config";
import connectDb from "./db/connectDB";

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
