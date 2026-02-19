import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import { FaPlus } from "react-icons/fa";
import { LuTreePalm } from "react-icons/lu";
import { MdBlock } from "react-icons/md";
import { DatePicker } from "antd";

import type { Dayjs } from "dayjs";
import { rangePresets } from "@/consts/index";
import dayjs from "dayjs";

type Prop = {
  idDoctor: number;
};

const BlocksAndVacations = ({ idDoctor }: Prop) => {
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const forCards = [
    <>
      <p className="text-end text-sky-700 font-semibold text-base flex gap-1 items-center justify-end">
        Vacaciones <LuTreePalm className="text-amber-500" />
      </p>
      <Dialog
        id="vacations"
        buttonStyles="bg-sky-600 text-white px-4 rounded-lg hover:bg-sky-700 transition cursor-pointer"
        buttonContent={"+ Agregar"}
      >
        <h2 className="text-start text-sky-700 font-semibold text-lg flex gap-1 items-center justify-start">
          Agregar Vacaciones <LuTreePalm className="text-amber-500" />
        </h2>

        <form action="" className="grid grid-cols-1 items-center gap-2 mt-4">
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

      <div className="mt-4 space-y-3">
        <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
          20 Feb 2026 - Vacaciones
        </div>
      </div>
    </>,
    <>
      <p className="text-end text-sky-700 font-semibold text-base flex gap-1 items-center justify-end">
        Bloqueos <MdBlock className="text-red-500" />
      </p>
      <Dialog
        id="blocks"
        buttonStyles="bg-red-600 text-white px-4 rounded-lg hover:bg-red-700 transition cursor-pointer"
        buttonContent={"+ Agregar"}
      >
        bloqueos
      </Dialog>
      <div className="mt-4 space-y-3">
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          20 Feb 2026 - Bloqueos
        </div>
      </div>
    </>,
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-6">🚫 Bloqueos y Vacaciones</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
        {forCards.map((ctn) => (
          <article className="bg-gray-50 p-6 rounded-2xl">{ctn}</article>
        ))}
      </div>
    </section>
  );
};

export default BlocksAndVacations;
