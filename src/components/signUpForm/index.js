import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import styles from "../styles/signUpForm.module.scss";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { object, date, string } from 'yup';
import { useFormik } from 'formik';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [dialogMessage, setDialogMessage] = useState({ type: "", msg: "" });
  const [open, setOpen] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  let now = dayjs();
  const minAgeValidation = now.subtract('18', 'year').format("MM-DD-YYYY");


  const validationSchema = object({
    firstName: string('Enter your first name')
      .required('First name is required'),

    lastName: string('Enter your last name')
      .required('Last name is required'),

    birthdate: date('Enter your birthdate')
      .max(minAgeValidation, "You are under aged. Please tell your guardian to sign-up for you")
      .required("Birthdate is required")
      .typeError('Enter valid date'),

    emailAddress: string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthdate: null,
      emailAddress: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // start the sign up process.
  const handleSubmit = async ({firstName, lastName, emailAddress, birthdate}) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        unsafeMetadata: {
          birthdate
        },
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      setDialogMessage({ type: "error", msg: err.errors[0].longMessage });
      setOpen(true);

    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        setDialogMessage({ type: "success", msg: "Signed-up Successfully" });
        setOpen(true);
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/tutor");
      }
    } catch (err) {
      setDialogMessage({ type: "error", msg: err.errors[0].longMessage });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDialogMessage({ type: "", msg: "" });
  };

  return (
    <>
      <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'top' }} sx={{ marginTop: 5 }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity={dialogMessage.type === "success" ? "success" : "error"} sx={{ width: '100%' }}>
          {dialogMessage.msg}
        </Alert>
      </Snackbar>
      <div>
        {!pendingVerification && (
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.item}>
              <label htmlFor="First Name" className={styles.item_label}>First Name</label>
              <TextField
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                size="small"
                fullWidth={true}
                required
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="Last Name" className={styles.item_label}>Last Name</label>
              <TextField
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                size="small"
                fullWidth={true}
                required
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="birthday" className={styles.item_label}>Birthday</label>
              <DateField
                id="birthdate"
                name="birthdate"
                value={formik.values.birthdate}
                onChange={(value) => {
                  formik.setFieldValue('birthdate', value.format("MM-DD-YYYY"));
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                helperText={formik.touched.birthdate && formik.errors.birthdate}
                size="small"
                fullWidth={true}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="email" className={styles.item_label}>Email</label>
              <TextField
                id="emailAddress"
                type="email"
                name="emailAddress"
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                size="small"
                fullWidth={true}
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth={true}
              sx={{ marginTop: "60px" }}
            >
              Sign up
            </Button>
          </form>
        )}
        {pendingVerification && (
          <div>
            <form>
              <div className={styles.item}>
                <label htmlFor="email code" className={styles.item_label}>Email Verification Code</label>
                <TextField
                  type="number"
                  id="code"
                  onChange={(e) => setCode(e.target.value)}
                  size="small"
                  fullWidth={true}
                />
              </div>
              <Button onClick={onPressVerify} variant="contained" fullWidth={true} sx={{ marginTop: "60px" }}>Verify Email</Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUpForm;