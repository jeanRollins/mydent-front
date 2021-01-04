import { Box } from '@material-ui/core';
import React from 'react'

const NotFound = () => {
    return (
        <Box display="flex" justifyContent="center" m={1} p={1} style={{ marginTop: '60px' }} bgcolor="background.paper">
            <h1 className="monserrat600"> Página no encontrada :( </h1>
        </Box>
    )
}

export default NotFound ;