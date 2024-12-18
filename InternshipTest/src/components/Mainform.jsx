import React, { useState } from 'react';
import { Input, Text, Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useDataCollection } from '../../../Back-end/store/global.store.js';

function Mainform() {
  const { createData } = useDataCollection();
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    amount: '',
    customerName: '',
    status: '',
    createBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createData(formData);
    if (result.success) {
      alert('Data added successfully');
      setFormData({
        productId: '',
        productName: '',
        amount: '',
        customerName: '',
        status: '',
        createBy: '',
      });
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Product ID</FormLabel>
        <Input
          name="productId"
          type="number"
          value={formData.productId}
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
  );
}

export default Mainform;