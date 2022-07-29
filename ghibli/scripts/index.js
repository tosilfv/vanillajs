/* constants, variables */
const aboutView = document.querySelector('.aboutView');
const aboutSpan = document.querySelector('.headerLi:nth-child(2) span');
const baseUrlFilms = 'https://ghibliapi.herokuapp.com/films/';
const baseUrlImages = 'https://image.tmdb.org/t/p/original/';
const carousel = document.querySelector('.carousel');
const contactSpan = document.querySelector('.headerLi:nth-child(3) span');
const contactView = document.querySelector('.contactView');
const date = new Date().toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  timeZoneName: 'short',
  weekday: 'long',
  year: 'numeric',
});
const footerDate = document.querySelector('.footerDate');
const intervalCarousel = 5000;
const javascriptNote = document.querySelector('.javascriptNote');
const listOfSort = document.querySelector('.listOfSort');
const loadingLabel = document.querySelector('.loadingLabel');
const loadingProgress = document.querySelector('.loadingProgress');
const main = document.querySelector('main');
const mainSection = document.querySelector('.mainSection');
const movieButton = document.querySelector('.movieButton');
const nameSpace = 'http://www.w3.org/2000/svg';
const nextButton = document.querySelector('.nextButton');
const posterSection = document.querySelector('.posterSection');
const previousButton = document.querySelector('.previousButton');
const searchAnimeList = document.querySelector('.searchAnimeList');
const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('#searchInput');
const tableBorder = document.querySelector('.tableBorder');
const tableSort = document.querySelector('.tableSort');
const timeoutCarousel = 4900;
const timeoutMain = 500;
const timeoutPoster = 200;
const timeoutSearch = 120;
const timeoutSlide = intervalCarousel - timeoutCarousel;
let bgImageList = [];
let carouselImageList = [];
let foundMovieList = [];
let lastImageIndex = 0;
let movieIndex = 0;
let movieList = [];
let newInterval = setInterval(() => {
  showSlide('carouselRight');
}, intervalCarousel);
let newTimeout = null;
let randomNumber = null;
let response = null;
let slideNumber = 0;

/* api data */
const getAllMovies = async () => {
  try {
    await axios.get(`${baseUrlFilms}`).then((res) => {
      // save response
      response = res;
      // list population
      for (let i = 0; i < response.data.length; i++) {
        movieList.push({
          index: i,
          title: response.data[i].title,
          director: response.data[i].director,
          producer: response.data[i].producer,
          release_date: response.data[i].release_date,
          running_time: response.data[i].running_time,
          rt_score: response.data[i].rt_score,
        });
      }
      // sort title ascending
      titleAscending();
      // default table
      createSortTable(response.data);
      // scroll to top of page (x-coordinate [px], y-coordinate [px])
      window.scrollTo(0, 0);
      // default poster
      defaultPoster();
    });
  } catch (error) {
    console.error(error);
  }
};
getAllMovies();

// index.html
/*
  <body>
    <header></header>
  </body>
*/
// event listeners
// helpers
const toggleAbout = () => {
  aboutView.classList.toggle('aboutViewShow');
  contactView.classList.remove('contactViewShow');
};

const toggleContact = () => {
  contactView.classList.toggle('contactViewShow');
  aboutView.classList.remove('aboutViewShow');
};

// click about text
aboutSpan.addEventListener('click', () => {
  toggleAbout();
});

// click contact text
contactSpan.addEventListener('click', () => {
  toggleContact();
});

// listen blur
aboutSpan.addEventListener('blur', () => {
  aboutView.classList.remove('aboutViewShow');
});

contactSpan.addEventListener('blur', () => {
  contactView.classList.remove('contactViewShow');
});

// tab enter about
aboutSpan.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleAbout();
  }
  // enter is held
  if (e.repeat) {
    aboutView.classList.remove('aboutViewShow');
  }
});

// tab enter contact
contactSpan.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleContact();
  }
  // enter is held
  if (e.repeat) {
    contactView.classList.remove('contactViewShow');
  }
});

// click aboutView
aboutView.addEventListener('click', () => {
  toggleAbout();
});

// click contactView
contactView.addEventListener('click', () => {
  toggleContact();
});

/*
  <body>
    <main></main>
  </body>
*/
// fade-in
main.classList.add('mainShow');

// hide javascript notification
javascriptNote.classList.add('javascriptNoteHide');

