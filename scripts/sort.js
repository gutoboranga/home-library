function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase();
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function sort(books) {
  let key = document.querySelector('input[name="sortType"]:checked').value;
  
  return sortByKey(books, key);
}

module.exports = {
  sort : sort
}