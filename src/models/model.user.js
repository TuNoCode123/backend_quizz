import { DataTypes } from "sequelize";
import sequelize from "../conf/config_db.js";

// Định nghĩa model User
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isLength: {
          args: [3, 15], // Độ dài từ 5 đến 15 ký tự
          msg: "Username phải có độ dài từ 5 đến 15 ký tự.",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        isEmail(value) {
          if (!value.includes("@gmail.com")) {
            throw new Error("Email must be from example.com");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: "user",
      validate: {
        isIn: {
          args: [["admin", "user"]],
          msg: "Role phải là 'admin' hoặc 'user'.",
        },
      },
    },
  },
  {
    tableName: "Users", // Tên bảng trong DB
    timestamps: true, // Tắt tính năng tự động thêm createdAt và updatedAt nếu không cần
  }
);
export default User;
