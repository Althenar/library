'use strict';

exports.addBook = function(args, res, next) {
  /**
   * parameters expected in the args:
  * book (NewBook)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "author" : "aeiou",
  "isbn" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou"
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.addBookcase = function(args, res, next) {
  /**
   * parameters expected in the args:
  * bookcase (NewBookcase)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 123456789,
  "shelves" : [ {
    "col" : "",
    "books" : [ {
      "author" : "aeiou",
      "isbn" : "aeiou",
      "id" : 123456789,
      "title" : "aeiou"
    } ],
    "id" : 123456789,
    "row" : ""
  } ]
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.addShelf = function(args, res, next) {
  /**
   * parameters expected in the args:
  * shelf (NewShelf)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "col" : "",
  "books" : [ {
    "author" : "aeiou",
    "isbn" : "aeiou",
    "id" : 123456789,
    "title" : "aeiou"
  } ],
  "id" : 123456789,
  "row" : ""
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.deleteBook = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  // no response value expected for this operation
  
  
  res.end();
}

exports.deleteBookcase = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  // no response value expected for this operation
  
  
  res.end();
}

exports.deleteShelf = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  // no response value expected for this operation
  
  
  res.end();
}

exports.findBookByID = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "author" : "aeiou",
  "isbn" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou"
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findBookcaseByID = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 123456789,
  "shelves" : [ {
    "col" : "",
    "books" : [ {
      "author" : "aeiou",
      "isbn" : "aeiou",
      "id" : 123456789,
      "title" : "aeiou"
    } ],
    "id" : 123456789,
    "row" : ""
  } ]
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findBookcases = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  
  
  var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "id" : 123456789,
  "shelves" : [ {
    "col" : "",
    "books" : [ {
      "author" : "aeiou",
      "isbn" : "aeiou",
      "id" : 123456789,
      "title" : "aeiou"
    } ],
    "id" : 123456789,
    "row" : ""
  } ]
} ];
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findBooks = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  
  
  var examples = {};
  examples['application/json'] = [ {
  "author" : "aeiou",
  "isbn" : "aeiou",
  "id" : 123456789,
  "title" : "aeiou"
} ];
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findShelfByID = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  
  
  var examples = {};
  examples['application/json'] = {
  "col" : "",
  "books" : [ {
    "author" : "aeiou",
    "isbn" : "aeiou",
    "id" : 123456789,
    "title" : "aeiou"
  } ],
  "id" : 123456789,
  "row" : ""
};
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

exports.findShelves = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  
  
  var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "id" : 123456789,
  "shelves" : [ {
    "col" : "",
    "books" : [ {
      "author" : "aeiou",
      "isbn" : "aeiou",
      "id" : 123456789,
      "title" : "aeiou"
    } ],
    "id" : 123456789,
    "row" : ""
  } ]
} ];
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

