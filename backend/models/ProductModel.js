import { DataTypes,Sequelize } from "sequelize";
import db from "../config/Database.js";

const Product=db.define('product',{
    nama:{
        type: DataTypes.STRING
    },
    harga:{
        type: DataTypes.FLOAT
    }
},{
    freezeTableName:true
});

export default Product;