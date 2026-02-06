import { Modal } from "antd";
import type { ReactNode } from "react";
import FormButton from "./forms/FormButton";
import useModal from "@/store/useModal";

type TDialog = {
  children: ReactNode;
  buttonContent: ReactNode;
  cleanFunc?: (v: null) => void;
};

const Dialog = ({ children, buttonContent, cleanFunc }: TDialog) => {
  const { isOpen, openModal, closeModal, cleanInside } = useModal();
  return (
    <>
      <FormButton
        type="button"
        className="text-sm xl:text-sm py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold md:max-w-56 w-full"
        click={openModal}
      >
        {buttonContent}
      </FormButton>
      <Modal
        open={isOpen}
        onCancel={() => {
          closeModal();
          if (cleanFunc) cleanInside(cleanFunc);
        }}
        closable={{ "aria-label": "Custom Close Button" }}
        footer={[]}
      >
        {children}
      </Modal>
    </>
  );
};

export default Dialog;
