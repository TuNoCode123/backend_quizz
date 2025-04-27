import express from "express";
import sequelize from "./src/conf/config_db.js";
import * as modals from "./src/models/index.js";
import router from "./src/routers/index.js";
const app = express();
const PORT = 8888;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối SQL Server thành công!");
    await sequelize.sync({ alter: true }); // or { force: true } nếu muốn drop table cũ
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("Không thể kết nối:", error);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);
app.listen(PORT, () => {
  testConnection();
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
