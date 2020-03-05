const hbs = require('hbs');

hbs.handlebars.registerHelper('sort_books', (book_list) => {
  book_list.sort((a,b) => {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
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


hbs.handlebars.registerHelper('set_string', (str) => {
  return new hbs.handlebars.SafeString(str);
});

module.exports = hbs;