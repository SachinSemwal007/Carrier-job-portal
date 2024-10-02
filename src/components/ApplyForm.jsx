'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use Next.js app router for params
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import Navigation from '../components/Navigation';
// import { useApplicantAuth } from '@/context/ApplicantAuthProvider'; // Use the logged-in applicant's details
import { applyForJob } from '@/api'; // Function to handle job application
import FormPreview from './FormPreview';

const ApplyForm = () => {
  const { id } = useParams(); // Job ID from the URL
  const [showPreview, setShowPreview] = useState(false);//state for Preview
  //const { applicant } = useApplicantAuth(); // Get logged-in applicant's details
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fhName, setFhName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [whatsapp, setWhatsapp] = useState( '');
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

  const [references, setReferences] = useState([{
    refName: '',
    refContact:''
  }])
  
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
      const fileURL = URL.createObjectURL(file);
      switch (type) {
        case 'passport':
          setPassportPhoto(fileURL);
          break;
        case 'certification':
          setCertification(fileURL);
          break;
        case 'signature':
          setSignature(fileURL);
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


  const handleReferencesChange = (index, event) => {
    const { name, value } = event.target;
    const newReferences = [...references];
    newReferences[index][name] = value;
    setReferences(newReferences);
  };

  const addReference = () => {
    setReferences([...references, {
      refName: '',
      refContact: ''
    }]);
  };

  const removeReference = (index) => {
    const newReferences = references.filter((_, i) => i !== index);
    setReferences(newReferences);
  };

  // Handle Preview
  const handlePreview = () => {
      
    setShowPreview(true);
    };
  
  //Save as Draft
  // Function to save form data to local storage
  const saveAsDraft = () => {
    const draftData = {
      firstName,
      middleName,
      lastName,
      fhName,
      email,
      contact,
      whatsapp,
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
      references,
      achievement,
      description,
      passportPhoto,
      certification,
      signature,
    };
    
    localStorage.setItem(`jobApplicationDraft_${id}`, JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  // Function to load form data from local storage
  const loadDraft = () => {
    const draftData = localStorage.getItem(`jobApplicationDraft_${id}`);
    if (draftData) {
      const parsedData = JSON.parse(draftData);
      setFirstName(parsedData.firstName);
      setMiddleName(parsedData.middleName);
      setLastName(parsedData.lastName);
      setFhName(parsedData.fhName);
      setEmail(parsedData.email);
      setContact(parsedData.contact);
      setWhatsapp(parsedData.whatsapp);
      setGender(parsedData.gender);
      setDob(parsedData.dob);
      setMaritalStatus(parsedData.maritalStatus);
      setAddress(parsedData.address);
      setPincode(parsedData.pincode);
      setCountry(parsedData.country);
      setState(parsedData.state);
      setDistrict(parsedData.district);
      setIsHandicapped(parsedData.isHandicapped);
      setCommunity(parsedData.community);
      setMatriculationYear(parsedData.matriculationYear);
      setMatriculationGrade(parsedData.matriculationGrade);
      setMatriculationPercentage(parsedData.matriculationPercentage);
      setMatriculationBoard(parsedData.matriculationBoard);
      setInterYear(parsedData.interYear);
      setInterGrade(parsedData.interGrade);
      setInterPercentage(parsedData.interPercentage);
      setInterBoard(parsedData.interBoard);
      setBachelorYear(parsedData.bachelorYear);
      setBachelorCourse(parsedData.bachelorCourse);
      setBachelorSpecialization(parsedData.bachelorSpecialization);
      setBachelorGrade(parsedData.bachelorGrade);
      setBachelorPercentage(parsedData.bachelorPercentage);
      setBachelorUniversity(parsedData.bachelorUniversity);
      setCourses(parsedData.courses);
      setExperiences(parsedData.experiences);
      setReferences(parsedData.references);
      setAchievement(parsedData.achievement);
      setDescription(parsedData.description);
      setPassportPhoto(parsedData.passportPhoto);
      setCertification(parsedData.certification);
      setSignature(parsedData.signature);
    }
  };

  // Load draft data when component mounts
  useEffect(() => {
    loadDraft();
  }, []);

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
    {/* <Navigation/> */}
    <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
          
      <div>
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
      <div>
        <label className="block font-medium mb-1">Contact:</label>
          <input 
            type="text" 
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={10}
            pattern="\d{10}"
            title="Please enter correct contact"
            required
            className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
          />
      </div>
      <div>
        <label className="block font-medium mb-1">Whatsapp Contact:</label>
        <input
          type="text" 
          placeholder="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          maxLength={10}
          pattern="\d{10}"
          title="Please enter correct whatsapp number"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
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
          {/* Physical Handicapped and Community Fields */}
<div className="flex justify-between gap-4">
  {/* Physical Handicapped Radio Button */}
  <div className="flex flex-col">
    <label className="mb-2">Whether Physical Handicapped?</label>
    <div className="flex space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          value="Yes"
          name="handicapped"
          checked={isHandicapped === 'Yes'}
          onChange={(e) => setIsHandicapped(e.target.value)}
          required
          className="mr-2"
        />
        Yes
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          value="No"
          name="handicapped"
          checked={isHandicapped === 'No'}
          onChange={(e) => setIsHandicapped(e.target.value)}
          required
          className="mr-2"
        />
        No
      </label>
    </div>
  </div>

  {/* Community Dropdown */}
  <div className="flex flex-col">
    <label className="mb-2">Community:</label>
    <select
      value={community}
      onChange={(e) => setCommunity(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2"
    >
      <option value="" disabled>Select Community</option>
      <option value="Gen">General</option>
      <option value="OBC">OBC</option>
      <option value="SC">SC</option>
      <option value="ST">ST</option>
      <option value="EWS">EWS</option>
    </select>
  </div>
</div>

      

            {/* Matriculation Field */}
    <div>
      <h3 className="text-xl font-bold mb-4">Educational Details</h3>
    </div>
    <div className="flex flex-col my-4">
      <label className="mb-2 text-lg">Matriculation:</label>
      <div className="flex justify-between gap-2">
        <input
          type="number"
          placeholder="Year of Passing"
          value={matriculationYear}
          onChange={(e) => setMatriculationYear(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Grade/Division"
          value={matriculationGrade}
          onChange={(e) => setMatriculationGrade(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="number"
          placeholder="Percentage"
          step="0.01"
          value={matriculationPercentage}
          onChange={(e) => setMatriculationPercentage(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Board"
          value={matriculationBoard}
          onChange={(e) => setMatriculationBoard(e.target.value)}
          required
          className="flex-2 min-w-[150px] p-2 border border-gray-300 rounded-md box-border"
        />
      </div>
    </div>

    {/* Intermediate Field */}
    <div className="flex flex-col my-4">
      <label className="mb-2 text-lg">Intermediate / +2:</label>
      <div className="flex justify-between gap-2">
        <input
          type="number"
          placeholder="Year of Passing"
          value={interYear}
          onChange={(e) => setInterYear(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Grade/Division"
          value={interGrade}
          onChange={(e) => setInterGrade(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="number"
          placeholder="Percentage"
          step="0.01"
          value={interPercentage}
          onChange={(e) => setInterPercentage(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Board"
          value={interBoard}
          onChange={(e) => setInterBoard(e.target.value)}
          required
          className="flex-2 min-w-[150px] p-2 border border-gray-300 rounded-md box-border"
        />
      </div>
    </div>

    {/* Bachelor Degree/Graduation Field */}
    <div className="flex flex-col my-4">
      <label className="mb-2 text-lg">Bachelor Degree/Graduation (10+2+3):</label>
      <div className="flex justify-between gap-2">
        <input
          type="number"
          placeholder="Year of Passing"
          value={bachelorYear}
          onChange={(e) => setBachelorYear(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={bachelorCourse}
          onChange={(e) => setBachelorCourse(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Specialization"
          value={bachelorSpecialization}
          onChange={(e) => setBachelorSpecialization(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="text"
          placeholder="Grade/Division"
          value={bachelorGrade}
          onChange={(e) => setBachelorGrade(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
        <input
          type="number"
          placeholder="Percentage"
          step="0.01"
          value={bachelorPercentage}
          onChange={(e) => setBachelorPercentage(e.target.value)}
          className="flex-1 min-w-[100px] p-2 border border-gray-300 rounded-md box-border"
          required
        />
      </div>
      <input
        type="text"
        placeholder="University"
        value={bachelorUniversity}
        onChange={(e) => setBachelorUniversity(e.target.value)}
        required
        className="flex-2 min-w-[150px] p-2 border border-gray-300 rounded-md box-border mt-2"
            />
    </div>
    
          {/* Professional Qualifications Section */}
    <div>
      <h3 className="text-lg font-semibold">Professional Details</h3>
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Professional Qualifications / Diploma / Certification Course</label>
    </div>
    {courses.map((course, index) => (
      <div key={index} className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4">
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={course.courseName}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="specialSubject"
          placeholder="Special Subject"
          value={course.specialSubject}
          onChange={(e) => handleCourseChange(index, e)}
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="number"
          name="yearOfPassing"
          placeholder="Year of Passing"
          value={course.yearOfPassing}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (months)"
          value={course.duration}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="gradeDivision"
          placeholder="Grade/Division"
          value={course.gradeDivision}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="number"
          name="percent"
          placeholder="Percentage"
          value={course.percent}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="instituteName"
          placeholder="Name of Institute/College"
          value={course.instituteName}
          onChange={(e) => handleCourseChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <button
          type="button"
          onClick={() => removeCourse(index)}
          className="bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addCourse}
      className="bg-green-600 text-white py-2 px-4 rounded-md mb-4"
    >
      Add Course
    </button>

    {/* Experiences Section */}
    <div>
      <label className="block text-sm font-medium mb-2">Experience</label>
    </div>
    {experiences.map((experience, index) => (
      <div key={index} className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4">
        <input
          type="text"
          name="orgName"
          placeholder="Office/Instt.Firm/Org"
          value={experience.orgName}
          onChange={(e) => handleExperiencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          value={experience.post}
          onChange={(e) => handleExperiencesChange(index, e)}
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          value={experience.jobType}
          onChange={(e) => handleExperiencesChange(index, e)}
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="date"
          name="fromDate"
          value={experience.fromDate}
          onChange={(e) => handleExperiencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="date"
          name="tillDate"
          value={experience.tillDate}
          onChange={(e) => handleExperiencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="scaleOfType"
          placeholder="Scale of Type"
          value={experience.scaleOfType}
          onChange={(e) => handleExperiencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="natureOfDuties"
          placeholder="Nature OF Duties"
          value={experience.natureOfDuties}
          onChange={(e) => handleExperiencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <button
          type="button"
          onClick={() => removeExperience(index)}
          className="bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addExperience}
      className="bg-green-600 text-white py-2 px-4 rounded-md mb-4"
    >
      Add Experience
    </button>

    {/* Achievement Field */}
    <div>
      <label className="block text-sm font-medium mb-2">Achievement:</label>
      <textarea
        placeholder="Achievements"
        value={achievement}
        onChange={(e) => setAchievement(e.target.value)}
        rows={3}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
              </div>
              
              {/* Achievement Field */}
    <div>
      <label className="block text-sm font-medium mb-2">Describe Yourself:</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={10}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* References Section */}
    <div>
      <label className="block text-sm font-medium mb-2">References</label>
    </div>
    {references.map((reference, index) => (
      <div key={index} className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4">
        <input
          type="text"
          name="refName"
          placeholder="Referral Name"
          value={reference.refName}
          onChange={(e) => handleReferencesChange(index, e)}
          required
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <input
          type="text"
          name="refContact"
          placeholder="Referral Contact Number"
          value={reference.refContact}
          onChange={(e) => handleReferencesChange(index, e)}
          maxLength={10}
          pattern="\d{10}"
          title="Please enter a valid contact number"
          className="mr-2 mb-2 p-2 border border-gray-300 rounded-md flex-1 min-w-[150px]"
        />
        <button
          type="button"
          onClick={() => removeReference(index)}
          className="bg-red-600 text-white py-1 px-3 rounded-md"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addReference}
      className="bg-green-600 text-white py-2 px-4 rounded-md mb-4"
    >
      Add Reference
    </button>
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

    {/* Save as Draft, Preview and Submit buttons */}
    <div className="flex justify-center space-x-4 mt-6">
      <button
        type="button"
        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-200"
        onClick={saveAsDraft}
      >
        Save as Draft
            </button>
            <button type="button"className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition duration-200" onClick={handlePreview}>Preview</button>
        <FormPreview
        show={showPreview}
        handleClose={() => setShowPreview(false)}
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        fhName={fhName}
        email={email}
        gender={gender}
        dob={dob}
        maritalStatus={maritalStatus}
        address={address}
        pincode={pincode}
        country={country}
        state={state}
        district={district}
        isHandicapped={isHandicapped}
        community={community}
        matriculationYear={matriculationYear}
        matriculationGrade={matriculationGrade}
        matriculationPercentage={matriculationPercentage}
        matriculationBoard={matriculationBoard}
        interYear={interYear}
        interGrade={interGrade}
        interPercentage={interPercentage}
        interBoard={interBoard}
        bachelorYear={bachelorYear}
        bachelorCourse={bachelorCourse}
        bachelorSpecialization={bachelorSpecialization}
        bachelorGrade={bachelorGrade}
        bachelorPercentage={bachelorPercentage}
        bachelorUniversity={bachelorUniversity}
        courses={courses}
        experiences={experiences}
        references={references}
        achievement={achievement}      
        description={description} 
        passportPhoto={passportPhoto}  
        signature={signature}      
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
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
