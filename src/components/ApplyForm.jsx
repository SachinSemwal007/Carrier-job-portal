"use client"; 
import React, { useState, useEffect } from "react"; 
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"; 
// import Navigation from '../components/Navigation'; 
// import { useApplicantAuth } from '@/context/ApplicantAuthProvider'; // Use the logged-in applicant's details 
import { applyForJob } from "@/api"; // Function to handle job application 
import FormPreview from "./FormPreview"; 
import Navbar from "./Navbar"; 
import { ApplicantAuthProvider, useApplicantAuth } from "@/context/ApplicantAuthProvider"; 
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams 
 
const ApplyForm = ({ params }) => { 
  // console.log(params) 
  const router = useRouter(); 
  const [jobTitle, setJobTitle] = useState(""); 
  const searchParams = useSearchParams(); // Get the query parameters 
  const [titlejob, setTitlejob] = useState(""); 
  useEffect(() => { 
    // Extract the title from the query string 
    const title = searchParams.get("title"); 
    if (title) { 
      setJobTitle(decodeURIComponent(title)); 
      setTitlejob(decodeURIComponent(title)); 
    } 
  }, [searchParams]); 
  const { applicant } = useApplicantAuth(); 
  console.log(applicant); 
  const { id } = params; // Job ID from the URL 
  const [job, setJob] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showPreview, setShowPreview] = useState(false); //state for Preview 
  // console.log(applicant); 
  const [firstName, setFirstName] = useState(""); 
  const [middleName, setMiddleName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [fhName, setFhName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [contact, setContact] = useState(""); 
  const [whatsapp, setWhatsapp] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [sport, setSport] = useState(""); 
  const [dob, setDob] = useState(""); 
  const [age, setAge] = useState(""); 
  const [maritalStatus, setMaritalStatus] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [pincode, setPincode] = useState(""); 
  const [country, setCountry] = useState(""); 
  const [state, setState] = useState(""); 
  const [district, setDistrict] = useState(""); 
  const [isHandicapped, setIsHandicapped] = useState(""); 
  const [isExService, setIsExService] = useState(""); 
  const [community, setCommunity] = useState(""); 
  const [matriculationYear, setMatriculationYear] = useState(""); 
  const [matriculationGrade, setMatriculationGrade] = useState(""); 
  const [matriculationPercentage, setMatriculationPercentage] = useState(""); 
  const [matriculationBoard, setMatriculationBoard] = useState(""); 
  const [interYear, setInterYear] = useState(""); 
  const [interGrade, setInterGrade] = useState(""); 
  const [interPercentage, setInterPercentage] = useState(""); 
  const [interBoard, setInterBoard] = useState(""); 
  const [bachelorYear, setBachelorYear] = useState(""); 
  const [bachelorCourse, setBachelorCourse] = useState(""); 
  const [bachelorSpecialization, setBachelorSpecialization] = useState(""); 
  const [bachelorGrade, setBachelorGrade] = useState(""); 
  const [bachelorPercentage, setBachelorPercentage] = useState(""); 
  const [bachelorUniversity, setBachelorUniversity] = useState(""); 
  const [masterYear, setMasterYear] = useState(""); 
  const [masterCourse, setMasterCourse] = useState(""); 
  const [masterSpecialization, setMasterSpecialization] = useState(""); 
  const [masterGrade, setMasterGrade] = useState(""); 
  const [masterPercentage, setMasterPercentage] = useState(""); 
  const [masterUniversity, setMasterUniversity] = useState("");
  const [courses, setCourses] = useState([ 
    { 
      courseName: "", 
      specialSubject: "", 
      yearOfPassing: "", 
      duration: "", 
      gradeDivision: "", 
      percent: "", 
      instituteName: "", 
    }, 
  ]); 
  const [experiences, setExperiences] = useState([ 
    { 
      orgName: "", 
      post: "", 
      jobType: "", 
      fromDate: "", 
      tillDate: "", 
      scaleOfType: "", 
      natureOfDuties: "", 
    }, 
  ]); 
 
  const [references, setReferences] = useState([ 
    { 
      refName: "", 
      refContact: "", 
      refRelation: "", 
    }, 
  ]); 
 
  const [achievement, setAchievement] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [passportPhoto, setPassportPhoto] = useState(null); 
  const [certification, setCertification] = useState(null); 
  const [signature, setSignature] = useState(null); 
 
  //Age Calculator 
  const ageCalculator = (dob) => { 
    const today = new Date(); 
    const birthDate = new Date(dob); 
 
    // Check if the selected date is in the future 
    if (birthDate > today) { 
      setAge("Invalid Age"); // Clear the age if the date is in the future 
      return; 
    } 
 
    let years = today.getFullYear() - birthDate.getFullYear(); 
    let months = today.getMonth() - birthDate.getMonth(); 
 
    // Adjust the year if the birth date hasn't occurred yet this year 
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) { 
      years--; 
      months += 12; 
    } 
 
    // Adjust the month if birth day has passed this month 
    if (today.getDate() < birthDate.getDate()) { 
      months--; 
    } 
 
    setAge(`${years} years and ${months} months`); 
  }; 
 
  const handleFileChange = async (e, type) => { 
    const file = e.target.files[0]; // Extract the file 
    let isValid = false; 
    let errorMsg = ""; 
 
    switch (type) { 
      case "passport": 
        if (!file) return; 
        if (file.size > 200000) errorMsg = "Passport photo must be less than 200 KB."; 
        else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) errorMsg = "Passport photo must be in PNG or JPG format."; 
        else isValid = true; 
        break; 
      case "certification": 
        if (!file) return; 
        if (file.size > 3000000) errorMsg = "Certification file must be less than 3 MB."; 
        else if (file.type !== "application/pdf") errorMsg = "Certification must be in PDF format."; 
        else isValid = true; 
        break; 
      case "signature": 
        if (!file) return; 
        if (file.size > 100000) errorMsg = "Signature must be less than 100 KB."; 
        else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) errorMsg = "Signature must be in PNG or JPG format."; 
        else isValid = true; 
        break; 
      default: 
        break; 
    } 
 
    if (isValid) { 
      const fileURL = URL.createObjectURL(file); 
      switch (type) { 
        case "passport": 
          setPassportPhoto(fileURL); 
          break; 
        case "certification": 
          setCertification(fileURL); 
          break; 
        case "signature": 
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
    setCourses([ 
      ...courses, 
      { 
        courseName: "", 
        specialSubject: "", 
        yearOfPassing: "", 
        duration: "", 
        gradeDivision: "", 
        percent: "", 
        instituteName: "", 
      }, 
    ]); 
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
    setExperiences([ 
      ...experiences, 
      { 
        orgName: "", 
        post: "", 
        jobType: "", 
        fromDate: "", 
        tillDate: "", 
        scaleOfType: "", 
        natureOfDuties: "", 
        years: 0, 
      }, 
    ]); 
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
    setReferences([ 
      ...references, 
      { 
        refName: "", 
        refContact: "", 
        refRelation: "", 
      }, 
    ]); 
  }; 
 
  const removeReference = (index) => { 
    const newReferences = references.filter((_, i) => i !== index); 
    setReferences(newReferences); 
  }; 
 
  // Fetch job details using jobId 
  useEffect(() => { 
    if (id) { 
      fetch(`http://localhost:5001/api/jobs/${id}`) 
        .then((res) => res.json()) 
        .then((data) => { 
          console.log("Fetched Data:", data); 
          if (data.length > 0) { 
            console.log("Setting Job Data:", data[0]); 
            setJob(data[0]); // Assuming the first job matches the title 
          } else { 
            alert("Job not found"); 
          } 
          setLoading(false); 
        }) 
        .catch((err) => { 
          console.error("Error fetching job:", err); 
          setLoading(false); 
        }); 
    } 
  }, [id]); 
 
  // Age validation based on job id 
  const getAgeLimits = (id) => { 
    if (!id) return { min: 0, max: 100 }; // Default limits if id is not set 
 
    switch (id) { 
      case "66f3bbda358f00b6a0974676": //Head Coach 
        return { min: 40, max: 70 }; 
      case "66fe964734b4ef6bd0623ab5": //Coach 
        return { min: 30, max: 50 }; 
      case "66f3bbe4358f00b6a0974678": //Assistant Coach 
        return { min: 23, max: 40 }; 
      default: 
        return { min: 0, max: 100 }; 
    } 
  }; 
 
  // Function to calculate the age based on DOB 
  const calculateAge = (dob) => { 
    const birthDate = new Date(dob); 
    const today = new Date(); 
 
    // Check if the birth date is in the future 
    if (birthDate > today) { 
      alert("Date of birth cannot be in the future."); 
      return -1; // Indicate invalid age 
    } 
 
    let age = today.getFullYear() - birthDate.getFullYear(); 
    const monthDiff = today.getMonth() - birthDate.getMonth(); 
 
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) { 
      age--; 
    } 
    return age; 
  }; 
 
  // Handle form preview with age validation 
  const handlePreview = () => { 
    const age = calculateAge(dob); 
    if (age < 0) return; // Exit if the DOB is invalid 
 
    const { min, max } = getAgeLimits(id); // Check limits based on job ID 
 
    if (age >= min && age <= max) { 
      setShowPreview(true); 
    } else { 
      alert(`You are not eligible for the job due to age requirements. Minimum age: ${min}, Maximum age: ${max}.`); 
      setShowPreview(false); 
    } 
  }; 
 
  function calculateYearsDifference(fromDate, tillDate) { 
    // Parse the input dates 
    const from = new Date(fromDate); 
    const till = new Date(tillDate); 
 
    // Calculate the difference in years 
    let yearsDifference = till.getFullYear() - from.getFullYear(); 
 
    // Adjust if the 'tillDate' is before the 'fromDate' within the same year 
    const tillMonth = till.getMonth(); 
    const fromMonth = from.getMonth(); 
 
    // If the month or day of 'tillDate' is before 'fromDate', subtract one year 
    if (tillMonth < fromMonth || (tillMonth === fromMonth && till.getDate() < from.getDate())) { 
      yearsDifference--; 
    } 
 
    // Return the floor value of the years difference 
    return Math.floor(yearsDifference); 
  } 
 
  // Handle Submit 
  const handleDraft = async (e) => { 
    e.preventDefault(); 
    const applicantId = applicant.id; 
    const applicationId = jobTitle; 
    const booleanIsHandicapped = isHandicapped === "Yes"; 
    const booleanIsExService = isExService === "Yes";
    // Adjusting fields for courses, experiences, and references 
    const adjustedCourses = courses.map((course) => ({ 
      name: course.courseName, 
      specialSubject: course.specialSubject, 
      yearOfPassing: Number(course.yearOfPassing), // Ensure this is a number 
      duration: Number(course.duration), // Ensure this is a number 
      gradeDivision: course.gradeDivision, 
      percent: Number(course.percent), // Ensure this is a number 
      instituteName: course.instituteName, 
    })); 
 
    const adjustedExperiences = experiences.map((experience) => ({ 
      title: experience.post, 
      company: experience.orgName, 
      years: calculateYearsDifference(experience.fromDate, experience.tillDate), // Ensure this is a number 
      jobType: experience.jobType, 
      fromDate: experience.fromDate, 
      post: experience.post, 
      tillDate: experience.tillDate, 
      natureOfDuties: experience.natureOfDuties, 
    })); 
 
    const adjustedReferences = references.map((reference) => ({ 
      name: reference.refName, 
      relation: reference.refRelation || "", // Ensure relation is provided 
      contact: reference.refContact, 
    })); 
 
    const files = { 
      passportPhoto: document.getElementById("passportPhotoInput").files[0], 
      certification: document.getElementById("certificationInput").files[0], 
      signature: document.getElementById("signatureInput").files[0], 
    }; 
 
    const formData = { 
      applicationId, 
      applicantId, 
      firstName, 
      middleName, 
      lastName, 
      contact, 
      fhName, 
      email, 
      gender, 
      sport, 
      dob, 
      maritalStatus, 
      address, 
      pincode, 
      country, 
      state, 
      district, 
      isHandicapped: booleanIsHandicapped, // Convert to Boolean 
      isExService: booleanIsExService,
      community, 
      matriculationYear: Number(matriculationYear), // Ensure this is a number 
      matriculationGrade, 
      matriculationPercentage: Number(matriculationPercentage), // Ensure this is a number 
      matriculationBoard, 
      interYear: Number(interYear), // Ensure this is a number 
      interGrade, 
      interPercentage: Number(interPercentage), // Ensure this is a number 
      interBoard, 
      bachelorYear: Number(bachelorYear), // Ensure this is a number 
      bachelorCourse, 
      bachelorSpecialization, 
      bachelorGrade, 
      bachelorPercentage: Number(bachelorPercentage), // Ensure this is a number 
      bachelorUniversity, 
      masterYear: Number(masterYear), // Ensure this is a number 
      masterCourse, 
      masterSpecialization, 
      masterGrade, 
      masterPercentage: Number(masterPercentage), // Ensure this is a number 
      masterUniversity,
      courses: adjustedCourses, 
      experiences: adjustedExperiences, 
      references: adjustedReferences, 
      achievement, 
      description, 
      submitted: false, 
      passportPhoto: files.passportPhoto, 
      certification: files.certification, 
      signature: files.signature, 
      jobId: id, 
    }; 
 
    try { 
      // Call applyForJob with job ID, form data, and files 
      const response = await applyForJob(id, formData, files); 
 
      if (response.ok) { 
        alert("Application saved as draft successfully!"); 
        router.push("/jobs"); // Redirect to the admin dashboard or another page 
      } else { 
        const errorData = await response.json(); 
        alert(errorData.message || "Error saving application. Please try again."); 
      } 
    } catch (error) { 
      console.error("Error saving draft:", error); 
      alert("An error occurred. Please try again."); 
    } 
  }; 
  // console.log(sport); 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const applicantId = applicant.id; 
    const applicationId = jobTitle; 
    const booleanIsHandicapped = isHandicapped === "Yes"; 
    const booleanIsExService = isExService === "Yes";
    // Adjusting fields for courses, experiences, and references 
    const adjustedCourses = courses.map((course) => ({ 
      name: course.courseName, 
      specialSubject: course.specialSubject, 
      yearOfPassing: Number(course.yearOfPassing), // Ensure this is a number 
      duration: Number(course.duration), // Ensure this is a number 
      gradeDivision: course.gradeDivision, 
      percent: Number(course.percent), // Ensure this is a number 
      instituteName: course.instituteName, 
    })); 
 
    const adjustedExperiences = experiences.map((experience) => ({ 
      title: experience.post, 
      company: experience.orgName, 
      years: calculateYearsDifference(experience.fromDate, experience.tillDate), // Ensure this is a number 
      jobType: experience.jobType, 
      fromDate: experience.fromDate, 
      post: experience.post, 
      tillDate: experience.tillDate, 
      natureOfDuties: experience.natureOfDuties, 
    })); 
 
    const adjustedReferences = references.map((reference) => ({ 
      name: reference.refName, 
      relation: reference.refRelation || "", // Ensure relation is provided 
      contact: reference.refContact, 
    })); 
 
    const files = { 
      passportPhoto: document.getElementById("passportPhotoInput").files[0], 
      certification: document.getElementById("certificationInput").files[0], 
      signature: document.getElementById("signatureInput").files[0], 
    }; 
 
    const formData = { 
      applicationId, 
      applicantId, 
      firstName, 
      middleName, 
      lastName, 
      contact, 
      fhName, 
      sport, 
      email, 
      gender, 
      dob, 
      maritalStatus, 
      address, 
      pincode, 
      country, 
      state, 
      district, 
      isHandicapped: booleanIsHandicapped, // Convert to Boolean 
      isExService: booleanIsExService, // Convert to Boolean
      community, 
      matriculationYear: Number(matriculationYear), // Ensure this is a number 
      matriculationGrade, 
      matriculationPercentage: Number(matriculationPercentage), // Ensure this is a number 
      matriculationBoard, 
      interYear: Number(interYear), // Ensure this is a number 
      interGrade, 
      interPercentage: Number(interPercentage), // Ensure this is a number 
      interBoard, 
      bachelorYear: Number(bachelorYear), // Ensure this is a number 
      bachelorCourse, 
      bachelorSpecialization, 
      bachelorGrade, 
      bachelorPercentage: Number(bachelorPercentage), // Ensure this is a number 
      bachelorUniversity, 
      masterYear: Number(masterYear), // Ensure this is a number 
      masterCourse, 
      masterSpecialization, 
      masterGrade, 
      masterPercentage: Number(masterPercentage), // Ensure this is a number 
      masterUniversity,
      courses: adjustedCourses, 
      experiences: adjustedExperiences, 
      references: adjustedReferences, 
      achievement, 
      description, 
      submitted: true, 
      passportPhoto: files.passportPhoto, 
      certification: files.certification, 
      signature: files.signature, 
      jobId: id, 
    }; 
 
    try { 
      // Call applyForJob with job ID, form data, and files 
      const response = await applyForJob(id, formData, files); 
 
      if (response.ok) { 
        alert("Application submitted successfully! Download Form from vacancies in the dashboard"); 
        router.push("/applicant-dashboard"); // Redirect to the admin dashboard or another page 
      } else { 
        const errorData = await response.json(); 
        alert(errorData.message || "Error submitting application. Please try again."); 
      } 
    } catch (error) { 
      console.error("Error applying for job:", error); 
      alert("An error occurred. Please try again."); 
    } 
  }; 


  function checktitle(title) { 
    if (title == "CO") return "Coach"; 
    else if (title == "AC") return "Assistant Coach"; 
    else if (title == "HC") return "Head Coach"; 
  } 
  return (
    <div className="bg-teal-50">
      <Navbar />
      <div className="max-w-screen-md mx-auto p-6 bg-white  shadow-md">
        <div bg-teal-100>
          <h2 className="text-2xl font-bold mb-4 p-4">
            Apply for Vacancy:
            <span className="text-teal-900 px-2 rounded-md">
              {" "}
              {checktitle(titlejob)}
            </span>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Personal Details</h3>
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

          {/* Father/Husband Field */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Father/Husband Name:
            </label>
            <input
              type="text"
              placeholder="Father/Husband Name"
              value={fhName}
              onChange={(e) => setFhName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Gender, DOB, Marital Status Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-medium mb-1">Sport:</label>
              {titlejob !== "HC" ? (
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select Sport
                  </option>
                  <option value="boxing">Boxing</option>
                  <option value="athleticsJump">Athletics jump</option>
                  <option value="athleticsTrack">Athletics track</option>
                  <option value="athleticsField">Athletics field</option>
                  <option value="swimming">Swimming</option>
                  <option value="football">Football</option>
                  <option value="archery">Archery</option>
                  <option value="weightlifting">Weightlifting</option>
                  <option value="shooting">Shooting</option>
                  <option value="cycling">Cycling</option>
                  <option value="wrestling">Wrestling</option>
                  <option value="taekwondo">taekwondo</option>
                  <option value="gymnastics">Gymnastics</option>
                  <option value="tableTennis">Table Tennis</option>
                  <option value="lawnTennis">Lawn Tennis</option>
                  <option value="badminton">Badminton</option>
                  <option value="wushu">Wushu</option>
                </select>
              ) : (
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select Sport
                  </option>
                  <option value="boxing">Boxing</option>
                  <option value="athletics">Athletics</option>
                  <option value="swimming">Swimming</option>
                  <option value="football">Football</option>
                  <option value="archery">Archery</option>
                  <option value="weightlifting">Weightlifting</option>
                  <option value="shooting">Shooting</option>
                  <option value="cycling">Cycling</option>
                  <option value="wrestling">Wrestling</option>
                  <option value="taekwondo">Taekwondo</option>
                </select>
              )}
              <span className="text-xs text-red-600">
                <strong>* </strong> Please Select Carefully. You Can&apos;t
                Change after Saving As Draft
              </span>
            </div>
            <div>
              <label className="block font-medium mb-1">Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  ageCalculator(e.target.value);
                }}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {dob && (
                <span className="block mt-2 text-sm font-medium">
                  Age: {age}
                </span>
              )}
            </div>
          </div>

          {/* DOB, Community */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block font-medium mb-1">Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Material Status */}
            <div>
              <label className="block font-medium mb-1">Marital Status:</label>
              <select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            {/* Community Dropdown */}
            <div className="flex flex-col">
              <label className="block font-medium mb-1">Community:</label>
              <select
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select Community
                </option>
                <option value="Gen">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Whatsapp Contact:
              </label>
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
              <label className="block font-medium mb-1">
                Nationality (Country):
              </label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Physical Handicapped and Community Fields */}
            <div className="flex justify-between gap-4">
              {/* Radio Button */}
              <div className="flex flex-col">
                <label className="block font-medium mb-1">
                  Whether Physical Handicapped?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Yes"
                      name="handicapped"
                      checked={isHandicapped === "Yes"}
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
                      checked={isHandicapped === "No"}
                      onChange={(e) => setIsHandicapped(e.target.value)}
                      required
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* Ex-Serviceman and Community Fields */}
            <div className="flex justify-between gap-4">
              {/* Radio Button */}
              <div className="flex flex-col">
                <label className="block font-medium mb-1">
                  Are You Ex-Service Man?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Yes"
                      name="exservice"
                      checked={isExService === "Yes"}
                      onChange={(e) => setIsExService(e.target.value)}
                      required
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="No"
                      name="exservice"
                      checked={isExService === "No"}
                      onChange={(e) => setIsExService(e.target.value)}
                      required
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Matriculation Field */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Educational Details</h3>
          </div>
          <div className="flex flex-col my-4">
            <label className="block font-medium mb-1">Matriculation:</label>
            <div className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4 gap-2">
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Year of Passing
                </label>
                <input
                  type="number"
                  placeholder=" "
                  value={matriculationYear}
                  onChange={(e) => setMatriculationYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Grade/Division
                </label>
                <input
                  type="text"
                  placeholder=" "
                  value={matriculationGrade}
                  onChange={(e) => setMatriculationGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Percentage
                </label>
                <input
                  type="number"
                  placeholder=""
                  step="0.01"
                  value={matriculationPercentage}
                  onChange={(e) => setMatriculationPercentage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Board
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={matriculationBoard}
                  onChange={(e) => setMatriculationBoard(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Intermediate Field */}
          <div className="flex flex-col my-4">
            <label className="block font-medium mb-1">Intermediate / +2:</label>
            <div className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4 gap-2">
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Year of Passing
                </label>
                <input
                  type="number"
                  placeholder=""
                  value={interYear}
                  onChange={(e) => setInterYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Grade/Division
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={interGrade}
                  onChange={(e) => setInterGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Percentage
                </label>
                <input
                  type="number"
                  placeholder=""
                  step="0.01"
                  value={interPercentage}
                  onChange={(e) => setInterPercentage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Board
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={interBoard}
                  onChange={(e) => setInterBoard(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Bachelor Degree/Graduation Field */}
          <div className="flex flex-col my-4">
            <label className="block font-medium mb-1">
              Bachelor Degree/Graduation (10+2+3):
            </label>
            <div className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4">
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Year of Passing
                </label>
                <input
                  type="number"
                  placeholder=""
                  value={bachelorYear}
                  onChange={(e) => setBachelorYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Course
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={bachelorCourse}
                  onChange={(e) => setBachelorCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={bachelorSpecialization}
                  onChange={(e) => setBachelorSpecialization(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Grade/Division
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={bachelorGrade}
                  onChange={(e) => setBachelorGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-2 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Percentage
                </label>
                <input
                  type="number"
                  placeholder=""
                  step="0.01"
                  value={bachelorPercentage}
                  onChange={(e) => setBachelorPercentage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  University
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={bachelorUniversity}
                  onChange={(e) => setBachelorUniversity(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Master Degree/Post Graduation Field */}
          <div className="flex flex-col my-4">
            <label className="block font-medium mb-1">
              Master Degree/Post Graduation (10+2+3+2):
            </label>
            <div className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4">
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Year of Passing
                </label>
                <input
                  type="number"
                  placeholder=""
                  value={masterYear}
                  onChange={(e) => setMasterYear(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Course
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={masterCourse}
                  onChange={(e) => setMasterCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={masterSpecialization}
                  onChange={(e) => setMasterSpecialization(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Grade/Division
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={masterGrade}
                  onChange={(e) => setMasterGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-2 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Percentage
                </label>
                <input
                  type="number"
                  placeholder=""
                  step="0.01"
                  value={masterPercentage}
                  onChange={(e) => setMasterPercentage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  University
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={masterUniversity}
                  onChange={(e) => setMasterUniversity(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Professional Qualifications Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Professional Details</h3>
          </div>
          <div>
            <label className="block font-medium mb-1">
              Professional Qualifications / Diploma / Certification Course
            </label>
          </div>
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4"
            >
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  placeholder=""
                  value={course.courseName}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Special Subject
                </label>
                <input
                  type="text"
                  name="specialSubject"
                  placeholder=""
                  value={course.specialSubject}
                  onChange={(e) => handleCourseChange(index, e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Year of Passing
                </label>
                <input
                  type="number"
                  name="yearOfPassing"
                  placeholder=""
                  value={course.yearOfPassing}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Duration (months)
                </label>
                <input
                  type="number"
                  name="duration"
                  placeholder=""
                  value={course.duration}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Grade/Division
                </label>
                <input
                  type="text"
                  name="gradeDivision"
                  placeholder=""
                  value={course.gradeDivision}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Percentage
                </label>
                <input
                  type="number"
                  name="percent"
                  placeholder=""
                  value={course.percent}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-[2] min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Name of Institute/College
                </label>
                <input
                  type="text"
                  name="instituteName"
                  placeholder=""
                  value={course.instituteName}
                  onChange={(e) => handleCourseChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="bg-red-600 text-white mr-2 mb-3 mt-2 p-2 rounded-md"
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
            <label className="block font-medium mb-1">Experience</label>
          </div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4"
            >
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Office/Instt.Firm/Org{" "}
                </label>
                <input
                  type="text"
                  name="orgName"
                  placeholder=" "
                  value={experience.orgName}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  Post{" "}
                </label>
                <input
                  type="text"
                  name="post"
                  placeholder=" "
                  value={experience.post}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  Job Type{" "}
                </label>
                <input
                  type="text"
                  name="jobType"
                  placeholder=" "
                  value={experience.jobType}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  From Date{" "}
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={experience.fromDate}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  Till Date{" "}
                </label>
                <input
                  type="date"
                  name="tillDate"
                  value={experience.tillDate}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  Scale of Type
                </label>
                <input
                  type="text"
                  name="scaleOfType"
                  placeholder=" "
                  value={experience.scaleOfType}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  {" "}
                  Nature Of Duties
                </label>
                <input
                  type="text"
                  name="natureOfDuties"
                  placeholder=" "
                  value={experience.natureOfDuties}
                  onChange={(e) => handleExperiencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="bg-red-600 text-white mr-2 mb-3 mt-2 p-2 rounded-md"
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
            <label className="block font-medium mb-1">Achievement:</label>
            <textarea
              placeholder="Achievements"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              rows={3}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block font-medium mb-1">Describe Yourself:</label>
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
            <label className="block font-medium mb-1">References</label>
          </div>
          {references.map((reference, index) => (
            <div
              key={index}
              className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4"
            >
              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Referral Name
                </label>
                <input
                  type="text"
                  name="refName"
                  placeholder=""
                  value={reference.refName}
                  onChange={(e) => handleReferencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Referral Contact Number
                </label>
                <input
                  type="text"
                  name="refContact"
                  placeholder=""
                  value={reference.refContact}
                  onChange={(e) => handleReferencesChange(index, e)}
                  maxLength={10}
                  pattern="\d{10}"
                  title="Please enter a valid contact number"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="relative flex-1 min-w-[150px] mr-2 mb-2 mt-2">
                <label className="absolute -top-3 left-2 bg-gray-100 px-1 text-gray-600 text-sm">
                  Relation
                </label>
                <input
                  type="text"
                  name="refRelation"
                  placeholder=""
                  value={reference.refRelation}
                  onChange={(e) => handleReferencesChange(index, e)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className="bg-red-600 text-white mr-2 mb-3 mt-2 p-2 rounded-md"
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
            <h3 className="text-lg font-semibold mb-2">
              Upload Required Documents
            </h3>
            {/* Passport Photo */}
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Passport Size Photo (max 200 KB, PNG/JPG):
              </label>
              <input
                id="passportPhotoInput" // Add this ID
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleFileChange(e, "passport")}
                required
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
              />
            </div>

            {/* Certification */}
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Certification (max 3 MB, PDF):
              </label>
              <input
                id="certificationInput" // Add this ID
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "certification")}
                required
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
              />
              <span className="text-red-500 text-sm">
                <strong>Note: </strong>If multiple certificates exist, combine
                them into a single PDF.
              </span>
            </div>

            {/* Signature */}
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Signature (max 100 KB, PNG/JPG):
              </label>
              <input
                id="signatureInput" // Add this ID
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleFileChange(e, "signature")}
                required
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
              />
            </div>
          </div>

          {/* Declaration Checkbox Section */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="declaration" required className="mr-2" />
            <label htmlFor="declaration" className="text-sm">
              I hereby declare that the information furnished in this
              Application Form is true to the best of my knowledge and belief.
              If any wrong information is detected in future, my candidature for
              the post may be cancelled at any stage and action can be taken
              accordingly. I also agree with the terms and conditions mentioned
              in the detailed advertisement.
            </label>
          </div>

          {/* Save as Draft, Preview and Submit buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-200"
              onClick={handleDraft}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition duration-200"
              onClick={handlePreview}
            >
              Preview
            </button>

            <FormPreview
              show={showPreview}
              handleClose={() => setShowPreview(false)}
              firstName={firstName}
              titlejob={titlejob}
              middleName={middleName}
              lastName={lastName}
              fhName={fhName}
              email={email}
              gender={gender}
              dob={dob}
              age={age}
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
              masterYear={masterYear}
              masterCourse={masterCourse}
              masterSpecialization={masterSpecialization}
              masterGrade={masterGrade}
              masterPercentage={masterPercentage}
              masterUniversity={masterUniversity}
              courses={courses}
              experiences={experiences}
              references={references}
              achievement={achievement}
              description={description}
              passportPhoto={passportPhoto}
              signature={signature}
              // certification={certification}
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
 
export default function page({ params }) { 
  return ( 
    <ApplicantAuthProvider> 
      <ApplyForm params={params} /> 
    </ApplicantAuthProvider> 
  ); 
} 
