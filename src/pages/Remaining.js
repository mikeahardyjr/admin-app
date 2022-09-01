import Layout from "../layout/DashboarLayout";
import { Button, Typography } from "antd";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import TableComponent from "../components/TableComponent";
import { data } from "../userData.json";
import { useEffect } from "react";
import { useState } from "react";
import { MdPayment } from "react-icons/md";

const Remaining = () => {
  const { Title } = Typography;
  const [users, setUsers] = useState(null);

  const columns = [
    {
      title: "S/N",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "USER NAME/ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PACKAGE",
      dataIndex: "pkg",
      key: "pkg",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "MOBILE NO",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "NIC NUMBER",
      dataIndex: "nic",
      key: "nic",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];
  useEffect(() => {
    let tempArr = [];
    data?.slice(0, 2).map((user, i) => {
      tempArr.push({
        key: i,
        sno: user.sno,
        id: user.id,
        pkg: user.id,
        name: user.name,
        address: user.address,
        mobile: user.mobile,
        nic: user.nic,
        amount: user["amount "],
        action: <Button>Pay</Button>,
      });
    });
    setUsers(tempArr);
  }, []);
  return (
    <Layout active="remaining">
      <div className="general-margin-padding">
        <Title className="general-title-h1">
          <MdPayment style={{ marginRight: "10px" }} /> Remaining Amount
        </Title>
        <TableComponent data={users} columns={columns} />
      </div>
    </Layout>
  );
};

export default Remaining;