/*
  <main>
    <div class="carousel"></div>
  </main>
*/
// new carousel
const createCarousel = () => {
  // list population
  carouselImageList.push([
    `Porco Rosso: A disastrous group photo of the air
    pirates.`,
    `${baseUrlImages}nAeCzilMRXvGaxiCpv63ZRVRVgh.jpg`,
  ]);
  carouselImageList.push([
    `From Up on Poppy Hill: Shun and Umi in front of
    a lively open air market.`,
    `${baseUrlImages}xtPBZYaWQMQxRpy7mkdk5n1bTxs.jpg`,
  ]);
  carouselImageList.push([
    `My Neighbor Totoro: Totoro is standing on a green
    lawn.`,
    `${baseUrlImages}etqr6fOOCXQOgwrQXaKwenTSuzx.jpg`,
  ]);
  carouselImageList.push([
    `Castle in the Sky: A fantasy layout of the castle
    and heroes in the sky-kingdom of Laputa.`,
    `${baseUrlImages}3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg`,
  ]);
  carouselImageList.push([
    `Kiki's Delivery Service: Kiki is flying on a broomstick
    along with a flock of birds.`,
    `${baseUrlImages}h5pAEVma835u8xoE60kmLVopLct.jpg`,
  ]);
  carouselImageList.push([
    `Spirited Away: Chihiro is running on a bridge towards
    the screen.`,
    `${baseUrlImages}bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg`,
  ]);
  carouselImageList.push([
    `Howl's Moving Castle: Howl is flying over roof top
    tiled houses carrying Sophie.`,
    `${baseUrlImages}hjlvbMKhQm7N8tYynr8yQ8GBmqe.jpg`,
  ]);
  carouselImageList.push([
    `Pom Poko: A raccoon that wears a white scarf is
    sitting on grass.`,
    `${baseUrlImages}jScPd0u0jeo66l8gwDl7W9hDUnM.jpg`,
  ]);
  // last index
  lastImageIndex = carouselImageList.length - 1;

  // helpers
  const createDiv = (className) => {
    const div = document.createElement('div');
    div.classList.add(className);
    return div;
  };

  const createFigure = () => {
    const figure = document.createElement('figure');
    return figure;
  };

  // create one img and then change its alt and src
  const createImg = (i) => {
    const img = document.createElement('img');
    img.alt = carouselImageList[i][0];
    img.classList.add('carouselImg');
    img.src = carouselImageList[i][1];
    return img;
  };

  const createSvg = (InnerHTML, viewBox) => {
    const svg = document.createElementNS(nameSpace, 'svg');
    svg.innerHTML = InnerHTML;
    svg.setAttributeNS(nameSpace, 'viewBox', viewBox);
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', nameSpace);
    return svg;
  };

  // image
  const figure = createFigure();
  // select the first slide (0) at page load
  const img = createImg(0);
  figure.append(img);
  carousel.append(figure);

  // left arrow
  const divLeftArrow = createDiv('carouselArrowL');
  const leftInnerHTML = `<polyline points="50,3 7,50 50,97" tabindex="0">
    <animate
      attributeName="points"
      begin="0s"
      dur="5s"
      repeatCount="indefinite"
      values="50,3 7,50 50,97;60,3 17,50 60,97;50,3 7,50 50,97"
    />
  </polyline>`;
  const svgLeftArrow = createSvg(leftInnerHTML, '0 0 53 100');
  divLeftArrow.append(svgLeftArrow);
  carousel.append(divLeftArrow);

  // right arrow
  const divRightArrow = createDiv('carouselArrowR');
  const rightInnerHTML = `<polyline points="3,3 50,50 3,97" tabindex="0">
    <animate
      attributeName="points"
      begin="0s"
      dur="5s"
      repeatCount="indefinite"
      values="3,3 50,50 3,97;-7,3 40,50 -7,97;3,3 50,50 3,97"
    />
  </polyline>`;
  const svgRightArrow = createSvg(rightInnerHTML, '0 0 57 100');
  divRightArrow.append(svgRightArrow);
  carousel.append(divRightArrow);

  // dots
  const dotsDiv = document.createElement('div');
  dotsDiv.classList.add('carouselDots');
  for (let i = 1; i <= carouselImageList.length; i++) {
    const InnerHTML = `<circle cx="20" cy="20" r="20">
      <animate
        attributeName="r"
        begin="0s"
        dur="5s"
        repeatCount="indefinite"
        values="50%;40%;50%"
      />
    </circle>`;
    const svg = createSvg(InnerHTML, '0 0 40 40');
    svg.classList.add(`dot-${i}`);
    // click dot
    svg.addEventListener('click', () => {
      stop();
      hideDot();
      slideNumber = i - 1;
      clickRight();
    });
    dotsDiv.append(svg);
  }
  carousel.append(dotsDiv);
};
createCarousel();

