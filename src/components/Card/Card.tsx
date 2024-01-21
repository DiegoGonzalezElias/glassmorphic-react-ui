import React, { CSSProperties, FC, ReactNode, useEffect, useRef } from 'react'
import { VanillaTilt } from './vanillaTilt';
import './Card.css';

interface Props {
  children: ReactNode | ReactNode[]
  isAnimated: boolean,
  sx?: CSSProperties,
  shadow?: 'none' | 'sm' | 'md' | 'lg',
  radius?: 'none' | 'sm' | 'md' | 'lg',
}

const Card: FC<Props> = (props) => {

  const cardRef = useRef(null);

  useEffect(() => {

    if (cardRef.current && props.isAnimated) {
      new VanillaTilt(cardRef.current, {
        max: 25,
        speed: 400
      });
    }
  }, [cardRef.current]);

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
        return { boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)' };
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
        return { borderRadius: '16px' };
    }
  };


  return (
    <div className="glass-container" >
      <div className="glass-card" ref={cardRef} style={{ ...props.sx, ...getShadowStyle(), ...getBorderRadiusStyle() }}>
        <div className="glass-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Card
