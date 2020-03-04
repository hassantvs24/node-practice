const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connect to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));


    
    //Basic
    const authorSchema = new mongoose.Schema({
        name: String,
        bio: String,
        website: String
    });

    const courseSchema = new mongoose.Schema({
        name: String,
        author: [authorSchema]
    });

    const Author = mongoose.model('Author', authorSchema);
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
    
    try{
        const result = await course.save();
        console.log(result);
    }catch(err){
        console.log(err.message);
    }
    
  }

  
  async function listCourses() { 
    const courses = await Course
      .find();
      //.select('name author');
    console.log(courses);
  }
  

  async function updateAuthor(courseID) {
    /*const course = await Course.findById(courseID);
    course.author.name = 'Nazmul Miah';
    
    const result = await course.save();
    console.log(result);*/

    //Another Approach
    const course = await Course.update({_id: courseID}, {
        $set: {
            'author.name': 'Kuddus Bi'
        }
    });

  }


  async function addAuthor(courseID, authors) {

    const course = await Course.findById(courseID);
    course.author.push(authors);

    const result = await course.save();
        console.log(result);
  }

  async function removeAuthor(courseID, authorId) {

    const course = await Course.findById(courseID);
    const author = course.author.id(authorId);
    author.remove();
    const result = await course.save();
        console.log(result);
  }

   /*createCourse('Php Course', [
       new Author({name: 'Nazmul Hossain'}),
       new Author({name: 'Kuddus Miah'})
    ]);*/
  
   //listCourses();
   //updateAuthor('5e5e5f6d85ae1f28083dba2e');
   //addAuthor('5e5e757e41672c3c1cc3a439', new Author({name: 'Nadu Pappa'}));
   removeAuthor('5e5e757e41672c3c1cc3a439', '5e5e78978828e23b942ab7e0');
   