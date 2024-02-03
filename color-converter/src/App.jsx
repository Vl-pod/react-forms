// ColorConverter.jsx
import { useState, useEffect } from 'react';
import styles from './ColorConverter.module.css';

const ColorConverter = () => {
  const [hexColor, setHexColor] = useState('#34495e');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value.toUpperCase();

    if (/^#[0-9A-F]{0,6}$/i.test(input)) {
      setHexColor(input);
      setError(false);
      if (input.length === 7) {
        convertHexToRgb(input);
      }
    } else {
      setHexColor('');
      setRgbColor('');
      setError(true);
    }
  };

  const convertHexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    setRgbColor(`RGB(${r}, ${g}, ${b})`);
  };

  useEffect(() => {
    document.body.style.backgroundColor = error ? 'red' : hexColor;
  }, [hexColor, error]);

  return (
    <div className={styles.container}>
      <label> 
        <input
          className={styles.inputField}
          type="text"
          value={hexColor}
          onChange={handleInputChange}
        />
      {error && <div className={styles.error}>Ошибка</div>}
      <div className={styles.outputField} style={{ backgroundColor: hexColor }}>
        {rgbColor || error ? rgbColor || 'Ошибка' : ''}
      </div>
      </label>
    </div>
  );
};

export default ColorConverter;
