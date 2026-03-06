import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import { FaPlus } from "react-icons/fa";
import { LuTreePalm } from "react-icons/lu";
import { MdBlock } from "react-icons/md";
import { DatePicker, TimePicker } from "antd";
import { rangePresets } from "@/consts/index";
import useVacations from "@/hooks/logic/useVacations";
import { formatDate } from "@/utils/index";
import useBlocks from "@/hooks/logic/useBlocks";
import SearchInput from "@/components/shared/SearchInput";
import { FaXmark } from "react-icons/fa6";
import { useUserStore } from "@/store/useUserStore";

type Prop = {
  idDoctor: number;
};

const BlocksAndVacations = ({ idDoctor }: Prop) => {
  const {
    vacations,
    disabledDate,
    onRangeChange,
    saveVacation,
    contextHolder: chvac,
    deleteVacation,
  } = useVacations({
    fetchData: true,
    idDoctor,
  });
  const {
    onChangeDate,
    contextHolder: chblocks,
    onChangeTime,
    saveBlock,
    blocks,
    pag,
    handlePagination,
    deleteBlock,
  } = useBlocks({
    fetchData: true,
    idDoctor,
  });

  const user = useUserStore((state) => state.user);

  const forCards = [
    <>
      {/* VACACIONES */}
      {chvac}
      <p className="text-end text-sky-700 font-semibold text-base flex gap-1 items-center justify-end">
        Vacaciones <LuTreePalm className="text-amber-500" />
      </p>
      {user && user.role != "doctor" && (
        <Dialog
          id="vacations"
          buttonStyles="bg-sky-600 w-full md:w-fit text-white px-4 rounded-lg hover:bg-sky-700 transition cursor-pointer mt-2"
          buttonContent={"+ Agregar"}
        >
          <h2 className="text-start text-sky-700 font-semibold text-lg flex gap-1 items-center justify-start">
            Agregar Vacaciones <LuTreePalm className="text-amber-500" />
          </h2>

          <form
            action=""
            className="grid grid-cols-1 items-center gap-2 mt-4"
            onSubmit={saveVacation}
          >
            <div>
              <label htmlFor="" className="text-sky-950">
                Período de vacaciones
              </label>
              <DatePicker.RangePicker
                format="YYYY/MM/DD"
                disabledDate={disabledDate}
                onChange={onRangeChange}
                presets={rangePresets}
              />
            </div>
            <FormInput
              id="reason"
              name="reason"
              htmlFor="reason"
              labelText="Razón"
              type="text"
              ContainerClassName="col-span-2"
            />

            <div className="mt-1 flex justify-end col-span-2">
              <FormButton
                type="submit"
                woback={false}
                className="px-2 rounded-lg bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
              >
                <FaPlus />
                Agregar
              </FormButton>
            </div>
          </form>
        </Dialog>
      )}
      <div className="max-h-48 overflow-y-auto min-h-20 space-y-3 mt-2">
        {vacations.map((v, i) => (
          <div
            key={i}
            className="p-3 bg-sky-50 rounded-lg border border-sky-200"
          >
            <p>
              {formatDate(v.startDate)} - {formatDate(v.endDate)}
            </p>{" "}
            <p>{v.reason}</p>
            {user && user.role != "doctor" && (
              <div className="flex justify-end">
                <button
                  className="cursor-pointer hover:text-sky-500"
                  onClick={() => deleteVacation(v.id)}
                >
                  <FaXmark size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>,
    <>
      {/* BLOQUEOS */}
      {chblocks}
      <p className="text-end text-sky-700 font-semibold text-base flex gap-1 items-center justify-end">
        Bloqueos <MdBlock className="text-red-500" />
      </p>
      <div className="flex lg:flex-row flex-col gap-2 items-center mt-2">
        {user && user.role != "doctor" && (
          <Dialog
            id="blocks"
            buttonStyles="bg-red-600 lg:w-fit w-full text-white px-4 rounded-lg hover:bg-red-700 transition cursor-pointer mt-5"
            buttonContent={"+ Agregar"}
          >
            <h2 className="text-start text-sky-700 font-semibold text-lg flex gap-1 items-center justify-start">
              Agregar Bloqueos <MdBlock className="text-red-500" />
            </h2>
            <form
              action=""
              className="grid grid-cols-1 items-center gap-2 mt-4"
              onSubmit={saveBlock}
            >
              <div className="col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Dia de Bloqueo
                </label>
                <DatePicker
                  onChange={onChangeDate}
                  className="w-full"
                  disabledDate={disabledDate}
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Hora de Inicio
                </label>
                <TimePicker
                  onChange={(_, time) => onChangeTime(time, "start")}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Hora de Fin
                </label>
                <TimePicker
                  onChange={(_, time) => onChangeTime(time, "end")}
                  className="w-full"
                />
              </div>
              <FormInput
                id="reason"
                name="reason"
                htmlFor="reason"
                labelText="Razón"
                type="text"
                ContainerClassName="col-span-2"
              />

              <div className="mt-1 flex justify-end col-span-2">
                <FormButton
                  type="submit"
                  woback={false}
                  className="px-2 rounded-lg bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
                >
                  <FaPlus />
                  Agregar
                </FormButton>
              </div>
            </form>
          </Dialog>
        )}
        <div className="flex-2 flex items-end flex-col w-full">
          <label htmlFor="" className="text-sky-950 text-end">
            Filtro por fecha
          </label>
          <SearchInput
            type="date"
            pag={pag}
            handlePagination={handlePagination}
            className="bg-white w-full"
          />
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto min-h-20 space-y-3 mt-2">
        {blocks.map((b, i) => (
          <div
            key={i}
            className="p-3 bg-red-50 rounded-lg border border-red-200"
          >
            <p>{formatDate(b.date)}</p>
            <p>
              {b.startTime} - {b.endTime}
            </p>
            <p>{b.reason}</p>
            {user && user.role != "doctor" && (
              <div className="flex justify-end">
                <button
                  className="cursor-pointer hover:text-sky-500"
                  onClick={() => deleteBlock(b.id)}
                >
                  <FaXmark size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>,
  ];
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-6">
        🚫{" "}
        {user && user.role != "doctor"
          ? " Bloqueos y Vacaciones"
          : "Mis Bloqueos y Vacaciones"}
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
        {forCards.map((ctn, i) => (
          <article className="bg-gray-100 p-6 rounded-2xl" key={i}>
            {ctn}
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlocksAndVacations;
