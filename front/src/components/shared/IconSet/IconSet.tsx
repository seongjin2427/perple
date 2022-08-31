import React, { SVGProps } from 'react';
import * as Icon from 'assets/icon/index';

type IconType = keyof typeof Icon;

interface IconSetProps extends SVGProps<SVGSVGElement> {
  iconType: IconType;
}

const IconSet = ({ iconType, ...svgProps }: IconSetProps) => {
  const IconComponent = Icon[iconType];
  return (
    <div>
      <IconComponent {...svgProps} />
    </div>
  );
};

export default IconSet;
