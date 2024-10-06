import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const Home = () => {
  const url = "http://localhost:3001/events";
  const [data, setdata] = useState([]);

  useEffect(() => {
    Fdata();
  }, []);

  const Fdata = () => {
    axios.get(url).then((res) => {
      setdata(res.data);
    });
  };

  const [Udata, setUdata] = useState([]);

  const chang = (e) => {
    setUdata({ ...Udata, [e.target.name]: e.target.value });
  };

  const Submit = () => {
    axios.post(url, Udata).then((res) => {
      console.log(res);
      Fdata();
    });
  };

  // delete

  const DeleteData = (id) => {
    axios.delete(`${url}/${id}`).then((res) => {
      const delet = data.filter((e) => e.id !== id);
      setdata(delet);
    });
  };

  // edit

  const [Edata, setEdata] = useState([]);

  const Editdata = (index) => {
    const edit = data[index];
    console.log(edit);

    setEdata(edit);
  };

  const onchangeEdit = (e) => {
    setEdata({ ...Edata, [e.target.name]: e.target.value });
  };

  const edithandal = (id) => {
    axios.put(`${url}/${id}`, Edata).then((res) => {
      Fdata();
    });
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-3">
        <input
          className="form-control"
          type="text"
          onChange={chang}
          name="title"
          placeholder="Event Title"
        />
        </div>
        <div className="col-md-3">
        <input
        className="form-control"
          type="text"
          onChange={chang}
          name="image_url"
          placeholder="Image URL"
        />
        </div>
        <div className="col-md-3">
        <input type="date" className="form-control" onChange={chang} name="date" /></div>
        <div className="col-md-3">
        <input
          type="text"
          className="form-control"
          onChange={chang}
          name="location"
          placeholder="Location"
        /></div>
        <div className="col-md-4"></div>
      </div>
      <div className="mb-3">
        <textarea
          type="text"
          className="form-control mb-3"
          onChange={chang}
          name="description"
          placeholder="Description"
          defaultValue={""}
        />
        <button onClick={Submit} className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="row">
        {data.map((e, index) => {
          return (
            <div key={index} className="col-3">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={e.image_url}
                  className="card-img-top"
                  alt={e.image_url}
                />
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <div className="d-flex justify-content-between align-self-center">
                    <p className="data_card">
                      <BsCalendar2Date /> {e.date}
                    </p>
                    <p className="data_card">
                      <IoLocationOutline /> {e.location}
                    </p>
                  </div>
                  <p className="card-text">{e.description}</p>
                  <div className="d-flex justify-content-between align-self-center">
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        onClick={() => Editdata(index)}
                      >
                        Edit
                      </button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                New message
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={Edata.title}
                                    onChange={onchangeEdit}
                                    placeholder="Title"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={Edata.image_url}
                                    onChange={onchangeEdit}
                                    placeholder="Image Url"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={Edata.date}
                                    onChange={onchangeEdit}
                                    placeholder="Date"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={Edata.location}
                                    onChange={onchangeEdit}
                                    placeholder="location"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="col-form-label">
                                    Description:
                                  </label>
                                  <textarea
                                    className="form-control"
                                    value={Edata.description}
                                    onChange={onchangeEdit}
                                    defaultValue={""}
                                  />
                                </div>
                                <div className="modal-footer justify-content-between p-0 pt-2">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Send message
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => DeleteData(e.id)}
                      className="btn btn-danger fs-6"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
