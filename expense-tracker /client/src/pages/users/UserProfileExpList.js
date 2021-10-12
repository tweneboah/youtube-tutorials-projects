import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "./UserProfileContentDetails";

const UserProfileExpList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  //State
  const state = useSelector(state => state.users);
  const { loading, appErr, serverErr, profile } = state;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : profile?.expenses?.length <= 0 ? (
        <h2>No Expense Found</h2>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
                <p className="mb-0">
                  Below is the history of your expense transactions records
                </p>
                <Link
                  to="/add-expense"
                  className="btn  btn-outline-danger me-2 m-2"
                >
                  New Expense
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
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
                <tbody>
                  <>
                    {profile?.expenses?.map(exp => (
                      <UserProfileContentDetails item={exp} key={exp?._id} />
                    ))}
                  </>
                </tbody>
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
          ></div>
        </section>
      )}
    </>
  );
};

export default UserProfileExpList;
