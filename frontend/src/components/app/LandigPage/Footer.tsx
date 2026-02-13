import Logo from "@/components/shared/Logo";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-slate-50 p-3">
      <div>
        <Logo className="w-44" />
      </div>
      <small className="text-gray-400 border-b-2 border-sky-600">
        Sistema desarrollado por @RewareStudios
      </small>
    </footer>
  );
}
