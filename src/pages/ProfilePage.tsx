import { FC, useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../providers/AuthProvider";

export type Profile = {
  id: string;
  name: string;
  username: string;
};

type Props = {};

const ProfilePage: FC<Props> = (props) => {
  const { storeAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>();
  const axios = useAxios();

  useEffect(() => {
    axios.get<{ user: Profile }>("/profile").then((res) => {
      setProfile(res.data.user);
    });
  }, []);

  const logout = () => {
    axios.post("/logout").then((res) => {
      storeAccessToken("");

      navigate("/", { replace: true });
    });
  };

  return (
    <Row
      style={{ minHeight: "100vh" }}
      className="align-items-center justify-content-center"
    >
      <Col md={4}>
        <Card bg="light" key="light" text="dark" className="mb-2">
          <Card.Header>User Info</Card.Header>
          <Card.Body>
            <Card.Title>ID : {profile?.id}</Card.Title>
            <Card.Text>{profile?.name}</Card.Text>
            <Card.Text>{profile?.username}</Card.Text>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProfilePage;
