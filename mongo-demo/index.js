const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));


    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        price: Number,
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });

    const Course = mongoose.model('Course', courseSchema);

    async function createCourse(){
        const course = new Course({
            name: 'Node.js Course',
            author: 'Nazmul',
            tags: ['node', 'JavaScript', 'backend'],
            price: 50,
            isPublished: true
        });
    
        const result = await course.save();
        console.log(result);
    }

    createCourse();


