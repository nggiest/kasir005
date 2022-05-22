import {Op} from 'sequelize';
import Customer from '../models/CustomerModel';

export const getCustomer = async (req, res) => {
    try {
        const dataCustomer = await Customer.findAll({
            attributes: ['id', 'name','email']
        });
        res.json(dataCustomer);
    } catch (error) {
        console.log(error);
    }
}

export const getCustomerbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const dataCustomer = await Customer.findByPk(id);
        res.json(dataCustomer);
    } catch (error) {
        console.log(error);
    }
}

export const getCustomerbyname = async (req, res) => {
    const customer = req.body.customer;
    var condition = customer ? { customer: { [Op.like]: `%${customer}%` } } : null;
    try {
        const dataCustomer = await Customer.findAll({ where: condition });
        res.json(dataCustomer);
    } catch (error) {
        console.log(error);
    }
}

export const AddCustomer = async (req, res) => {
    const { name,email } = req.body;
    try {
        await Customer.create({
            name: name,
            email:email
        });
        res.json({ msg: "Tambah Customer Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const UpdateCustomer = async (req, res) => {
    const id = req.params.id;
    const {name,email} = req.body;
    const data = {
        name:name,
        email:email
    }
    try {
        await Customer.update(
            data, {
            where: {
                id: id
            }
        }
        );
        res.json({ msg: "Update Customer Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const DeleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        await Customer.destroy({
            where: {
                id: id
            }
        });
        res.json({ msg: "Berhasil Hapus Customer" });
    } catch (error) {
        console.log(error);
    }
}

