//Imports
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Box, Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, TextField, Typography} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import {register, reset} from "../../store/slices/auth/authSlice";
import Header from "../../components/header/Header";
import Loading from "../../components/utils/Loading";
import {getRooms} from "../../store/slices/rooms/roomsSlice";
import Footer from "../../components/footer/Footer";

//Instanciation du composent
const RegisterGm = () => {

    //Déclarations constantes et states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        password2: '',
        isAdmin: false,
        rooms: [],
    });
    const { name, email, password, password2, isAdmin } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
    const {rooms} = useSelector((state) => state.rooms)
    const [roomChecked, setRoomChecked] = useState([]);


    //Charge les rooms depuis BDD dans redux
    //Dépendance: Dispatch
    useEffect(() => {
        dispatch(getRooms())
    }, [dispatch])

    //Capture les inputs du formulaire d'enregistrement
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    //Capture le checkbox admin du formulaire d'enregistrement
    const onCheck = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))
    }

    //Capture les checkbox de salles du formulaire d'enregistrement
    const onCheckRoom = (e, value) => {
        e.preventDefault()

        let cloneRoomChecked = [...roomChecked];
        if(e.target.checked) {
            cloneRoomChecked.push(value)
            setRoomChecked(cloneRoomChecked)

        } else {
            cloneRoomChecked = roomChecked.filter((room) => {
                return room !== value

            });
            setRoomChecked(cloneRoomChecked);
        }
    }

    //Affichage des erreurs et reset de states redux
    //@Dépendance: isError, message, dispatch
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            navigate('/gm')
            toast.success('Le nouveau GameMaster a bien été enregistré');
        }

        dispatch(reset());

    }, [isError, isSuccess, message,dispatch, navigate])


    //Gestion du formulaire pour envoie en BDD
    //Affichage du succès
    const onSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < roomChecked.length; i++) {
            formData.rooms.push(roomChecked[i])
        }

        if(password !== password2) {
            toast.error('Les mots de passe ne correspondent pas')
        }else {
            const userData = {
                name,
                email,
                password,
                isAdmin,
                rooms: formData.rooms
            }
            dispatch(register(userData));
        }

        formData.rooms= [];
    }


    //Composent de chargement
    if(isLoading) {
        return <Loading />
    }

    //JSX
    return (
        <>
            <Header/>
                <Box
                    sx={{ mt: 12, display: "flex", justifyContent:'center', alignItems: 'center', flexWrap: 'wrap', textAlign: 'center' }}
                    onSubmit={onSubmit}
                     >
                    <Card
                        component={"form"}
                        elevation={8}
                        square
                        sx={{ width: {xs: "280px", md: "600px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                    >
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'xx-large'}}}
                        >
                            <HowToRegOutlinedIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Enregistrer un nouveau <br/> GameMaster
                        </Typography>
                        <TextField id='name'
                                   required
                                   label='Nom'
                                   variant='outlined'
                                   sx={{ m: 1, width: '50%'}}
                                   fullWidth
                                   onChange={onChange}
                                   value={name}
                                   name='name'
                        />
                        <TextField id='email'
                                   required
                                   label='Email'
                                   variant='outlined'
                                   sx={{ m: 1, width: '50%'}}
                                   fullWidth
                                   type='email'
                                   onChange={onChange}
                                   value={email}
                                   name='email'
                        />
                        <TextField id='password'
                                   required
                                   label='Mot de passe'
                                   variant='outlined'
                                   sx={{ m: 1, width: '50%'}}
                                   fullWidth
                                   type='password'
                                   onChange={onChange}
                                   value={password}
                                   name='password'
                        />
                        <TextField id='password2'
                                   required
                                   label='Répétez le mot de passe'
                                   variant='outlined'
                                   sx={{ m: 1, width: '50%'}}
                                   fullWidth
                                   type='password'
                                   onChange={onChange}
                                   value={password2}
                                   name='password2'
                        />

                        <span style={ {width: '100%' }} />
                        <FormControl color="secondary" sx={{width: "50%", mt: 2, borderBottom: '1px solid #f1f1f1', borderTop: '1px solid #f1f1f1'}}>
                            <FormLabel component="legend">Salles masterisées</FormLabel>
                            <FormGroup>
                                { rooms.map((room) => (
                                    <FormControlLabel
                                        key={room._id}
                                        control={
                                            <Checkbox
                                                checked={roomChecked.indexOf(room.name) > -1}
                                                name="roomChecked"
                                                color="secondary"
                                                onChange={(e) => {onCheckRoom(e, room.name)}}
                                                value={room.name}
                                            />
                                        }
                                        label={room.name} />
                                    ))}
                            </FormGroup>
                            <FormHelperText>Ne pas cocher si le gm n'a pas encore de salle</FormHelperText>
                        </FormControl>
                        <span style={ {width: '100%' }} />
                        <FormControl color="secondary" sx={{mt: 1, mb: 3, borderBottom: '1px solid #f1f1f1', width: "50%"}}>
                            <FormLabel component="legend">Rôle de l'utilisateur</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="secondary"
                                        onChange={onCheck}
                                        value={isAdmin}
                                        name="isAdmin"
                                        checked={isAdmin}
                                    />
                                }
                                label='Admin'/>
                            </FormGroup>
                            <FormHelperText>Cocher si l'utilisateur est administrateur</FormHelperText>
                        </FormControl>
                        <span style={ {width: '100%' }} />
                        <Button variant='contained'
                                color='secondary'
                                sx={{ m: 1, mb: 3 }}
                                startIcon={<BackspaceOutlinedIcon />}
                                onClick={() => navigate('/gm')}
                        >
                            Retour
                        </Button>
                        <Button variant='contained'
                                color='success'
                                sx={{ m: 1, mb: 3 }}
                                endIcon={<ExitToAppOutlinedIcon />}
                                type='submit'
                        >
                            Enregistrer
                        </Button>
                    </Card>
                </Box>
            <Footer />
        </>
    );
};

export default RegisterGm;