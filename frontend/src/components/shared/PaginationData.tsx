import type { apiTpag, Tpagination } from "@/types/index";
import { Pagination } from "antd";

type TProp = {
  current: number;
  total: number;
  onshowsizechange: (value: Tpagination) => void;
  pag: apiTpag;
};

const PaginationData = ({ current, total, onshowsizechange, pag }: TProp) => {
  const changePage = (page: number, pageSize: number) => {
    onshowsizechange({ ...pag, page, limit: pageSize });
  };

  return (
    <Pagination
      showSizeChanger
      current={current}
      pageSize={pag.limit}
      total={total}
      onChange={changePage}
      className="flex justify-center"
    />
  );
};

export default PaginationData;
