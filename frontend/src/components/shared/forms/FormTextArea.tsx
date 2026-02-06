import { useState } from "react";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

export const FormTextArea = ({
  className = "",
  maxLength = 1000,
  ...props
}: FormTextAreaProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <textarea
        {...props}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`${className} border m-1 border-gray-300 rounded-sm h-32  py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent resize-y max-h-44 min-h-16`}
      >
        {value}
      </textarea>

      <span className="text-xs text-gray-500 text-right mr-1">
        {value.length} / {maxLength}
      </span>
    </div>
  );
};
