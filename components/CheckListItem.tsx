import { Check } from "lucide-react";
interface listItems {
  checked: boolean;
  label: string;
}
export default function CheckListItem({ checked, label }: listItems) {
  return (
    <div className="flex items-center justify-between text-sm group ">
      <label
        className={`flex items-center gap-3 transition-colors  ${
          checked ? "text-primary" : "text-secondary"
        }`}
      >
        <input
          type="checkbox"
          readOnly
          checked={checked}
          className="peer sr-only"
        />
        <div
          className={`w-5 h-5  rounded-full flex items-center justify-center ${
            checked
              ? "bg-greenish border-none"
              : "bg-white border border-gray-300"
          }`}
        >
          {checked && <Check className="text-white " />}
        </div>
        {label}
      </label>
    </div>
  );
}
