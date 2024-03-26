'use client';
import { ErrorMessage, Field, Form, Formik } from "formik"
import { CustomInput } from "../customInput";
import Button from "../customButton";
import { useAuth } from "@/app/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function Register() {
    const { register } = useAuth();
    const router = useRouter();

    return (
        <div className="form-ui">
            <div className="form-head">
                <h1 className="heading-m">Create account</h1>
                <p className="body-m">Let’s get you started sharing your links!</p>
            </div>

            <Formik
                initialValues={{
                    emailAddress: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={{}}
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
                                <label className="body-s">Create password</label>
                                <Field name="password" type="password" placeholder="At least 8 characters" component={CustomInput} />
                            </div>

                            <div className="input-group">
                                <label className="body-s">Confirm password</label>
                                <Field name="confirmPassword" type="password" placeholder="At least 8 characters" component={CustomInput} />
                            </div>

                            <Button buttonType="primary" disabled={isSubmitting}>Create new account</Button>


                        </Form>
                        <p style={{ textAlign: 'center' }}>
                            {`Already have and account? `}
                            <span className="span-link" onClick={() => router.push('/login')}>Login</span>
                        </p>
                    </>
                )}
            </Formik>
        </div>
    )
}