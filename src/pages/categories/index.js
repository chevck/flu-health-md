import React, { useEffect, useState } from "react";
import "./categories.scss";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils";
import moment from "moment";

export const DrugCategories = () => {
  const [open, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setcategory] = useState("");
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/category`);
      setcategories(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleteCategory = async (id) => {
    const confirm = window.confirm("Do you want to delete this category?");
    try {
      if (confirm) {
        const { data } = await axios.delete(`${API_URL}/category/${id}`);
        if (data.ok) {
          let docs = categories.filter((x) => x._id !== id);
          setcategories(docs);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const saveCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/category`, {
        name: category,
      });
      setcategories([data, ...categories]);
      setOpenModal(false);
    } catch (error) {
      console.log("e", error);
    }
  };
  return (
    <div className="drug_categories_container container-fluid">
      <div className="drug_categories_list">
        <button
          className="create_category_btn"
          onClick={() => setOpenModal(true)}
        >
          <i className="bi bi-plus"></i> Create Category
        </button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S/N</th>
              <th scope="col">Category Name</th>
              <th scope="col">Created On</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{moment(category.createdon).format("YYYY - MM -DD")}</td>
                <td
                  className="delete-option"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={open} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <label>Category Name</label>
            <input
              className="form-control"
              onChange={({ target: { value } }) => setcategory(value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <button
            variant="primary"
            className=""
            onClick={saveCategory}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
