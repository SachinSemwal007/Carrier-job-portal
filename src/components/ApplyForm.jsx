'use client';
import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import styles from '../styles/ApplyForm.module.css';
import FormPreview from './FormPreview';

const ApplyForm = ({id}) => { // Job ID from the URL
    const [showPreview, setShowPreview] = useState(false);
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
    
    const handlePreview = () => {
        setShowPreview(true);
        };
// Add this function in your ApplyForm.jsx
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
};

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
    <div className={styles.container}>
      <h2>Apply for Vacancy ID: {id}</h2>
      <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div><h3>Personal Details</h3></div>
          <div className={styles.nameFields}>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              placeholder="First Name"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Middle Name:</label>
            <input 
              type="text" 
              placeholder="Middle Name"
              value={middleName} 
              onChange={(e) => setMiddleName(e.target.value)} 
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              placeholder="Last Name"
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>
        </div>

        {/* Gender, DOB, Marital Status Fields */}
        <div className={styles.additionalFields}>
          <div>
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Date of Birth:</label>
            <input 
              type="date" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Marital Status:</label>
            <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required>
              <option value="" disabled>Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
        </div>

        {/* Father/Husband Field */}
        <div>
            <label >Father/Husband Name:</label>
          <input 
            type="text" 
            placeholder="Father/Husband Name"
            value={fhName} 
            onChange={(e) => setFhName(e.target.value)} 
            required 
          />
                  </div>
                  
          <div className={styles.nameFields}>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
          </div>
          <div>
            <label>Contact</label>
            <input 
              type="text" 
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              maxLength={10}
              pattern="\d{10}"
              title="Please enter correct contact"
              required
            />
          </div>
          <div>
            <label>Whatsapp Cpntact</label>
            <input 
              type="text" 
              placeholder="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              maxLength={10}
              pattern="\d{10}"
              title="Please enter correct whatsapp number"
              required
            />
          </div>
        </div>


        {/* Email Field */}
        

        {/* Country, State, District Fields */}
        <div className={styles.addressCSDFields}>
          <div className={styles.addressField}>
            <label>Nationality (Country):</label>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              required
            />
          </div>

          <div className={styles.stateField}>
            <label>State:</label>
            <RegionDropdown
              country={country}
              value={state}
              onChange={(val) => setState(val)}
              required
            />
          </div>

          <div className={styles.districtField}>
            <label>District:</label>
            <input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Mailing Address and Pincode Fields */}
        <div className={styles.addressFields}>
          <div className={styles.addressField}>
            <label>Mailing Address:</label>
            <textarea 
              placeholder="Mailing Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className={styles.pincodeField}>
            <label>Pincode:</label>
            <input 
              type="text" 
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
              pattern="\d{6}"
              title="Please enter exactly 6 digits"
              required
            />
          </div>
        </div>

        {/* Physical Handicapped and Community Fields */}
        <div className={styles.phcFields}>
          {/* Physical Handicapped Radio Button */}
          <div className={styles.radioContainer}>
            <label>Whether Physical Handicapped?</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="Yes"
                  name="handicapped"
                  checked={isHandicapped === 'Yes'}
                  onChange={(e) => setIsHandicapped(e.target.value)}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  name="handicapped"
                  checked={isHandicapped === 'No'}
                  onChange={(e) => setIsHandicapped(e.target.value)}
                  required
                />
                No
              </label>
            </div>
          </div>

          {/* Community Dropdown */}
          <div className={styles.communityContainer}>
            <label>Community:</label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              required
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
          <div><h3>Educational Details</h3></div>
        <div className={styles.tblContainer}>
        <label className={styles.tblLabel}>Matriculation:</label>
        <div className={styles.rowFields}>
            <input
                type="number"
                placeholder="Year of Passing"
                value={matriculationYear}
                onChange={(e) => setMatriculationYear(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="text"
                placeholder="Grade/Division"
                value={matriculationGrade}
                onChange={(e) => setMatriculationGrade(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="number"
                placeholder="Percentage"
                step="0.01"
                value={matriculationPercentage}
                onChange={(e) => setMatriculationPercentage(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="text"
                placeholder="Board"
                value={matriculationBoard}
                onChange={(e) => setMatriculationBoard(e.target.value)}
                required
                className={styles.tblBoardField}
            />
          </div>
        </div>

        {/* Intermediate Field */}
        <div className={styles.tblContainer}>
        <label className={styles.tblLabel}>Intermediate / +2:</label>
        <div className={styles.rowFields}>
            <input
                type="number"
                placeholder="Year of Passing"
                value={interYear}
                onChange={(e) => setInterYear(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="text"
                placeholder="Grade/Division"
                value={interGrade}
                onChange={(e) => setInterGrade(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="number"
                placeholder="Percentage"
                step="0.01"
                value={interPercentage}
                onChange={(e) => setInterPercentage(e.target.value)}
                className={styles.tblField}
                required
            />
            <input
                type="text"
                placeholder="Board"
                value={interBoard}
                onChange={(e) => setInterBoard(e.target.value)}
                required
                className={styles.tblBoardField}
            />
          </div>
        </div>

        {/* Bachelor Degree/Graduation Field */}
        <div className={styles.tblContainer}>
            <label className={styles.tblLabel}>Bachelor Degree/Graduation (10+2+3):</label>
            <div className={styles.rowFields}>
                <input
                    type="number"
                    placeholder="Year of Passing"
                    value={bachelorYear}
                    onChange={(e) => setBachelorYear(e.target.value)}
                    className={styles.tblField}
                    required
                />
                <input
                    type="text"
                    placeholder="Course"
                    value={bachelorCourse}
                    onChange={(e) => setBachelorCourse(e.target.value)}
                    className={styles.tblField}
                    required
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={bachelorSpecialization}
                    onChange={(e) => setBachelorSpecialization(e.target.value)}
                    className={styles.tblField}
                    required
                />
                <input
                    type="text"
                    placeholder="Grade/Division"
                    value={bachelorGrade}
                    onChange={(e) => setBachelorGrade(e.target.value)}
                    className={styles.tblField}
                    required
                />
                <input
                    type="number"
                    placeholder="Percentage"
                    step="0.01"
                    value={bachelorPercentage}
                    onChange={(e) => setBachelorPercentage(e.target.value)}
                    className={styles.tblField}
                    required
                />
            </div>
            <input
                type="text"
                placeholder="University"
                value={bachelorUniversity}
                onChange={(e) => setBachelorUniversity(e.target.value)}
                required
                className={styles.tblBoardField}
            />
          </div>
          
          <div><h3>Professional Details</h3></div>

        {/* Professional Qualifications Section */}
        <div><label>Professional Qualifications / Diploma / Certification Course</label></div>
        {courses.map((course, index) => (
          <div key={index} className={styles.sectionContainer}>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={course.courseName}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <input
              type="text"
              name="specialSubject"
              placeholder="Special Subject"
              value={course.specialSubject}
              onChange={(e) => handleCourseChange(index, e)}
            />
            <input
              type="number"
              name="yearOfPassing"
              placeholder="Year of Passing"
              value={course.yearOfPassing}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (months)"
              value={course.duration}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <input
              type="text"
              name="gradeDivision"
              placeholder="Grade/Division"
              value={course.gradeDivision}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <input
              type="number"
              name="percent"
              placeholder="Percentage"
              value={course.percent}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <input
              type="text"
              name="instituteName"
              placeholder="Name of Institute/College"
              value={course.instituteName}
              onChange={(e) => handleCourseChange(index, e)}
              required
            />
            <button type="button" className={styles.removeButton} onClick={() => removeCourse(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addCourse}>
          Add Course
        </button>

        {/* Experiences Section */}
        <div><label>Experience</label></div>
        {experiences.map((experience, index) => (
          <div key={index} className={styles.sectionContainer}>
            <input
              type="text"
              name="orgName"
              placeholder="Office/Instt.Firm/Org"
              value={experience.orgName}
              onChange={(e) => handleExperiencesChange(index, e)}
              required
            />
            <input
              type="text"
              name="post"
              placeholder="Post"
              value={experience.post}
              onChange={(e) => handleExperiencesChange(index, e)}
                />
                <input
              type="text"
              name="jobType"
              placeholder="Job Type"
              value={experience.jobType}
              onChange={(e) => handleExperiencesChange(index, e)}
                />
            <input
              type="date"
              name="fromDate"
              placeholder="From Date"
              value={experience.fromDate}
              onChange={(e) => handleExperiencesChange(index, e)}
              required
            />
            <input
              type="date"
              name="tillDate"
              placeholder="Till Date"
              value={experience.tillDate}
              onChange={(e) => handleExperiencesChange(index, e)}
              required
            />
            <input
              type="text"
              name="scaleOfType"
              placeholder="Scale of Type"
              value={experience.scaleOfType}
              onChange={(e) => handleExperiencesChange(index, e)}
              required
            />
            <input
              type="text"
              name="natureOfDuties"
              placeholder="Nature OF Duties"
              value={experience.natureOfDuties}
              onChange={(e) => handleExperiencesChange(index, e)}
              required
            />
            <button type="button" className={styles.removeButton} onClick={() => removeExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addExperience}>
          Add Experience
        </button>

        {/* Achievement Field */}
        <div>
          <label>Achievement:</label>
          <textarea 
              placeholder="Achievements"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              rows={3}
              required
          />
        </div>

        {/* Self Description Field */}
        <div>
          <label>Describe Your Self:</label>
          <textarea 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              required
          />
        </div>

         {/* References Section */}
        <div><label>Reference</label></div>
        {references.map((reference, index) => (
          <div key={index} className={styles.sectionContainer}>
            <input
              type="text"
              name="refName"
              placeholder="Referral Name"
              value={reference.refName}
              onChange={(e) => handleReferencesChange(index, e)}
              required
            />
            <input
              type="text"
              name="refContact"
              placeholder="Referral Contact Number"
              value={reference.refContact}
              onChange={(e) => handleReferencesChange(index, e)}
              maxLength={10}
              pattern="\d{10}"
              title="Please enter correct contact"
                />
            <button type="button" className={styles.removeButton} onClick={() => removeReference(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addReference}>
          Add Reference
        </button>         


          {/* File Upload Section */}
          <div><h3>Upload Required Documents</h3></div>
        <div className={styles.fileUploadSection}>

          {/* Passport Photo */}
          <div className={styles.fileInput}>
            <label>Passport Size Photo (max 200 KB, PNG/JPG): </label>
            <span className={styles.infoIcon} title="Upload a passport size photo in PNG or JPG format, max size 200 KB.">i</span>             
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'passport')} required />
          </div>

          {/* Certification */}
          <div className={styles.fileInput}>
            <label>Certification (max 3 MB, PDF): </label>
            <span className={styles.infoIcon} title="Merge all certificates into one PDF and upload. Max size 3 MB.">i</span>
            <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'certification')} required />
          </div>

          {/* Signature */}
          <div className={styles.fileInput}>
            <label>Signature (max 100 KB, PNG/JPG): </label>
            <span className={styles.infoIcon} title="Upload your signature in PNG or JPG format, max size 100 KB.">i</span>             
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'signature')} required />
          </div>
        </div>
          
        {/* Declaration Checkbox Section */}
        <div className={styles.declarationSection}>
          <input type="checkbox" id="declaration" required />
          <label htmlFor="declaration">
            I hereby declare that the information furnished in this Application Form is true to the best of my knowledge and belief. If any wrong information is detected in future, my candidature for the post may be cancelled at any stage and action can be taken accordingly. I also agree with the terms and conditions mentioned in the detailed advertisement.
          </label>
          </div>
          
        {/* Save as Draft and Submit buttons */}
        <div className={styles.buttonContainer}>
        <button type="button" className={styles.submitButton} onClick={saveAsDraft}>Save as Draft</button>
        <button type="button" className={styles.submitButton} onClick={handlePreview}>Preview</button>
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

        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
      </form>
      </div>
  </div>
  );
};

export default ApplyForm;
