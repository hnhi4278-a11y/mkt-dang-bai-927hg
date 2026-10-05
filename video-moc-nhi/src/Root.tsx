import React from 'react';
import {Composition} from 'remotion';
import './fonts';
import {DuongDenMocNhi, TOTAL} from './Video';

export const FPS = 30;

export const Root: React.FC = () => (
  <Composition
    id="DuongDenMocNhi"
    component={DuongDenMocNhi}
    durationInFrames={TOTAL}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
