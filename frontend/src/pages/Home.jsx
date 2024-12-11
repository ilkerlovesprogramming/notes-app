import NavBar from "../components/NavBar";
import Notes from "../components/Notes";
import { useState, useEffect } from "react";
import api from "../api";
import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";

function Home() {
  const [notes, setNotes] = useState([]);
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
          // alert("Note Created");
          getNotes();
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

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      });
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status !== 204) alert("Failed to delete note.");
      getNotes();
    });
  };

  function displayNotes(note) {
    return <Notes note={note} onDelete={deleteNote} key={note.id} />;
  }

  return (
    //Input
    <div className="flex flex-col w-full bg-gradient-to-r from-black via-black to-black">
      <NavBar />
      <div
        style={{
          background:
            "url(http://www.transparenttextures.com/patterns/cubes.png)",
        }}
        className="flex-grow"
      >
        <div
          onClick={handleClick}
          style={{ transform: "translateY(80px)" }}
          className="relative mx-auto  bt-300 max-w-md rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg"
        >
          <form>
            {/*InputCard */}
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
          </form>
        </div>
        <div className="container-fluid  lg:h-screen m-32 mx-auto">
          <div className="flex flex-wrap  justify-between gap-8 sm:m-8 md:m-12 lg:m-16">
            {notes.map(displayNotes)}
            <footer class="fixed bottom-0 w-full text-white text-center bg-black bg-opacity-50">
              <p class="py-2">&copy; decodecraft 2024</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
