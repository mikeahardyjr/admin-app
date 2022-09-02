import Layout from "../layout/DashboarLayout";
import { Typography, Button, Image, Tag, Menu, Dropdown } from "antd";
import { FaEllipsisV, FaList, FaPlus } from "react-icons/fa";
import TableComponent from "../components/TableComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import ViewJobModal from "../components/ViewJobModal";

const Dashboard = () => {
  const { Title } = Typography;
  const [users, setUsers] = useState(null);
  const [data, setData] = useState(null);
  const history = useHistory();

  const fetchData = async () => {
    const jobs = [];
    const querySnapshot = await getDocs(collection(db, "jobs"));
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    setData(jobs);
  };
  console.log(data);
  const handleDeleteDoc = async (id) => {
    try {
      console.log(id);

      Swal.fire({
        title: "Are you sure you want to delete this job?",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "jobs", id));
          setData(data?.filter((item) => item?.id !== id));
          Swal.fire({
            title: `Job Deleted Successfully`,
            imageUrl: result.value.avatar_url,
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const menu = (doc) => (
    <Menu>
      <Menu.Item key="1" className="icon-btn" icon={<AiFillEye />}>
        <ViewJobModal job={doc} />
      </Menu.Item>
      <Menu.Item
        key="2"
        className="icon-btn"
        icon={<AiFillEdit />}
        onClick={() =>
          history.push({
            pathname: "/create",
            state: doc?.id,
          })
        }
      >
        Edit
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<AiFillDelete />}
        onClick={() => handleDeleteDoc(doc?.id)}
        className="icon-btn"
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  let tableData = {
    columns: [
      {
        label: "Image",
        field: "image",
        width: 300,
      },
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 300,
      },
      {
        label: "Billed",
        field: "bill",
        sort: "asc",
        width: 300,
      },
      {
        label: "Tags",
        field: "tags",
        sort: "asc",
        width: 300,
        search: true,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 300,
      },
      {
        label: "Created At",
        field: "date",
        sort: "asc",
        width: 300,
      },
      {
        label: "Actions",
        field: "action",
      },
    ],

    rows: data?.map((doc) => {
      return {
        image: <Image width="80px" src={doc?.images[0]} />,
        title: doc?.title,
        bill: (
          <Tag color={doc?.bill ? "#87d068" : "#f50"}>
            {doc?.bill ? "true" : "false"}
          </Tag>
        ),
        tags: doc?.tags?.join(", "),
        description: doc?.description,
        date: moment(doc?.timeStamp?.seconds * 1000).format("MMM Do YYYY"),
        action: (
          <>
            <Dropdown
              overlay={menu(doc)}
              placement="bottomLeft"
              trigger={["click"]}
            >
              <Button shape="circle" icon={<FaEllipsisV />} />
            </Dropdown>
          </>
        ),
      };
    }),
  };

  useEffect(() => {
    let tempArr = [];
    let token = localStorage.getItem("accessToken");
    if (!token) history.push("/login");

    setUsers(tempArr);
  }, []);
  return (
    <Layout active="dashboard">
      <div className="general-margin-padding">
        <div className="flex-between">
          <div>
            <Title className="general-title-h1">
              <FaList style={{ marginRight: "10px" }} /> Job Listings
            </Title>
          </div>
          <div>
            <Button
              type="primary"
              icon={<FaPlus style={{ marginRight: "10px" }} />}
              onClick={() => history.push("/create")}
            >
              Add New Job
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <TableComponent data={tableData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
