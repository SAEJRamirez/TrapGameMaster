import Header from "../components/Header";
import {
    Box,
    Card,
    FormControl,
    InputLabel,
    Select,
    Typography,
    MenuItem,
    FormHelperText,
    Button
} from "@mui/material";
import ScheduleDays from "../components/SheduleDays"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getActualsMonths, getAllDaysInMonth, reset} from "../features/schedule/scheduleSlice";
import {getUserById} from "../features/auth/authSlice";
import Loading from "../components/Loading";

const AvailablityGm = () => {

    let today = new Date();
    const [formData, setFormData] = useState( {
        month: today.getMonth(),
        year: today.getFullYear(),
    });
    const [hidden, setHidden] = useState(true);
    const {month, year} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { months, days, isLoading } = useSelector((state) => state.schedule);
    const {userInfo} = useSelector((state) => state.auth);
    const finalDays = [];
    const dayAvailable = [];
    const id = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        dispatch(getActualsMonths())
        dispatch(getUserById(id._id))

    }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const onSubmit = (e) => {
        e.preventDefault()

        const dateData = {
            month,
            year,
        }

        dispatch(getAllDaysInMonth(dateData))

        setFormData({
            month: today.getMonth(),
            year: today.getFullYear()
        })

        setHidden(false)
    }

    if(days) {
        days.forEach((item, index) => {
                finalDays.push(<ScheduleDays
                    key={index}
                    date = {item}
                />
            )
        })
    }

    const handleAvailablityForm = (e) => {
        e.preventDefault()

        for (let i = 0; i < e.target.length; i++) {
            dayAvailable.push({
                date: e.target[i].name.split(" ").slice(0, -1).join(" ").toString(),
                avail: e.target[i].value,
                shift: e.target[i].name.split(" ").splice(-1).toString()
            });
        }

        const availblity = {
            name: userInfo.name,
            choosedMonth: month,
            chooseYear: year,
            availblity: dayAvailable
        }

        console.log(availblity)
    }



    if(isLoading) {
        return <Loading />
    }


    return (
        <>
            <Header />
            <Box
                sx={{ mt: 12, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}

            >
                <Card
                    component="form"
                    elevation={8}
                    square
                    onSubmit={(e)=>onSubmit(e)}
                    sx={{ width: "60%", display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center' }}
                >
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{mt: 3, mb:3, color: 'white', textAlign: 'center', fontSize: {xs: '18px', md: 'x-large'}}}
                    >
                        <HowToRegOutlinedIcon sx={{ fontSize: {xs: "18px", md: "30px"} }}/> Envoyer mes disponibilités
                    </Typography>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="month"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Mois
                        </InputLabel>
                        <Select
                            labelId="month"
                            name="month"
                            id="monthSelect"
                            value={month}
                            label="Mois"
                            onChange={onChange}
                        >
                            {months.map((month) => (
                                <MenuItem key={month.month} value={month.monthNumeric}>{month.month}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez le mois
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <FormControl
                        sx={{ width: {xs: "120px", md: "220px"}, display: "flex", flexWrap: "wrap", justifyContent:'center' }}
                    >
                        <InputLabel
                            id="year"
                            sx={{fontSize: {xs: '14px', md: '16px'}}}
                        >
                            Année
                        </InputLabel>
                        <Select
                            labelId="year"
                            id="yearSelect"
                            name="year"
                            value={year}
                            label="Année"
                            onChange={onChange}
                        >
                            <MenuItem value={year}>{year}</MenuItem>
                            <MenuItem value={year+1}>{year+1}</MenuItem>
                        </Select>
                        <FormHelperText
                            sx={{mb:2, fontSize: {sx: "12px", md: "14px"}}}
                        >
                            Choisissez l'année
                        </FormHelperText>
                    </FormControl>
                    <span style={{width: "100%"}} />
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ my: 2 }}
                        type="submit"
                        endIcon={<ExitToAppOutlinedIcon />}
                    >
                        Planning
                    </Button>
                </Card>
                <span style={{width: "100%"}} />

                {hidden ? <Box /> :
                <Box
                    sx={{ width: {xs: "80%", md: "60%"}, mt: 4, display: "flex", justifyContent:'center', flexWrap: 'wrap', textAlign: 'center' }}
                    component="form"
                    onSubmit={handleAvailablityForm}
                >
                    {finalDays.map((day) => (
                            <Card
                                sx={{ width: {xs: "200px", md: "320px"}, display: "flex", flexWrap: "wrap", justifyContent:'center', alignItems: 'center', m:2 }}
                                key={day.key}
                            >
                                {day}
                                <FormHelperText>9h-14h | 14h-19h |19h-00h</FormHelperText>
                            </Card>
                    ))}
                    <span style={{width: "100%"}} />
                    <Button
                        variant='contained'
                        color='success'
                        sx={{ my: 2 }}
                        type="submit"
                        endIcon={<ExitToAppOutlinedIcon />}
                    >
                        Envoyer mes dispos
                    </Button>
                </Box> }
            </Box>
        </>
    );
};

export default AvailablityGm;