// helpers
const changeAltSrc = (carouselImg) => {
  carouselImg.alt = carouselImageList[slideNumber - 1][0];
  carouselImg.src = carouselImageList[slideNumber - 1][1];
};

const hideCarouselImage = (direction) => {
  const carouselImg = document.querySelector('.carouselImg');
  carouselImg.classList.add(direction);
  carouselImg.classList.remove('carouselImgShow');
  hideDot();
};

const hideDot = () => {
  const dot = document.querySelector(`.dot-${slideNumber}`);
  dot && dot.classList.remove('dotShow');
};

const showCarouselImage = (direction) => {
  const carouselImg = document.querySelector('.carouselImg');
  carouselImg.classList.remove(direction);
  carouselImg.classList.add('carouselImgShow');
  return carouselImg;
};

const showDot = () => {
  const dot = document.querySelector(`.dot-${slideNumber}`);
  dot.classList.add('dotShow');
};

// previous number
const changeToPrevious = () => {
  slideNumber === 1 ? (slideNumber = carouselImageList.length) : slideNumber--;
};

// slide number
const changeToSlide = () => {
  slideNumber === carouselImageList.length ? (slideNumber = 1) : slideNumber++;
};

// clear extra red dots
const clearExtraDots = () => {
  const dots = document.querySelectorAll('.carouselDots svg');
  for (let dot of dots) {
    dot.classList.remove('dotShow');
  }
};

// auto change
const showSlide = (direction) => {
  newTimeout = setTimeout(() => {
    hideCarouselImage(direction);
  }, timeoutCarousel);
  const carouselImg = showCarouselImage(direction);
  changeToSlide();
  clearExtraDots();
  changeAltSrc(carouselImg);
  showDot();
};
showSlide('carouselRight');

// event listeners
// helpers
const clickLeft = () => {
  hideCarouselImage('carouselLeft');
  setTimeout(() => {
    const carouselImg = showCarouselImage('carouselLeft');
    changeToPrevious();
    clearExtraDots();
    showDot();
    changeAltSrc(carouselImg);
  }, timeoutSlide);
};

const clickRight = () => {
  hideCarouselImage('carouselRight');
  setTimeout(() => {
    const carouselImg = showCarouselImage('carouselRight');
    changeToSlide();
    clearExtraDots();
    showDot();
    changeAltSrc(carouselImg);
  }, timeoutSlide);
};

const cont = () => {
  stop();
  newInterval = setInterval(() => {
    showSlide('carouselRight');
  }, intervalCarousel);
  newTimeout = setTimeout(() => {
    hideCarouselImage('carouselRight');
  }, timeoutCarousel);
};

const stop = () => {
  clearInterval(newInterval);
  clearTimeout(newTimeout);
};

// stop
carousel.addEventListener('mouseenter', () => {
  // prevent hideCarouselImage
  showCarouselImage('carouselRight');
  stop();
});

// continue
carousel.addEventListener('mouseleave', () => {
  cont();
});

// click left
const carouselArrowL = document.querySelector('.carouselArrowL');
carouselArrowL.addEventListener('click', () => {
  clickLeft();
});

// click right
const carouselArrowR = document.querySelector('.carouselArrowR');
carouselArrowR.addEventListener('click', () => {
  clickRight();
});

// tab enter carousel left
carouselArrowL.addEventListener('keydown', (e) => {
  // enter is clicked and not held
  if (e.key === 'Enter' && !e.repeat) {
    stop();
    clickLeft();
  }
  cont();
});

// tab enter carousel right
carouselArrowR.addEventListener('keydown', (e) => {
  // enter is clicked and not held
  if (e.key === 'Enter' && !e.repeat) {
    stop();
    clickRight();
  }
  cont();
});

// maximize browser
window.addEventListener('focus', () => {
  cont();
});

