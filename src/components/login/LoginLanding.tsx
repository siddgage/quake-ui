import { Box, Button, Grid, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import style from './LoginLanding.module.css'

type FormFields = {
    username: String,
    password: String,
}

const LoginLanding = () => {
    const { register, handleSubmit } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data)
    }

    const [visible, setVisible] = useState(false);

    const changePassVisibility = () => {
        setVisible(!visible)
    }
    return (
        <Box className={`${style.bg}`}
            sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >
            <Box component={Paper} elevation={6}
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    px:"8em",
                    py:"4.5em"
                }}
            >
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", {
                            minLength: 5
                        })} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={visible ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: <InputAdornment position='end' onClick={changePassVisibility}
                                sx={{ ":hover": { cursor: 'pointer' } }}>
                                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}
                        {...register("password", {
                            minLength: 8
                        })} />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}


export default LoginLanding;