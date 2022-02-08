import React, { useEffect, useState } from "react";
import moneySVG from "../../img/money.svg";

const AddExpense = () => {
  return (
    <>
      <section className="py-5 bg-danger vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            />
          </a>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form>
                  <span className="text-muted">Expense</span>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
                  {/* Display income Err */}
                  {/* {expServerErr || expAppErr ? (
                    <div className="alert alert-danger" role="alert">
                      {expServerErr} {expAppErr}
                    </div>
                  ) : null} */}
                  <div className="mb-3 input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  {/* Err */}
                  <div className="mb-3 input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  {/* Err */}
                  <div className="mb-3 input-group">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                  </div>
                  {/* Err */}
                  <button type="submit" className="btn btn-danger mb-4 w-100">
                    Record Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
