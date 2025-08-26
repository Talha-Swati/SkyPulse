// src/components/TermsConditions.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TermsConditions({ onClose }) {
  const sections = [
    {
      title: "Usage Policy",
      content:
        "By using this weather app, you agree that the information is provided for general informational purposes only. Always check official sources for critical updates.",
    },
    {
      title: "Limitations",
      content:
        "We do not guarantee 100% accuracy of forecasts. The app is not liable for decisions made solely based on the provided data.",
    },
    {
      title: "User Responsibility",
      content:
        "You agree to use this app responsibly and not misuse the information or features in a way that disrupts services.",
    },
    {
      title: "Modifications",
      content:
        "We may update these Terms & Conditions anytime. Continued usage after changes indicates your acceptance of the new terms.",
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
          Terms & Conditions
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
              <h2 className="text-lg font-semibold text-white mb-2">
                {sec.title}
              </h2>
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
            Decline
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition shadow-md"
          >
            Accept
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
