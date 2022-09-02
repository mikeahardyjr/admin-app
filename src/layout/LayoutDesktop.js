import { Layout, Button } from "antd";

import React, { useState } from "react";
import { useHistory } from "react-router";

const { Header, Content } = Layout;

const LayoutDesktop = ({ children, active }) => {
  const history = useHistory();
   return (
    <div className="layoutDesktop">
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Header>
            <div className="trigger">Admin Dashboard</div>
            <Button
              className="header-right header-logout-btn"
              type="primary"
              style={{ margin: "auto 0" }}
              onClick={() => {
                history.push("/login");
                localStorage.removeItem("accessToken");
              }}
            >
              Logout
            </Button>

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