// minimize browser
window.addEventListener('blur', () => {
  // prevent hideCarouselImage
  showCarouselImage('carouselRight');
  stop();
});

/*
  <main>
    <section class="mainSection"></section>
  </main>
*/
// list population
bgImageList.push(`${baseUrlImages}6pTqSq0zYIWCsucJys8q5L92kUY.jpg`);
bgImageList.push(`${baseUrlImages}lMaWlYThCSnsmW3usxWTpSuyZp1.jpg`);
bgImageList.push(`${baseUrlImages}stM3jlD4nSJhlvR2DE7XnB0eN25.jpg`);
bgImageList.push(`${baseUrlImages}axUX7urQDwCGQ9qbgh2Yys7qY9J.jpg`);

// random background
setTimeout(() => {
  const randomNumber = Math.floor(Math.random() * bgImageList.length);
  const randImg = bgImageList[randomNumber];
  mainSection.style.backgroundImage = `linear-gradient(to bottom, rgb(205, 175, 175, 0.95), rgba(15, 5, 55, 0.75)), url(${randImg})`;
  randImg === undefined &&
    (mainSection.title = 'Studio Ghibli anime movie background image.');
}, timeoutMain);

/*
  <section class="mainSection">
    <section class="tableSection"></section>
  </section>
*/
// sort
// helpers
const directorAscending = () => {
  movieList.sort((first, second) => {
    const firstDirector = first.director.toLowerCase();
    const secondDirector = second.director.toLowerCase();
    if (firstDirector < secondDirector) return -1;
    if (firstDirector > secondDirector) return 1;
    return 0;
  });
};

const directorDescending = () => {
  movieList.sort((first, second) => {
    const firstDirector = first.director.toLowerCase();
    const secondDirector = second.director.toLowerCase();
    if (firstDirector < secondDirector) return 1;
    if (firstDirector > secondDirector) return -1;
    return 0;
  });
};

const releaseDateAscending = () => {
  movieList.sort((first, second) => {
    const firstReleaseDate = first.release_date.toLowerCase();
    const secondReleaseDate = second.release_date.toLowerCase();
    if (firstReleaseDate < secondReleaseDate) return -1;
    if (firstReleaseDate > secondReleaseDate) return 1;
    return 0;
  });
};

const releaseDateDescending = () => {
  movieList.sort((first, second) => {
    const firstReleaseDate = first.release_date.toLowerCase();
    const secondReleaseDate = second.release_date.toLowerCase();
    if (firstReleaseDate < secondReleaseDate) return 1;
    if (firstReleaseDate > secondReleaseDate) return -1;
    return 0;
  });
};

const runningTimeAscending = () => {
  movieList.sort((first, second) => {
    const firstRunningTime = first.running_time.toLowerCase();
    const secondRunningTime = second.running_time.toLowerCase();
    return firstRunningTime - secondRunningTime;
  });
};

const runningTimeDescending = () => {
  movieList.sort((first, second) => {
    const firstRunningTime = first.running_time.toLowerCase();
    const secondRunningTime = second.running_time.toLowerCase();
    return secondRunningTime - firstRunningTime;
  });
};

const titleAscending = () => {
  movieList.sort((first, second) => {
    const firstTitle = first.title.toLowerCase();
    const secondTitle = second.title.toLowerCase();
    if (firstTitle < secondTitle) return -1;
    if (firstTitle > secondTitle) return 1;
    return 0;
  });
};

const titleDescending = () => {
  movieList.sort((first, second) => {
    const firstTitle = first.title.toLowerCase();
    const secondTitle = second.title.toLowerCase();
    if (firstTitle < secondTitle) return 1;
    if (firstTitle > secondTitle) return -1;
    return 0;
  });
};

