const SELECTED_OPTION_CLASS = "menu-selected-option";
const OPTION_CLASS = "menu-button";
const CONTAINERS = {
  'Filtrar' : 'filter-container',
  'Ordenar' : 'sort-container',
  'Adicionar' : 'add-container'
}
const TEMPLATES = {
  'Filtrar' : 'templates/_filter_form.html',
  'Ordenar' : 'templates/_sort_form.html',
  'Adicionar' : 'templates/_add_form.html'
}

function getContainerId(key) {
  return CONTAINERS[key];
}

function getTemplateName(key) {
  return TEMPLATES[key];
}

function initialize() {
  let allOptions = Array.from(document.getElementsByClassName(OPTION_CLASS));
  
  allOptions.forEach(function(option) {
    let key = option.innerHTML;
    let container = document.getElementById(getContainerId(key));
    
    container.innerHTML = readFile(getTemplateName(key));
  });
  
  updateOptions();
}

function readFile(filename) {
  var fs = require('fs');
  var content = fs.readFileSync(filename, { encoding: 'utf8' });
  
  return content;
}

function openOption(option) {
  let containerId = getContainerId(option.innerHTML);
  let container = document.getElementById(containerId);
  
  container.style.display = 'block';
}

function closeOption(option) {
  let containerId = getContainerId(option.innerHTML);
  let container = document.getElementById(containerId);
  
  container.style.display = 'none';
}

function updateOptions() {
  let allOptions = Array.from(document.getElementsByClassName(OPTION_CLASS));
  
  let selected = document.getElementsByClassName(SELECTED_OPTION_CLASS)[0];
  let unselected = allOptions.filter(function(option) {
    return option != selected;
  });
  
  openOption(selected);
  
  unselected.forEach(function(option) {
    closeOption(option);
  });
}

function optionCliked(caller) {
  // process.stdout.write(caller.innerHTML + "\n");
  
  let allOptions = Array.from(document.getElementsByClassName(OPTION_CLASS));
  
  allOptions.forEach(function(option) {
    if (option == caller) {
      option.classList.add(SELECTED_OPTION_CLASS);
    } else {
      option.classList.remove(SELECTED_OPTION_CLASS);
    }
  });
  
  updateOptions();
}

// process.stdout.write("-> menu.js bombando\n\n");
// updateOptions();

module.exports = {
  updateOptions : updateOptions,
  optionCliked : optionCliked,
  initialize : initialize
}
