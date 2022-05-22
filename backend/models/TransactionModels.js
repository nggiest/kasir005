import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Transaction=db.define('transactions',{
    date:{
        type: DataTypes.DATE
    },
    customer:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

export default Transaction;