// app/cases/[caseId]/layout.tsx

import React from 'react';

const CaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <main>{children}</main>
  );
};

export default CaseLayout;