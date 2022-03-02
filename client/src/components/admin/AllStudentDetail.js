import React from "react";
import "./Admin.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { TOKEN_ID } from "../../utils/constants";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function AllStudentDetail({ applicant }) {
  const contentStyle = { background: "#fff" };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };
  const arrowStyle = { color: "#fff" }; // style for an svg element

  return (
    <div className="studentdetails">
      <div className="studentdetails-col col1">
        <h1>{applicant.id}</h1>
        <h4>{applicant.name}</h4>
        <p>{applicant.registration_no}</p>
        <p>{applicant.email}</p>
        <p>Phone : {applicant.phone}</p>
        <strong>
          {" "}
          {applicant.type === 1 ? <p>Supporting/Sports</p> : <p>Cultural</p>}
        </strong>
        {applicant.experience && (
          <Popup
            className="popUpD"
            position="right center"
            trigger={
              <button className="popUpExp popUpD"> Prior Experience</button>
            }
            {...{
              contentStyle,
              overlayStyle,
              arrowStyle,
            }}
          >
            <div>{applicant.experience}</div>
          </Popup>
        )}
        {applicant.experience && (
          <Popup
            position="bottom center"
            trigger={
              <button className="popUpExp popUpM"> Prior Experience</button>
            }
            {...{
              contentStyle,
              overlayStyle,
              arrowStyle,
            }}
          >
            <div>{applicant.experience}</div>
          </Popup>
        )}
      </div>
      <div className="studentdetails-col">
        <h4>Pref 1 : {applicant.pref_1.category}</h4>

        {applicant.pref_1.status === 0 ? <p>Not Reviewed</p> : <p>Reviewed</p>}
        {applicant.pref_1.status === 1 && (
          <div className="status-btn">
            <button className="btns in">Selected</button>
          </div>
        )}
        {applicant.pref_1.status === 2 && (
          <div className="status-btn">
            <button className="btns out">Rejected</button>
          </div>
        )}
        {applicant.pref_1.status === 3 && (
          <div className="status-btn">
            <button className="btns in">Selected</button>
            <button className="btns in">Mail Sent</button>
          </div>
        )}
        {applicant.pref_1.status === 4 && (
          <div className="status-btn">
            <button className="btns out">Rejected</button>
            <button className="btns in">Selected</button>
          </div>
        )}
      </div>
      <div className="studentdetails-col">
        <h4>Pref 2 : {applicant.pref_2.category}</h4>
        {applicant.pref_1.status === 0 ? (
          <p>Confirmation Pending for Pref 1</p>
        ) : (
          <>
            {applicant.pref_1.status === 1 ? (
              <p>Selected for Pref 1</p>
            ) : (
              <>
                {applicant.pref_1.status === 2 &&
                applicant.pref_2.status === 0 ? (
                  <>
                    <p>Not Reviewed</p>
                  </>
                ) : (
                  <>
                    {applicant.pref_2.status === 1 ? (
                      <div>
                        <p>Reviewed</p>
                        <div className="status-btn">
                          <button className="btns in">Selected</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {applicant.pref_2.status === 2 && (
                          <>
                            <p>Reviewed</p>
                            <div className="status-btn">
                              <button className="btns out">Rejected</button>
                            </div>
                          </>
                        )}
                        {applicant.pref_2.status === 3 && (
                          <>
                            <p>Reviewed</p>
                            <div className="status-btn">
                              <button className="btns in">Selected</button>
                              <button className="btns in">Mail Sent</button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllStudentDetail;
