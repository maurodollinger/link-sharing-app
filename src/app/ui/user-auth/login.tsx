'use client';
import { ErrorMessage, Field, Form, Formik } from "formik"
import { CustomInput } from "../customInput";
import Button from "../customButton";
import { loginValidation } from "../../lib/validations";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useRouter } from "next/navigation";

// implement yup-password
export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    return (
        <div className="form-ui">
            <div className="form-head">
                <h1 className="heading-m">Login</h1>
                <p className="body-m">Add your details below to get back into the app</p>
            </div>

            <Formik
                initialValues={{
                    emailAddress: '',
                    password: ''
                }}
                validationSchema={loginValidation}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ isSubmitting }) => (
                    <>
                        <Form>
                            <div className="input-group">
                                <label className="body-s">Email address</label>
                                <Field name="emailAddress" placeholder="e.g. alex@email.com" component={CustomInput} />
                                <ErrorMessage component="span" name="emailAddress" />
                            </div>

                            <div className="input-group">
                                <label className="body-s">Password</label>
                                <Field name="password" type="password" placeholder="Enter your password" component={CustomInput} />
                                <ErrorMessage component="span" name="password" />
                            </div>

                            <Button buttonType="primary" disabled={isSubmitting}>Login</Button>
                        </Form>
                        <p style={{ textAlign: 'center' }}>
                            {`Don't you have and account? `}
                            <span className="span-link" onClick={() => router.push('/register')}>Create account</span>
                        </p>
                    </>
                )}
            </Formik>
        </div>
    )
}