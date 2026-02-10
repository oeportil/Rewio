type Props = {
  className?: string;
};

const Logo = ({ className = "3xl" }: Props) => {
  return <img src="/logo.png" alt="Logo de ReWio" className={className} />;
};

export default Logo;
