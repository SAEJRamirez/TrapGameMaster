//Imports
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Header from "../../components/header/Header";
import {Typography, Box, Button, Card, CardContent} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import NoMeetingRoomOutlinedIcon from '@mui/icons-material/NoMeetingRoomOutlined';
import Loading from "../../components/utils/Loading";
import React from "react";
import Footer from "../../components/footer/Footer";

//Instanciation du composent
const Rooms = () => {

    //Déclarations constantes et states
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.rooms)

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

    //JSX
    return (
        <>
            <Header />
            <Box sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
                <Card
                    elevation={8}
                    square
                    sx={{ width: {xs: "280px", md: "600px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}>
                    <CardContent>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mt: 3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}}}
                        >
                            Gestion des salles
                        </Typography>
                    </CardContent>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<VisibilityOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={() => navigate('/showrooms')}
                    >
                        Voir les salles
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        onClick={() => navigate('/modifyroom')}
                        startIcon={<RoomPreferencesOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                    >
                        Modifier une salle
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<MeetingRoomOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={() => navigate('/addroom')}
                    >
                        Ajouter une salle dans le système
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        startIcon={<NoMeetingRoomOutlinedIcon />}
                        variant="outlined"
                        color="third"
                        sx={{ p: 2, mt: 3, mb: 3, width: {xs: "180px", md: "350px"}, fontSize: {xs: '11px', md: '14px'}}}
                        onClick={() => navigate('/deleteRoom')}
                    >
                        Supprimer une salle du système
                    </Button>
                    <span style={ {width: '100%' }} />
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ m: 3 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/')}
                    >
                        Retour
                    </Button>
                </Card>
            </Box>
            <Footer />
        </>
    );
}

export default Rooms;