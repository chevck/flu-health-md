import React, { useEffect, useState } from "react";
import "./record-drugs.scss";
import axios from "axios";
import { API_URL } from "../../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link } from "react-router-dom";

export const RecordDrugs = () => {
  const [categories, setcategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    quantity: null,
    category: "",
    purchasedate: "",
    expirydate: "",
    cost: null,
    sellingprice: null,
  });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/category`);
      setcategories(data);
    } catch (error) {
      window.alert("Error. Reach out to builder to help 🙂");
    }
  };

  const handleChange = (id, value) => {
    setFormValues({ ...formValues, [id]: value });
  };

  const saveDrug = async () => {
    try {
      setloading(true);
      await axios.post(`${API_URL}/product`, formValues);
      window.alert("Great Job!. Saved 💪🏽");
      setFormValues({
        name: "",
        quantity: null,
        category: "",
        purchasedate: "",
        expirydate: "",
        cost: null,
        sellingprice: null,
      });
    } catch (error) {
      window.alert("Error. Reach out to builder to help 🙂");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="record_drugs_container row">
        <div className="record_drugs_container__input_drugs col-7">
          <h2>
            Register Drug <Link to="/drugs/list">(See All Drugs)</Link>
          </h2>
          <div className="drugs_form">
            <div className="question-row">
              <label>Name</label>
              <input
                className="form-control"
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="question-row">
              <label>Quantity in Stock</label>
              <input
                className="form-control"
                type="number"
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
            </div>
            <div className="question-row">
              <label>Category</label>
              <select
                disabled={!categories.length}
                className="form-control"
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option selected disabled>
                  Select Drug Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="question-row">
              <label>Purchase Date</label>
              <DatePicker
                className="form-control"
                monthsShown={1}
                id="purchasedate"
                placeholderText="Purchase Date"
                dateFormat="dd/MM/yyyy"
                onChange={(e) => handleChange("purchasedate", e)}
                selected={formValues?.purchasedate}
                minDate={moment().toDate()}
              />
            </div>
            <div className="question-row">
              <label>Expires on</label>
              <DatePicker
                className="form-control"
                monthsShown={1}
                id="expirydate"
                placeholderText="Expiry Date"
                dateFormat="dd/MM/yyyy"
                onChange={(e) => handleChange("expirydate", e)}
                selected={formValues?.expirydate}
                minDate={moment().toDate()}
              />
            </div>
            <div className="question-row">
              <label>Cost Price (NGN) </label>
              <input
                className="form-control"
                type="number"
                onChange={(e) => handleChange("cost", e.target.value)}
              />
            </div>
            <div className="question-row">
              <label>Selling Price (NGN)</label>
              <input
                className="form-control"
                type="number"
                onChange={(e) => handleChange("sellingprice", e.target.value)}
              />
            </div>
            <button
              className="save_button"
              onClick={saveDrug}
              disabled={
                !(
                  formValues.category &&
                  formValues.cost &&
                  formValues.expirydate &&
                  formValues.name &&
                  formValues.purchasedate &&
                  formValues.quantity &&
                  formValues.sellingprice
                ) || loading
              }
            >
              {loading ? "Loading ..." : "Save Item"}
            </button>
          </div>
        </div>
        <div className="col-1" />
        <div className="record_drugs_container__scan_image col-4">
          <img
            src="https://images.pexels.com/photos/4047000/pexels-photo-4047000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="drug"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};
