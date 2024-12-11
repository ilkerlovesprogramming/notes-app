import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";
import api from "../api";

function InputCard() {
  const [inputText, setInputText] = React.useState({
    title: "",
    content: "",
  });
  const [isexpand, setIsExpand] = React.useState(false);

  const createNote = (e) => {
    e.preventDefault();
    const title = inputText.title;
    const content = inputText.content;

    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created");
        } else {
          alert("Failed");
        }
      })
      .catch((error) => alert(error));
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setInputText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleClick() {
    setIsExpand(true);
  }
  return (
    <div
      onClick={handleClick}
      style={{ transform: "translateY(80px)" }}
      className="relative mx-auto  bt-300 max-w-md rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg"
    >
      <div className="flex flex-col bg-gradient-to-r from-neutral-900 to-slate-800 rounded-md">
        {isexpand ? (
          <input
            className=" border-none  w-full text-xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
            type="text"
            name="title"
            value={inputText.title}
            onChange={handleChange}
            placeholder="Title"
            id="title"
          />
        ) : null}
        <textarea
          rows={isexpand ? 2 : 0}
          style={{ resize: "none" }}
          className="border-none w-full py-2 px-3 text-xl text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
          type="text"
          id="content"
          name="content"
          value={inputText.content}
          onChange={handleChange}
          placeholder="Take a note..."
        />
        {isexpand ? (
          <Zoom in={isexpand}>
            <Fab
              onClick={createNote}
              onMouseOut={handleMouseOut}
              className="absolute -bottom-5 -right-80 transform -translate-x-1/2   bg-gradient-to-r from-pink-500 hover:to-yellow-500  hover: from-green-400 to-blue-500"
              style={{
                width: "40px",
                height: "40px",
                minHeight: "40px",
              }}
            >
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </div>
    </div>
  );
}

export default InputCard;
