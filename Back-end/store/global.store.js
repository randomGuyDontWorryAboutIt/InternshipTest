import { create } from "zustand"

export const useDataCollection = create((set) => ({
    data: [],
    setData: (data) => ({ data }),
    createData: async (newData) => {
        if (!newData.productId || !newData.productName || !newData.amount || !newData.customerName || !newData.status || !newData.createBy) {
            return { success: false, message: "please fill in required fields" }
        }
        const res = await fetch("http://localhost:1500/api/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        const d = await res.json()
        // console.log(d)
        set((state) => ({ data: [...state.data, d.data] }))
        return { success: true, message: "added successfully" }
    },

    fetchData: async () => {
        try {
            const res = await fetch("http://localhost:1500/api/data");
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const d = await res.json();
            // console.log("Fetched data:", d);
            set({ data: d });
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    },

    updateData: async (sid, updatedData) => {
        try {
            const res = await fetch(`http://localhost:1500/api/data/${sid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) {
                throw new Error("Failed to update data");
            }
            const d = await res.json();
            if (!d.success) return { success: false, message: d.message };

            return { success: true, message: d.message };
        } catch (err) {
            console.error("Error updating data:", err);
            return { success: false, message: err.message };
        }
    },
}))