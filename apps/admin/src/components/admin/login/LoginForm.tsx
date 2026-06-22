"use client";

import { type FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import PasswordField from "./PasswordField";

interface LoginFormProps {
  /** Called with form data on submit */
  onLogin?: (data: {
    email: string;
    password: string;
    remember: boolean;
  }) => Promise<void> | void;
  /** Error message to display */
  error?: string | null;
}

/**
 * LoginForm — organismo que compone los campos del formulario de login.
 *
 * Incluye: email, password con toggle, remember-me, submit con loading state,
 * y manejo de errores. Es un organismo porque orquesta múltiples moléculas
 * y átomos con lógica de estado compartida.
 */
export default function LoginForm({ onLogin, error }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: name === "remember" ? !prev[name] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!onLogin) return;

    setLoading(true);
    try {
      await onLogin(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-stack-md" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="space-y-2">
        <label
          className="font-label-md text-label-md text-on-surface-variant ml-1"
          htmlFor="email"
        >
          Email
        </label>
        <Input
          icon="mail"
          type="email"
          id="email"
          name="email"
          placeholder="admin@midnightharbor.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <PasswordField
        label="Contraseña"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Remember Me */}
      <Checkbox
        label="Trust this device for 30 days"
        name="remember"
        checked={form.remember}
        onChange={handleChange}
      />

      {/* Error */}
      {error && (
        <p className="text-error font-body-md text-body-md flex items-center gap-2">
          <span className="material-symbols-outlined !text-[18px]">error</span>
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        loading={loading}
        trailingIcon="arrow_forward"
        className="w-full mt-stack-md"
      >
        {loading ? "Verificando..." : "Inicia sesión"}
      </Button>
    </form>
  );
}
