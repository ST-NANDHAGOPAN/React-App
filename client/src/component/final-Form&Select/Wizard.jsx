import React, { useState } from "react";
import Select from "react-select"; // Import react-select

const Wizard = () => {
  //Select Options
  const steps = [
    { label: "Step 1", fields: ["firstname", "lastname", "email"] },
    { label: "Step 2", fields: ["age", "gender", "Upload Image"] },
    { label: "Step 3", fields: ["degree", "department", "date"] },
  ];

  const [step, setStep] = useState(0);
  const totalSteps = steps.length;
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  

  // OPTIONS
  const Degree = [
    { value: "bachelor", label: "bachelor" },
    { value: "master", label: "master" },
    { value: "doctorate", label: "doctorate" },
  ];
  const Department = [
    { value: "bsc-cs", label: "bsc-cs" },
    { value: "msc-cs", label: "msc-cs" },
    { value: "phd-cs", label: "phd-cs" },
  ];
  const Batch = [
    { value: "Morning", label: "Morning" },
    { value: "Evening", label: "Evening" },
  ];
  const Gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  // To ValidaTe Forms
  const validateStep = (values) => {
    const stepErrors = {};

    if (step === 0) {
      if (!values.firstname) {
        stepErrors.firstname = "Required";
      }
      if (!values.lastname) {
        stepErrors.lastname = "Required";
      }
      if (!values.email) {
        stepErrors.email = "Required";
      }
    } else if (step === 1) {
      if (!values.age || isNaN(values.age) || values.age < 18) {
        stepErrors.age = "Age should be at least 18";
      }
      if (!values.gender) {
        stepErrors.gender = "Required";
      }

      if (!values["Upload Image"]) {
        stepErrors["Upload Image"] = "Required";
      }
    } else if (step === 2) {
      if (!values.degree) {
        stepErrors.degree = "Required";
      }
      if (!values.department) {
        stepErrors.department = "Required";
      }
      if (!values.date) {
        stepErrors.date = "Required";
      }
    }

    return stepErrors;
  };

  //   To Handle Next Button
  const handleNext = () => {
    const stepErrors = validateStep(formValues);
    console.log(stepErrors);
    console.log(Object.keys(stepErrors));
    if (Object.keys(stepErrors).length === 0) {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      }
    } else {
      setErrors(stepErrors);
    }
  };

  //   To Handle Prevoius Button
  const handlePrevious = () => {
    setStep(step - 1);
    setErrors("");
  };

  //   To Handle Input Values onChange

  const handleInputChange = (fieldName, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    if (fieldName === "Upload Image") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value.name,
      }));

      // Display the image preview
      if (value) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(value);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [fieldName]: value,
      }));
    }
  };

  // To Handle Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    const stepErrors = validateStep(formValues);

    if (Object.keys(stepErrors).length === 0) {
      // If an image is selected, update the formValues to use the image name
      if (formValues["Upload Image"]) {
        const imageName = formValues["Upload Image"].name;
        const updatedFormValues = {
          ...formValues,
          "Upload Image": imageName,
        };
        setFormValues(updatedFormValues);
      }
      setErrors("");
      // Display the form values, including image name, in the console
      alert(JSON.stringify(formValues, 0, 2));
      console.log("Form Values:", formValues);
    } else {
      setErrors(stepErrors);
    }
  };

  return (
    <div className="body2 pt-3">
      <h1 className="text-center fw-bold">Wizard Form</h1>
      <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="forms-final" >
          {steps[step].fields.map((fieldName) => (
            <div key={fieldName} className="form-group">
              <label>{fieldName}</label>
              {fieldName === "batch" ||
              fieldName === "degree" ||
              fieldName === "gender" ||
              fieldName === "department" ? (
                <Select
                  value={
                    formValues[fieldName]
                      ? {
                          label: formValues[fieldName],
                          value: formValues[fieldName],
                        }
                      : null
                  }
                  options={
                    fieldName === "batch"
                      ? Batch
                      : fieldName === "degree"
                      ? Degree
                      : fieldName === "department"
                      ? Department
                      : Gender
                  }
                  onChange={(selectedOption) =>
                    handleInputChange(fieldName, selectedOption.value)
                  }
                />
              ) : fieldName === "date" ? (
                <input
                  type="date"
                  value={formValues[fieldName] || ""}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  className="form-control"
                />
              ) : fieldName === "Upload Image" ? (
                <div className="">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleInputChange(fieldName, e.target.files[0])
                    }
                    className="form-control-file mx-4 "
                  />
                  {previewImage && (
                    <div className="mx-5 ">
                      <br />
                      <img
                        src={previewImage}
                        alt="Uploaded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          border: "1px solid black",
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={formValues[fieldName] || ""}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  className="form-control"
                />
              )}
              {errors[fieldName] && (
                <p className="error">{errors[fieldName]}</p>
              )}
            </div>
          ))}
          <br />
          <div className="d-flex justify-content-between">
            {step > 0 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {step < totalSteps - 1 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {step === totalSteps - 1 && (
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            )}
          </div><br />
          <h4>json Data</h4>
              <pre>{JSON.stringify(formValues, 0, 2)}</pre>
        </form>
      </div>
    </div>
  );
};

export default Wizard;
