"use client";

import villagers from "./villagers.json";
import { useState } from "react";

export default function Home() {
  const [villagerInfo, setVillagerInfo] = useState({
    name: "",
    birthdayString: "",
    zodiac: "",
    validVillager: "",
  });

  const handleNameChange = (event) => {
    return setVillagerInfo({
      ...villagerInfo,
      name: event.target.value,
    });
  };

  const findZodiac = (day, month) => {
    switch (parseInt(month)) {
      case 1:
        return day < 21 ? "Capricorn" : "Aquarius";
      case 2:
        return day < 19 ? "Aquarius" : "Pisces";
      case 3:
        return day < 21 ? "Pisces" : "Aries";
      case 4:
        return day < 20 ? "Aries" : "Taurus";
      case 5:
        return day < 21 ? "Taurus" : "Gemini";
      case 6:
        return day < 21 ? "Gemini" : "Cancer";
      case 7:
        return day < 23 ? "Cancer" : "Leo";
      case 8:
        return day < 23 ? "Leo" : "Virgo";
      case 9:
        return day < 23 ? "Virgo" : "Libra";
      case 10:
        return day < 23 ? "Libra" : "Scorpio";
      case 11:
        return day < 22 ? "Scorpio" : "Sagittarius";
      case 12:
        return day < 21 ? "Sagittarius" : "Capricorn";
      default:
        return "Invalid month";
    }
  };

  const handleClick = () => {
    if (Object.keys(villagers).length) {
      const [villagerBirthday] = Object.values(villagers)
        .filter((data) => data?.name["name-USen"] === villagerInfo.name)
        .map(({ birthday, "birthday-string": birthdayString }) => {
          const birthdayArray = birthday.split("/");
          setVillagerInfo({
            ...villagerInfo,
            birthdayString,
            zodiac: findZodiac(birthdayArray[0], birthdayArray[1]),
          });
        });
    }
  };

  return (
    <main>
      <div className="text-5xl">
        <h1>Villager Zodiac Sign Finder</h1>
        <div>
          <input
            type="text"
            placeholder="villager name here"
            onChange={handleNameChange}
          ></input>
          <button onClick={handleClick}>click</button>
          <p className="text-white">{villagerInfo?.name || "invalid name"}</p>
          <p className="text-white">
            {villagerInfo?.birthdayString || "no birthday"}
          </p>
          <p className="text-white">{villagerInfo?.zodiac || "no zodiac"}</p>
        </div>
      </div>
    </main>
  );
}
