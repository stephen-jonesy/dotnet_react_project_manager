import {  createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { projects } from './projectsAPI';
import authService from '../components/api-authorization/AuthorizeService';
import { v4 as uuid } from 'uuid';

const initialState = {
    response: null,
    message: '',
    loading: false,
    projects: [],
    error: null,
  
}

export const fetchUserById = createAsyncThunk(
    'todoitems',
    async () => {

        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        console.log(user.sub);
        const response = await fetch(`todoitems/${user.sub}`, {
            headers: !token ? {} : { 
                'Authorization': `Bearer ${token}`
            }
            });
            const data = await response.json();
            console.log(response);

            console.log(data);
            return data


    }
)

export const deletePropjectById = createAsyncThunk(
    'todoitems/delete',
    async (id) => {
        const user = await authService.getUser();
        console.log(user.sub);
        const response = await fetch(`todoitems/${id}`, { method: 'DELETE' })
        const data = await response.json();
        console.log(data);
        return data;

    }
)

export const createPropjectById = createAsyncThunk(
    'todoitems/post',
    async (project) => {
        const user = await authService.getUser();
        project.OwnerID = user.sub;

            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project)
            }
            const data = await fetch('todoitems', config);
            const json = await data.json()
                //return json
                return json


    }
)

export const updatePropjectById = createAsyncThunk(
    'todoitems/put',
    async (project) => {
        
        const user = await authService.getUser();
        project.OwnerID = user.sub;

        console.log(project.Id);
        const config = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }
        console.log(JSON.stringify(project));
        const data = await fetch(`todoitems/${project.Id}`, config);
        const json = await data.json()
            //return json
            console.log(json);
            return json


    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

        // removeProject: (state, action) => {
        //     console.log(current(state.projects));
        //     const filterProjects = state.projects.filter((project) => project.id !== action.payload);
        //     state.projects = filterProjects;
        // },

        toggleCompleted: (state, action) => {
            const filterProjects = state.projects.map((project) =>
                project.id === action.payload ? {...project, isComplete: !project.isComplete} : project);
            state.projects = filterProjects;
            
        },

        togglePriority: (state, action) => {
            const [id, priority] = action.payload;

            const filterProjects = state.projects.map((project) =>
                project.id === id ? {...project, priority: priority} : project);
            state.projects = filterProjects;

        },

        toggleStatus: (state, action) => {
            const [id, status] = action.payload;

            const filterProjects = state.projects.map((project) =>
                project.id === id ? {...project, status: status} : project);
            state.projects = filterProjects;

        },

        updateProjectName: (state,action) => {
            const [id, projectName] = action.payload;

            const filterProjects = state.projects.map((project) =>
                project.id === id ? {...project, projectName: projectName} : project);
            state.projects = filterProjects;

        },

        updateCreatedDate: (state, action) => {
            const [id, createdAt] = action.payload;
            const filterProjects = state.projects.map((project) =>
                project.id === id ? {...project, createdAt: createdAt} : project);
            state.projects = filterProjects;

        },

        updateDueDate: (state, action) => {
            const [id, dueDate] = action.payload;
            const filterProjects = state.projects.map((project) =>
                project.id === id ? {...project, dueDate: dueDate} : project);
            state.projects = filterProjects;

        },

        updateNote: (state, action) => {
            const [id, note] = action.payload;

            const filterProjects =  state.projects.map((project) =>
                project.id === id ? {...project, note: note} : project);
            state.projects = filterProjects;

        },

        calculateTimelinePercentage: (state) => {

            let arr = [];
        
            state.forEach((item, index) => {
                item.timeline = 0;
                const createdAt = new Date(item.createdAt);
                const dueDate = new Date(item.dueDate);
            
                const start = createdAt;
                const end = dueDate;
                const today = new Date();
            
                const q = Math.abs(today-start);
                const d = Math.abs(end-start);
        
                if(start > today) {
                    let rounded = 0;
                    arr.push(rounded);
        
                } else if (today > end) {
                    let rounded = 100;
                    arr.push(rounded);
            
                } else {
                    let rounded = Math.round((q/d)*100);
                    arr.push(rounded);
        
                    
                }
                item.timeline = arr[index];
        
            });
            return state;

        },

        sortProjects: (state, action) => {

            const sortType = action.payload;
            if(sortType === 'dueDate') {
                const sorted = [...state.projects].sort(function(a, b) {
                    var dateA = new Date(a.dueDate), dateB = new Date(b.dueDate);
                    return dateA - dateB;
                });
        
                state.projects = sorted;

            } 
            if(sortType === 'Priority') {
                const sorted = [...state.projects].sort((a, b) => {
                    const sorter = {
                      "None": 0,
                      "Low": 1,
                      "Medium": 2,
                      "High": 3,
                    }
                    return sorter[b.priority] - sorter[a.priority]
                });
    
    
                state.projects = sorted;

            } 
            if(sortType === 'Notes') {
                const sorted = [...state.projects].sort((a, b) => {
                    return b.note.length - a.note.length;

                });
    
                state.projects = sorted;

            } 
            if(sortType === 'timeline') {
                const sorted = [...state.projects].sort((a, b) => {
                    return b.timeline - a.timeline;
                });    
    
                state.projects = sorted;

            } 
            
            else {
                const sorted = [...state.projects].sort(function(a, b){
                    if(a[sortType] < b[sortType]) { return -1; }
                    if(a[sortType] > b[sortType]) { return 1; }
                    return 0;
                });
    
                state.projects = sorted;

            }
            
        },
        resetResponseState: (state, action) => {
            state.response = null;

        }

    },
    extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.pending, (state, action) => {
        // Add user to the state array
        state.loading = true;

    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.projects = action.payload

    })
    .addCase(fetchUserById.rejected, (state, action) => {
        state.response = "failed";
        state.message = "Opps, your projects are not available. Please try again later"

      })
      .addCase(deletePropjectById.fulfilled, (state, action) => {
          state.response = "success";
          state.message = "Project deleted"
          console.log(action.payload);
          const filterProjects = state.projects.filter((project) => project.id !== action.payload);
          state.projects = filterProjects;
                    
      })
      .addCase(deletePropjectById.rejected, (state, action) => {
        state.response = "failed";
        state.message = "Unable to delete project"
      })
      .addCase(createPropjectById.fulfilled, (state, action) => {
        state.response = "success";
        state.message = "Project created"
        console.log(action.payload);
        state.projects.push(action.payload);

    })
    .addCase(createPropjectById.rejected, (state, action) => {
        state.response = "failed";
        state.message = "Unable to create project"
    })
    .addCase(updatePropjectById.fulfilled, (state, action) => {
        console.log(action.payload);


    })
    .addCase(updatePropjectById.rejected, (state, action) => {
        console.log(action.payload);


    })
      
    }
});

export const { addProject, removeProject, toggleCompleted, togglePriority, toggleStatus, updateProjectName, updateCreatedDate, updateDueDate, updateNote, calculateTimelinePercentage, sortProjects, resetResponseState } = projectsSlice.actions;

export default projectsSlice.reducer;


