import { useEffect } from "react";
import theme from "./theme.json";
import "./styles/style.css";
import Routes from "./Routes";
import "antd/dist/antd.less";

function App() {
  useEffect(() => {
    Object.keys(theme).forEach((key) => {
      document.body.style.setProperty(`--${key}`, theme[key]);
    });
  }, []);
  return <Routes />;
}

export default App;
