import React from "react";
import { cn } from "../../utils/styles";

function CardInfo({ text, className = "", ...props }) {
  return (
    <span className={cn("text-muted-foreground text-sm", className)}>
      {text}
    </span>
  );
}

export default CardInfo;