import { Layout, Typography, Menu, Dropdown, Avatar } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  MoreOutlined,
  BellOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import DashboardMenuDrawer from "./MenuDrawer";

const { Content } = Layout;

const MobileLayout = ({ active, children }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<BellOutlined />}>
        <Link to="/notification">Notifications</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="dashboard-mobile">
      <div className="mobile-header">
        <DashboardMenuDrawer active={active} />
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Dropdown className="more-dropdown" overlay={menu} trigger={["click"]}>
          <MoreOutlined />
        </Dropdown>
      </div>
      <Content className="dashboard-children">{children}</Content>
    </Layout>
  );
};

export default MobileLayout;
