import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from "@mui/lab";
import { Box, Grid, InputAdornment, Paper, Link, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import style from './Login.module.css';
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const schema = z.object({
    username: z.string().min(5, { message: "Username must be atleast 5 character long" }),
    password: z.string().min(8, { message: "Password must be atleast 5 character long" })
})

type FormFields = z.infer<typeof schema>

const LoginPage = () => {

    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { setAuth } = context
    const navigate = useNavigate()
    const location = useLocation()

    const { register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }, } = useForm<FormFields>({
            resolver: zodResolver(schema),
        });

    const [visible, setVisible] = useState<boolean>(false);

    const changePassVisibility = () => {
        setVisible(!visible)
    }

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        axios.post(
            '/user/auth/login',
            data,
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        ).then(response => {

            setAuth({
                isAuthenticated: true,
                token: response?.data?.accessToken,
                role: response?.data?.roles
            })
            if (location.state?.from)
                navigate(location.state.from)
        }).catch(error => {
            if (!error?.response)
                setError("root", { message: 'No server response' })
            else
                setError("root", error.response.data)
        });
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
                    px: "8em",
                    py: "4em"
                }}
            >

                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        error={!errors}
                        helperText={!errors.username?.message ? 'Enter username' : errors.username?.message}
                        {...register("username")} />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={visible ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        error={!errors}
                        helperText={!errors.password?.message ? 'Enter password' : errors.password.message}
                        InputProps={{
                            endAdornment: <InputAdornment position='end' onClick={changePassVisibility}
                                sx={{ ":hover": { cursor: 'pointer' } }}>
                                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}
                        {...register("password")} />

                    {errors.root && (
                        <div className="text-red-500">{errors.root.message}</div>)}
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>

                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2">
                                <RouterLink to={'/forgotPassword'}>Forgot password?</RouterLink>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2">
                                <RouterLink to={'/signup'}>Don't have an account? Sign Up</RouterLink>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage;