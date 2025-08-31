import { DataTypes } from "sequelize";
import sequelize from "../../config/db.sql.js";

const Registration = sequelize.define("Registration", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  status: { type: DataTypes.ENUM("REGISTERED", "CANCELLED"), defaultValue: "REGISTERED" },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Registration;
