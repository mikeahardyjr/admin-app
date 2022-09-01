import { Button, Input, Typography, notification } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const Login = () => {
  const { Title } = Typography;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const onSubmit = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("accessToken", response?.user?.accessToken);
      notification.success({
        message: "Login Success",
      });
      history.push("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        notification.error({
          message: "Invalid Email",
        });
      } else if (error.code === "auth/wrong-password") {
        notification.error({
          message: "Invalid Password",
        });
      } else if (error.code === "auth/user-not-found") {
        notification.error({
          message: "User Not Found",
        });
      } else {
        notification.error({
          message: error.code,
        });
      }
    }
  };
  return (
    <div className="login">
      <div
        className="login-container"
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      >
        <Title level={1}>ADMIN DASHBOARD</Title>
        <p>Sign in to your account and enjoy unlimited perks.</p>
        {/* <form onSubmit={onSubmit}> */}
        <Input
          placeholder="User Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" block onClick={onSubmit}>
          Login
        </Button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Login;
