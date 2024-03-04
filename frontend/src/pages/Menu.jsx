import Box from '@mui/system/Box';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Menu = () => {

    return (
        <>   
           <Box><TopBar/>
           {/* make go sideawys */}
           <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Card sx={{ maxWidth: 345, mt: 10, mr: 5 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/8fc00a45259a49d49d9100a34f2087eb/BFV44742_PantryPasta_FB_Final.jpg"
                    alt="green iguana"
                    />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                Spaghettti
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345, mt: 10, mr: 5 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/8fc00a45259a49d49d9100a34f2087eb/BFV44742_PantryPasta_FB_Final.jpg"
                    alt="green iguana"
                    />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                Spaghettti
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345, mt: 10, mr: 5 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/8fc00a45259a49d49d9100a34f2087eb/BFV44742_PantryPasta_FB_Final.jpg"
                    alt="green iguana"
                    />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                Spaghettti
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
            <BottomBar/></Box>
        </>
    );
}

export default Menu;