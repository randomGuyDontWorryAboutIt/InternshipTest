import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select, } from '@chakra-ui/react';
import { useDataCollection } from '../../../Back-end/store/global.store.js';

function EditModal({ isOpen, onClose, rowData }) {
    const { updateData } = useDataCollection();
    const [formData, setFormData] = useState(rowData);
    // console.log(formData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateData(rowData.id, formData);
        console.log(result)
        if (result.success) {
            alert('Data updated successfully');
            onClose();
            window.location.reload();
        } else {
            alert(result.message + "What the hell");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
            px='50'
            py='8'>
                <ModalHeader>Edit Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Product ID</FormLabel>
                            <Input
                                name="productID"
                                type="number"
                                value={formData.productID}
                                onChange={handleChange}
                                placeholder="Product ID"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="Product Name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <Input
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Amount"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Customer Name</FormLabel>
                            <Input
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Customer Name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                placeholder="Select status"
                            >
                                <option value="0">Success</option>
                                <option value="1">Failed</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Created By</FormLabel>
                            <Input
                                name="createBy"
                                value={formData.createBy}
                                onChange={handleChange}
                                placeholder="Created By"
                            />
                        </FormControl>
                        <Button mt={4} colorScheme="teal" type="submit">
                            Submit
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default EditModal;