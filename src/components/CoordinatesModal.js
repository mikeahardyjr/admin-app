import React, { useState } from "react";
import { Image, Modal, Spin, Tag, Typography, Button, Input } from "antd";
import { MdEditLocationAlt } from "react-icons/md";

const CoordinatesModal = ({ setPosition }) => {
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCoordinatesChange = () => {
    if (!lat || !lng) {
      setIsModalVisible(false);
      return;
    }
    setPosition([Number(lat), Number(lng)]);
    setIsModalVisible(false)
  };

  return (
    <div className="view-job-modal">
      <Button
        icon={<MdEditLocationAlt />}
        onClick={showModal}
        shape={"circle"}
        size={"large"}
      />
      <Modal
        title="Add Coordinates"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        centered
      >
        <div style={{ padding: "0 30px" }}>
          <Title level={5}>Latitude</Title>
          <Input
            placeholder="Latitude"
            onChange={(e) => setLat(e.target.value)}
            type='number'
          />
          <Title level={5}>Longitude</Title>
          <Input
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
            type='number'
          />
          <Button type="primary" style={{marginTop:'10px'}} onClick={handleCoordinatesChange}>Set</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CoordinatesModal;
