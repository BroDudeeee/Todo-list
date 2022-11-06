import { useEffect, useState } from "react";
import { editIcon, trashIcon } from "./icons";

const App = () => {
  const [value, setValue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [editID, setEditID] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      showAlert(true, "danger", "There is no Item");
    } else if (value && editing) {
      const editedItemsList = listItems.map((item) => {
        if (editID === item.id) {
          setValue(value);

          return { ...item, title: value };
        }
        return item;
      });
      setListItems(editedItemsList);
      setValue("");
      setEditID(null);
      setEditing(false);
      showAlert(true, "success", "Item Edited");
    } else {
      setListItems([
        ...listItems,
        { id: new Date().getTime().toString(), title: value },
      ]);
      setValue("");
      showAlert(true, "success", "Item added");
    }
  };

  const removeAll = () => {
    setListItems([]);
    showAlert(true, "success", "List is clear");
  };

  const removeItem = (id, title) => {
    const newList = listItems.filter((item) => item.id !== id);
    setListItems(newList);
    showAlert(true, "danger", `${title} removed`);
  };

  const editItem = (id) => {
    const editedItemsList = listItems.map((item) => {
      if (id === item.id) {
        setValue(item.title);
        setEditID(id);
      }
      return item;
    });
    setListItems(editedItemsList);
    setEditing(true);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <main>
      <div className={alert.type}>{alert.show && <p>{alert.msg}</p>}</div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputSubmit">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Enter..."
          />
          <button className="submitBtn">{editing ? "Edit" : "Submit"}</button>
        </div>
        <div>
          {listItems.length
            ? listItems.map((item) => (
                <div className="itemContainer" key={item.id}>
                  <h4>{item.title}</h4>
                  <div className="icons">
                    <div onClick={() => editItem(item.id)} className="editBtn">
                      {editIcon}
                    </div>

                    <div
                      onClick={() => removeItem(item.id, item.title)}
                      className="trashBtn"
                    >
                      {trashIcon}
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </form>

      {listItems.length ? (
        <button onClick={removeAll} className="clearAll">
          Clear All
        </button>
      ) : null}
    </main>
  );
};

export default App;
