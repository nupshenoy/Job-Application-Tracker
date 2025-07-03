import React from "react";

/**
 * Very simple scoring:
 * 0 = empty, 1 = < 6 chars, 2 = length ≥ 6 + only 1 criterion,
 * 3 = length ≥ 8 + 2 criteria, 4 = length ≥ 10 + 3‑4 criteria
 */
const scorePassword = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 6) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  // length bonus
  if (pwd.length >= 10 && score >= 3) score++;
  return Math.min(score, 4);
};

const colors = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
];

export default function PasswordStrengthBar({ password }) {
  const level = scorePassword(password); // 0‑4

  return (
    <div className="mt-1 flex gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded ${
            i < level ? colors[level - 1] : "bg-gray-200"
          } transition-colors`}
        />
      ))}
    </div>
  );
}
