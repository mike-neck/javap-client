import {useState} from "react";
import MonacoEditor from "react-monaco-editor";

export const Editor = () => {
    const [code, setCode] = useState<string>(`public class HelloWorld {
  public String getMessage() {
    return "Hello World.";
  }
}
`);
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
};
