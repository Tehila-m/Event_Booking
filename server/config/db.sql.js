import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Project4_EventBooking_sql_db", "event_user", "duksua450", {
  dialect: "mssql",
  host: "DESKTOP-SSNMLFD", 
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  logging: console.log
});

export const connectSQLDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ SQL Server connected successfully");
    await sequelize.sync();
    console.log("✅ SQL Server synced successfully");
  } catch (err) {
    console.error("❌ Failed to connect or sync SQL Server:", err);
  }
};

export default sequelize;
