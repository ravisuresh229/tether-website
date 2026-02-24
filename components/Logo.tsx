"use client";

import Image from "next/image";
import { useState } from "react";

export default function Logo({ className = "" }: { className?: string }) {
  const [logoError, setLogoError] = useState(false);

  if (logoError) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <span className="text-xl font-semibold text-gray-900">Tether</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo-dark.png"
        alt="Tether Logo"
        width={120}
        height={40}
        className="h-8 w-auto"
        priority
        onError={() => setLogoError(true)}
      />
    </div>
  );
}
