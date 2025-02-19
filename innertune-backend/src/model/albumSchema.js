import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Album = sequelize.define('Album', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bgColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Albums',
  timestamps: true,
});

export default Album;