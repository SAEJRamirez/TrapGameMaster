//Imports
import {Box, IconButton, List, ListItem, Typography, Paper, Card, Button} from "@mui/material";
import Header from "../../components/header/Header";
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, deleteUser} from "../../store/slices/auth/authSlice"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import Loading from "../../components/utils/Loading";
import Footer from "../../components/footer/Footer";

//Instanciation du composent
const DeleteGm = () => {

    //Déclaration de constantes et states
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { users, isLoading } = useSelector((state) => state.auth);

    //Charge les utilisateurs depuis la BDD pour redux
    //@Dépendance: dispatch
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

    //JSX
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
                    <PersonRemoveOutlinedIcon sx={{ fontSize: {xs: "18px", md: "xx-large"}}}/> Supprimer une GM du système
                </Typography>
                <Paper elevation={6} sx={{ width: {xs: "225px", md: "300px"} }}>
                    <List>
                        {users.map((user) => (
                            <Card
                                key={user.name}
                                sx={{ maxWidth: 345, m:4, border: "1px solid #f2f2f2"}}
                                elevation={18}
                            >
                                <ListItem
                                    sx={{ my: 2, fontSize: {xs: "18px", md: "21px"}, display: "flex", justifyContent: "center"}}
                                    variant="outlined"
                                    secondaryAction={
                                    <IconButton
                                        onClick={() => dispatch(deleteUser(user._id)) && toast.success('Le gameMaster a bien été supprimé du système') && navigate('/deletegm')}
                                        variant="outlined"
                                        color="error"
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteForeverOutlinedIcon sx={{ fontSize: {xs: "28px", md: "xx-large"}}} />
                                    </IconButton>
                                }
                                >
                                    {user.name}
                                </ListItem>
                            </Card>
                        ))}
                    </List>
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ mb: 3 }}
                        startIcon={<BackspaceOutlinedIcon />}
                        onClick={() => navigate('/gm')}
                    >
                        Retour
                    </Button>
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default DeleteGm;