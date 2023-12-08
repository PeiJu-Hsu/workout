import { Input } from "@nextui-org/react";
import { useState } from "react";
import { MenuStore } from "../stores/MenuStore";
import { useUserStore } from "../stores/UserStore";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./EyeIcon";

interface PropInput {
  id: string;
}
interface PropsInputType {
  id: string;
  type: string;
  label: string;
  className?: { input: string; label: string };
}
// export default function InputUnit(type: string, labelText: string) {
//   return (
//     <div className="col">
//       <div className="form-outline">
//         <input type={type} id={labelText} className="form-control" />
//         <label className="form-label" htmlFor={labelText}>
//           {labelText}
//         </label>
//       </div>
//     </div>
//   );
// }
export function InputText({ id, type, label, className }: PropsInputType) {
  const setInputTextToState = useUserStore(
    (state) => state.setInputTextToState,
  );
  return (
    <Input
      classNames={className}
      type={type}
      variant="underlined"
      label={label}
      id={id}
      onChange={(e) => {
        setInputTextToState(e.target.id, e.target.value);
      }}
    />
  );
}
export function InputEmail({ id, type }: PropsInputType) {
  const setInputTextToState = useUserStore(
    (state) => state.setInputTextToState,
  );
  return (
    <Input
      classNames={{
        input: " text-white",
        label: "text-white",
      }}
      variant="underlined"
      label="Email"
      id={id}
      onChange={(e) => {
        setInputTextToState(e.target.id, e.target.value);
      }}
      type={type}
    />
  );
}
export function InputPassword({ id }: PropInput) {
  const setInputTextToState = useUserStore(
    (state) => state.setInputTextToState,
  );
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
export function InputFile({ id }: PropInput) {
  const setInputTextToState = useUserStore(
    (state) => state.setInputTextToState,
  );
  return (
    <Input
      classNames={{
        input: " text-white",
        label: "text-white",
      }}
      type="file"
      accept="image/*"
      variant="underlined"
      label="Photo"
      labelPlacement="outside"
      placeholder="Choose a photo"
      id={id}
      onChange={(e) => {
        if (e.target.files) {
          setInputTextToState(e.target.id, e.target.value);
        }
      }}
    />
  );
}
export function InputLoadingNumber({ id, type, label }: PropsInputType) {
  const setLoading = MenuStore((state) => state.setLoading);
  return (
    <Input
      type={type}
      min={0}
      className="max-w-xs"
      label={label}
      id={id}
      onChange={(e) => {
        setLoading(Number(e.target.value));
      }}
    />
  );
}
