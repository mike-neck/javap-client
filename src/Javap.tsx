import React, {ReactElement, useState} from "react";
import {Button, Grid, IconButton} from "@material-ui/core";
import {Editor} from "./Editor";
import {Bytecode} from "./Bytecode";
import {Context} from "./Context";
import {isJavapError, isJavapSuccess, JavapOutput, newJavapService} from "./JavapService";
import {Alert, AlertTitle} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import ClearAll from '@material-ui/icons/ClearAll';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';

const initialJavaCode = `public class HelloWorld {
  public String getMessage() {
    return "Hello World.";
  }
}
`;

export function Javap(props: { context: Context }): ReactElement {
    const { context } = props;
    const [code, setCode] = useState<string>(initialJavaCode);
    const javapService = newJavapService(context);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [contents, setContents] = useState<JavapOutput[] | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const onClickButton = () => {
        setButtonDisabled(true);
        setContents(null);
        javapService.call(code)
            .then((result) => {
                if (isJavapSuccess(result)) {
                    setContents(result.contents);
                } else if (isJavapError(result)) {
                    setErrorMessage(result.error);
                }
            }).finally(() => { setButtonDisabled(false) });
    };
    const clearButtonClick = () => {
        setCode(initialJavaCode);
        setContents(null);
        setErrorMessage("");
    };
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <ErrorMessage
                        message={errorMessage}
                        resetMessage={() => setErrorMessage("")}/>
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
                        <PlayArrowTwoToneIcon fontSize="inherit"/>
                        &nbsp;execute javap
                    </Button>
                </Grid>
                <Grid item xs={7}/>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearButtonClick}
                        disabled={buttonDisabled}
                    >
                        <ClearAll fontSize="inherit"/>
                        &nbsp; clear
                    </Button>
                </Grid>
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

function ErrorMessage(props: { message: string | undefined, resetMessage: () => void }): ReactElement {
    const { message, resetMessage } = props;
    if (message === undefined || message === "") {
        return (<></>);
    }
    return (
        <Alert
            action={(<IconButton aria-label="close" color="inherit" size="small" onClick={() => resetMessage()}>
                <CloseIcon fontSize="inherit"/>
            </IconButton>)}
            severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
        </Alert>
    );
}
