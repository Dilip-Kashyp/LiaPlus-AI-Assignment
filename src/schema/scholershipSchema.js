import { DataTypes } from "sequelize";

const Scholarship = (sequelize) => {
  const Scholarship = sequelize.define("Scholarship", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    religious: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    min_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


    max_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    institution_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    disability: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    ex_service: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  }, {
    sequelize,
    modelName: "Scholarship",
    tableName: "scholarships",
    timestamps: true,
  });

  return Scholarship;
};

export { Scholarship };
