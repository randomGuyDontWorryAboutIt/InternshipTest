import { db } from "../config/db.js";

export const getStatusResult = async (req, res) => {
    const q = "SELECT * FROM status WHERE id =?"
    const { id } = req.params;

    db.query(q,[id], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
}