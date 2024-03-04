
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const TopBar = () => { 

    const categories = ['brekkie', 'lunch', 'dinner'];

    return (
        <>
        {/* mobile problem */}
            <AppBar position='static'>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                        {categories.map((page) => (
                        <Button
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                </ButtonGroup>
                <Button sx={{ my: 2, color: 'white', display: 'block', marginLeft: 'auto' }}>#11</Button>
            </Box>
            </AppBar>
        </>
    )
}

export default TopBar;