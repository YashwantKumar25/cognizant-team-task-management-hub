
import { createApp } from "./app";
import "dotenv/config";

const port = Number(process.env.PORT || 4000);
const app = createApp();

app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
