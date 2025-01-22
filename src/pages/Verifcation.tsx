import type React from "react";
import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const VerificationPage: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== "") {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const otpString = otp.join("");
            const res = await axiosInstance.post("/")

        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    const isButtonDisabled = otp.some((value) => value === "");

    return (
        <div className="min-h-screen flex items-center justify-center bg-custom-green">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-custom-green mb-6">Verify Your Account</h1>
                <p className="text-gray-600 text-center mb-8">
                    We've sent a 6-digit code to your email. Enter the code below to confirm your email address.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between mb-5">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                ref={(input) => (inputRefs.current[index] = input)}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 border-2 rounded-lg text-center text-xl font-semibold text-custom-green border-gray-300 focus:border-custom-green focus:outline-none focus:ring-1 focus:ring-custom-green"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-custom-green focus:ring-offset-2 transition duration-200 ease-in-out"
                        disabled={isButtonDisabled}
                    >
                        Verify
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Didn't receive the code?
                        <button className="text-custom-green hover:underline ml-1 font-medium focus:outline-none">
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;