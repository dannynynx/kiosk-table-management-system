import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArticleIcon from '@mui/icons-material/Article';

const BottomBar = () => { 
    return ( 
        <>
        <Box sx={{ position: 'fixed', bottom: 1, left: 0, right: 0 }} >
            <BottomNavigation showLabels>
                <BottomNavigationAction label="Ask for assitance" icon={<AccessibilityNewIcon />} />
                <BottomNavigationAction label="Request the bill" icon={<ArticleIcon />} />
            </BottomNavigation>
        </Box>
        </>
    )
}

export default BottomBar;