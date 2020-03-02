const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useUnifiedTopology: true, useNewUrlParser: true })
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

    // exercise 1
    async function getCourses1(){
        const courses = await Course.find({tags: 'backend'}).select({name: 1, author: 1}).sort({name: 1});
        console.log(courses);
    }

        // exercise 2
        async function getCourses2(){
            const courses = await Course
            .find({isPublished: true})
            .or([{ tags: 'backend' }, { tags: 'frontend' }])
            .select({name: 1, author: 1, price: 1}).sort({price: -1});
            console.log(courses);
        }


        // exercise 3
        async function getCourses3(){
            const courses = await Course
            .find({isPublished: true})
            .or([{ price: {$gte: 15} }, {name: /.*by.*/i}])
            .select({name: 1, author: 1, price: 1}).sort({price: -1});
            console.log(courses);
        }

    getCourses3(); 