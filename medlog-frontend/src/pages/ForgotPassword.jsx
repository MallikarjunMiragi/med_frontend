import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Notification from "../Components/Notification";
import { useEffect } from "react";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
    const emailFromState = location.state?.email || ""; // Get email from location state
    useEffect(() => {
    if (emailFromState) {
        setEmail(emailFromState);
    }
  }, [emailFromState]);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleReset = async () => {
    if (!email) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Please enter your email.",
        type: "error",
      });
      return;
    }

    if (!validateEmail(email)) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      if (data.success) {
        setNotification({
          isOpen: true,
          title: "Success",
          message: "A reset link has been sent to your email.",
          type: "success",
        });
        // setTimeout(() => {
        //   navigate("/verify-otp", { state: { email } });
        // }, 2000);
      } else {
        setNotification({
          isOpen: true,
          title: "Error",
          message: "Email not found in our database.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        title: "Error",
        message: error.response?.data?.message || "Server error. Try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section className="flex justify-center items-center h-full w-full">
       <div className="flex w-[800px] max-w-[90%] bg-white/10 shadow-md rounded-md text-black"
       style={{
    maxWidth: "1350px",
    background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgba(219, 239, 245, 1) 100%)",
    borderRadius: "40px",
    padding: "25px 35px",
    border: "5px solid rgb(255, 255, 255)",
    boxShadow: "rgba(133, 189, 215, 0.88) 0px 30px 30px -20px",
    margin: "20px auto",
    position: "relative"
  }}>
        <div className="flex-1 p-8 flex flex-col justify-center">
         
          <h2 className="text-2xl font-bold text-blue-600 mb-6"
      style={{
    textAlign: "center",
    fontWeight: 900,
    fontSize: "30px",
    color: "rgb(16, 137, 211)"
  }}>Reset Your Password</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="mb-1 block font-bold">Email Address</label>
            <input
              className="w-full p-3 mb-4 rounded-md bg-white/20 text-black"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
    width: "100%",
    background: "white",
    border: "none",
    padding: "15px 20px",
    borderRadius: "20px",
    marginTop: "15px",
    boxShadow: "#cff0ff 0px 10px 10px -5px",
    borderInline: "2px solid transparent",
    color: "#000",
    outline: "none",
    fontSize: "14px"
  }}
  onFocus={(e) =>
    (e.target.style.borderInline = "2px solid #12b1d1")
  }
  onBlur={(e) =>
    (e.target.style.borderInline = "2px solid transparent")
  }
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full px-6 py-3 rounded-[20px] cursor-pointer font-semibold text-white shadow-md transition-transform duration-200"
  style={{
    background: "linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)",
    boxShadow: "rgba(133, 189, 215, 0.88) 0px 10px 15px -10px",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={handleBack}
               className="w-full px-6 py-3 rounded-[16px] cursor-pointer flex justify-center items-center gap-1.5 mt-2 text-white font-semibold transition-transform duration-200 shadow-md"
  style={{
    background: "linear-gradient(45deg, #b3d9ff, #7ab8f5)", // light blue tones
    boxShadow: "0 6px 12px rgba(122, 184, 245, 0.3)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>

      <Notification
        isOpen={notification.isOpen}
        onRequestClose={() => setNotification({ ...notification, isOpen: false })}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </section>
  );
};

export default ForgotPassword;
