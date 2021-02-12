import {ReactElement} from "react";
import MonacoEditor from "react-monaco-editor";

export function Editor(props: { code: string, setCode: (newCode: string) => void }): ReactElement {
    const { code, setCode } = props;
    const onChange = (newValue: string) => {
        setCode(newValue);
    };

    return (<MonacoEditor
        height={400}
        language={"java"}
        value={code}
        onChange={onChange}
        theme={"vs-dark"}
    />);
}
