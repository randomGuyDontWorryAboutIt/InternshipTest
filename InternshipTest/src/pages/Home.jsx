import React from 'react';
import Navbar from '../components/Navbar';
import { Box } from '@chakra-ui/react'
import Mainaccordion from '../components/Mainaccordion';
function Home() {
    return (
        <div>
            <Navbar />
            <Box
                m='5'
                boxShadow='lg'
                border='1px solid #e0e0e0'
                borderRadius='10'
            >
            <Mainaccordion></Mainaccordion>
            </Box>

        </div>
    )
}

export default Home;    