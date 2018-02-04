const SELECTED_OPTION_CLASS = "menu-selected-option";
const OPTION_CLASS = "menu-button";


function readFile(filename) {
  var fs = require('fs');
  var content = fs.readFileSync(filename, { encoding: 'utf8' });
  
  return content;
}

function getContainerId(key) {
  let containers = {
    'Filtrar' : 'filter-container',
    'Ordenar' : 'sort-container',
    'Adicionar' : 'add-container'
  }
  
  return containers[key];
}

function getTemplateName(key) {
  let templates = {
    'Filtrar' : '_filter_form',
    'Ordenar' : '_sort_form',
    'Adicionar' : '_add_form'
  }
  
  return templates[key];
}

function openOption(option) {
  let containerId = getContainerId(option.innerHTML);
  let container = document.getElementById(containerId);
  let content = readFile('templates/' + getTemplateName(option.innerHTML) + '.html');
  
  container.innerHTML = content;
}

function closeOption(option) {
  let containerId = getContainerId(option.innerHTML);
  let container = document.getElementById(containerId);
  container.innerHTML = "";
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
  optionCliked : optionCliked
}
