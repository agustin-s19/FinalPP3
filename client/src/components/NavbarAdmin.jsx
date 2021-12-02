import React from "react"
import {AppBar, Toolbar, makeStyles, IconButton} from "@material-ui/core"
import LogoutIcon from '@mui/icons-material/Logout';
import { Home } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'


const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        flexGrow: 1
    }

}))


const NavbarAdmin = () => {
    const classes = useStyles()
    const { logout } = useAuth()

    return (
        <div>
            <AppBar color="secondary">
                <Toolbar>
                    <Link to="/admin/menu">
                        <IconButton color="inherit" aria-label="menu">
                            <Home />
                        </IconButton>
                    </Link>
                    <h1 className={classes.menuButton}>
                    </h1>
                    <Link to="/admin/login">
                        <LogoutIcon onClick={() => logout()} />
                    </Link>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}

export default NavbarAdmin

