"use client";
import React, { useState } from "react";
import styles from "@/app/contact/contact.module.css";

const ContactForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Content_Type: "application/json" },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          message: user.message,
        }),
      });
      // Set the status based on the response from the API route
      if (response.status === 200) {
        setUser({
          username: "",
          email: "",
          mobile: "",
          message: "",
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.contact_form} onSubmit={handleSubmit}>
      <div className={styles.input_field}>
        <label htmlFor="username" className={styles.label}>
          Username:
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={styles.input_field}>
        <label htmlFor="email" className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={styles.input_field}>
        <label htmlFor="mobile" className={styles.label}>
          Mobile:
          <input
            type="number"
            name="mobile"
            id="mobile"
            placeholder="Enter mobile no."
            value={user.mobile}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={styles.input_field}>
        <label htmlFor="message" className={styles.label}>
          Message:
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Enter message"
            value={user.message}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Send Message</button>
      </div>
      <div>
        {status === "success" && (
          <p className={styles.success_msg}>Thank you for your message!</p>
        )}
        {status === "error" && (
          <p className={styles.error_msg}>
            There was an error submitting your message. Please try again.
          </p>
        )}

       
      </div>
    </form>
  );
};

export default ContactForm;
