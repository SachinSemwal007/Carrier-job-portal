"use client";
import React, { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
// import Navigation from '../components/Navigation';
// import { useApplicantAuth } from '@/context/ApplicantAuthProvider'; // Use the logged-in applicant's details
import { applyForJob } from "@/api"; // Function to handle job application
import FormPreview from "./FormPreview";
import Navbar from "./Navbar";
import {
  ApplicantAuthProvider,
  useApplicantAuth,
} from "@/context/ApplicantAuthProvider";
import { useRouter } from "next/navigation";

const ApplyForm = ({ params }) => {
  // console.log(params)
  const router = useRouter();
  const { id } = params; // Job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false); //state for Preview
  const { applicant } = useApplicantAuth();
  console.log(applicant);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fhName, setFhName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [isHandicapped, setIsHandicapped] = useState("");
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
    },
  ]);

  const [achievement, setAchievement] = useState("");
  const [description, setDescription] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [certification, setCertification] = useState(null);
  const [signature, setSignature] = useState(null);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0]; // Extract the file
    let isValid = false;
    let errorMsg = "";

    switch (type) {
      case "passport":
        if (!file) return;
        if (file.size > 200000)
          errorMsg = "Passport photo must be less than 200 KB.";
        else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
          errorMsg = "Passport photo must be in PNG or JPG format.";
        else isValid = true;
        break;
      case "certification":
        if (!file) return;
        if (file.size > 3000000)
          errorMsg = "Certification file must be less than 3 MB.";
        else if (file.type !== "application/pdf")
          errorMsg = "Certification must be in PDF format.";
        else isValid = true;
        break;
      case "signature":
        if (!file) return;
        if (file.size > 100000)
          errorMsg = "Signature must be less than 100 KB.";
        else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type))
          errorMsg = "Signature must be in PNG or JPG format.";
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
      case "66f3bbd0358f00b6a0974674":
        return { min: 40, max: 70 };
      case "66f3bbda358f00b6a0974676":
        return { min: 30, max: 50 };
      case "66f3bbe4358f00b6a0974678":
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

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
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
      alert(
        `You are not eligible for the job due to age requirements. Minimum age: ${min}, Maximum age: ${max}.`
      );
      setShowPreview(false);
    }
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

  
  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicantId = applicant.id;

    // Convert isHandicapped to Boolean
    const booleanIsHandicapped = isHandicapped === "Yes";

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
      years: Number(experience.scaleOfType), // Ensure this is a number
      jobType: experience.jobType,
      fromDate: experience.fromDate,
      tillDate: experience.tillDate,
      natureOfDuties: experience.natureOfDuties,
    }));

    const adjustedReferences = references.map((reference) => ({
      name: reference.refName,
      relation: reference.relation || "", // Ensure relation is provided
      contact: reference.refContact,
    }));

    const files = {
      passportPhoto: document.getElementById("passportPhotoInput").files[0],
      certification: document.getElementById("certificationInput").files[0],
      signature: document.getElementById("signatureInput").files[0],
    };

    const formData = {
      applicantId,
      firstName,
      middleName,
      lastName,
      contact,
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
      isHandicapped: booleanIsHandicapped, // Convert to Boolean
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
        alert("Application submitted successfully!");
        router.push("/jobs"); // Redirect to the admin dashboard or another page
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Error submitting application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    const applicantId = applicant.id;

    // Convert isHandicapped to Boolean
    const booleanIsHandicapped = isHandicapped === "Yes";

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
      years: Number(experience.scaleOfType), // Ensure this is a number
      jobType: experience.jobType,
      fromDate: experience.fromDate,
      tillDate: experience.tillDate,
      natureOfDuties: experience.natureOfDuties,
    }));

    const adjustedReferences = references.map((reference) => ({
      name: reference.refName,
      relation: reference.relation || "", // Ensure relation is provided
      contact: reference.refContact,
    }));

    const files = {
      passportPhoto: document.getElementById("passportPhotoInput").files[0],
      certification: document.getElementById("certificationInput").files[0],
      signature: document.getElementById("signatureInput").files[0],
    };

    const formData = {
      applicantId,
      firstName,
      middleName,
      lastName,
      contact,
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
      isHandicapped: booleanIsHandicapped, // Convert to Boolean
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
        alert("Application submitted successfully!");
        router.push("/jobs"); // Redirect to the admin dashboard or another page
      } else {
        const errorData = await response.json();
        alert(
          errorData.message || "Error submitting application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="bg-teal-800">
      <Navbar />
      <div className="max-w-screen-md mx-auto p-6 bg-white  shadow-md">
        <h2 className="text-2xl font-bold mb-4 bg-teal-100 p-4 ">
          Apply for Vacancy:
          <span className="text-teal-900 px-2 rounded-md"> {id} </span>
        </h2>
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
                <option value="" disabled>
                  Select Gender
                </option>
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
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
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
          {/* Physical Handicapped and Community Fields */}
          <div className="flex justify-between gap-4">
            {/* Physical Handicapped Radio Button */}
            <div className="flex flex-col">
              <label className="block font-medium mb-1">Whether Physical Handicapped?</label>
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

          {/* Matriculation Field */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Educational Details</h3>
          </div>
          <div className="flex flex-col my-4">
            <label className="block font-medium mb-1">Matriculation:</label>
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
            <label className="block font-medium mb-1">Intermediate / +2:</label>
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
            <label className="block font-medium mb-1">
              Bachelor Degree/Graduation (10+2+3):
            </label>
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
            <label className="block font-medium mb-1">Experience</label>
          </div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="flex flex-wrap p-3 border border-gray-300 rounded-lg bg-gray-100 mb-4"
            >
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
            <label className="block font-medium mb-1">
              Achievement:
            </label>
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
            <label className="block font-medium mb-1">
              Describe Yourself:
            </label>
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
              <input 
                type="text" 
                name="relation" 
                placeholder="Relation" 
                value={reference.relation} 
                onChange={(e) => handleReferencesChange(index, e)} 
                required 
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
            <h3 className="text-lg font-semibold mb-2"> 
              Upload Required Documents 
            </h3> 
            {/* Passport Photo */} 
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
 
export default function page({ params }) { 
  return ( 
    <ApplicantAuthProvider> 
      <ApplyForm params={params} /> 
    </ApplicantAuthProvider> 
  ); 
} 
