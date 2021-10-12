import React from "react";
import moneySVG from "../../img/money.svg";

const EditContent = () => {
  return (
    <section className="py-5 bg-secondary vh-100">
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
                <span className="text-muted">
                  {/* {data?.type === "income" ? " Income" : " Expense"} */}
                </span>
                <h2 className="mb-4 fw-light">
                  {/* {data?.type === "income"
                    ? " Update Income"
                    : " Update Expense"} */}
                </h2>
                {/* Display Err */}
                <div className="mb-3 input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
                {/* <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div> */}
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

                <button type="submit" className="btn btn-primary mb-4 w-100">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
