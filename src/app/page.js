'use client';

import villagers from './villagers.json';
import { useState } from 'react';

export default function Home() {
  const [villagerInfo, setVillagerInfo] = useState({
    name: '',
    species: '',
    birthdayString: '',
    zodiac: '',
  });

  const formatName = (name) =>
    `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  const handleNameChange = (event) => {
    return setVillagerInfo({
      ...villagerInfo,
      name: event.target.value,
      species: '',
      birthdayString: '',
      zodiac: '',
    });
  };

  const findZodiac = (day, month) => {
    switch (parseInt(month)) {
      case 1:
        return day < 21 ? 'Capricorn' : 'Aquarius';
      case 2:
        return day < 19 ? 'Aquarius' : 'Pisces';
      case 3:
        return day < 21 ? 'Pisces' : 'Aries';
      case 4:
        return day < 20 ? 'Aries' : 'Taurus';
      case 5:
        return day < 21 ? 'Taurus' : 'Gemini';
      case 6:
        return day < 21 ? 'Gemini' : 'Cancer';
      case 7:
        return day < 23 ? 'Cancer' : 'Leo';
      case 8:
        return day < 23 ? 'Leo' : 'Virgo';
      case 9:
        return day < 23 ? 'Virgo' : 'Libra';
      case 10:
        return day < 23 ? 'Libra' : 'Scorpio';
      case 11:
        return day < 22 ? 'Scorpio' : 'Sagittarius';
      case 12:
        return day < 21 ? 'Sagittarius' : 'Capricorn';
      default:
        return '';
    }
  };

  const handleClick = () => {
    if (Object.keys(villagers).length) {
      const [villagerBirthday] = Object.values(villagers)
        .filter(
          (data) => data?.name['name-USen'] === formatName(villagerInfo.name),
        )
        .map(({ species, birthday, 'birthday-string': birthdayString }) => {
          const birthdayArray = birthday.split('/');
          setVillagerInfo({
            ...villagerInfo,
            species,
            birthdayString,
            zodiac: findZodiac(birthdayArray[0], birthdayArray[1]),
          });
        });
    }
  };

  const villagerText = () => {
    const { name, species, birthdayString, zodiac } = villagerInfo;
    return (
      <div className="text-center text-2xl pt-4">
        <span className="underline">{formatName(name)}</span> the{' '}
        <span className="underline">{species}</span> was born on{' '}
        <span className="underline">{birthdayString}</span> and is a(n){' '}
        <span className="underline exta-bold">{zodiac}</span>
      </div>
    );
  };

  return (
    <main className="w-screen h-screen grid bg-emerald-900">
      <div className="w-[80%] h-auto border border-amber-100 rounded-lg place-self-center p-10">
        <h1 className="font-mono text-5xl text-center">villager zodiac sign</h1>
        <p className="font-sans italic text-center py-5">
          Find the zodiac sign of any of your favorite villagers! Enter the name
          below and press submit
        </p>
        <div className="flex justify-center">
          <input
            className="text-black outline-0 rounded-sm px-5 py-2 font-mono"
            type="text"
            placeholder="villager's name"
            onChange={handleNameChange}
          ></input>
          <button
            className="font-mono mx-2 px-2 bg-amber-100 text-emerald-900 rounded hover:bg-emerald-900 hover:text-amber-100 transition"
            onClick={handleClick}
          >
            submit
          </button>
        </div>
        {villagerInfo?.zodiac ? villagerText() : ''}
      </div>
    </main>
  );
}
