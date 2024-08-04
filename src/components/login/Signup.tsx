import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from "@mui/lab";
import { Box, Grid, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import axios from "../../api/axios";
import style from './Login.module.css';


export const Signup = () => {
    const schema = z.object({
        username: z.string().min(5),
        password: z.string().min(8),
        passwordCheck: z.string().min(8),
        firstName: z.string().max(50),
        lastName: z.string().max(50),
        email: z.string().email(),
    })

    type FormFields = z.infer<typeof schema>

    const { register,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting }, } = useForm<FormFields>({
            resolver: zodResolver(schema),
        });



    const onSubmit: SubmitHandler<FormFields> = (data) => {
        axios
            .post(
                '/user/auth/signup',
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => { console.log(response.data) })
            .catch(error => { setError("root", error) });
    }
    const [visiblePass1, setVisiblePass1] = useState<boolean>(false);
    const [visiblePass2, setVisiblePass2] = useState<boolean>(false);

    const changePassVisibility1 = () => {
        setVisiblePass1(!visiblePass1)
    }
    const changePassVisibility2 = () => {
        setVisiblePass2(!visiblePass2)
    }

    const [isValidPass, setIsValidPass] = useState(false)
    const password = watch("password")
    const passwordCheck = watch("passwordCheck")

    const checkPassword = () => {
        if (password == passwordCheck) {
            setIsValidPass(!isValidPass)
        } else {
            setError('passwordCheck', {
                message: 'Password does not match'
            })
        }
    }

    return (
        <Box className={`${style.bg}`}
            sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: '100vw'
            }}
        >
            <Box component={Paper} elevation={6}
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: 30
                }}
            >

                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        m: 10,
                    }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        helperText={!errors.username?.message ? 'Enter username' : errors.username?.message}
                        {...register("username")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type={"text"}
                        id="email"
                        helperText={!errors.email ? 'Enter Email' : errors.email?.message}
                        {...register("email")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        type={"text"}
                        id="firstName"
                        helperText={!errors.email ? 'Enter First Name' : errors.firstName?.message}
                        {...register("firstName")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        type={"text"}
                        id="lastName"
                        helperText={!errors.email ? 'Enter Last Name' : errors.lastName?.message}
                        {...register("lastName")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={visiblePass1 ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        helperText={!errors.password?.message ? 'Enter password' : errors.password.message}
                        InputProps={{
                            endAdornment: <InputAdornment position='end' onClick={changePassVisibility1}
                                sx={{ ":hover": { cursor: 'pointer' } }}>
                                {visiblePass1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}
                        {...register("password")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type={visiblePass2 ? "text" : "password"}
                        id="password-check"
                        helperText={isValidPass ? 'Confirm Password' : errors.passwordCheck?.message}
                        InputProps={{
                            endAdornment: <InputAdornment position='end' onClick={changePassVisibility2}
                                sx={{ ":hover": { cursor: 'pointer' } }}>
                                {visiblePass2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}
                        {...register("passwordCheck", {
                            onChange: checkPassword
                        })} />

                    {errors.root && (
                        <div className="text-red-500">{errors.root.message}</div>)}
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>

                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link variant="body2" fontSize={18}>
                                <RouterLink to={'/login'}>Login</RouterLink>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}