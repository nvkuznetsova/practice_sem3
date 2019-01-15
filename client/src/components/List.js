import React, { Component } from 'react';
import { getAllTasks, addTask, deleteTask, updateTask} from '../ListFunctions';

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      taskItem: '',
      tasks: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.getAll();
  }

  onChange = ev => {
    this.setState({taskItem: ev.target.value});
  }

  onSubmit = ev => {
    ev.preventDefault();
    addTask(this.state.taskItem).then(() => {
      this.getAll();
    });
  }

  onUpdate = ev => {
    ev.preventDefault();
    updateTask(this.state.taskItem, this.state.id).then(() => {
      this.getAll();
    });
  }

  onEdit = (itemId, item, ev) => {
    ev.preventDefault();
    this.setState({
      id: itemId,
      taskItem: item
    })
  }

  onDelete = (id, ev) => {
    ev.preventDefault();
    deleteTask(id).then(() => {
      this.getAll();
    });
  }

  getAll = () => {
    getAllTasks().then(data => {
      this.setState({
        id: '',
        taskItem: '',
        tasks: [...data]
      }, () => console.log(this.state.tasks));
    });
  }

  render() {
    return(
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input type="text" className="form-control" id="taskName"
                value={this.state.taskItem || ""} onChange={this.onChange.bind(this)} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.onUpdate.bind(this)}>Update</button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        <h4 className="text-left mt-3">Tasks List</h4>
        <ul className="list-group mt-3">
          {this.state.tasks.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-left">{item.task}</span>
              <div className="row">
                <button href="" className="btn btn-info mr-1" onClick={this.onEdit.bind(this, item._id, item.task)}>Edit</button>
                <button href="" className="btn btn-danger" onClick={this.onDelete.bind(this, item._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List;
