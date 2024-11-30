import commonMovie from "./common-movie";

const creationEnum = Object.freeze({
  ComputerAnimation: "ComputerAnimation",
  Printed: "Printed",
  Doll: "Doll",
  Clay: "Clay",
});

const cartoon = (name, author, creationType) => {
  return { ...commonMovie(name, author), creationType };
};

export {cartoon, creationEnum};
