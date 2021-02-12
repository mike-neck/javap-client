import React from 'react';
import {Editor} from "./Editor";
import {AppBar, Box, Container, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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
        maxWidth: "md"
    }
}));

function App() {
    const classes = styles();
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
                <Box className={classes.box}>
                    <Editor/>
                </Box>
            </Container>
        </div>
    );
}

export default App;
