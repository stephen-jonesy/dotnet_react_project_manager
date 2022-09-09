import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetResponseState } from '../../projects/projectsSlice';

export function Response() {
    const dispatch = useDispatch();

    const selectResponse = (state) => state.projects.response;
    const selectMessage = (state) => state.projects.message;
    const response = useSelector(selectResponse);
    const message = useSelector(selectMessage);
    useEffect(() => {
        setTimeout(() => {
            dispatch(resetResponseState());
          }, 2000);
      },[response]);
    const renderResponseMessage = () => {
        setTimeout(() => {
            dispatch(resetResponseState());
          }, 2000);
        return (
            <div className={ "alert" + (response === "success" ? " alert-success" : response === "failed" ? " alert-danger" : "")}>
                {response}, {message}

            </div>
        )
        
    }
    return (  
        <>
            {renderResponseMessage()}

        </>
    );
}

