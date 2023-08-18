'use client';
import React from 'react';
import ProModal from 'src/components/pro-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
