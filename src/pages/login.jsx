import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/password-input";
import useAuth from "../hooks/use-auth";
import { loginValidationSchema } from "../utils/validation-schemas";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        setIsLoading(true);
        await login(email, password);
        navigate("/");
      } catch (error) {
        toast.error("Invalid credentails", { id: "error-toast" });
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: loginValidationSchema,
  });

  return (
    <main className="min-h-screen flex flex-col bg-cover items-center justify-center px-6 py-8 mx-auto">
      <div className="w-full sm:max-w-md p-4 sm:p-8 flex flex-col gap-8">
        <form
          className="flex flex-col gap-4 shadow-2xl p-6 rounded-md light:bg-gray-100"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex items-center justify-center gap-2 tracking-wide font-bold text-2xl">
            <span>Login</span>
          </div>
          {error && (
            <div
              className="bg-red-500 bg-opacity-10 border border-red-400 p-2 rounded-lg relative"
              role="alert"
            >
              <span className="block sm:inline">
                {error ? error : "No response from server"}
              </span>
            </div>
          )}
          <Input
            label="Email"
            color="primary"
            variant="underlined"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            errorMessage={formik.submitCount > 0 && formik.errors.email}
            isInvalid={formik.submitCount > 0 && !!formik.errors.email}
            placeholder="johndoe@gmail.com"
          />
          <PasswordInput
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            isInvalid={formik.submitCount > 0 && !!formik.errors.password}
            errorMessage={formik.submitCount > 0 && formik.errors.password}
          />
          <Button
            variant="solid"
            onClick={formik.handleSubmit}
            onKeyUp={formik.handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
            className="bg-[#fb641b] text-white rounded-sm"
          >
            Login
          </Button>
          <div className="text-sm text-center p-2 rounded-lg">
            New to SmartCart?{" "}
            <Link className="text-blue-700" to="/signup">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
