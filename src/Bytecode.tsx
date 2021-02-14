import React, {ReactElement, useState} from "react";
import MonacoEditor from "react-monaco-editor";
import {JavapOutput} from "./JavapService";
import {Grid, makeStyles, Tab, Tabs} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },

}));

export function Bytecode(props: { contents: JavapOutput[] | null }): ReactElement {
    const {contents} = props;
    const classes = useStyles();
    const [current, setCurrent] = useState<number>(0);
    if (contents === null || contents.length === 0) {
        return (<></>);
    }
    return (
        <Grid container>
            <Grid item xs={3}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={current}
                    onChange={((event, value) => setCurrent(value))}
                    className={classes.tabs}
                >
                    {contents.map((javap) => {
                        return (<Tab
                            fullWidth
                            textColor="primary"
                            label={javap.name.replace(RegExp("[0-9]+\\.class"), "")}
                            key={`tab-${javap.name}`}
                            aria-controls={`tab-panel-${javap.name}`}/>);
                    })}
                </Tabs>
            </Grid>
            <Grid item xs={9}>
                {contents.map((javap, index) => {
                    return (<TabContents
                        outputs={javap.outputs}
                        index={index}
                        key={`javap-outputs-${index}`}
                        name={javap.name}
                        current={current}
                    />);
                })}
            </Grid>
        </Grid>
    );
}

function TabContents(props: { outputs: string, name: string, index: number, current: number }): ReactElement {
    const {outputs, name, index, current} = props;
    return (
        <div
            role="tabpanel"
            hidden={index !== current}
            id={`tab-panel-${name}`}
            aria-labelledby={`tab-${name}`}
        >
            {index === current && (
                <MonacoEditor
                    height={400}
                    value={outputs}
                    theme="vs-dark"
                />
            )}
        </div>
    );
}
