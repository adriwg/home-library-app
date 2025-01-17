import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/OnLoanModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';


function OnLoan (props){

  const [startDate, setStartDate] = useState(null);//state to set start date
  const [formData, setFormData] = useState({}); // State to hold form data

  const formRef = useRef(null);
  // Set ithe nitial date value in the input field
  useEffect(() => {
    if (props.selectedItem !== null){
      setFormData(props.selectedItem);
    }
    if (props.selectedItem !== null && props.selectedItem.date_of_borrow!=="") {
      let d = new Date(props.selectedItem.date_of_borrow.split("/").reverse().join("-"));
      setStartDate (d);
    }else{
      setStartDate (null);
    }
  }, [props.selectedItem]);

  useEffect(() => {
    console.log("formData:", formData);
   }, [formData]);

  const inputChange = (event) => {
    setFormData({
      ...formData,
      "borrower": event.target.value
    })
    console.log("formData: " + JSON.stringify(formData));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Format startDate as "dd/MM/yyyy" or use an empty string if it's null
    const formattedDate = startDate ? format(startDate, 'dd/MM/yyyy') : ""; 
    const updatedFormData = {
      ...formData,
      "date_of_borrow": formattedDate,
      "onloan": true
    };
    setFormData(updatedFormData);
    props.updateBookList(updatedFormData);
    console.log("formData: " + JSON.stringify(formData));

    setTimeout(() => {
      onCloseModal();
    }, 100);
  }

  const onCloseModal = () => {
    console.log("onCloseModal");
    formRef.current.reset();//reset form
    document.getElementById("exampleModal").classList.remove("show");
    document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
  }

  

  if((props.selectedItem)!== null){
    return (
      <div id="on_loan_modal"> 
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">On Loan</h5>      
              <FontAwesomeIcon icon={faRectangleXmark} size="2xl" style={{color: "#ffad4d",}} type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onCloseModal()} />             
            </div>
            <div className="modal-body">
              <div className="container" id="book_info">
                <div className="row book_container justify-content-between">
                  <div className="OnLoan_book_cover col-sm-3">
                    <img src={props.selectedItem.cover} alt={props.selectedItem.title} className="image-fluid" />
                  </div>
                  <div className="book_details col-sm-9">
                    <h5><span className="book_name">Book title:<br/></span>{props.selectedItem.title}</h5>
                    <h5><span className="book_name">Author:<br/></span>{props.selectedItem.author}</h5>
                  </div>
                </div>
              </div>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-group row">
                            <div className="col-sm-3 borrow_label">
                              <label htmlFor="datepicker" className="datepicker col-form-label">Date of borrow:</label>
                            </div>
                            <div className="col-sm-9 date_input_field">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => {setStartDate(date)}
                                }
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Click to select a date"
                                className="form-control"
                                id="datepicker"
                              />
                          </div>
                        </div>
                      <div className="form-group row borrower_container">
                            <div className="col-sm-3 name_of_borrower">
                              <label htmlFor="name_of_borrower" className="col-form-label">Borrower:</label>
                            </div>
                            <div className="col-sm-9 borrower_input_field">                      
                            <input type="text" className="form-control" id="name_of_borrower" placeholder="Please enter the name of borrower" value={formData.borrower || ""} onChange={inputChange} />
                            </div>
                      </div>
  
                      <div className="modal-footer">
                        <button type="button" className="btn-default" data-dismiss="modal" onClick={() => onCloseModal()}>Cancel</button>
                        <button type="submit" className="btn-default btn-save-add">Save</button>
                      </div>
                  </form>

            </div>
           
          </div>
        </div>
      </div>
      </div>
    ) 
    }else{
      console.log("No item selected");
    };
  }
  
  export default OnLoan;

