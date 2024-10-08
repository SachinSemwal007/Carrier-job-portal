import React from 'react';
import Link from 'next/link';

const Vacancies = () => {

  // Handle Apply button click
  const handleApply = () => {
    router.push(`/applicant-form/${job._id}`);
  };

  // Sample data for vacancies
  const vacancies = [
    {
      id: 1,
      name: 'Software Engineer',
      status: 'Application Pending',
      appliedDate: '2024-09-15',
      isDraft: true, // Indicates if the application is a draft
    },
    {
      id: 2,
      name: 'Data Scientist',
      status: 'Application Submitted',
      appliedDate: '2024-09-10',
      isDraft: false,
    },
    {
      id: 3,
      name: 'Web Developer',
      status: 'Application Submitted',
      appliedDate: '2024-09-12',
      isDraft: false,
    },
    {
      id: 4,
      name: 'UX Designer',
      status: 'Application Pending',
      appliedDate: '2024-09-14',
      isDraft: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-6 text-center">Your Applied Vacancies</h2>
    <div className="space-y-6">
      {vacancies.map((vacancy) => (
        <div
          key={vacancy.id}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">{vacancy.name}</h3>
          <p className="text-gray-700 mb-2">Applied Date: {vacancy.appliedDate}</p>
          <p className={`font-semibold ${vacancy.isDraft ? 'text-yellow-500' : 'text-green-500'} mb-4`}>
            Status: {vacancy.status}
          </p>
          {vacancy.isDraft && (
            <Link
              href={handleApply} // Assuming this route is for applying
              className="inline-block bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Continue Application
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Vacancies;
