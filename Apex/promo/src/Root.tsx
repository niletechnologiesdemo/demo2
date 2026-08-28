import React from 'react';
import { Composition } from 'remotion';
import { ApexPromo } from './ApexPromo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ApexPromo"
    component={ApexPromo}
    durationInFrames={1110}   /* 37s at 30fps */
    fps={30}
    width={1920}
    height={1080}
  />
);
