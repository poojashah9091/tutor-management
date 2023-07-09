import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import styles from "../styles/signUpForm.module.scss";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [dialogMessage, setDialogMessage] = useState({ type: "", msg: "" });
  const [open, setOpen] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const validationSchema = object({
    emailAddress: string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailAddress: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // start the sign In process.
  const handleSubmit = async ({ emailAddress }) => {
    // e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      // Kick off the sign-in process, passing the user's 
      // authentication identifier. In this case it's their
      // email address.
      const { supportedFirstFactors } = await signIn.create({
        identifier: emailAddress
      });

      // Find the phoneNumberId from all the available first factors for the current sign in
      const firstEmailFactor = supportedFirstFactors.find(factor => {
        return factor.strategy === 'email_code'
      });

      const { emailAddressId } = firstEmailFactor;

      // Prepare first factor verification, specifying 
      // the phone code strategy.
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

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
      // Attempt to verify the user providing the
      // one-time code they received.
      const { createdSessionId, status } = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(result, null, 2));
      }
      if (status === "complete") {
        setDialogMessage({ type: "success", msg: "Logged-in Successfully" });
        setOpen(true);
        await setActive({ session: createdSessionId });
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
            <Button type="submit" variant="contained" fullWidth={true} sx={{ marginTop: "60px" }}>Sign In</Button>
            <div className={styles.item}>
              <label htmlFor="info" className={styles.item_label}>No Account?</label>
              <Button onClick={() => { router.push('/signUp') }} variant="text">Sign Up</Button>
            </div>
          </form>
        )}
        {pendingVerification && (
          <div>
            <form>
              <div className={styles.item}>
                <label htmlFor="email" className={styles.item_label}>Email Verification Code</label>
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

export default SignInForm;