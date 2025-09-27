import React from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { cn } from "../../utils/styles";

function InputBox({ label, type = "text", className = "", ...props }) {
  const isFile = type.toLocaleLowerCase() === "file";

  return (
    <div className={cn("w-full", className)}>
      {label && <Label className="text-xs">{label}</Label>}
      {isFile ? <Input type={type}></Input> : <Input {...props}></Input>}
    </div>
  );
}

export default InputBox;