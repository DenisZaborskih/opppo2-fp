import commonMovie from "./common-movie";

const gameMovie = (name, author, origin) => {
    return({...commonMovie(name,author), origin});
}

export default gameMovie;