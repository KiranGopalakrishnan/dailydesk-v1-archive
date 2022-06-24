import React, { FC } from 'react';

export const RenderConditionally: FC<{ basedOn: boolean }> = ({ basedOn, children }) => (
  <>{basedOn && children}</>
);
