import { db } from "../config/db.js";

export const getData = async (req, res) => {
    const q = "SELECT * FROM data"
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
}

export const postData = async (req, res) => {
    const q = "INSERT INTO data (`productId`,`productName`,`amount`,`customerName`,`status`,`createBy`) VALUES (?)";
    const contents = req.body;
    const values = [
        contents.productId,
        contents.productName,
        contents.amount,
        contents.customerName,
        contents.status,
        contents.createBy
    ]
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
}

export const editData = async (req, res) => {
    const { id } = req.params;
    const getQ = "SELECT * FROM data WHERE id = ?"
    const q = "UPDATE data SET `productId` = ?,`productName` = ?,`amount` = ?,`customerName` = ?,`status` = ?,`createBy` = ? WHERE id = ?";
    const contents = req.body;

    db.query(getQ, [id], (err, currentData) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (currentData.length === 0) {
            return res.status(404).json({ message: "data not found" })
        }

        const existingData = currentData[0];
        // console.log(existingData)
        const updatedData = {
            productId: contents.productID || existingData.productID,
            productName: contents.productName || existingData.productName,
            amount: contents.amount || existingData.amount,
            customerName: contents.customerName || existingData.customerName,
            status: contents.status || existingData.status,
            createBy: contents.createBy || existingData.createBy,
        }
        // console.log("Updated Data:", updatedData);
        const values = [
            updatedData.productId,
            updatedData.productName,
            updatedData.amount,
            updatedData.customerName,
            updatedData.status,
            updatedData.createBy,
        ]

        db.query(q, [...values, id], (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }   
            return res.status(200).json({ success: true});
        })
    })
}
