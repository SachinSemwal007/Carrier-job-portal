import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import styles from '../styles/FormPreview.module.css';

const FormPreview = ({
  show, // to control modal visibility
  handleClose, // function to close modal
  firstName, middleName, lastName, fhName, email, gender, dob, maritalStatus, address,
  pincode, country, state, district, isHandicapped, community,
  matriculationYear, matriculationGrade, matriculationPercentage, matriculationBoard,
  interYear, interGrade, interPercentage, interBoard,
  bachelorYear, bachelorCourse, bachelorSpecialization, bachelorGrade, bachelorPercentage, bachelorUniversity,
  courses, experiences, references, achievement,description, passportPhoto, signature
}) => {

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Form Preview', 10, 10);
    doc.text(`Name: ${firstName} ${middleName} ${lastName}`, 10, 20);
    doc.text(`Father/Husband Name: ${fhName}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Gender: ${gender}`, 10, 50);
    doc.text(`DOB: ${dob}`, 10, 60);
    doc.text(`Marital Status: ${maritalStatus}`, 10, 70);
    doc.text(`Address: ${address}, ${district}, ${state}, ${country}, ${pincode}`, 10, 80);
    doc.text(`Community: ${community}`, 10, 90);
    doc.text(`Is Handicapped: ${isHandicapped}`, 10, 100);
    
    // Matriculation
    doc.text('Matriculation Details:', 10, 110);
    doc.text(`Year: ${matriculationYear}`, 10, 120);
    doc.text(`Grade: ${matriculationGrade}`, 10, 130);
    doc.text(`Percentage: ${matriculationPercentage}`, 10, 140);
    doc.text(`Board: ${matriculationBoard}`, 10, 150);
    
    // Intermediate
    doc.text('Intermediate Details:', 10, 160);
    doc.text(`Year: ${interYear}`, 10, 170);
    doc.text(`Grade: ${interGrade}`, 10, 180);
    doc.text(`Percentage: ${interPercentage}`, 10, 190);
    doc.text(`Board: ${interBoard}`, 10, 200);
    
    // Bachelor
    doc.text('Bachelor Details:', 10, 210);
    doc.text(`Year: ${bachelorYear}`, 10, 220);
    doc.text(`Course: ${bachelorCourse}`, 10, 230);
    doc.text(`Specialization: ${bachelorSpecialization}`, 10, 240);
    doc.text(`Grade: ${bachelorGrade}`, 10, 250);
    doc.text(`Percentage: ${bachelorPercentage}`, 10, 260);
    doc.text(`University: ${bachelorUniversity}`, 10, 270);

    // Courses
    doc.text('Courses:', 10, 280);
    courses.forEach((course, idx) => {
      doc.text(`Course ${idx + 1}: ${course.courseName}, Subject: ${course.specialSubject}, Year of Passing: ${course.yearOfPassing}, Duration: ${course.duration}, Grade/Division: ${course.gradeDivision}, Percent: ${course.percent}, Institute: ${course.instituteName}`, 10, 290 + idx * 10);
    });

    // Experiences
    doc.text('Experiences:', 10, 300);
    experiences.forEach((experience, idx) => {
      doc.text(`Experience ${idx + 1}: ${experience.orgName}, Post: ${experience.post}, Job Type: ${experience.jobType}, From: ${experience.fromDate}, Till: ${experience.tillDate}, Scale of Pay: ${experience.scaleOfType}, Duties: ${experience.natureOfDuties}`, 10, 310 + idx * 10);
    });

    // References
    doc.text('References:', 10, 320);
    references.forEach((ref, idx) => {
      doc.text(`Reference ${idx + 1}: ${ref.refName}, Contact: ${ref.refContact}`, 10, 330 + idx * 10);
    });

    //Achievement
    doc.text(`Achievement: ${achievement}`, 10, 340);
    doc.text(`Description: ${description}`, 10, 350);

    doc.save('form-preview.pdf');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" className={styles['modal-container']} >
      <Modal.Header className={styles['modal-header']} closeButton>
        <Modal.Title>Form Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles['modal-body']}>
        {/* Passport Photo Section */}
        <h4>Personal Details</h4>
      {/* Personal Information */}
      <div className={styles['personal-info']}>
        <p><strong>Name:</strong> {firstName} {middleName} {lastName}</p>
        <p><strong>Father/Husband Name:</strong> {fhName}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Date of Birth:</strong> {dob}</p>
        <p><strong>Marital Status:</strong> {maritalStatus}</p>
        <p><strong>Address:</strong> {address}, {district}, {state}, {country}, {pincode}</p>
        <p><strong>Community:</strong> {community}</p>
        <p><strong>Is Handicapped:</strong> {isHandicapped}</p>
     </div>

        {/* Matriculation Section */}
    <h4>Matriculation</h4>
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Course/Grade</th>
            <th>Percentage</th>
            <th>Board/University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{matriculationYear}</td>
            <td>{matriculationGrade}</td>
            <td>{matriculationPercentage}</td>
            <td>{matriculationBoard}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Intermediate Section */}
    <h4>Intermediate/+2</h4>
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Course/Grade</th>
            <th>Percentage</th>
            <th>Board/University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{interYear}</td>
            <td>{interGrade}</td>
            <td>{interPercentage}</td>
            <td>{interBoard}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Bachelor Section */}
    <h4>Bachelor Degree/Graduation/(10+2+3)</h4>
    <div className={styles['table-container']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Course</th>
            <th>Specialization</th>
            <th>Grade/Division</th>
            <th>Percentage</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{bachelorYear}</td>
            <td>{bachelorCourse}</td>
            <td>{bachelorSpecialization}</td>
            <td>{bachelorGrade}</td>
            <td>{bachelorPercentage}</td>
            <td>{bachelorUniversity}</td>
          </tr>
        </tbody>
      </table>
    </div>

        {/* Professional Course Details */}
        <h4>Professional Qualification/Diploma/Certificate Course</h4>
        {courses && courses.length > 0 ? (
          <div className={styles['table-container']}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Special Subject</th>
                  <th>Year of Passing</th>
                  <th>Duration(months)</th>
                  <th>Grade/Division</th>
                  <th>Percent</th>
                  <th>Name of Institute/College</th>

                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseName}</td>
                    <td>{course.specialSubject}</td>
                    <td>{course.yearOfPassing}</td>
                    <td>{course.duration}</td>
                    <td>{course.gradeDivision}</td>
                    <td>{course.percent}</td>
                    <td>{course.instituteName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No professional courses listed.</p>
        )}

        {/* Experience Section */}
        <h4>Experience</h4>
        {experiences && experiences.length > 0 ? (
          <div className={styles['table-container']}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Office/Instt.Firm/Org</th>
                  <th>Post</th>
                  <th>Job Type</th>
                  <th>From Date</th>
                  <th>Till Date</th>
                  <th>Scale of Type</th>
                  <th>Nature of Duties</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience, index) => (
                  <tr key={index}>
                    <td>{experience.orgName}</td>
                    <td>{experience.post}</td>
                    <td>{experience.jobType}</td>
                    <td>{experience.fromDate}</td>
                    <td>{experience.tillDate}</td>
                    <td>{experience.scaleOfType}</td>
                    <td>{experience.natureOfDuties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No experience listed.</p>
        )}

        {/* References Section */}
        <h4>References</h4>
        {references && references.length > 0 ? (
          <div className={styles['table-container']}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Reference Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => (
                  <tr key={index}>
                    <td>{reference.refName}</td>
                    <td>{reference.refContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No references listed.</p>
        )}

        <h4>Achievements</h4>
        <p><strong>Achievement:</strong> {achievement}</p>

        <h4>Describe Yourself</h4>
        <p><strong>Describe Yourself:</strong> {description}</p>
    <div className={styles['declaration']}>
      <p>
        I hereby declare that the information furnished in this Application Form
        is true to the best of my knowledge and belief. If any wrong information is detected in future,
        my candidature for the post may be cancelled at any stage and action can be taken accordingly.
        I also agree with the terms and conditions mentioned in the detailed advertisement.
      </p>
    </div>

    {/* Signature, Place, and Date Section */}
    <div className={styles['sign-section']}>
      <div className={styles['left-side']}>
        <p><strong>Place:</strong> ___________</p>
        <p><strong>Date:</strong> ___________</p>
      </div>

      <div className={styles['right-side']}>
        {signature && ( <img src={URL.createObjectURL(signature)}  alt="Signature" className={styles['signature-photo']}
          />
        )}
        <p className={styles['signature-text']}>Signature of Candidate</p>
          </div>
          <div className="preview-container">
              {passportPhoto && <img src={passportPhoto} alt="Uploaded Photo" className="preview-image" />}
              {signature && <img src={signature} alt="Uploaded Signature" className="preview-signature" />}
          </div>
    </div>
      </Modal.Body>
      <Modal.Footer className={styles['modal-footer']}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormPreview;
