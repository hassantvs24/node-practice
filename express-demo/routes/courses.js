const express = require('express');
const router = express.Router();



const courses = [
    {id:1, name:'Course-1'},
    {id:2, name:'Course-2'},
    {id:3, name:'Course-3'},
    {id:4, name:'Course-4'},
    {id:5, name:'Course-5'}
];


   
   router.get('/', function (req, res) {
       res.send(courses);
   });
   
   router.get('/:id', function (req, res) {
       let course = courses.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
       if(!course) return res.status(404).send('Given id not found');
   
       res.send(course);
   });
   
   router.post('/', function (req, res) {
        /*if(!req.body.name || req.body.name.length < 3){
           res.status(400).send('Name is required & should be minimum 3 characters');
           return;
        }*/
   
        const { error } = validateCourse(req.body); //Object Destructuring
        if(error){
           return res.status(400).send(error.details[0].message);
        }
   
       let course = {
           id: courses.length + 1,
           name: req.body.name
       };
   
       courses.push(course);
       res.send(courses);
   });
   
   
   router.put('/:id', function (req, res) {
       let course = courses.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
       if(!course) return res.status(404).send('Given id not found');
   
       const { error } = validateCourse(req.body); //Object Destructuring
       if(error){
           return res.status(400).send(error.details[0].message);
       }
   
       course.name = req.body.name;
       res.send(courses);
   
   
   });
   
   
   router.delete('/:id', function (req, res) {
       let course = courses.find(c => c.id === parseInt(req.params.id)); //'params' get data form url parameter
       if(!course) return res.status(404).send('Given id not found');
   
       const index = courses.indexOf(course);
       courses.splice(index, 1);
       res.send(courses);
   });
   
   
   function validateCourse(course){
       const schema = {
           name: Joi.string().min(3).required()
       };
   
       return Joi.validate(course, schema);
   }


   module.exports = router;