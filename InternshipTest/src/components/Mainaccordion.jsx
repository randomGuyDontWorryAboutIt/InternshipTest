    import React, { useEffect, useMemo, useState } from 'react';
    import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, IconButton, } from '@chakra-ui/react';
    import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
    import { EditIcon } from '@chakra-ui/icons';
    import { useDataCollection } from '../../../Back-end/store/global.store.js';
    import EditModal from './Editmodal.jsx';

    function Mainaccordion() {
        const { data, fetchData } = useDataCollection();
        const [statusMap, setStatusMap] = useState({});
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedRow, setSelectedRow] = useState(null);

        const handleEditClick = (row) => {
            setSelectedRow(row);
            setIsModalOpen(true);
        };

        const handleCloseModal = () => {
            setIsModalOpen(false);
            setSelectedRow(null);
        };

        useEffect(() => {
            fetchData();
        }, [fetchData]);


        useEffect(() => {
            const fetchStatusNames = async () => {
                try {
                    const statusIds = [...new Set(data.map((row) => row.status))];
                    // console.log("status IDs:", statusIds);

                    const statusResponses = await Promise.all(
                        statusIds.map((id) =>
                            fetch(`http://localhost:1500/api/status/${id}`).then((res) => res.json())
                        )
                    );
                    // console.log("status responses:", statusResponses);

                    const statusMap = statusResponses.reduce((acc, status) => {
                        if (Array.isArray(status) && status.length > 0) {
                            const statusData = status[0];
                            if (statusData && statusData.id !== undefined && statusData.name) {
                                acc[statusData.id] = statusData.name;
                            } else {
                                console.warn(`Invalid status data: ${JSON.stringify(statusData)}`);
                            }
                        } else {
                            console.warn(`Unexpected status format: ${JSON.stringify(status)}`);
                        }
                        return acc;
                    }, {});
                    // console.log("status map:", statusMap);
                    setStatusMap(statusMap);
                } catch (error) {
                    console.error("Error fetching status data:", error);
                }
            };

            fetchStatusNames();
        }, [data]);

        const groupedData = useMemo(() => {

            const groups = data.reduce((acc, row) => {
                if (!row || !row.transactionDate) return acc; 
                const date = new Date(row.transactionDate);
                const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
                if (!acc[yearMonth]) {
                    acc[yearMonth] = [];
                }
                acc[yearMonth].push(row);
                return acc;
            }, {});

            return Object.entries(groups).map(([yearMonth, rows]) => ({
                yearMonth,
                rows,
            }));
        }, [data]);

        return (
            <div>
                <Accordion defaultIndex={[0]} allowMultiple>
                    {groupedData.map(({ yearMonth, rows }) => (
                        <AccordionItem key={yearMonth}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        {yearMonth}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <TableContainer>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>ID</Th>
                                                <Th>Product ID</Th>
                                                <Th>Product Name</Th>
                                                <Th>Amount</Th>
                                                <Th>Customer Name</Th>
                                                <Th>Status</Th>
                                                <Th>Transaction Date</Th>
                                                <Th>Created By</Th>
                                                <Th>Created On</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {rows.map((row) => (
                                                <Tr key={row.id}>
                                                    <Td>{row.id}</Td>
                                                    <Td>{row.productID}</Td>
                                                    <Td>{row.productName}</Td>
                                                    <Td>{row.amount}</Td>
                                                    <Td>{row.customerName}</Td>
                                                    <Td>{statusMap[row.status]}
                                                    </Td>
                                                    <Td>{row.transactionDate}</Td>
                                                    <Td>{row.createBy}</Td>
                                                    <Td>{row.createOn}</Td>
                                                    <Td>
                                                        <IconButton
                                                            icon={<EditIcon />}
                                                            onClick={() => handleEditClick(row)}
                                                        /></Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                    {selectedRow && (
                        <EditModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            rowData={selectedRow}
                        />
                    )}
                </Accordion>
            </div>
        );
    }

    export default Mainaccordion;
