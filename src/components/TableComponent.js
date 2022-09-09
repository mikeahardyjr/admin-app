import { Spin } from "antd";
import { MDBDataTable } from "mdbreact";

const TableComponent = ({ data }) => {
  return (
    <Spin size="large" spinning={!data?.rows}>
      <MDBDataTable
        striped
        data={data}
        responsive
        // sortRows={[ "title", "bill", "description"]}
      />
    </Spin>
  );
};

export default TableComponent;
