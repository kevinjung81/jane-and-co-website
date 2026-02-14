import React from 'react';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}