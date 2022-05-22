import {Op} from 'sequelize';
import Transaction from '../models/TransactionModels';

export const getTransaction = async (req, res) => {
    try {
        const dataTransaction = await Transaction.findAll({
            attributes: ['id', 'date','customer','product','harga','qty']
        });
        res.json(dataTransaction);
    } catch (error) {
        console.log(error);
    }
}

export const getTransactionbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const dataTransaction = await Transaction.findByPk(id);
        res.json(dataTransaction);
    } catch (error) {
        console.log(error);
    }
}

export const AddTransaction = async (req, res) => {
    const { date, customer, product, harga, qty } = req.body.transaction;
    try {
        await Transaction.create({
            date:date,
            customer:customer,
            product:product,
            harga:harga,
            qty:qty,
        });
        res.json({ msg: "Tambah Transaction Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const UpdateTransaction = async (req, res) => {
    const id = req.params.id;
    const {date, customer, product, harga, qty} = req.body;
    const data = {
        date:date,
        customer:customer,
        product:product,
        harga:harga,
        qty:qty,
    }
    try {
        await Transaction.update(
            data, {
            where: {
                id: id
            }
        }
        );
        res.json({ msg: "Update Transaction Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const DeleteTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        await Transaction.destroy({
            where: {
                id: id
            }
        });
        res.json({ msg: "Berhasil Hapus Transaction" });
    } catch (error) {
        console.log(error);
    }
}

