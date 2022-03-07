import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRooms, reset } from "../features/rooms/roomsSlice";
import Header from "../components/Header";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress";
//import SherlockImg from '../images/sherlockRoom.jpg'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const ShowRooms = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { rooms, isLoading } = useSelector((state) => state.rooms);
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch])

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, dispatch])


    if(isLoading) {
        return <CircularProgress/>
    }

//TODO Voir pour enregistrer image dans BDD, et voir pour bouton sous cartes
    return (
        <>
            <Header />
            <Box
                sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}, width: "100%"}}
                >
                    <MeetingRoomOutlinedIcon sx={{ fontSize: {xs: "18px", md: "xx-large"}}}/> Les salles actuelles
                </Typography>

                { rooms.map((room) => (
                    <Card sx={{ maxWidth: 345, m:4 }} key={room.name}>
                        <CardMedia
                            component="img"
                            height="140"
                            //image={SherlockImg}
                            alt="Room Sherlock Holmes"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {room.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {room.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ textAlign: "center", display:"flex", justifyContent: "center" }}>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Brief
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Rangement
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                            >
                                Tips
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default ShowRooms;