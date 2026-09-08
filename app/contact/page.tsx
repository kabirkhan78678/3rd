"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Globe, X as TwitterX, Play, Send, CheckCircle } from "lucide-react";
import { staggerContainer, fadeUp, slideInLeft, slideInRight, VIEWPORT_ONCE } from "@/lib/animations";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: "var(--color-primary)", paddingBlock: "100px 80px", textAlign: "center" }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
              Get in Touch
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "white", lineHeight: 0.9, marginBottom: 20 }}>
              LET'S TALK.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 420, margin: "0 auto" }}>
              Questions, collabs, or just want to say what's up — we're listening.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>

            {/* Info */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Contact Info</h2>
                {[
                  { icon: Mail, label: "Email", value: "hello@klubwear.com", href: "mailto:hello@klubwear.com" },
                  { icon: Phone, label: "Phone", value: "+44 20 1234 5678", href: "tel:+442012345678" },
                  { icon: MapPin, label: "Studio", value: "East London, UK", href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24, textDecoration: "none", color: "inherit" }}>
                    <div style={{ width: 44, height: 44, background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 4 }}>{label}</p>
                      <p style={{ fontWeight: 600, fontSize: 15 }}>{value}</p>
                    </div>
                  </a>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Follow Us</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { icon: Globe, href: "https://instagram.com", label: "Instagram" },
                    { icon: TwitterX, href: "https://twitter.com", label: "Twitter / X" },
                    { icon: Play, href: "https://youtube.com", label: "YouTube" },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.12, background: "var(--color-accent)" }}
                      style={{
                        width: 44,
                        height: 44,
                        border: "1.5px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-text)",
                        transition: "all 0.2s",
                      }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} style={{ marginTop: 48, background: "var(--color-surface)", padding: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Business Hours</p>
                <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.8 }}>
                  Mon – Fri: 9am – 6pm GMT<br />
                  Sat: 10am – 4pm GMT<br />
                  Sun: Closed
                </p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "80px 40px", background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <CheckCircle size={64} style={{ color: "var(--color-success)", margin: "0 auto 24px" }} />
                    </motion.div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn btn-primary"
                      style={{ marginTop: 24 }}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 20 }}
                  >
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Send a Message</h2>

                    {/* Name */}
                    <div className="input-group">
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        placeholder=" "
                        value={form.name}
                        onChange={(e) => { setForm(f => ({ ...f, name: e.target.value })); setErrors(e2 => ({ ...e2, name: "" })); }}
                        style={{ borderColor: errors.name ? "var(--color-sale)" : undefined }}
                      />
                      <label htmlFor="name">Full Name</label>
                      {errors.name && <p style={{ fontSize: 12, color: "var(--color-sale)", marginTop: 4 }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder=" "
                        value={form.email}
                        onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setErrors(e2 => ({ ...e2, email: "" })); }}
                        style={{ borderColor: errors.email ? "var(--color-sale)" : undefined }}
                      />
                      <label htmlFor="email">Email Address</label>
                      {errors.email && <p style={{ fontSize: 12, color: "var(--color-sale)", marginTop: 4 }}>{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div className="input-group">
                      <input
                        type="text"
                        id="subject"
                        className="form-input"
                        placeholder=" "
                        value={form.subject}
                        onChange={(e) => { setForm(f => ({ ...f, subject: e.target.value })); setErrors(e2 => ({ ...e2, subject: "" })); }}
                        style={{ borderColor: errors.subject ? "var(--color-sale)" : undefined }}
                      />
                      <label htmlFor="subject">Subject</label>
                      {errors.subject && <p style={{ fontSize: 12, color: "var(--color-sale)", marginTop: 4 }}>{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div className="input-group">
                      <textarea
                        id="message"
                        className="form-input"
                        placeholder=" "
                        rows={6}
                        value={form.message}
                        onChange={(e) => { setForm(f => ({ ...f, message: e.target.value })); setErrors(e2 => ({ ...e2, message: "" })); }}
                        style={{ resize: "vertical", borderColor: errors.message ? "var(--color-sale)" : undefined }}
                      />
                      <label htmlFor="message" style={{ top: 20 }}>Your Message</label>
                      {errors.message && <p style={{ fontSize: 12, color: "var(--color-sale)", marginTop: 4 }}>{errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="btn btn-primary btn-lg"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
