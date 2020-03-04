const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));


    /*
    //Basic
    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        price: Number,
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });*/

    //With Validator
    const courseSchema = new mongoose.Schema({
        name: {
            type: String, 
            required: true, 
            minlength: 5, 
            maxlength: 255
        },
        category: {
            type: String, 
            required: true, 
            enum: ['web', 'mobile', 'network'],
            lowercase: true,
            //uppercase: true,
            trim: true
        },
        author: String,
        tags: { //Custom Validator
            type: Array,
            validate: {
                isAsync: true,
                validator: function(v, callback){
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        callback(result);
                    }, 4000);
                },
                message: 'A course should have at least one tag.'
            },
        },
        price: {
            type: Number, 
            required: function(){return this.isPublished;},
            min: 10,
            max: 200,
            get: v => Math.round(v),
            set: v => Math.round(v)
        },
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });

    const Course = mongoose.model('Course', courseSchema);

    //Insert
    async function createCourse(){
        const course = new Course({
            name: 'Html5',
            author: 'Nazmul Hossain',
            tags: ['frontend'],
            price: 15.8,
            category: 'Web',
            isPublished: true
        });
    
        try {
            const result = await course.save();
            console.log(result);
        }
        catch (ex) {
            for(field in ex.errors){
                console.log(ex.errors[field]);
            }
            
        }
        
    }

    //View Data
    async function getCourses(){

        const courses = await Course.find({tags: 'php'});
        console.log(courses);
    }


// Update Data
    async function updateCourse(id){
        //Query First Approx
        /*const course = await Course.findById(id);
        if(!course) return;
        course.isPublished = true;
        course.author = 'Another Author';

        const result = await course.save();*/
//=============================
        //Update first Approx
        /*const result = await Course.update({_id: id}, {
            $set: {
                author: 'Nadu',
                isPublished: true
            }
        });

        console.log(result);*/

        //Another way

        const course = await Course.findByIdAndUpdate(id, {
            $set: {
                author: 'Nadu khokon',
                isPublished: false
            }
        }, {new: true});

        console.log(course);

    }



    async function deleteCourse(id){


        //const result = await Course.deleteOne({_id: id});
        //const result = await Course.deleteMany({_id: id});
        const course = await Course.findOneAndRemove(id);
        console.log(course);

    }

    createCourse();
   //getCourses();
   //updateCourse('5e52dabd5363504d0ca3b59a');

   //deleteCourse('5e5bd5835135db0998c96ada');


