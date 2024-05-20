const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize')
const User  = require('./user');

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const State = sequelize.define('State', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Address = sequelize.define('Address', {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });



// Establish relationships
User.hasMany(Address, { foreignKey: 'uId', as: 'addresses' });

Country.hasMany(State, { as: 'states' });
State.belongsTo(Country, { foreignKey: 'cId', as: 'country' });

State.hasMany(City, { as: 'cities' });
City.belongsTo(State, { foreignKey: 'sId', as: 'state' });

Address.belongsTo(City, { foreignKey: 'ciId', as: 'city' });
Address.belongsTo(State, { foreignKey: 'sId', as: 'state' });
Address.belongsTo(Country, { foreignKey: 'cId', as: 'country' });
Address.belongsTo(User, { foreignKey: 'uid', as: 'user' });

module.exports = { 
    Country, 
    State, 
    City ,
    Address
};
