import { Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./EyeIcon";

interface PropsInputType {
  id: string;
  setInputTextToState: (id: string, value: string) => void;
}

export default function InputUnit(type: string, labelText: string) {
  return (
    <div className="col">
      <div className="form-outline">
        <input type={type} id={labelText} className="form-control" />
        <label className="form-label" htmlFor={labelText}>
          {labelText}
        </label>
      </div>
    </div>
  );
}
export function InputText({ id, setInputTextToState }: PropsInputType) {
  return (
    <Input
      classNames={{
        input: " text-white",
        label: "text-white",
      }}
      type="email"
      variant="underlined"
      label="Email"
      id={id}
      onChange={(e) => {
        setInputTextToState(e.target.id, e.target.value);
      }}
    />
  );
}
export function InputPassword({ id, setInputTextToState }: PropsInputType) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      classNames={{
        input: " text-white",
        label: "text-white",
      }}
      label="Password"
      variant="underlined"
      id={id}
      onChange={(e) => {
        setInputTextToState(e.target.id, e.target.value);
      }}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
