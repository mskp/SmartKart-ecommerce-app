import { Input } from "@nextui-org/react";
import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function PasswordInput({
  label,
  onChange,
  isInvalid = false,
  errorMessage,
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible((isVisible) => !isVisible);

  return (
    <Input
      label={label ?? "Password"}
      variant="underlined"
      color="primary"
      placeholder="••••••••••"
      onChange={onChange}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? errorMessage ?? "Enter a valid password" : ""}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <IoEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
