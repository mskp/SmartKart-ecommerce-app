import * as Yup from "yup";

/**
 * Validation schema for user signup form.
 *
 * @type {Yup.ObjectSchema}
 */
export const signupValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter the password"),
});

/**
 * Validation schema for user login form.
 *
 * @type {Yup.ObjectSchema}
 */
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
