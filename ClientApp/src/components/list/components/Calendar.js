import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export function Calendar({ databaseDate, updateDate }) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const [isOpen, setIsOpen] = useState(false);

    const node = useRef();
    
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleChange = (date) => {
        setIsOpen(!isOpen);
        updateDate(date)
    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        setIsOpen(false);
      
    };

    useEffect(() => {
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [isOpen]);

    return (  
        <div ref={node}>
            <div className="example-custom-input" >
                <button className="date-container" onClick={handleClick}>{moment(databaseDate).format('DD/MM/YYYY')}</button>
            </div>

            {isOpen && (
                <DatePicker 
                    onChange={(date) => handleChange(date)} 
                    inline
                />
            )}
        </div>

    );
};