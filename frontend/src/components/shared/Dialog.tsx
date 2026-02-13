import { Modal } from "antd";
import type { ReactNode } from "react";
import FormButton from "./forms/FormButton";
import useModal from "@/store/useModal";

type TDialog = {
  children: ReactNode;
  buttonContent: ReactNode;
  cleanFunc?: (v: null) => void;
  buttonStyles?: string;
};

const Dialog = ({
  children,
  buttonContent,
  cleanFunc,
  buttonStyles,
}: TDialog) => {
  const { isOpen, openModal, closeModal, cleanInside } = useModal();
  return (
    <>
      <FormButton type="button" click={openModal} className={buttonStyles}>
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
