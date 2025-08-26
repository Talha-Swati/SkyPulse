// src/components/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy({ onClose }) {
  const sections = [
    {
      title: "Data Collection",
      content:
        "This app does not collect personal data. Only your location may be used to provide weather information, and it is never stored.",
    },
    {
      title: "Cookies",
      content:
        "We do not use cookies for tracking. Basic preferences (like units of measurement) may be stored locally on your device.",
    },
    {
      title: "Security",
      content:
        "While this app does not process sensitive data, industry-standard practices are followed to ensure safe use.",
    },
    {
      title: "Third Parties",
      content:
        "We may use external weather APIs. Your data is never shared or sold to third parties.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/95 rounded-2xl p-6 sm:p-10 max-w-4xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Back button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Grid Content */}
        <div className="grid sm:grid-cols-2 gap-6 text-gray-300 text-sm sm:text-base leading-relaxed">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-black/40 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <h2 className="text-lg font-semibold text-white mb-2">{sec.title}</h2>
              <p>{sec.content}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
          >
            Back
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition shadow-md"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
