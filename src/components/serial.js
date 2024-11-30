import commonMovie from "./common-movie";

const serial = (name, author, duration) => {
    return {...commonMovie(name, author), duration};
}

export default serial;