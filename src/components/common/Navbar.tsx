import { CatchingPokemonTwoTone } from "@mui/icons-material"
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"

const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <CatchingPokemonTwoTone />
                </IconButton>
                <Typography variant="h6" component='div' sx={{ flexGrow: 1 }}>
                    Grumpy
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button variant="outlined" href='/login' color="inherit">
                        Login
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar