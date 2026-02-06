import { useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ButtonToUp = () => {
  const refButton = useRef<HTMLButtonElement>(null);

  function toggleScrollButton() {
    if (window.scrollY > 300) {
      refButton.current?.classList.remove("opacity-0", "invisible");
      refButton.current?.classList.add("opacity-100", "visible");
    } else {
      refButton.current?.classList.remove("opacity-100", "visible");
      refButton.current?.classList.add("opacity-0", "invisible");
    }
  }

  useEffect(() => {
    refButton.current?.classList.add("opacity-o", "invisible");
    window.addEventListener("scroll", toggleScrollButton);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={refButton}
      onClick={handleClick}
      className="fixed bottom-8 right-8 p-2 bg-sky-500
       hover:bg-sky-600 text-white rounded-md
        shadow-2xl transition-all duration-500 
        opacity-100 visible hover:scale-110  z-50 
        flex items-center justify-center  cursor-pointer"
    >
      <IoIosArrowUp />
    </button>
  );
};

export default ButtonToUp;
