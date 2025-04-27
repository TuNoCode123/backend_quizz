import { DataTypes } from "sequelize";
import sequelize from "../conf/config_db.js";

const Answer = sequelize.define(
  "Answer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "answers",
    timestamps: true,
  }
);

export default Answer;
