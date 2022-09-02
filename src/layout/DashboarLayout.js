import DashboardLayoutDesktop from "./LayoutDesktop.js";

const DashboardLayout = ({ active, children }) => {
  return (
    <>
      <DashboardLayoutDesktop active={active}>
        {children}
      </DashboardLayoutDesktop>
      {/* <DashboardLayoutMobile active={active}>{children}</DashboardLayoutMobile> */}
    </>
  );
};

export default DashboardLayout;
