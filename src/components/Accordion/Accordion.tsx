import React, { CSSProperties, FC, ReactNode, useState } from 'react';
import './Accordion.css'; // Estilos CSS para el acordeón
import { BorderRadius, FontSize, ShadowSize } from '../common';

interface Props {
    title: string,
    content: string,
    children: ReactNode | ReactNode[];
    sx: CSSProperties,
    shadow?: ShadowSize,
    radius?: BorderRadius,
    size: FontSize,
}

const Accordion: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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

const getInnerBorderRadiusStyle = (): CSSProperties => {
    switch (props.radius) {
        case 'none':
            return { borderRadius: 'none' };
        case 'sm':
            return { borderRadius: '0px 0px 6px 6px' };
        case 'md':
            return { borderRadius: '0px 0px 8px 8px' };
        case 'lg':
            return { borderRadius: '0px 0px 16px 16px' };
        default:
            return { borderRadius: '0px 0px 8px 8px' };
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
    <div
    style={{ ...props.sx, ...getShadowStyle(), ...getBorderRadiusStyle(), ...getFontSize() }}
    className={`panel panel-default ${isOpen ? 'active' : ''}`}>
      <div className="panel-heading" onClick={toggleAccordion}>
        <h4 className="panel-title">
          <a role="button" aria-expanded={isOpen ? 'true' : 'false'}>
            {props.title}
          </a>
        </h4>
        <span className={`icon ${isOpen ? 'open' : ''}`}>+</span>
      </div>
      <div 
      style={{...getInnerBorderRadiusStyle()}}
      className={`panel-collapse ${isOpen ? 'collapse in' : 'collapse'}`}>
        <div className="panel-body">
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
