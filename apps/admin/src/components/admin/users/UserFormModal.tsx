"use client";

import { Field, Form, Formik } from "formik";
import { useCallback, useRef } from "react";
import { sileo } from "sileo";
import * as Yup from "yup";

import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import type { UserFormModalProps } from "@/types/adminUsers";

/* ── Validation Schema ── */

const CreateSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(30, "Máximo 30 caracteres")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Solo letras, números, puntos, guiones y guiones bajos",
    )
    .required("El usuario es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  role: Yup.string()
    .oneOf(["admin", "reviewer"], "Seleccioná un rol válido")
    .required("El rol es obligatorio"),
  isActive: Yup.boolean(),
});

const EditSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(30, "Máximo 30 caracteres")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Solo letras, números, puntos, guiones y guiones bajos",
    )
    .required("El usuario es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres"),
  role: Yup.string()
    .oneOf(["admin", "reviewer"], "Seleccioná un rol válido")
    .required("El rol es obligatorio"),
  isActive: Yup.boolean(),
});

/**
 * UserFormModal — modal de creación/edición de usuarios administrativos.
 *
 * Usa Formik + Yup para validación. En modo edición, la contraseña es
 * opcional (solo se actualiza si se modifica). Sigue el patrón de
 * glassmorphism de Midnight Harbor para el panel modal.
 */
function UserFormModal({ open, onClose, user, onSave }: UserFormModalProps) {
  const isCreate = user === null;
  const dirtyRef = useRef(false);

  /* ── Request close with dirty-form guard ── */
  const handleRequestClose = useCallback(() => {
    if (dirtyRef.current) {
      sileo.action({
        title: "¿Descartar cambios?",
        description: "Hay cambios sin guardar. ¿Querés descartarlos?",
        button: {
          title: "Sí, descartar",
          onClick: () => {
            onClose();
            sileo.clear();
          },
        },
        duration: 8000,
      });
      return;
    }
    onClose();
  }, [onClose]);

  const roleOptions = [
    { value: "reviewer", label: "Reviewer" },
    { value: "admin", label: "Admin" },
  ];

  const initialValues = {
    username: user?.username ?? "",
    password: "",
    role: user?.role ?? ("reviewer" as const),
    isActive: user?.isActive ?? true,
  };

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      title={isCreate ? "Crear usuario" : "Editar usuario"}
      size="md"
    >
      {/* ── Form ── */}
      <Formik
        initialValues={initialValues}
        validationSchema={isCreate ? CreateSchema : EditSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(
            {
              username: values.username,
              password: values.password,
              role: values.role,
              isActive: values.isActive,
            },
            isCreate,
          );
          setSubmitting(false);
          onClose();
        }}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
          dirty,
          setFieldValue,
        }) => {
          dirtyRef.current = dirty;
          return (
            <Form className="flex flex-col gap-5">
              {/* ── Username ── */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="username"
                  className="text-label-sm font-semibold text-on-surface-variant"
                >
                  Nombre de usuario
                </label>
                <Input
                  name="username"
                  id="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ej: admin.nuevo"
                  icon="person"
                  wrapperClassName="w-full"
                />
                {touched.username && errors.username && (
                  <p className="text-label-sm text-error mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* ── Password ── */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-label-sm font-semibold text-on-surface-variant"
                >
                  Contraseña
                  {!isCreate && (
                    <span className="text-outline font-normal ml-1">
                      (dejá vacío para mantener la actual)
                    </span>
                  )}
                </label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={
                    isCreate ? "Ingresá una contraseña" : "Nueva contraseña"
                  }
                  icon="lock"
                  wrapperClassName="w-full"
                />
                {touched.password && errors.password && (
                  <p className="text-label-sm text-error mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* ── Role ── */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="role"
                  className="text-label-sm font-semibold text-on-surface-variant"
                >
                  Rol
                </label>
                <Select
                  id="role"
                  name="role"
                  icon="badge"
                  options={roleOptions}
                  value={values.role}
                  onChange={(v) => setFieldValue("role", v)}
                  error={
                    touched.role && errors.role
                      ? (errors.role as string)
                      : undefined
                  }
                />
              </div>

              {/* ── Active state toggle ── */}
              <div className="flex items-center gap-3">
                <Field
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  className="w-5 h-5 rounded-md border-outline-variant/30
                      bg-surface-container-lowest
                      checked:bg-primary checked:border-primary
                      focus:ring-1 focus:ring-primary
                      transition-all duration-200 cursor-pointer
                      accent-primary"
                />
                <label
                  htmlFor="isActive"
                  className="text-body-md text-on-surface cursor-pointer select-none"
                >
                  Usuario activo
                </label>
              </div>

              {/* ── Actions ── */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleRequestClose}
                  className="px-6 py-3 rounded-lg text-body-md text-on-surface-variant
                      hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (isCreate ? false : !dirty)}
                  className="px-6 py-3 rounded-lg text-body-md font-semibold
                      bg-primary text-on-primary
                      hover:bg-primary-fixed-dim
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  {isCreate ? "Crear usuario" : "Guardar cambios"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

UserFormModal.displayName = "UserFormModal";

export { UserFormModal };
