// src/components/Navigation.jsx
'use client';
import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/jobs">Jobs</Link></li>
        <li><Link href="/applicant-form">Apply</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
