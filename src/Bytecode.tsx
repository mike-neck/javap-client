import React, {ReactElement} from "react";
import MonacoEditor from "react-monaco-editor";

export function Bytecode(props: {contents: string | null}): ReactElement {
    const { contents } = props;
    if (contents === null || contents === "") {
        return (<></>);
    }
    return (<MonacoEditor
        height={400}
        value={contents}
        theme="vs-dark"
    />);
}
