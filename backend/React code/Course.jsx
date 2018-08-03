import React, { Component } from 'react'
import { connect } from "react-redux";
class Course extends Component {
    constructor(props){
        super(props)
        this.state={
            course:'',
            id:''
        }
        this.handleAPI = this.handleAPI.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
 async handleAPI(){
    const rawResponse = await fetch('/api/courses/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  });
  const content = await rawResponse.json();

  console.log(content);
  }
  async handleUpdate(){
      const bodyData = {
          course:this.state.course
      }
    const rawResponse = await fetch('/api/course/update'+parseInt(this.state.id), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      const content = await rawResponse.json();
    
      console.log(content);
  }
  async deleteCourse(){
    const rawResponse = await fetch('/api/course/remove'+this.state.id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json();
    
      console.log(content);
  }
    render() {
    return (
      <div className='container'>
            <input type="text" name="course" value={this.state.course}
            onChange={this.handleChange}
            placeholder='Enter Course'
            id=""/>
            <input type="number" name="id" min='0' defaultValue='0'
            onChange={this.handleChange}
            />
            <br/>
            <button onClick={this.handleAPI} className='btn btn-info'>POST Course</button>
            <button onClick={this.handleUpdate} className='btn btn-primary'>Update course</button>
            <button onClick={this.deleteCourse} className='btn btn-danger'>Delete Course</button>
      </div>
    )
  }
}
function mapStateToProps(state){
    return({
    })
}



function mapActionsToProps(dispatch){
    return({
        
    })
}
export default connect(mapStateToProps,mapActionsToProps)(Course)
