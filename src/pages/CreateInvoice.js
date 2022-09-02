import Layout from "../layout/DashboarLayout";
import { FaFileInvoice, FaPlus } from "react-icons/fa";
import {
  Col,
  Input,
  Row,
  Typography,
  Select,
  Table,
  Button,
  Radio,
  message,
  Upload,
  Tag,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { db, storage } from "../firebase";
import { useHistory, useLocation } from "react-router";
import { uid } from "uid";
import Swal from "sweetalert2";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CreateInvoice = () => {
  const [title, setTitle] = useState("");
  const [bill, setBill] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   url: "https://firebasestorage.googleapis.com/v0/b/dashboard-378d6.appspot.com/o/1661801832838active-icon-11.jpg?alt=media&token=5b575209-dca3-46b3-b666-ee1e19e48d1e",
    // },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existing, setExisting] = useState("");
  const location = useLocation();
  const history = useHistory()
  const onBillChange = (e) => {
    setBill(e.target.value);
  };

  const beforeUpload = (file) => {
    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG file!");
    //   return;
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 2MB!");
    //   return;
    // }
    // return isJpgOrPng && isLt2M;
  };
  const onImageUpload = async (info) => {
    if (!info?.file?.url) {
      const isJpgOrPng =
        info.file.type === "image/jpeg" || info.file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return;
      }

      const isLt2M = info.file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return;
      }

      console.log(info);
    }
    setFileList(info.fileList);
  };
  const customUpload = ({ onError, onSuccess, file }) => {
    try {
      // create image with time and name
      setLoading(true);
      console.log("done");
      const imageName = new Date().getTime() + file.name;
      console.log(imageName);
      const storageRef = ref(storage, imageName);
      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "96 done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          setLoading(false);
          onError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("download url", downloadUrl);
            setLoading(false);
            onSuccess(downloadUrl);
            // setImageUrl(downloadUrl);
          });
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlePreview = async (file) => {
    setPreviewImage(file.response || file.preview || file.url);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name ||
        file.url.substring(file.url.lastIndexOf("/") + 1) ||
        file.response.substring(file.response.lastIndexOf("/") + 1)
    );
  };

  const onSelectChange = (tags) => {
    setTags(tags);
  };
  const handleCancel = () => setPreviewVisible(false);

  const clearFields = () => {
    setTitle("");
    setTags([]);
    setBill(false);
    setDescription("");
    setFileList([]);
  };
  const onSubmit = async () => {
    console.log(tags, description, title, bill, fileList);
    // Add a new document in collection
    try {
      setLoading(true);
      const images = fileList?.map((image) => image?.response || image?.url);
      let response;
      if (existing) {
        console.log(existing);
        response = await setDoc(doc(db, "jobs", existing), {
          title: title,
          bill: bill,
          tags: tags,
          description: description,
          images: images,
          timeStamp:serverTimestamp()
        });
      } else {
        response = await addDoc(collection(db, "jobs"), {
          tags,
          description,
          title,
          bill,
          images,
          timeStamp: serverTimestamp(),
        });
        clearFields();
      }
      Swal.fire({
        title: "Success",
        text: `Job ${existing ? "Updated" : "Added"} Successfully`,
        icon: "success",
      });
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // fetch data if editing
  const fetchDataById = async (id) => {
    try {
      console.log(id);
      let response = await getDoc(doc(db, "jobs", id));
      const data = response?.data();

      setExisting(id);
      setTitle(data?.title);
      setBill(data?.bill);
      setDescription(data?.description);
      setTags(data?.tags);
      setFileList(
        data?.images?.map((img) => {
          return {
            uid: uid(16),
            url: img,
          };
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    try {
      if (location.state) fetchDataById(location.state);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Layout active="create-invoice">
      <div className="general-margin-padding form-container">
        <div style={{
          display:'flex',
          alignItems:'center',
          flexWrap:'wrap'
          // justifyContent:'center'
        }}>
          <Button style={{ marginRight:'20px'}} shape="circle" icon={<AiOutlineArrowLeft />} size="large" onClick={()=>history.push('/')}/>
          <Title style={{ textAlign: "center" ,marginLeft:'20px'}}>
            <FaFileInvoice style={{ marginRight: "10px" }} />
            Add Job
          </Title>
        </div>
        <div className="margin-vertical">
          <Title level={3}>Title</Title>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="margin-vertical">
          <Title level={3}>Billed</Title>
          <Radio.Group onChange={onBillChange} value={bill}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
        <div className="margin-vertical">
          <Title level={3}>Tags</Title>
          <Select
            mode="tags"
            size={"large"}
            placeholder="Please select"
            // defaultValue={["install", "removal"]}
            value={tags}
            onChange={onSelectChange}
            style={{
              width: "100%",
            }}
          ></Select>
        </div>
        <div className="margin-vertical">
          <Title level={3}>Description</Title>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="margin-vertical">
          <Title level={3}>Images</Title>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            fileList={fileList}
            multiple={true}
            accept={"image"}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onImageUpload}
            customRequest={customUpload}
            onPreview={handlePreview}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </div>
        <div className="margin-vertical">
          <Button loading={loading} type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </div>
        <Modal
          visible={previewVisible}
          // title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
        {/* <div className="invoice">
          <Row>
            <Col xs={24} lg={12}>
              <Title level={4}>From,</Title>
              <p>The Forge User 1</p>
              <p>090078601</p>
              <p>info@theforge.pk</p>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={4}>To,</Title>
              <Input placeholder="Mobile Number" />
              <Input placeholder="Customer Name" disabled />
              <Input placeholder="Invoice Number" />
            </Col>
          </Row>

          <div className="add-invoice">
            <Table
              columns={columns}
              dataSource={data}
              rowSelection={rowSelection}
              scroll={{ x: 1200 }}
              pagination={false}
            />
            <div className="add-remove-btn">
              <Button icon={<AiOutlineMinus />}>Remove</Button>
              <Button icon={<AiOutlinePlus />}>Add</Button>
            </div>
          </div>
          <div className="notes">
            <Row gutter={[30, 30]}>
              <Col xs={24} lg={12}>
                <Title level={5}>Notes: </Title>
                <TextArea rows={4} />
                <Button type="primary">Save Invoice</Button>
              </Col>
              <Col xs={24} lg={12}>
                <div className="row-inputs">
                  <p>Total Loyalty Points Available:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Points to Redeem:</p>
                  <Input placeholder="points to redeem" />
                </div>
                <div className="row-inputs">
                  <p>Total:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Discount:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Tax Rate:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
                <div className="row-inputs">
                  <p>Net Total:</p>
                  <Input placeholder="total loyalty point avail" />
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default CreateInvoice;
