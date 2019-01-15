import axios from 'axios';
const proxy = 'http://localhost:7777/api/tasks';

//All Tasks
export const getAllTasks = () => {
  return axios
  .get(proxy, {
    headers: {'Content-Type' : 'application/json'}
  })
  .then(res => {
    return res.data;
  });
}

//Add Task
export const addTask = task => {
  return axios
  .post(proxy,
    {task: task},
    {headers: {'Content-Type' : 'application/json'}})
  .then(res => console.log(res));
}

//DeleteTask
export const deleteTask = taskId => {
  return axios
  .delete(`${proxy}/${taskId}`, {
    headers: {'Content-Type' : 'application/json'}
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

//UpdateTask
export const updateTask = (task, id) => {
  return axios
  .put(`${proxy}/${id}`,
    {task: task},
    {headers: {'Content-Type' : 'application/json'}})
  .then(res => console.log(res));
}
