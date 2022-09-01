import { Layout, Button } from "antd";
import {
  AntDesignOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { GoPrimitiveDot } from "react-icons/go";

// const { Header, Sider, Content } = Layout;

import LayoutMenu from "./LayoutMenu.js";
import React, { useState } from "react";

const { Header, Content, Sider } = Layout;

const LayoutDesktop = ({ children, active }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="layoutDesktop">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Header>
            <div className="trigger">Admin Dashboard</div>
            {/* <div> */}
              <Button
                className="header-right header-logout-btn"
                type="primary"
                style={{ margin: "auto 0" }}
                // block
              >
                Logout
              </Button>
              {/* <LayoutMenu /> */}
              
            {/* </div> */}
          </Header>
          <Content>
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutDesktop;
