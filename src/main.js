import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterSectionTemplate} from "./components/filtering.js";
import {createBoardSectionTemplate} from "./components/board-section.js";
import {createBoardSort} from "./components/board-sort.js";
import {createBoardTask} from "./components/board-task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createTaskEditTemplate} from "./components/task-editing.js";
import {createTaskTemplate} from "./components/task-creating.js";
import {generateFilters} from "./mock/filter.js";

const TASK_COUNT = 3;
const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterSectionTemplate(filters));
render(siteMainElement, createBoardSectionTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board.container`);
render(siteBoardElement, createBoardSort());
render(siteBoardElement, createBoardTask());
render(siteBoardElement, createLoadMoreButtonTemplate());

const taskElement = siteBoardElement.querySelector(`.board__tasks`);
render(taskElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskElement, createTaskTemplate());
}
