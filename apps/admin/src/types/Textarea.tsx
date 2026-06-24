import type { TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Material Symbols icon name */
  icon?: string;
  /** Error message (shows red border + message) */
  error?: string;
}
