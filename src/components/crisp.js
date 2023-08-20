'use client';
import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';
const crisp = () => {
  useEffect(() => {
    Crisp.configure("74ece5af-e7bf-433a-b771-694b73cfd294");
  }, []);
  return null;
};

export default crisp;
