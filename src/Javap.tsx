import React, {ReactElement, useState} from "react";
import {Button, Collapse, Grid, IconButton} from "@material-ui/core";
import {Editor} from "./Editor";
import {Bytecode} from "./Bytecode";
import {Context} from "./Context";
import {isJavapError, isJavapSuccess, newJavapService} from "./JavapService";
import {Alert, AlertTitle} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';

export function Javap(props: { context: Context }): ReactElement {
    const { context } = props;
    const [code, setCode] = useState<string>(`public class HelloWorld {
  public String getMessage() {
    return "Hello World.";
  }
}
`);
    const javapService = newJavapService(context);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [contents, setContents] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const onClickButton = () => {
        setButtonDisabled(true);
        javapService.call(code)
            .then((result) => {
                if (isJavapSuccess(result)) {
                    setContents(result.contents);
                } else if (isJavapError(result)) {
                    setErrorMessage(result.error);
                }
            }).finally(() => { setButtonDisabled(false) });
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <ErrorMessage message={errorMessage}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}/>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickButton}
                        disabled={buttonDisabled}>
                        execute javap
                    </Button>
                </Grid>
                <Grid item xs={10}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <Editor code={code} setCode={setCode}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <Bytecode contents={contents}/>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </>
    );
}

function ErrorMessage(props: { message: string | undefined }): ReactElement {
    const { message } = props;
    const [open, setOpen] = useState<boolean>(true);
    if (message === undefined || message === "") {
        return (<></>);
    }
    return (
        <Collapse in={open}>
            <Alert
                action={(<IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpen(false)}>
                    <CloseIcon fontSize="inherit"/>
                </IconButton>)}
                severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        </Collapse>
    );
}
