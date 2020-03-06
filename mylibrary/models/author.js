const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

//Virtual for author's full name
  AuthorSchema
  .virtual('name')
  .get(function() {
    let fullname = '';
    if (this.first_name && this.family_name) {
      fullname = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
      fullname = '';
    }
    return fullname;
  });


//Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function() {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
  });

AuthorSchema
  .virtual('lifespan_formatted')
  .get(function() {
    let dob = this.date_of_birth
    let dod = this.date_of_death
    return (dob ? moment(dob).format('MMMM Do, YYYY') : 'Unknown') + ' - ' + 
      (dod ? moment(dod).format('MMMM Do, YYYY') : '');
  });

//Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return `/catalog/author/${this._id}`;
  });

module.exports = mongoose.model('Author', AuthorSchema);