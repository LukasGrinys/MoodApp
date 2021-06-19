import React from 'react';

const BLUE_LOGO_SRC = 'media/logo_blue.png';
const WHITE_LOGO_SRC = 'media/logo_white.png';

const Logo = ({ showWhite, className }) => (
    <img
        src={showWhite ? WHITE_LOGO_SRC : BLUE_LOGO_SRC}
        alt="MoodApp"
        className={className}
    />
);

export default Logo;