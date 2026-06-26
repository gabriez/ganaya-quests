"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed next to the checkbox */
  label?: string;
}

/**
 * Checkbox — átomo de selección binaria.
 *
 * Sigue el estilo Midnight Harbor: checked state con accent gold,
 * fondo oscuro y borde sutil.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={`
              w-5 h-5 rounded
              border-outline-variant/30 bg-surface-container-lowest
              text-secondary focus:ring-secondary/20 focus:ring-offset-0
              ${className}
            `}
            {...props}
          />
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className="font-body-md text-label-md text-on-surface-variant cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
