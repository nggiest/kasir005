import Product from "../models/ProductModel.js";
import {Op} from 'sequelize';

export const getProduct = async (req, res) => {
    try {
        const dataProduct = await Product.findAll({
            attributes: ['id', 'nama', 'harga']
        });
        res.json(dataProduct);
    } catch (error) {
        console.log(error);
    }
}

export const getProductbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const dataProduct = await Product.findByPk(id);
        res.json(dataProduct);
    } catch (error) {
        console.log(error);
    }
}

export const getProductbyname = async (req, res) => {
    const nama = req.body.name;
    var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;
    try {
        const dataProduct = await Product.findAll({ where: condition });
        res.json(dataProduct);
    } catch (error) {
        console.log(error);
    }
}

export const AddProduct = async (req, res) => {
    const { nama, harga } = req.body;
    try {
        await Product.create({
            nama: nama,
            harga: harga
        });
        res.json({ msg: "Tambah Produk Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const UpdateProduct = async (req, res) => {
    const id = req.params.id;
    const { nama, harga} = req.body;
    const data = {
        nama: nama,
        harga: harga
    }
    try {
        await Product.update(
            data, {
            where: {
                id: id
            }
        }
        );
        res.json({ msg: "Update Produk Berhasil" });
    } catch (error) {
        console.log(error);
    }
}

export const DeleteProduk = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.json({ msg: "Berhasil Hapus Produk" });
    } catch (error) {
        console.log(error);
    }
}

