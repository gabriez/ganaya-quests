import { LogoutIcon } from "@/icons/LogoutIcon";

export const Logout = ({
  logout = () => {},
  open,
}: {
  logout: () => void;
  open: boolean;
}) => {
  return (
    <button
      className={
        "mt-auto w-full flex items-center gap-3 p-3 hover:cursor-pointer text-on-surface-variant hover:bg-surface-container-high active:bg-surface-variant transition-colors " +
        (open ? "" : "justify-center")
      }
      type="button"
      onClick={logout}
    >
      <LogoutIcon />
      <span
        className={
          "overflow-hidden whitespace-nowrap transition-all duration-300 " +
          (open ? "opacity-100 w-auto" : "opacity-0 w-0 invisible")
        }
      >
        Cierra sesión
      </span>
    </button>
  );
};