// new table
const createSortTable = (movieData) => {
  // remove sortTable
  const sortTable = document.querySelector('.sortTable');
  sortTable && sortTable.remove();
  // create table
  const table = document.createElement('table');
  table.classList.add('sortTable');
  const caption = document.createElement('caption');
  caption.textContent = `A representation of released
    Studio Ghibli movies and data.`;
  const trHead = document.createElement('tr');
  // select one movie "[0]" to get table headers
  for (let data in movieData[0]) {
    // leave out
    if (
      data !== 'description' &&
      data !== 'id' &&
      data !== 'image' &&
      data !== 'index' &&
      data !== 'locations' &&
      data !== 'movie_banner' &&
      data !== 'original_title' &&
      data !== 'original_title_romanised' &&
      data !== 'people' &&
      data !== 'species' &&
      data !== 'url' &&
      data !== 'vehicles'
    ) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = data.replaceAll('_', ' ');
      trHead.append(th);
    }
  }
  const tbody = document.createElement('tbody');
  for (let i = 0; i < movieData.length; i++) {
    const tr = document.createElement('tr');
    let counter = 0;
    for (let data in movieData[i]) {
      // leave out
      if (
        data !== 'description' &&
        data !== 'id' &&
        data !== 'image' &&
        data !== 'index' &&
        data !== 'locations' &&
        data !== 'movie_banner' &&
        data !== 'original_title' &&
        data !== 'original_title_romanised' &&
        data !== 'people' &&
        data !== 'species' &&
        data !== 'url' &&
        data !== 'vehicles'
      ) {
        // makes the first element in tr as th
        if (counter === 0) {
          const th = document.createElement('th');
          th.scope = 'row';
          th.textContent = movieData[i][data];
          tr.append(th);
          counter++;
        } else {
          const td = document.createElement('td');
          td.textContent = movieData[i][data];
          tr.append(td);
        }
      }
    }
    tbody.append(tr);
  }
  const tfoot = document.createElement('tfoot');
  const trFoot = document.createElement('tr');
  const th = document.createElement('th');
  th.colSpan = 3;
  th.scope = 'row';
  th.textContent = 'Total Movies';
  const td = document.createElement('td');
  td.colSpan = 3;
  td.textContent = movieData.length;
  const thead = document.createElement('thead');
  trFoot.append(th);
  trFoot.append(td);
  tfoot.append(trFoot);
  thead.append(trHead);
  table.append(caption);
  table.append(thead);
  table.append(tbody);
  table.append(tfoot);
  tableBorder.append(table);
  // focus on listOfSort
  listOfSort.focus();
  // fade-in
  const sortTableNew = document.querySelector('.sortTable');
  sortTableNew.classList.add('tableShow');
};

/*
  <section class="mainSection">
    <section class="searchSection"></section>
  </section>
*/
// loading
const toggleLoadingDiv = (timeout) => {
  setTimeout(() => {
    loadingLabel.classList.toggle('loadingDivShow');
  }, timeout);
};

const toggleLoadingProgress = (timeout) => {
  setTimeout(() => {
    loadingProgress.classList.toggle('loadingProgressShow');
  }, timeout);
};

// fake loading
const fakeLoading = () => {
  toggleLoadingDiv(0);
  toggleLoadingDiv(400);
  toggleLoadingProgress(300);
  toggleLoadingProgress(400);
};

// finds the index of the movie in movieList by finding the movieListIndex class's
// number that comes after the dash (-) using the sortIndex (movie-x) as a starting point
const findMovieByIndex = (sortIndex) => {
  const movie = document.querySelector(`.movie-${sortIndex}`);
  let classes = [];
  movie.classList.forEach((c) => classes.push(c));
  let movieListInd = classes[1];
  movieListInd = movieListInd.split('-');
  movieListInd = movieListInd[1];
  movieListInd = parseInt(movieListInd);
  updatePosterData(movieListInd);
};

// sort movies
const sortMovies = () => {
  listOfSort.addEventListener('change', (e) => {
    fakeLoading();

    e.target.value === 'director ascending' && directorAscending();
    e.target.value === 'director descending' && directorDescending();
    e.target.value === 'release date ascending' && releaseDateAscending();
    e.target.value === 'release date descending' && releaseDateDescending();
    e.target.value === 'running time ascending' && runningTimeAscending();
    e.target.value === 'running time descending' && runningTimeDescending();
    e.target.value === 'title ascending' && titleAscending();
    e.target.value === 'title descending' && titleDescending();
    createMovieList(movieList);
    // sort table
    createSortTable(movieList);
    // select the first movie in movieList
    findMovieByIndex(0);
  });
};
sortMovies();

