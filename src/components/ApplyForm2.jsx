'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use Next.js app router for params
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Navigation from '../components/Navigation';
import { useApplicantAuth } from '@/context/ApplicantAuthProvider'; // Use the logged-in applicant's details
import { applyForJob } from '@/api'; // Function to handle job application
import styles from '@/app/styles/ApplyForm.module.css';


// Function to convert a file to base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ApplyForm = () => {
  const { id } = useParams(); // Job ID from the URL
  //const { applicant } = useApplicantAuth(); // Get logged-in applicant's details
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fhName, setFhName] = useState('');
  const [email, setEmail] = useState( '');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [isHandicapped, setIsHandicapped] = useState('');
  const [community, setCommunity] = useState('');
  const [matriculationYear, setMatriculationYear] = useState('');
  const [matriculationGrade, setMatriculationGrade] = useState('');
  const [matriculationPercentage, setMatriculationPercentage] = useState('');
  const [matriculationBoard, setMatriculationBoard] = useState('');
  const [interYear, setInterYear] = useState('');
  const [interGrade, setInterGrade] = useState('');
  const [interPercentage, setInterPercentage] = useState('');
  const [interBoard, setInterBoard] = useState('');
  const [bachelorYear, setBachelorYear] = useState('');
  const [bachelorCourse, setBachelorCourse] = useState('');
  const [bachelorSpecialization, setBachelorSpecialization] = useState('');
  const [bachelorGrade, setBachelorGrade] = useState('');
  const [bachelorPercentage, setBachelorPercentage] = useState('');
  const [bachelorUniversity, setBachelorUniversity] = useState('');
  const [courses, setCourses] = useState([{
    courseName: '',
    specialSubject: '',
    yearOfPassing: '',
    duration: '',
    gradeDivision: '',
    percent: '',
    instituteName: ''
  }]);
  const [experiences, setExperiences] = useState([{
    orgName: '',
    post: '',
    jobType: '',
    fromDate: '',
    tillDate: '',
    scaleOfType: '',
    natureOfDuties: ''
  }]);
  const [achievement, setAchievement] = useState('');
  const [description, setDescription] = useState('');
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [certification, setCertification] = useState(null);
  const [signature, setSignature] = useState(null);


  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    let isValid = false;
    let errorMsg = '';

    switch (type) {
      case 'passport':
        if (!file) return;
        if (file.size > 200000) errorMsg = 'Passport photo must be less than 200 KB.';
        else if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) errorMsg = 'Passport photo must be in PNG or JPG format.';
        else isValid = true;
        break;
      case 'certification':
        if (!file) return;
        if (file.size > 3000000) errorMsg = 'Certification file must be less than 3 MB.';
        else if (file.type !== 'application/pdf') errorMsg = 'Certification must be in PDF format.';
        else isValid = true;
        break;
      case 'signature':
        if (!file) return;
        if (file.size > 100000) errorMsg = 'Signature must be less than 100 KB.';
        else if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) errorMsg = 'Signature must be in PNG or JPG format.';
        else isValid = true;
        break;
      default:
        break;
    }

    if (isValid) {
      const base64File = await getBase64(file);
      switch (type) {
        case 'passport':
          setPassportPhoto(base64File);
          break;
        case 'certification':
          setCertification(base64File);
          break;
        case 'signature':
          setSignature(base64File);
          break;
        default:
          break;
      }
    } else {
      alert(errorMsg);
    }
  };

  const handleCourseChange = (index, event) => {
    const { name, value } = event.target;
    const newCourses = [...courses];
    newCourses[index][name] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, {
      courseName: '',
      specialSubject: '',
      yearOfPassing: '',
      duration: '',
      gradeDivision: '',
      percent: '',
      instituteName: ''
    }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const handleExperiencesChange = (index, event) => {
    const { name, value } = event.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      orgName: '',
      post: '',
      jobType: '',
      fromDate: '',
      tillDate: '',
      scaleOfType: '',
      natureOfDuties: ''
    }]);
  };

  const removeExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  // useEffect(() => {
  //   if (authContext && authContext.applicant) {
  //     setFirstName(authContext.applicant.firstName || '');
  //     setEmail(authContext.applicant.email || '');
  //   }
  // }, [applicant]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      middleName,
      lastName,
      fhName,
      email,
      gender,
      dob,
      maritalStatus,
      address,
      pincode,
      country,
      state,
      district,
      isHandicapped,
      community,
      matriculationYear,
      matriculationGrade,
      matriculationPercentage,
      matriculationBoard,
      interYear,
      interGrade,
      interPercentage,
      interBoard,
      bachelorYear,
      bachelorCourse,
      bachelorSpecialization,
      bachelorGrade,
      bachelorPercentage,
      bachelorUniversity,
      courses,
      experiences,
      achievement,
      description,
      passportPhoto,
      certification,
      signature,
      jobId: id,
    };

    try {
      const response = await applyForJob(id, formData); // Send data to backend
      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error submitting application. Please try again.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('An error occurred. Please try again.');
    }
  };


  return (
    <div>
    <Navigation/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Apply for Vacancy ID: {id}</h2>
  <form onSubmit={handleSubmit}>
    {/* Name Fields */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Middle Name:</label>
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    {/* Gender, DOB, Marital Status Fields */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Marital Status:</label>
        <select
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>Select Marital Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
    </div>

    {/* Father/Husband Field */}
    <div className="mb-4">
      <label className="block font-medium mb-1">Father/Husband Name:</label>
      <input
        type="text"
        placeholder="Father/Husband Name"
        value={fhName}
        onChange={(e) => setFhName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* Email Field */}
    <div className="mb-4">
      <label className="block font-medium mb-1">Email:</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* Country, State, District Fields */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">Nationality (Country):</label>
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">State:</label>
        <RegionDropdown
          country={country}
          value={state}
          onChange={(val) => setState(val)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">District:</label>
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    {/* Mailing Address and Pincode Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">Mailing Address:</label>
        <textarea
          placeholder="Mailing Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Pincode:</label>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          maxLength={6}
          pattern="\d{6}"
          title="Please enter exactly 6 digits"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
    {/* Upload Section */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Upload Required Documents</h3>

      {/* Passport Photo */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Passport Size Photo (max 200 KB, PNG/JPG):</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleFileChange(e, 'passport')}
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
        />
      </div>

      {/* Certification */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Certification (max 3 MB, PDF):</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'certification')}
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
        />
      </div>

      {/* Signature */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Signature (max 100 KB, PNG/JPG):</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => handleFileChange(e, 'signature')}
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
        />
      </div>
    </div>

    {/* Declaration Checkbox Section */}
    <div className="flex items-center mb-4">
      <input type="checkbox" id="declaration" required className="mr-2" />
      <label htmlFor="declaration" className="text-sm">
        I hereby declare that the information furnished in this Application Form is true to the best of my knowledge and belief. If any wrong information is detected in future, my candidature for the post may be cancelled at any stage and action can be taken accordingly. I also agree with the terms and conditions mentioned in the detailed advertisement.
      </label>
    </div>

    {/* Save as Draft and Submit buttons */}
    <div className="flex justify-between mt-6">
      {/* <button
        type="button"
        className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
        onClick={saveAsDraft}
      >
        Save as Draft
      </button> */}

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  </div>
  );
};

export default ApplyForm;
