import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
  return (
    <>
    <div className="main-body mt-3">
      <Container fluid>
        <Button onClick={(() => navigate("/all/users"))}>View all Users</Button>
      </Container>
    </div>
    </>
  );
}

export default Dashboard;
