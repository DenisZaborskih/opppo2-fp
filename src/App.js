import serial from "./components/serial";
import { cartoon, creationEnum } from "./components/cartoon";
import gameMovie from "./components/game-movie";
import { useEffect } from "react";

const AppComponent = () => {
  let moviesArr = [];

  const movieFactory = {
    ADD: (type, args) => {
      let newMovie;
      switch (type) {
        case "Serial":
          if (!isNaN(args[2]) && args[2] > 0) {
            newMovie = serial(args[0], args[1], args[2]);
          } else
            throw `Сериал ${args[0]} не добавлен: неверное количество серий`;
          break;
        case "GameMovie":
          newMovie = gameMovie(args[0], args[1], args[2]);
          break;
        case "Cartoon":
          if (Object.values(creationEnum).includes(args[2])) {
            newMovie = cartoon(args[0], args[1], args[2]);
          } else throw `Мультфильм не добавлен: неизвестный тип ${args[2]}`;
          break;
        default:
          console.warn(`Неизвестный тип: ${type}`);
      }
      if (newMovie) {
        moviesArr.push(newMovie);
      }
    },
    REM: (name) => {
      moviesArr = moviesArr.filter((item) => item.name !== name);
    },
  };

  const readCommands = (commands) => {
    commands.split("\n").forEach((commandLine) => {
      const splittedCom = commandLine.trim().split(" ");
      switch (splittedCom[0]) {
        case "ADD": {
          try {
            movieFactory.ADD(splittedCom[1], splittedCom.slice(2));
            console.log(`Команда ADD | Добавлено: ${splittedCom[2]}`);
          } catch (error) {
            console.warn(error);
          }
          break;
        }
        case "REM": {
          console.log(`Команда REM | Удалено: ${splittedCom[1]}`);
          movieFactory.REM(splittedCom[1]);
          break;
        }
        case "PRINT": {
          console.log("Команда PRINT | Фильмы:", moviesArr);
          break;
        }
        default:
          console.warn(`Неизвестная команда: ${splittedCom[0]}`);
      }
    });
  };

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch("/data.txt");
        if (!response.ok) {
          throw new Error("Что-то пошло не так...");
        }
        const text = await response.text();
        readCommands(text);
      } catch (error) {
        console.error("Ошибка считывания файла: ", error);
      }
    };

    fetchFile();
  }, []);

  return;
};

export default AppComponent;
