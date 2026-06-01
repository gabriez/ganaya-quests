import { Dice } from "@/icons/Dice";

export const Login = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-4 w-4/5">
			<Dice />
			<form className="bg-[#FFFFFF]/20 w-[90%]">
				<div className="border rounded-sm bg-[#171F33] text-[#87929A] border-[#3E484F]">
					<input type="text" name="" id="" className="w-full" />
				</div>
			</form>
		</div>
	);
};
