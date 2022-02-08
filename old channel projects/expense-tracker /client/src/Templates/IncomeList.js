import React from "react";
import { Link } from "react-router-dom";
const IncomeList = () => {
  return (
    <>
      <section className="py-6">
        <div className="container-fluid">
          <div className="position-relative border rounded-2">
            <div className="pt-8 px-8 mb-8">
              <h6 className="mb-0 fs-3">Recent Income transactions</h6>
              <p className="mb-0">
                Below is the history of your income transactions records
              </p>
              <Link to="/add-income" className="btn  btn-success me-2 m-2">
                New Income
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr className="table-active">
                  {/* {!dataType && (
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small className="text-center">Deposited By</small>
                      </button>
                    </th>
                  )} */}
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Title</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Description</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Amount</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Date</small>
                    </button>
                  </th>
                  <th scope="col">
                    <button className="btn d-flex align-items-centerr text-uppercase">
                      <small>Action</small>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>{/* Income details components goes here */}</tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* Pagination goes here */}
        </div>
      </section>
    </>
  );
};

export default IncomeList;
