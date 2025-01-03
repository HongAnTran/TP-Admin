import { useState } from "react";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress,
  FormLabel,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import AnimateButton from "@/ui-component/extended/AnimateButton";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

 async function registerWithGoogleFirebase(): Promise<void> {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const FirebaseLogin = ({ ...others }) => {
  const theme: any = useTheme();
  const customization = useSelector((state: any) => state.custom);
  const [showPassword, setShowPassword] = useState(false);

  // const googleHandler = async () => {
  //   await registerWithGoogleFirebase();
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={schema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            let messageError: string = "";
            switch (err.code) {
              case "auth/user-not-found":
                messageError = "Email không tồn tại";
                break;
              case "auth/wrong-password":
                messageError = "Sai mật khẩu vui lòng kiểm tra lại";
                break;
              default:
                messageError = "Có lỗi xảy ra";
            }
            setStatus({ success: false });
            setErrors({ submit: messageError });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
                <FormLabel htmlFor="outlined-adornment-email-login">
                Email Address / Username
              </FormLabel>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
          
              <OutlinedInput
                id="outlined-adornment-email-login email"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                // label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormLabel htmlFor="outlined-adornment-password-login ">
                Password
              </FormLabel>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
             
              <OutlinedInput
                id="outlined-adornment-password-login password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                // label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing={1}
            >
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {isSubmitting ? <CircularProgress size={30} /> : "Sign in"}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

          <Button
            variant="outlined"
            sx={{
              cursor: "unset",
              m: 2,
              py: 0.5,
              px: 7,
              borderColor: `${theme.palette.grey[100]} !important`,
              color: `${theme.palette.grey[900]}!important`,
              fontWeight: 500,
              borderRadius: `${customization.borderRadius}px`,
            }}
            disableRipple
            disabled
          >
            OR
          </Button>

          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      {/* <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            onClick={googleHandler}
            size="large"
            variant="outlined"
            id="btn-login"
            sx={{
              color: "grey.700",
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <img
                src={Google}
                alt="google"
                width={16}
                height={16}
                style={{ marginRight: matchDownSM ? 8 : 16 }}
              />
            </Box>
            Sign in with Google
          </Button>
        </AnimateButton>
      </Grid> */}
    </>
  );
};

export default FirebaseLogin;
