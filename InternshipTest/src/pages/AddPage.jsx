import React from 'react';
import Navbar from '../components/Navbar';
import Mainform from '../components/Mainform';
import { Box } from '@chakra-ui/react';


function AddPage() {

    return (
        <div>
            <Navbar/>
            <Box py='10'
            px='40'>
                <Mainform/>
            </Box>
            
        </div>

    )
}


export default AddPage;