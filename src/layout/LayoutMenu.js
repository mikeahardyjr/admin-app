import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AiOutlineLogout } from "react-icons/ai";

const LayoutMenu = () => {
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  // const handleButtonClick = (e) => {
  //   message.info("Click on left button.");
  //   console.log("click left button", e);
  // };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label:<a href="https://www.aliyun.com">2nd menu item</a>,
          // key: "0",
          icon: <UserOutlined />,
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LayoutMenu;
