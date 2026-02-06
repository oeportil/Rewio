import useRoles from "@/hooks/Module/useRoles";
import RolCard from "./RolCard";
import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import { FaPlusCircle } from "react-icons/fa";
import Dialog from "@/components/shared/Dialog";

const Roles = () => {
  const {
    contextHolder,
    rol,
    openEdit,
    roles,
    saveRol,
    handleChange,
    isEditing,
    setIsEditing,
  } = useRoles();
  return (
    <div>
      {contextHolder}
      <div className=" md:flex items-center justify-start gap-2 w-full my-2">
        <Dialog
          cleanFunc={() => {
            setIsEditing(false);
          }}
          buttonContent={
            <>
              Crear Rol <FaPlusCircle />
            </>
          }
        >
          <>
            <h4 className="m-2 text-center text-xl font-bold text-amber-950">
              {isEditing ? "Editar Rol" : "Crear nuevo Rol"}
            </h4>
            <form action="" onSubmit={saveRol}>
              <FormInput
                labelText="Nombre"
                labelId="name"
                type="name"
                htmlFor="name"
                name="name"
                value={rol.name}
                onChange={handleChange}
              />
              <FormInput
                labelText="Descripción"
                labelId="description"
                type="text"
                htmlFor="description"
                name="description"
                onChange={handleChange}
                value={rol.description}
              />
              <FormButton
                type="submit"
                className="text-sm mt-4 xl:text-sm hover:opacity-90 transition-opacity font-semibold md:max-w-xs w-full"
              >
                {isEditing ? "Actualizar Rol" : "Crear Rol"}
              </FormButton>
            </form>
          </>
        </Dialog>
      </div>

      <section className="space-y-2 m-2">
        {roles.map((v, i) => (
          <RolCard key={i} v={v} onEdit={openEdit} />
        ))}
      </section>
    </div>
  );
};

export default Roles;
