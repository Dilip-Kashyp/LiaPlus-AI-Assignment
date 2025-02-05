// models/index.js
import { Sequelize } from "sequelize";
import { User } from "./userSchema.js";
import { Scholarship } from './scholershipSchema.js';
import { Application } from "./application.js";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const models = {
  User: User(sequelize),
  Scholarship: Scholarship(sequelize),
  Application: Application(sequelize),
};

models.User.hasMany(models.Application, { foreignKey: "userId" });
models.Application.belongsTo(models.User, { foreignKey: "userId" });

models.Scholarship.hasMany(models.Application, { foreignKey: "scholarshipId" });
models.Application.belongsTo(models.Scholarship, { foreignKey: "scholarshipId" });

export { sequelize, models };
