import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default Router;
