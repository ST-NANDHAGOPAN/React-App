import React, { useState, useEffect } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

export default function Forms() {
  const [selectedState, setSelectedState] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityEnabled, setCityEnabled] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  // FORM ONSUBMIT
  const onSubmit = (e) => {
    alert(JSON.stringify(e, 0, 2));
    console.log(e);
  };

  // TO LOAD OPTIONS
  const loadOptions = (inputValue, callback) => {
    console.log("loadOptions called");
    setTimeout(() => {
      // Fetch data from the axios Library
      axios.get(
        "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json"
      )
        .then((response) => response.data)
        .then((data) => {
          // Filter the data based on the inputValue
          const filteredData = data.filter((city) =>
            city.state.toLowerCase().includes(inputValue.toLowerCase())
          );

          // Create a Set to store unique state names
          const uniqueStateNames = new Set();

          // Map the filtered data to the format expected by react-select,
          // filtering out duplicate state names
          const options = filteredData.reduce((acc, city) => {
            if (!uniqueStateNames.has(city.state)) {
              uniqueStateNames.add(city.state);
              acc.push({
                value: city.state,
                label: city.state,
              });
            }
            return acc;
          }, []);

          // Return the options to the callback
          callback(options);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000); // Delay loading by 1000 milliseconds (1 second)
  };

  // TO LOAD CITIES IN DROPDOWN
  useEffect(() => {
    if (selectedState) {
      // Fetch data from the API endpoint
      console.log("fetching cities for", selectedState);
      fetch(
        "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json"
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter the data based on the selected state
          const filteredData = data.filter(
            (city) => city.state.toLowerCase() === selectedState.toLowerCase()
          );

          // Map the filtered data to the format expected by react-select
          const options = filteredData.map((city) => ({
            value: city.name,
            label: city.name,
          }));

          // Update the cityOptions and enable the "Cities" dropdown
          setCityOptions(options);
          setCityEnabled(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedState]);

  // TO SEARCH AND SELECT CITIES
  const loadCities = (inputValue, callback) => {
    if (selectedState) {
      setTimeout(() => {
        // Fetch data from the API endpoint
        fetch(
          "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json"
        )
          .then((response) => response.json())
          .then((data) => {
            // Filter the data based on the selected state and inputValue
            const filteredData = data.filter(
              (city) =>
                city.state.toLowerCase() === selectedState.toLowerCase() &&
                city.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            // Map the filtered data to the format expected by react-select
            const options = filteredData.map((city) => ({
              value: city.name,
              label: city.name,
            }));

            // Return the options to the callback
            callback(options);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, 1000); // Delay loading by 1000 milliseconds (1 second)
    }
  };

  // TO HANDLE STATE ONCHANGE
  const handleStateChange = (selectedOption) => {
    console.log("handleStateChange", selectedOption.value);
    setSelectedState(selectedOption.value);
    setSelectedCity(null);

    setCityOptions([]);
  };

  // OPTIONS
  const Locate = [
    { value: "YES", label: "YES" },
    { value: "No", label: "NO" },
  ];

  // TO Validate type text
  const required = (value) => (value ? undefined : "Required");

  // TO Validate age and min value
  const ValidatingAge =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
  const minValue = (min) => (value) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

  // TO Validate Batch
  const validateBatch = (value) => {
    if (!value) {
      return "Please select a Batch";
    }
    return undefined;
  };

  // TO Validate Confirm Password
  const validateConfirm = (value, allValues) => {
    if (!value) {
      return "Required";
    } else if (value !== allValues.password) {
      return "Must match";
    }
    return undefined;
  };

  return (
      <div className=" body3 p-3">
        <h1 className="text-center fw-bold">REACT - FINAL FORM & SELECT </h1>
        <div className="container  d-flex justify-content-center ">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className=" forms-final">
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label>First Name</label>
                    <Field name="firstname" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            type="text"
                            placeholder="First Name"
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="col-lg-6 ">
                    <label>Lastname</label>
                    <Field name="lastname" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            type="text"
                            placeholder="Lastname"
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label>Email</label>
                    <Field name="email" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input {...input} type="email" placeholder="email" />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <label>Gender</label>
                    <div>
                      <Field name="gender" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <label>
                              &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                              &nbsp;
                              <input
                                {...input}
                                type="radio"
                                value="male"
                                checked={input.value === "male"}
                                onChange={() => input.onChange("male")}
                              />
                              Male
                            </label>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            <label>
                              <input
                                {...input}
                                type="radio"
                                value="female"
                                checked={input.value === "female"}
                                onChange={() => input.onChange("female")}
                              />
                              Female
                            </label>
                            {meta.error && meta.touched && (
                              <p className="error">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label>Age</label>
                    <Field
                      name="age"
                      validate={ValidatingAge(required, minValue(18))}
                    >
                      {({ input, meta }) => (
                        <div>
                          <input {...input} type="number" placeholder="age" />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <label>States</label>
                    <Field name="state" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <AsyncSelect
                            placeholder="Select Your State"
                            cacheOptions
                            defaultOptions
                            loadOptions={loadOptions}
                            onChange={(selectedOption) => {
                              handleStateChange(selectedOption);
                              input.onChange(selectedOption.value);
                            }}
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label>City</label>
                    <Field name="city" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <AsyncSelect
                            placeholder="Select Your City"
                            name="city"
                            cacheOptions
                            defaultOptions={cityOptions}
                            loadOptions={loadCities}
                            isDisabled={!cityEnabled}
                            value={selectedCity}
                            onChange={(selectedOption) => {
                              setSelectedCity(selectedOption);
                              input.onChange(selectedOption.value);
                            }}
                            validate={required}
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="col-lg-6">
                    <label>Are You Willing To Locate</label>
                    <Field name="locate" validate={validateBatch}>
                      {({ input, meta }) => (
                        <div>
                          <CreatableSelect
                            isMulti
                            placeholder="Are You Willing To Locate"
                            options={Locate}
                            value={Locate.find(
                              (Locate) => Locate.value === input.value
                            )}
                            onChange={(selectedOption) => {
                              if (selectedOption) {
                                input.onChange(selectedOption.value);
                              }
                            }}
                          />

                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label>Password</label>
                    <Field name="password" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input
                            {...input}
                            type="text"
                            placeholder="password"
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="col-6">
                    <label>Confirm</label>
                    <Field name="confirm" validate={validateConfirm}>
                      {({ input, meta }) => (
                        <div>
                          <input type="text" {...input} placeholder="Confirm" />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label>Upload Image</label>
                    <Field name="image" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  input.onChange(reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                          <br />
                          {input.value && typeof input.value === "string" && (
                            <img
                              src={input.value}
                              alt="Uploaded"
                              style={{
                                width: "100px",
                                height: "100px",
                                marginTop: "10px",
                              }}
                            />
                          )}
                        </div>
                      )}
                    </Field>
                  </div>

                  <div className="col-lg-6">
                    <label>Date of Birth</label>
                    <Field name="birthdate" validate={required}>
                      {({ input, meta }) => (
                        <div>
                          <input {...input} type="date" />
                          {meta.error && meta.touched && (
                            <p className="error">{meta.error}</p>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary "
                    disabled={submitting}
                    type="submit"
                  >
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                    className="btn btn-danger "
                  >
                    Reset
                  </button>
                </div>
                <br />
                <br />
                <h4>json Data</h4>
                <pre>{JSON.stringify(values, 0, 2)}</pre>

                <h4>Using FormSpy </h4>
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => (
                    <pre>
                      <p>First Name: {values.firstname}</p>
                      <p>Last Name: {values.lastname}</p>
                      <p>email: {values.email}</p>
                      <p>Gender: {values.gender}</p>
                      <p>Age: {values.age}</p>
                      <p>State: {values.state}</p>
                      <p>City: {values.city}</p>
                      <p>Are You Willing to Locate: {values.locate}</p>
                      <p>Password: {values.password}</p>
                      <p>Confirm: {values.confirm}</p>
                      <p>Date: {values.birthdate}</p>
                      <p>image: {values.image}</p>
                    </pre>
                  )}
                </FormSpy>
              </form>
            )}
          />
        </div>
      </div>
  );
}
