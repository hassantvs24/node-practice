const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));


    
    //Basic
    const courseSchema = new mongoose.Schema({
        name: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    });

    const courseAuthor = new mongoose.Schema({
        name: String,
        bio: String,
        website: String
    });

    const Author = mongoose.model('Author', courseAuthor);
    const Course = mongoose.model('Course', courseSchema);

  
async function createAuthor(name, bio, website) { 
    const author = new Author({
      name, 
      bio, 
      website 
    });
  
    const result = await author.save();
    console.log(result);
  }
  
  async function createCourse(name, author) {
    const course = new Course({
      name, 
      author
    }); 
    
    const result = await course.save();
    console.log(result);
  }
  
  async function listCourses() { 
    const courses = await Course
      .find()
      .populate('author', 'name -_id')
      .select('name author');
    console.log(courses);
  }
  
  //createAuthor('Nazmul', 'My bio', 'My Website');
  
   //createCourse('Node Course', '5e5e53237b0f3f17ac7459b')
  
   listCourses();