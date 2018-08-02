const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  }, err => {
    console.log('Could not connect to MongoDB ', err);
  });

  const coursesSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
  });

const Course = mongoose.model('Course', coursesSchema);

async function getCourses () {
  return await Course
  .find({isPublished: true, tags: 'backend'})
  .sort({name: 1}) // or .sort(name) or .sort('-name')
  .select({name: 1, author: 1}); // or select('name author')
}

async function getPublishedCourses () {
  return await Course
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    .sort('-price')
    .select('name author tags');
}

getPublishedCourses().then(courses => {
  console.log(courses);
});

/*async function run () {
  const courses = await getCourses();
  console.log(courses);
}
run(); 

getCourses().then(data => console.log(data)); */

