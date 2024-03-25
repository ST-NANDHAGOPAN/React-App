import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography, FormControl, Input, InputAdornment, FormHelperText, CircularProgress } from '@mui/material';
import images from  "../../img/tree.jpg";

const Basic = () => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email').required('Email field is required'),
    mobile_no: Yup.string().required('Mobile No is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      mobile_no: ''
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <Box className="modal-body login-form form-container body2">
      <Typography variant="h1" className='m-5'>Login Form Using formik and Material UI</Typography>
      <form onSubmit={formik.handleSubmit} className=''>
        <FormControl
          sx={{ width: '100%', marginBottom: '20px' }}
          className={formik.touched.email && formik.errors.email ? 'error' : ''}
        >
          <Input
            placeholder="Email"
            className="outline-input"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            startAdornment={
              <InputAdornment position="start">
                <img src={images} alt="Email" style={{ width: '20px', height: '20px' }} />
              </InputAdornment>
            }
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText id="standard-weight-helper-text" className="field-helper-text error">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          sx={{ width: '100%', marginBottom: '20px' }}
          className={formik.touched.mobile_no && formik.errors.mobile_no ? 'error' : ''}
        >
          <Input
            placeholder="Mobile No"
            className="outline-input"
            name="mobile_no"
            value={formik.values.mobile_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <img src={images} alt="Mobile No" style={{ width: '20px', height: '20px' }} />
              </InputAdornment>
            }
          />
          {formik.touched.mobile_no && formik.errors.mobile_no && (
            <FormHelperText id="standard-weight-helper-text" className="field-helper-text error">
              {formik.errors.mobile_no}
            </FormHelperText>
          )}
        </FormControl>

        <Button
          size="small"
          className="header-submit-btn"
          type="submit"
          disabled={formik.isSubmitting}
          style={{ backgroundColor: '#007bff', color: '#fff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          {formik.isSubmitting ? (
            <CircularProgress color="inherit" sx={{ height: '20px !important', width: '20px !important' }} />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Box>
  );
};

export default Basic;
