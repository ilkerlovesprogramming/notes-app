import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  return (
    <Navbar
      expand="lg"
      className=" container-fluid mx-full w-full  bg-body-tertiary h-16 bg-gradient-to-r from-slate-800 to-gray-800"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <HighlightIcon
            sx={{ fontSize: 50, color: "#8845f4", paddingBottom: "10px" }}
          />
          <span
            style={{ font: "icon", fontFamily: "cursive" }}
            className="bg-clip-text text-4xl text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Keeper
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>*/}
            <Nav.Link>
              <Link to={"/logout"}>
                <LogoutIcon style={{ fontSize: "24px", color: "#8845f4" }} />
                <span className="bg-clip-text text-sm text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Logout
                </span>
              </Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 bg-gradient-to-r from-slate-600 to-gray-600"
              aria-label="Search"
            />
            <Button className="bg-gradient-to-r from-pink-500 hover:to-yellow-500  hover: from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
