import React from "react";
import { Label } from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { cn } from "../../utils/styles";

function SelectBox({
  label,
  options = [],
  className = "",
  value,
  onChange,
  ...props
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && <Label className="text-xs">{label}</Label>}
      <Select defaultValue={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((type, index) => (
            <>
              <SelectItem key={index} value={type.value}>
                {type.text}
              </SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectBox;