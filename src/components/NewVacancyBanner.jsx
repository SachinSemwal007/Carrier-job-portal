import React from 'react';
import Link from 'next/link';

const NewVacancyBanner = () => {
  const vacancies = [
    { title: 'Head Coach', url: '/vacancies/1', deadline: 'Deadline: 2024-10-10' },
    { title: 'Coach', url: '/vacancies/2', deadline: 'Deadline: 2024-10-12' },
    { title: 'Assistant Coach', url: '/vacancies/3', deadline: 'Deadline: 2024-10-15' },
  ];

  return (
    <div className="bg-blue-300 text-gray-800 p-6 rounded-lg shadow-lg mx-auto my-6 max-w-3xl transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-3xl font-bold mb-4">New Vacancies Available!</h2>
      <ul className="list-none p-0 m-0">
        {vacancies.map((vacancy, index) => (
          <li key={index} className="text-lg py-4 border-b border-gray-300 flex items-center justify-between transition-transform duration-300 hover:scale-105">
            <Link href={vacancy.url} passHref>
              <span className="text-blue-600 hover:underline flex-1 font-semibold cursor-pointer">{vacancy.title}</span>
            </Link>
            <span className="ml-3 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full animate-bounce">
              New
            </span>
            <span className="text-sm text-gray-500 ml-3">{vacancy.deadline}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewVacancyBanner;
