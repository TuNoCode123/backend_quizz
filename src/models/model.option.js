import { DataTypes } from "sequelize";
import sequelize from "../conf/config_db.js";

const Option = sequelize.define(
  "Option",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "options",
    timestamps: true,
  }
);

export default Option;
