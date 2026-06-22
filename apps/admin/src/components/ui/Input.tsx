"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

type IconPosition = "left" | "right";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Material Symbols icon name — renders a leading icon when provided */
  icon?: string;
  /** Icon position (default: "left") */
  iconPosition?: IconPosition;
  /** Custom class for the wrapper */
  wrapperClassName?: string;
}

/**
 * Input — átomo base del sistema de formularios.
 *
 * Soporta icono decorativo (Material Symbols), variantes de posición,
 * y el glow de foco del design system Midnight Harbor.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      iconPosition = "left",
      className = "",
      wrapperClassName = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const isLeft = iconPosition === "left";

    return (
      <div className={`relative ${wrapperClassName}`}>
        {icon && (
          <span
            className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-outline pointer-events-none ${
              isLeft ? "left-4" : "right-4"
            }`}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full bg-surface-container-lowest border border-outline-variant/30
            rounded-lg py-3.5 px-4 text-on-surface placeholder:text-outline
            focus:outline-none focus:border-primary
            transition-all duration-300 input-glow
            font-body-md
            ${icon && isLeft ? "pl-12" : ""}
            ${icon && !isLeft ? "pr-12" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
