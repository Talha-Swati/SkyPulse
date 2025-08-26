// src/components/Footer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsConditions from "./TermsConditions";
import logo from "../assets/logo.png"; // Import your logo

export default function Footer() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="relative w-full mt-12 overflow-hidden">
      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-4
                   bg-black border-t border-gray-800
                   px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Logo (left side) */}
        <div className="overflow-hidden ml-70 rounded-lg scale-300">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-20 sm:w-24 h-auto cursor-pointer"
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Links + Separator + Copyright */}
        <div className="flex flex-wrap items-center gap-3 mx-auto text-sm sm:text-base font-medium text-gray-400 text-center">
          <button
            onClick={() => setShowPolicy(true)}
            className="hover:text-cyan-400 cursor-pointer transition-colors relative group"
          >
            Privacy Policy
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
          </button>

          <span className="text-gray-600">|</span>

          <button
            onClick={() => setShowTerms(true)}
            className="hover:text-cyan-400 transition-colors cursor-pointer relative group"
          >
            Terms & Conditions
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
          </button>

          <span className="text-gray-600">|</span>

          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Digital Playground
          </p>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showPolicy && <PrivacyPolicy onClose={() => setShowPolicy(false)} />}
        {showTerms && <TermsConditions onClose={() => setShowTerms(false)} />}
      </AnimatePresence>
    </footer>
  );
}
