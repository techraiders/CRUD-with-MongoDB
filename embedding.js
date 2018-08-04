const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

/* const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
})); */

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema] 
}));

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

/*
// Removes / Manipulates one subdocument from an array of subdocuments
async function removeAuthor (courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor('5b653b03b3e35a1dccbe0745', '5b653c4736d0a9acd4505ce3');

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({name: 'John'})
]);

// Updates a property of a sub document
async function updateAuthor (courseId) {
  // const course = await Course.findById(courseId);
  course.author.name = 'Mosh Hamedani';
  course.save();

  const course = await Course.update({
    _id: courseId
  }, {
    $set: {
      'author.name' : 'John Smith'
    }
  });
}

updateAuthor('5b65302d403c3251041db3e8');


// removes subdocuments
async function removeAuthor (courseId) {
  const course = await Course.update({
    _id: courseId
  }, {
    $unset: {
      'author' : ''
    }
  });
} 

removeAuthor('5b65302d403c3251041db3e8');

// Inserts a new document into an array of subdocuments
async function addAuthor (courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

addAuthor('5b653b03b3e35a1dccbe0745', new Author({
  name: 'Amy'
})); */
