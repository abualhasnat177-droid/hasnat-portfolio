import { useState } from "react";
import { MdArrowOutward, MdCopyright, MdSend } from "react-icons/md";
import "./styles/Contact.css";
import { FaLinkedinIn } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrorMessage("");
      } else {
        console.error("API Error:", data.error, data.details);
        setErrorMessage(data.details || data.error || "Failed to send message.");
        setStatus("error");
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <textarea
                  required
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`submit-btn ${status}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : (
                  <>
                    Send Message <MdSend />
                  </>
                )}
              </button>
              {status === "success" && <p className="status-msg success">Message sent successfully!</p>}
              {status === "error" && (
                <p className="status-msg error">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-flex">
              <div className="contact-box">
                <h4>Connect</h4>
                <p>
                  <a
                    href="https://www.linkedin.com/in/muhammad-hasnat36/"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                  >
                    <FaLinkedinIn />
                  </a>
                </p>
                <h4>Education</h4>
                <p>Intermediate Chishtian Science College — 2019–2021</p>
              </div>
              <div className="contact-box">
                <h4>Social</h4>
                <a
                  href="https://github.com/abualhasnat177-droid"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  GitHub <MdArrowOutward />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-hasnat36/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  className="contact-social"
                >
                  LinkedIn <MdArrowOutward />
                </a>
              </div>
            </div>

            <div className="contact-footer">
              <div className="contact-box">
                <h2>
                  Designed and Developed <br /> by <span>Muhammad Hasnat</span>
                </h2>
                <h5>
                  <MdCopyright /> 2026
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
