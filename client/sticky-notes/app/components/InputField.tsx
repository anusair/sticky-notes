import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputFieldType = {
  name: string;
  type: string;
  errorMessage?: string;
  show?: boolean;
  onTogglePassword?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  name,
  type = "text",
  errorMessage,
  show = false,
  onTogglePassword,
  value = "",
  onChange,
}: InputFieldType) {
  const isPasswordField = type === "password";
  const isEmailField = type === "email";

  return (
    <div className="flex flex-col gap-2">
      <div>
        {/* the container div which holds both the label and the input */}
        <label htmlFor={name} className="text-white text-lg">
          {name}
        </label>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={
              isPasswordField
                ? show
                  ? "text"
                  : "password"
                : isEmailField
                ? "email"
                : "text"
            }
            className={`w-full outline-none border  py-3 px-3 rounded-xl text-white focus:border-primary focus:shadow-sm focus:shadow-primary
            ${errorMessage ? "border-red-600" : "border-white"}`}
            value={value}
            onChange={onChange}
          />
          {isPasswordField && (
            <button
              type="button"
              className="absolute text-white cursor-pointer right-5 top-1/2 -translate-y-1/2"
              onClick={onTogglePassword}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      </div>
      <p className="text-red-600 text-sm">{errorMessage || ""}</p>
    </div>
  );
}

export default InputField;
