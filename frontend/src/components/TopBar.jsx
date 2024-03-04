
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const TopBar = () => { 

    const categories = ['brekkie', 'lunch', 'dinner'];

    return (
        <>
            <AppBar>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {categories.map((page) => (
                <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            </AppBar>
        </>
    )
}

export default TopBar;