import type { ReactNode } from "react";

type TModules = {
  title: string;
  children: ReactNode;
};

const ModulesLayout = ({ title, children }: TModules) => {
  return (
    <div className="p-2 w-full max-w-6xl ">
      <h3 className="text-2xl font-semibold text-slate-700">{title}</h3>
      <section className="mt-2 bg-white p-4 border-gray-200 border rounded-xl">
        {children}
      </section>
    </div>
  );
};

export default ModulesLayout;
