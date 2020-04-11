import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterSectionTemplate} from "./components/filtering.js";
import {createBoardSectionTemplate} from "./components/board-section.js";
import {createBoardSort} from "./components/board-sort.js";
import {createBoardTask} from "./components/board-task.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createTaskEditTemplate} from "./components/task-editing.js";
import {createTaskTemplate} from "./components/task-creating.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 20;
const SHOWING_TASK_COUNT_ON_START = 8;
const SHOWING_TASK_COUNT_BY_BUTTON = 8;

let showingTaskCount = SHOWING_TASK_COUNT_ON_START;
const render = (container, template, place = `beforeend`) => container.insertAdjacentHTML(place, template);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterSectionTemplate(filters));
render(siteMainElement, createBoardSectionTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board.container`);
render(siteBoardElement, createBoardSort());
render(siteBoardElement, createBoardTask());
render(siteBoardElement, createLoadMoreButtonTemplate());

const taskElement = siteBoardElement.querySelector(`.board__tasks`);
render(taskElement, createTaskEditTemplate(tasks[0]));

for (let i = 0; i < showingTaskCount; i++) {
  render(taskElement, createTaskTemplate(tasks[i]));
}
const loadMoreButton = siteBoardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTaskCount;
  showingTaskCount = showingTaskCount + SHOWING_TASK_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTaskCount)
  .forEach((task) => render(taskElement, createTaskTemplate(task)));

  if(showingTaskCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
