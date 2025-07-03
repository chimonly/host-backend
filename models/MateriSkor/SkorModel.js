// models/MateriSkor/SkorModel.js
import { DataTypes } from "sequelize";
import db from "../../config/LOGIN/Database.js";
import User from "../LOGIN/UserModel.js";
import Evaluation from "../EVALUASI/EvaluasiModel.js";

const Score = db.define(
  "scores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "uuid",
      },
    },
    evaluation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "evaluations",
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("latihan", "evaluasi", "evaluasi_akhir"),
      allowNull: false,
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.hasMany(Score, { foreignKey: "user_id" });
Score.belongsTo(User, { foreignKey: "user_id" });
Evaluation.hasMany(Score, { foreignKey: "evaluation_id" });
Score.belongsTo(Evaluation, { foreignKey: "evaluation_id" });

export default Score;
