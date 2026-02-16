import { Modal } from "antd";
import type { ReactNode } from "react";
import FormButton from "./forms/FormButton";
import useModal from "@/store/useModal";

type TDialog = {
  id: string;
  children: ReactNode;
  buttonContent: ReactNode;
  cleanFunc?: (v: null) => void;
  buttonStyles?: string;
};

const Dialog = ({
  id,
  children,
  buttonContent,
  cleanFunc,
  buttonStyles,
}: TDialog) => {
  const modal = useModal();

  return (
    <>
      <FormButton
        type="button"
        click={() => modal.open(id)}
        className={buttonStyles}
      >
        {buttonContent}
      </FormButton>

      <Modal
        open={modal.isOpen(id)}
        onCancel={() => {
          modal.close(id);
          modal.clean(cleanFunc);
        }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default Dialog;
