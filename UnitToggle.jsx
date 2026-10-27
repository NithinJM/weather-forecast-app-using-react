import React from 'react';
function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Temperature unit">
      <button
        type="button"
        className={unit === 'metric' ? 'is-active' : ''}
        onClick={() => onChange('metric')}
        aria-pressed={unit === 'metric'}
      >
        Celsius
      </button>
      <button
        type="button"
        className={unit === 'imperial' ? 'is-active' : ''}
        onClick={() => onChange('imperial')}
        aria-pressed={unit === 'imperial'}
      >
        Fahrenheit
      </button>
    </div>
  );
}

export default UnitToggle;
