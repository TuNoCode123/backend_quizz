import { Sequelize } from "sequelize";
import "dotenv/config";
const DB_NAME = process.env.DB_NAME ?? "quiz_app";
const DB_USER = process.env.DB_USER ?? "sa";
const DB_PASS = process.env.DB_PASSWORD ?? "Soimatdo@2468";
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = process.env.DB_PORT ?? 5432;
const DB_DIALECT = process.env.DB_DIALECT ?? "mssql";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST, // hoặc IP database server
  dialect: "postgres",
  port: DB_PORT,
  logging: false, // Bật tắt log câu SQL
});

export default sequelize;