// new list
const createMovieList = (found) => {
  // remove listOfMovies
  const listOfMovies = document.querySelector('.listOfMovies');
  listOfMovies && listOfMovies.remove();
  // empty list
  if (found.includes('No movies were found.')) {
    nothingFound(found);
    return;
  }
  // create list
  const select = document.createElement('select');
  const option = document.createElement('option');
  option.textContent = '- select a movie -';
  option.classList.add('movieListTitle');
  select.append(option);
  for (let i = 0; i < found.length; i++) {
    const option = document.createElement('option');
    option.classList.add(`movie-${i}`, `movieListIndex-${found[i].index}`);
    option.textContent = found[i].title;
    option.value = found[i].title;
    clickTitle(option, found[i]);
    select.append(option);
  }
  select.classList.add('listOfMovies', 'searchAnimeListShow');
  select.name = 'listOfMovies';
  // enable scrollbar
  found.length > 5
    ? (select.size = Math.floor(found.length - found.length * 0.5))
    : (select.size = found.length);
  searchAnimeList.append(select);
  clickOutside(select);
};

// new empty list
const nothingFound = (found) => {
  // create list
  const select = document.createElement('select');
  select.classList.add('listOfMovies', 'searchAnimeListShow');
  select.name = 'listOfMovies';
  select.size = 2;
  const option = document.createElement('option');
  option.textContent = found;
  option.value = found;
  select.append(option);
  searchAnimeList.append(select);
  clickOutside(select);
};

// search
const searchMovie = () => {
  foundMovieList = movieList.filter((mov) =>
    mov.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  if (foundMovieList.length === 0) {
    createMovieList('No movies were found.');
  }
  if (foundMovieList.length === 1) {
    // needs to select the first array item by [0]
    updatePosterData(foundMovieList[0].index);
    resetInput();
  }
  if (foundMovieList.length > 1) {
    createMovieList(foundMovieList);
  }
};

// reset
const resetInput = () => {
  searchInput.value = '';
  searchInput.focus();
};

// event listeners
// helper
const hideSearchAnimeList = () => {
  const listOfMovies = document.querySelector('.listOfMovies');
  listOfMovies && listOfMovies.classList.remove('searchAnimeListShow');
};

// search sort
tableSort.addEventListener('keydown', (e) => {
  setTimeout(() => {
    tableSort.removeAttribute('disabled');
  }, timeoutSearch);
  // enter is held
  if (e.repeat) {
    tableSort.setAttribute('disabled', 'disabled');
  }
});

// listen blur
const clickOutside = (select) => {
  select.addEventListener('blur', () => {
    setTimeout(() => {
      select.classList.remove('searchAnimeListShow');
      searchInput.value = '';
    }, timeoutSearch);
  });
  // enable blur
  select.focus();
};

// click title
const clickTitle = (option, movie) => {
  option.addEventListener('click', () => {
    updatePosterData(movie.index);
  });
};

// arrow enter
document.addEventListener('keydown', (e) => {
  for (let i = 0; i < foundMovieList.length; i++) {
    if (e.target.value === foundMovieList[i].title && e.key === 'Enter') {
      updatePosterData(foundMovieList[i].index);
      setTimeout(() => {
        resetInput();
      }, timeoutSearch);
    }
  }
});

// tab key
document.addEventListener('keydown', () => {
  const posterMenuView = document.querySelectorAll('.posterMenuView');
  for (let menuView of posterMenuView) {
    menuView.classList.remove('posterMenuViewShow');
  }
});

// clear
searchAnimeList.addEventListener('click', () => {
  setTimeout(() => {
    hideSearchAnimeList();
    resetInput();
  }, timeoutSearch);
});

// movie button
movieButton.addEventListener('click', (e) => {
  setTimeout(() => {
    searchMovie();
  }, timeoutSearch);
});

// next button
nextButton.addEventListener('click', () => {
  searchMovie();
  hideSearchAnimeList();
  setTimeout(() => {
    let sortIndex = 0;
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].index === movieIndex) {
        if (i === movieList.length - 1) {
          sortIndex = 0;
        } else {
          sortIndex = i + 1;
        }
      }
    }
    findMovieByIndex(sortIndex);
  }, timeoutSearch);
});

// previous button
previousButton.addEventListener('click', () => {
  searchMovie();
  hideSearchAnimeList();
  setTimeout(() => {
    let sortIndex = 0;
    for (let i = 0; i < movieList.length; i++) {
      if (movieList[i].index === movieIndex) {
        if (i === 0) {
          sortIndex = movieList.length - 1;
        } else {
          sortIndex = i - 1;
        }
      }
    }
    findMovieByIndex(sortIndex);
  }, timeoutSearch);
});

// form submit
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchMovie();
});

