const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  }, err => {
    console.log('Could not connect to MongoDB ', err);
  });

  const coursesSchema = new mongoose.Schema({
    // name: String,
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /pattern/
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network'],
      lowercase: true,
      // uppercase: true,
      trim: true
    },
    author: String,
    // tags: [String],
    tags: {
      type: Array, // here mongoose initialises this with empty array
      validate: {
        isAsync: true,
        validator: function (v, callback) {
          setTimeout(() => {
            // Do some async work
            const result = v && v.length;
            callback(result); // validation fails when false is passed as an argument to this callback function
          }, 4000);
          // return v && v.length;
        },
        message: 'A course should have at least one tag.'
      }
    },
    date: Date,
    isPublished: Boolean,

    // Makes price required only if course is published
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
      min: 10,
      max: 20,
      get: value => Math.round(value),
      set: value => Math.round(value)
    }
  });

const Course = mongoose.model('Course', coursesSchema);

async function createCourse () {
  let course = new Course({
    name: 'Angular Course',
    category: 'WEB',
    author: 'Mosh',
    tags: ['Front End'],
    isPublished: true,
    price: 15.8
  });

  try {
    course = await course.save();
    console.log(course);
  } catch (e) {
    // console.log(e.message);
    for (let field in e.errors) {
      console.log(e.errors[field].message);
    }
  }
}

createCourse();

// Get all the published courses whoose price is $15 or more, and have the word 'by' in the title

// async function getCoursesByPriceAndTitle () {
//   return await Course
//     .find({isPublished: true})
//     .or([
//       {price: {$gte: 15}},
//       {name:/.*by.*/i}
//     ])
//     .sort('-price')
//     .select('name author price');
// }

// getCoursesByPriceAndTitle().then(courses => console.log(courses));


/* async function getPublishedCourses () {
  return await Course
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    /* .find ({isPublished: true})
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .or([{author: 'Mosh'}, {isPublushed: true}]) for searching using different properties
    .sort('-price')
    .select('name author tags');
}

getPublishedCourses().then(courses => {
  console.log(courses);
});


async function getCourses () {
  return await Course
  .find({isPublished: true, tags: 'backend'})
  .sort({name: 1}) // or .sort(name) or .sort('-name')
  .select({name: 1, author: 1}); // or select('name author')
}

async function run () {
  const courses = await getCourses();
  console.log(courses);
}
//run(); 

getCourses().then(data => console.log(data)); */

