import { useState } from "react";
import { Container } from "../components/general";

const NotFound = () => {
  const [files, setfiles] = useState([""]);

  const tambah = () => {
    // let newfiles = files;
    // newfiles.push("");
    // setfiles([...newfiles]);
    setfiles([...files, ""]);
  };

  const kurang = (index) => {
    let newfiles = files;
    newfiles.splice(index, 1);
    setfiles([...newfiles]);
  };

  const handleinput = (e, ind) => {
    let newfiles = files;
    newfiles[ind] = e.target.value;
    setfiles([...newfiles]);
  };

  const renderInput = () => {
    return files.map((val, index) => {
      return (
        <div className="mt-2">
          <input
            value={val}
            onChange={(e) => handleinput(e, index)}
            className="w-11/12  placeholder:text-slate-600  bg-white  border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-matoa-text-primary focus:ring-matoa-text-primary focus:ring-1 sm:text-sm"
          />
          {index === files.length - 1 ? (
            <button
              onClick={tambah}
              className="w-1/12 rounded-md py-2 bg-white border "
            >
              +
            </button>
          ) : (
            <button
              onClick={() => kurang(index)}
              className="w-1/12 rounded-md py-2 bg-white border "
            >
              -
            </button>
          )}
        </div>
      );
    });
  };
  return (
    <Container>
      <div>{renderInput()}</div>
      <button
        onClick={() => alert(files)}
        disabled={files.some((val) => val == "")}
        // disabled={files.every((val) => val !== "")}
        className="bg-white disabled:bg-gray-500"
      >
        coba
      </button>
    </Container>
  );
};

export default NotFound;
