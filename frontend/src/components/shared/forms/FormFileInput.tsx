import { useRef, useState, type ChangeEvent } from "react";

type Props = {
  name: string;
  id: string;
  defaultImage: string | undefined;
  onBase64?: (base64: string) => void; // send base64 to parent
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormFileInput({
  name,
  id,
  onBase64,
  defaultImage,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create image preview
    const url = URL.createObjectURL(file);
    setPreview(url);

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onBase64?.(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md w-full shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">
      <label
        htmlFor={id}
        className="border-2 border-dotted border-gray-400 p-8 mt-2 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition relative"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="max-h-40 object-contain rounded"
          />
        ) : (
          <>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-gray-500">Drag files here to upload</p>
            <p className="text-gray-400">
              Or <span className="text-blue-500 underline">click here</span> to
              select a file
            </p>
          </>
        )}

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          {...props}
          name={name}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
