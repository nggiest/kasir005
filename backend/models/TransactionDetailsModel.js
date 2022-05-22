import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const TransactionDetails=db.define('transaction_details',{
    product:{
        type: DataTypes.STRING
    },
    harga:{
        type: DataTypes.FLOAT
    },
    qty:{
        type: DataTypes.FLOAT
    },

},{
    freezeTableName:true
});

export default TransactionDetails;