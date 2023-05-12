import { FC, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";

export type FormValues = {
  username: string;
  password: string;
};

type Props = {
  onSubmit?: (values: FormValues) => void;
};

const Login: FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({ username, password });
  };

  return (
    <Row
      style={{ minHeight: "100vh" }}
      className="justify-content-center align-items-center"
    >
      <Col md={4}>
        <Card>
          <Card.Body>
            <Form onSubmit={handelSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter email"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
