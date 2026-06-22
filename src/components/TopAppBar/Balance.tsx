import { CashIcon } from "@/icons/CashIcon";

export const Balance = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`flex items-center gap-2 border-r-2 border-[#80BCE3] pr-4 ${className}`}
    >
      <CashIcon />
      <span className="text-secondary">Balance: </span>{" "}
      <span className="font-medium text-[#80BCE3]">
        {"1000"}$ {/* Replace with actual balance from state or props */}
      </span>
    </div>
  );
};