// click outside
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    movieButton.textContent = 'OPEN MOVIE MENU';
  }, timeoutSearch);
});

// click inside
searchInput.addEventListener('focus', () => {
  movieButton.textContent = 'GO';
});

/*
  <section class="mainSection">
    <section class="posterSection"></section>
  </section>
*/
// api endpoint
const getEndpoint = async (data, movieData, span1, span2) => {
  span1.textContent = '';
  span2.textContent = '';
  for (let m of movieData[data]) {
    // if there are at least one endpoint with uuid
    if (m.length > 42) {
      try {
        await axios.get(`${m}`).then((res) => {
          span1.textContent += `${res.data.name}, `;
          span2.textContent += `${res.data.name}, `;
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  // if there were no uuid's
  if (span1.textContent === '') {
    span1.textContent = 'Not listed';
    span2.textContent = 'Not listed';
  } else {
    // remove last whitespace
    span1.textContent = span1.textContent.trim();
    span2.textContent = span2.textContent.trim();
    // remove last comma
    span1.textContent = span1.textContent.substring(
      0,
      span1.textContent.length - 1
    );
    span2.textContent = span2.textContent.substring(
      0,
      span2.textContent.length - 1
    );
  }
};

// new poster
const createPoster = (movie) => {
  // helpers
  const createPosterSection = () => {
    const figure = document.createElement('figure');
    figure.classList.add('posterPicture');
    const h2 = document.createElement('h2');
    h2.hidden = true;
    h2.textContent = 'Poster Section';
    const nav = document.createElement('nav');
    nav.classList.add('posterMenu');
    posterSection.append(h2);
    posterSection.append(nav);
    posterSection.append(figure);
  };
  createPosterSection();

  const createPosterMenu = (movieData) => {
    const ul = document.createElement('ul');
    for (let data in movieData) {
      // leave out
      if (
        data !== 'id' &&
        data !== 'image' &&
        data !== 'locations' &&
        data !== 'rt_score' &&
        data !== 'url'
      ) {
        const button = document.createElement('button');
        button.classList.add('posterCrumbButton');
        button.textContent = data.replaceAll('_', ' ');
        button.type = 'button';
        const div1 = document.createElement('div');
        div1.classList.add('posterMenuPreview');
        const div2 = document.createElement('div');
        div2.classList.add('posterMenuView');
        const li = document.createElement('li');
        li.classList.add('posterCrumb');
        const h2 = document.createElement('h2');
        h2.classList.add('posterMenuViewH2');
        h2.textContent = data.replaceAll('_', ' ');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        if (data === 'people' || data === 'species' || data === 'vehicles') {
          getEndpoint(data, movieData, span1, span2);
          data === 'people' && span1.classList.add('peoplePreviewSpan');
          data === 'people' && span2.classList.add('peopleViewSpan');
          data === 'species' && span1.classList.add('speciesPreviewSpan');
          data === 'species' && span2.classList.add('speciesViewSpan');
          data === 'vehicles' && span1.classList.add('vehiclesPreviewSpan');
          data === 'vehicles' && span2.classList.add('vehiclesViewSpan');
        } else {
          span1.textContent = movieData[data];
          span1.title = data;
          span2.textContent = movieData[data];
          span2.title = data;
          if (data === 'release_date') {
            span1.textContent = updateYear(movieData[data]);
            span2.textContent = updateYear(movieData[data]);
          }
          if (data === 'running_time') {
            span1.textContent = updateRunningTime(movieData[data]);
            span2.textContent = updateRunningTime(movieData[data]);
          }
        }
        if (data === 'movie_banner') {
          const img = document.createElement('img');
          img.alt = `${movieData.title} movie banner.`;
          img.classList.add('movieBanner');
          img.src = `${movieData[data]}`;
          const picture = document.createElement('picture');
          picture.append(img);
          div2.append(h2);
          div2.append(picture);
        } else {
          div1.append(span1);
          div2.append(h2);
          div2.append(span2);
        }
        li.append(button);
        li.append(div1);
        li.append(div2);
        ul.append(li);
        clickMenu(button, div2);
        clickView(div2);
        tabEnterPosterMenu(button);
        button.addEventListener('mouseenter', () => {
          div1.classList.add('posterMenuPreviewShow');
        });
        button.addEventListener('mouseleave', () => {
          div1.classList.remove('posterMenuPreviewShow');
        });
      }
    }
    const posterMenu = document.querySelector('.posterMenu');
    posterMenu.append(ul);
  };
  createPosterMenu(response.data[movie]);

  const createPosterImg = (movieData) => {
    const img = document.createElement('img');
    img.alt = `${movieData.title} movie poster.`;
    img.classList.add('posterImg');
    img.src = movieData.image;
    img.tabIndex = 0;
    const posterPicture = document.querySelector('.posterPicture');
    posterPicture.append(img);
    clickPoster(img);
    tabEnterPosterImg(img);
  };
  createPosterImg(response.data[movie]);
};

// update movie
// helpers
const updateRunningTime = (runningTime) => {
  return `${runningTime} minutes`;
};

const updateYear = (year) => {
  return `Year ${year}`;
};

const updateMovieText = (movieSpans, movieUpdate) => {
  for (let movieData in movieUpdate) {
    [...movieSpans].map(
      (span) =>
        span.title === movieData &&
        ((span.textContent = movieUpdate[movieData]),
        movieData === 'release_date' &&
          (span.textContent = updateYear(movieUpdate[movieData])),
        movieData === 'running_time' &&
          (span.textContent = updateRunningTime(movieUpdate[movieData])))
    );
  }
};

// update
const updatePosterData = (movie) => {
  fakeLoading();

  movieIndex = movie;
  const movieUpdate = response.data[movie];
  const movieSpans1 = document.querySelectorAll('.posterMenuPreview span');
  const movieSpans2 = document.querySelectorAll('.posterMenuView span');
  updateMovieText(movieSpans1, movieUpdate);
  updateMovieText(movieSpans2, movieUpdate);
  // movie banner
  const movieBannerImg = document.querySelector('.movieBanner');
  movieBannerImg.alt = `${response.data[movie].title} movie banner.`;
  movieBannerImg.src = response.data[movie].movie_banner;
  // poster image
  const posterImg = document.querySelector('.posterImg');
  posterImg.alt = `${response.data[movie].title} movie poster.`;
  posterImg.src = response.data[movie].image;
  // api endpoints
  const peoplePreviewSpan = document.querySelector('.peoplePreviewSpan');
  const peopleViewSpan = document.querySelector('.peopleViewSpan');
  const speciesPreviewSpan = document.querySelector('.speciesPreviewSpan');
  const speciesViewSpan = document.querySelector('.speciesViewSpan');
  const vehiclesPreviewSpan = document.querySelector('.vehiclesPreviewSpan');
  const vehiclesViewSpan = document.querySelector('.vehiclesViewSpan');
  getEndpoint('people', movieUpdate, peoplePreviewSpan, peopleViewSpan);
  getEndpoint('species', movieUpdate, speciesPreviewSpan, speciesViewSpan);
  getEndpoint('vehicles', movieUpdate, vehiclesPreviewSpan, vehiclesViewSpan);
};

// default
const defaultPoster = () => {
  randomNumber = Math.floor(Math.random() * (response.data.length - 1));
  movieIndex = randomNumber;
  createPoster(randomNumber);
};

// event listeners
// helpers
const togglePosterImg = (img) => {
  img.classList.toggle('posterImgScale');
};

const togglePosterMenu = (div) => {
  setTimeout(() => {
    div.classList.toggle('posterMenuViewShow');
  }, timeoutPoster);
};

// menu button
const clickMenu = (button, div) => {
  button.addEventListener('click', () => {
    togglePosterMenu(div);
  });
};

// poster
const clickPoster = (img) => {
  img.addEventListener('click', () => {
    togglePosterImg(img);
  });
};

// menu view
const clickView = (div) => {
  div.addEventListener('click', () => {
    togglePosterMenu(div);
  });
};

// tab enter poster menu
const tabEnterPosterMenu = (button) => {
  // enter button
  button.addEventListener('keydown', (e) => {
    setTimeout(() => {
      button.removeAttribute('disabled');
    }, timeoutPoster);
    // enter is held
    if (e.repeat) {
      button.setAttribute('disabled', 'disabled');
    }
  });
};

// tab enter poster image
const tabEnterPosterImg = (img) => {
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      togglePosterImg(img);
    }
    // enter is held
    if (e.repeat) {
      img.classList.remove('posterImgScale');
    }
  });
};

/*
  <body>
    <footer></footer>
  </body>
*/
// date
footerDate.textContent = date;
