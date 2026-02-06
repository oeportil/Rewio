import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const CommonCard = ({ children, className }: Props) => {
  return (
    <article
      className={`p-2 ${!className ? "bg-slate-100 border-slate-300" : className} rounded-sm border`}
    >
      {children}
    </article>
  );
};

export default CommonCard;
