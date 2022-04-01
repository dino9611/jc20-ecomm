import { useState } from "react";

const AddData = () => {
  // {
  //     name:'bla',
  //     price:3321,
  //     series_id :1,
  //     desc:"bla",
  //     models:[{
  //         name:'bla',
  //         images:[]
  //     }]
  // }
  {
    caption: "dadsad";
  }
  [];

  const [input, setinput] = useState({
    name: "",
    price: "",
    series_id: 0,
    desc: "",
  });

  const [model, setmodel] = useState([
    {
      name: "",
      images: [null, null, null, null],
    },
  ]);

  const onInputModelChange = (e, index) => {
    const modelarr = model;
    modelarr[index][e.target.name] = e.target.value;
    setmodel([...modelarr]);
  };

  const addModel = () => {
    setmodel([
      ...model,
      {
        name: "",
        images: [null, null, null, null],
      },
    ]);
  };

  const imageupload = (e, indexmodel, indexImages) => {
    if (e.target.files) {
      const modelarr = model;
      modelarr[indexmodel].images[indexImages] = e.target.files[0];

      setmodel([...model]);
    }
  };

  const hapusImage = (indexmodel, indexImages) => {
    const modelarr = model;
    modelarr[indexmodel].images[indexImages] = null;
    setmodel([...model]);
  };

  const saveData = () => {
    const formData = new FormData();

    model.forEach((val, index) => {
      val.images.forEach((val1) => {
        formData.append("product" + (index + 1), val1);
      });
    });
    // PISAH NAME DAN IMAGES DI MODEL
    const modelNew = model.map((val) => ({ name: val.name }));

    const dataUpload = {
      name: "bla",
      price: 3321,
      series_id: 1,
      desc: "bla",
      model: modelNew,
    };

    formData.append("data", JSON.stringify(dataUpload));
  };

  const renderModelinput = () => {
    return model.map((val, index) => {
      return (
        <div className="px-5 mt-2">
          <div className="mb-5">
            <input
              type="text"
              className="w-full "
              name="name"
              placeholder="model name"
              onChange={(e) => onInputModelChange(e, index)}
              value={val.name}
            />
          </div>
          <div className="flex w-full">
            {val.images.map((val1, index1) => {
              if (val1) {
                return (
                  <>
                    <span onClick={() => hapusImage(index, index1)}>X</span>
                    <img
                      src={URL.createObjectURL(val1)}
                      className="mx-2 h-[100px]"
                      alt="foto"
                    />
                  </>
                );
              }
              return (
                <>
                  <label
                    htmlFor={"file" + index1}
                    className="mx-2 h-[100px] bg-red-400 flex justify-center items-center"
                  >
                    add your images
                    <input
                      id={"file" + index1}
                      type="file"
                      onChange={(e) => imageupload(e, index, index1)}
                      style={{ display: "none" }}
                      name="image"
                      accept=".gif,.jpg,.jpeg,.png"
                    />
                  </label>
                </>
              );
            })}
          </div>
          {index < model.length - 1 ? (
            <button className=" mt-5 rounded-full bg-black text-3xl text-white h-[50px] w-[50px]">
              -
            </button>
          ) : (
            <button
              onClick={addModel}
              className=" mt-5 rounded-full bg-black text-3xl text-white h-[50px] w-[50px]"
            >
              +
            </button>
          )}
        </div>
      );
    });
  };

  return <div className="mt-3 ml-72">{renderModelinput()}</div>;
};

export default AddData;
