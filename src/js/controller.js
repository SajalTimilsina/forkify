import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //1. loading the recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1. Get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search result
    await model.loadSearchResult(query);

    //3. render results
    resultsView.render(model.getSearchResultsPage());

    //4) Render the initial pagaination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. receiving the value from dom fom view
  //  1.a render New results
  console.log('pag controller', goToPage);
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render New pagaination buttons
  console.log('Model Page Status', model.state.page);
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // update the recipe servings (in state)
  model.updateServings(8);

  // update the recipe view as well
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandleRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults); // publsiher effect
  paginationView.addHandlerClick(controlPagination); // paginationView.addHandlerClick object ma handler funtion pathako
  controlServings();
};

init();
