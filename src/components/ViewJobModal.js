import { Image, Modal, Spin, Tag, Typography } from "antd";
import moment from "moment/moment";
import React, { useState } from "react";
import Map from "./Map";

const ViewJobModal = ({ job }) => {
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="view-job-modal">
      <span onClick={showModal}>View</span>
      <Modal
        title="View Job"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Spin size="large" spinning={!job}>
          <div style={{ padding: "0 30px" }}>
            <Title level={5}>Title : {job.title}</Title>

            <Title level={5}>
              Billed :
              <Tag
                style={{ marginLeft: "5px" }}
                color={job?.bill ? "#87d068" : "#f50"}
              >
                {job?.bill ? "true" : "false"}
              </Tag>
            </Title>

            <Title level={5}>Description : {job?.description}</Title>

            <Title level={5}>
              Created At :{" "}
              {moment(job?.timeStamp?.seconds * 1000).format("MMM Do YYYY")}
            </Title>

            <Title level={5}>
              Tags :
              {job?.tags?.map((tag) => (
                <Tag color={"#EE9B1F"} style={{ marginLeft: "5px" }}>
                  {tag}
                </Tag>
              ))}
            </Title>

            <Title level={5}>Images : </Title>
            {job?.images?.map((image) => (
              <Image src={image} height={80} style={{ margin: "0 3px" }} />
            ))}
            <Title level={5}>Location:</Title>
            <Map position={job?.location} readOnly={true} />
          </div>
        </Spin>
      </Modal>
    </div>
  );
};

export default ViewJobModal;
