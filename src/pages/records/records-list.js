import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils";
import moment from "moment";

export const RecordList = () => {
  const [drugs, setdrugs] = useState([]);

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    console.log("fetching derugs", process.env);
    try {
      const { data } = await axios.get(`${API_URL}/product`);
      setdrugs(data);
    } catch (error) {
      window.alert("Error. Reach out to builder to help 🙂");
    }
  };

  const deleteDrug = async (id) => {
    const confirm = window.confirm("Do you want to delete this drug?");
    if (confirm) {
      try {
        const { data } = await axios.delete(`${API_URL}/product/${id}`);
        if (data.ok) {
          let docs = drugs.filter((x) => x._id !== id);
          setdrugs(docs);
        }
      } catch (error) {
        window.alert("Error. Reach out to builder to help 🙂");
      }
    }
  };

  return (
    <div className="records_list">
      <Link to="/drugs/create" className="add_record_drugs">
        Add Drugs
      </Link>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Category</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Quantity</th>
            <th scope="col">Cost Price</th>
            <th scope="col">Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{drug.name}</td>
              <td>{drug.category?.name}</td>
              <td>{moment(drug.expirydate).format("YYYY/MM/DD")}</td>
              <td>{drug.quantity}</td>
              <td>{drug.cost}</td>
              <td>{drug.sellingprice}</td>
              <td
                className="delete-option"
                onClick={() => deleteDrug(drug._id)}
              >
                Delete X
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
