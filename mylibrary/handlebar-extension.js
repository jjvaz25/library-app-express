const hbs = require('hbs');
const moment = require('moment');


hbs.handlebars.registerHelper('sort_books', (book_list) => {
  book_list.sort((a,b) => {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
});

hbs.handlebars.registerHelper('sort_authors', (author_list) => {
  author_list.sort((a, b) => {
    let textA = a.family_name.toUpperCase();
    let textB = b.family_name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
});

hbs.handlebars.registerHelper('is_the_author', (author_id, author, book_author_id) => {
  return (author_id.toString() == author.toString()
          || author_id.toString() == book_author_id.toString()) ? new hbs.handlebars.SafeString('selected') : '';
});

hbs.handlebars.registerHelper('is_the_book', (book_id, book) => {
  return (book_id.toString() == book.toString()) 
    ? new hbs.handlebars.SafeString('selected') : '';
});

hbs.handlebars.registerHelper('genre_checked', (checked) => {
  return (checked == 'true') ? new hbs.handlebars.SafeString(`checked`) : new hbs.handlebars.SafeString(``);
});

hbs.handlebars.registerHelper('check_status', (book_instance) => {
  let book_status = (cls) => {
    let span = `<span class="text-${cls}">${book_instance.status}</span>`
    return span;
  }
  let val = ''
  if (book_instance.status === 'Available') {
    val = book_status('success');
  } else if (book_instance.status === 'Maintenance') {
    val = book_status('danger') + `<br><span><strong>Due back</strong>: 
      ${book_instance.due_back_formatted}</span>`;
  } else {
    val = book_status('warning') + `<br><span><strong>Due back</strong>: 
      ${book_instance.due_back_formatted}</span>`;
  }
  return new hbs.handlebars.SafeString(val);
});

hbs.handlebars.registerHelper('check_undefined', (obj, val) => {
  if(val instanceof Date) { val = moment(val).format('YYYY-MM-DD'); }
  return (obj === undefined ? '' : val)
})


hbs.handlebars.registerHelper('set_string', (str) => {
  return new hbs.handlebars.SafeString(str);
});

module.exports = hbs;