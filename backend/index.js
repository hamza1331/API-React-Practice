const express = require('express')
const app = express()
app.use(express.json())

var courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]
app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.post('/api/courses/add',(req,res)=>{
    const course = {
        id:courses.length+1,
        name:req.body.course
    }
    courses.push(course)
    res.send(course)
    //use JOI (npm module) for Validation...
})
app.put('/api/course/update:id',(req,res)=>{
    console.log('api called on update route...')
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course)
    {res.status(404).send('Course wid id '+req.params.id+' not found')
    console.log('data not found...')
}
    else
    {
        course.name = req.body.course
        res.send(course)
    }
})
app.delete('/api/course/remove:id',(req,res)=>{
    if(parseInt(req.params.id)<=courses.length){
        console.log('inside if of delete...')
        const updatedCourses = courses.filter(course=>course.id!==parseInt(req.params.id))
        res.send(updatedCourses)
        console.log(updatedCourses)
    }
    else
    {res.status(404).send('Course wid id '+req.params.id+' not found')
    console.log('inside else condition...')
}
})
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course)res.status(404).send('Course wid id '+req.params.id+' not found')
    else
    res.send(course)
})
const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log('Listening on Port '+port)
})