import { MDBDataTable } from "mdbreact";

const TableComponent = ({ data }) => {
  return (
    <MDBDataTable
      striped
      data={data}
      responsive
      // sortRows={[ "title", "bill", "description"]}
    />
  );
};

export default TableComponent;
