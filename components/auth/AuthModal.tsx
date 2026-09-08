"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, openAuthModal, login, signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (authModalTab === "signup") {
      signup(name || "Member", email);
    } else {
      login(email, name);
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    login("kabir@klubwear.com", "Kabir Khan");
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
          }}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 440,
            maxHeight: "92vh",
            overflowY: "auto",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            zIndex: 10,
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--color-background)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="font-display" style={{ fontSize: 24, letterSpacing: "0.15em", color: "var(--color-text)" }}>
                KLUB
              </span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "var(--color-muted)", textTransform: "uppercase", marginLeft: 4 }}>
                Atelier Access
              </span>
            </div>
            <button
              onClick={closeAuthModal}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--color-muted)",
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: "28px 24px" }}>
            {/* Tabs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "var(--color-background)",
                padding: 4,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  openAuthModal("login");
                  setError("");
                }}
                style={{
                  padding: "10px 0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: authModalTab === "login" ? "var(--color-primary)" : "transparent",
                  color: authModalTab === "login" ? "#ffffff" : "var(--color-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  openAuthModal("signup");
                  setError("");
                }}
                style={{
                  padding: "10px 0",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: authModalTab === "signup" ? "var(--color-primary)" : "transparent",
                  color: authModalTab === "signup" ? "#ffffff" : "var(--color-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Create Account
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  background: "rgba(255, 59, 48, 0.1)",
                  border: "1px solid rgba(255, 59, 48, 0.3)",
                  color: "#ff3b30",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 13,
                  marginBottom: 18,
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {authModalTab === "signup" && (
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, color: "var(--color-text)" }}>
                    Full Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: 14, top: 14, color: "var(--color-muted)" }} />
                    <input
                      type="text"
                      placeholder="Kabir Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 42px",
                        background: "var(--color-background)",
                        border: "1.5px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: 14,
                        color: "var(--color-text)",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, color: "var(--color-text)" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: 14, top: 14, color: "var(--color-muted)" }} />
                  <input
                    type="email"
                    required
                    placeholder="kabir@klubwear.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      background: "var(--color-background)",
                      border: "1.5px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 14,
                      color: "var(--color-text)",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text)" }}>
                    Password
                  </label>
                  {authModalTab === "login" && (
                    <span style={{ fontSize: 11, color: "var(--color-muted)", cursor: "pointer" }}>
                      Forgot Password?
                    </span>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: 14, top: 14, color: "var(--color-muted)" }} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      background: "var(--color-background)",
                      border: "1.5px solid var(--color-border)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: 14,
                      color: "var(--color-text)",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{
                  width: "100%",
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {loading ? (
                  "Authenticating..."
                ) : authModalTab === "login" ? (
                  <>
                    Sign In to KLUB <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    Join the Movement <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo 1-Click Login Button */}
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px dashed var(--color-border)" }}>
              <button
                type="button"
                onClick={handleDemoLogin}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(181, 240, 0, 0.1)",
                  border: "1.5px solid var(--color-accent)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s",
                }}
              >
                <Zap size={14} color="#7ab300" />
                ⚡ 1-Click Quick Demo Login (Kabir - VIP Gold)
              </button>
            </div>

            {/* Security perks */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                fontSize: 11,
                color: "var(--color-muted)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ShieldCheck size={14} color="#7ab300" /> 256-bit Encrypted
              </span>
              <span>•</span>
              <span>Priority Drop Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
