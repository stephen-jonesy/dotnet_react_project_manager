import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { NewProjectForm } from './components/NewProjectForm';
import { ProjectToolbar } from './components/ProjectToolbar';
import { Project } from './components/Project';
import { ReactSortable } from "react-sortablejs";
import { fetchUserById } from '../../projects/projectsSlice';

export function List() {
    const selectProjects = (state) => state.projects.projects;
    const selectLoading = (state) => state.projects.loading;

    const dispatch = useDispatch();
    const projects = useSelector(selectProjects);
    const loading = useSelector(selectLoading);

    console.log(projects);
    console.log(status);
    const [show, setShow] = useState(false);
    const array = projects.map((item) => ({
        ...item,
        selected: false       
    }));
    const [list, setList] = useState(array);
    const toggleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        dispatch(fetchUserById());

    }, []);

    useEffect(() => {

        setList(array);

    }, [JSON.stringify(array)]);

    const renderNewProjectForm = () => {
        if(show === true) {
            return <NewProjectForm toggleShow={toggleShow}/>

        }
    };

    const renderProjects = () => {
        return (
            <ul className="">
            <ReactSortable list={list} setList={setList}>
                {list.map((project) => (
                    <Project key={project.id} id={project.id} projectList={list} />
                ))}
            </ReactSortable>
        </ul>
        )
    }

    return (  
        
        <div className="list-container">
            <style type="text/css">
                {`
                .btn-flat {
                background-color: rgba(9, 200, 225, 0.8);
                color: white;
                }
                `}
            </style>
            <button  onClick={toggleShow} className="mb-4 project-button" >{!show ? 'New project' : 'Dismiss Project'}</button>
            {renderNewProjectForm()}

            < ProjectToolbar />
            {loading ? <div>loading</div> : renderProjects()}
            
        </div>

    );
}

