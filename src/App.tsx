import React from 'react';
import {AppBar, Container, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {loadContext} from "./Context";
import {Javap} from "./Javap";

const styles = makeStyles((theme) => ({
    root: {
        background: "#333",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    box: {
        padding: theme.spacing(2)
    },
    codeContainer: {
        maxWidth: "md",
        paddingTop: theme.spacing(3),
    }
}));

function App() {
    const classes = styles();
    const context = loadContext();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        online javap
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className={classes.codeContainer}>
                <Javap context={context}/>
            </Container>
        </div>
    );
}

export default App;
