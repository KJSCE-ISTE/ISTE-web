"use client";
import React, { useState } from "react";
import { Send, Mail, User, Phone, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Your Message has been sent", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl">
          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-100 to-transparent rounded-full -mr-20 -mt-20 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-100 to-transparent rounded-full -ml-16 -mb-16 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="fname" className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="First Name"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black transition-all outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="lname" className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="Last Name"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black transition-all outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email id"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black transition-all outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone no"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black transition-all outline-none bg-gray-50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message here"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-black transition-all outline-none resize-none bg-gray-50 text-gray-900 placeholder:text-gray-400 hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || submitted}
                  className={`w-full py-5 rounded-xl font-semibold text-white text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                    submitted
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-black hover:bg-gray-800 hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <span className="text-2xl">✓</span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}