import React, { FC, ReactNode, CSSProperties } from 'react';
import './Button.css';
import { BorderRadius, FontSize, ShadowSize } from '../common';

interface Props {
    children: ReactNode | ReactNode[];
    onClick: () => void;
    disabled?: boolean;
    sx: CSSProperties,
    shadow?: ShadowSize,
    radius?: BorderRadius,
    size: FontSize,
}

const Button: FC<Props> = (props) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Create a ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        // Set the ripple size and position
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        // Append the ripple to the button
        e.currentTarget.appendChild(ripple);

        props.onClick();

        // Remove the ripple element after the animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    const getShadowStyle = (): CSSProperties => {
        switch (props.shadow) {
            case 'none':
                return { boxShadow: 'none' };
            case 'sm':
                return { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' };
            case 'md':
                return { boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)' };
            case 'lg':
                return { boxShadow: '0 16px 24px rgba(0, 0, 0, 0.1)' };
            default:
                return { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' };
        }
    };

    const getBorderRadiusStyle = (): CSSProperties => {
        switch (props.radius) {
            case 'none':
                return { borderRadius: 'none' };
            case 'sm':
                return { borderRadius: '6px' };
            case 'md':
                return { borderRadius: '8px' };
            case 'lg':
                return { borderRadius: '16px' };
            default:
                return { borderRadius: '8px' };
        }
    };

    const getFontSize = (): CSSProperties => {
        switch (props.size) {
            case 'sm':
                return { fontSize: '8px' };
            case 'md':
                return { fontSize: '16px' };
            case 'lg':
                return { fontSize: '32px' };
            default:
                return { fontSize: '16px' };
        }
    };


    return (
        <button
            onClick={handleClick}
            disabled={props.disabled}
            className={'glassmorphic-button'}
            style={{ ...props.sx, ...getShadowStyle(), ...getBorderRadiusStyle(), ...getFontSize() }}
        >
            {props.children}
            <span className='ripple'></span>
        </button>
    );
};

export default Button;
