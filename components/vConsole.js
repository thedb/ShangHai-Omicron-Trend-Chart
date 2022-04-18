import vconsole from 'vconsole';
import React, { useEffect } from 'react';

const VConsole = () => { 
  useEffect(() => { 
    new vconsole();
  }, []); 
  return <></>;
};

export default VConsole;