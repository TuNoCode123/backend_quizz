import { DataTypes } from "sequelize";
import sequelize from "../conf/config_db.js";

const Submission = sequelize.define(
  "Submission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    uncompleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    complete: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "submissions",
    timestamps: true,
  }
);

export default Submission;
