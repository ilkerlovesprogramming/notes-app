import { Button } from "@mui/material";
import Card from "react-bootstrap/Card";
import api from "../api";
import DeleteIcon from "@mui/icons-material/Delete";

function Notes({ note, onDelete }) {
  const FormatedDate = new Date().toLocaleDateString("en-US");

  return (
    <div className="flex flex-col">
      <div className="container">
        <Card
          style={{ width: "18rem", color: "white" }}
          className="bg-gradient-to-r from-black via-black to-black border"
        >
          <Card.Body>
            <Card.Title>
              <span
                style={{ fontFamily: "cursive" }}
                className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {note.title}
              </span>
            </Card.Title>
            <Card.Text
              style={{ fontFamily: "cursive" }}
              className=" text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400"
            >
              {note.content}
            </Card.Text>
            <br />
            <p
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "5px",
                fontSize: "12px",
              }}
            >
              {FormatedDate}
            </p>
            <Button
              onClick={() => {
                onDelete(note.id);
              }}
              style={{
                position: "absolute",
                bottom: "-2px",
                right: "-10px",
              }}
            >
              <DeleteIcon />
            </Button>
            {/* <Button>Another Link</Button> */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default Notes;
