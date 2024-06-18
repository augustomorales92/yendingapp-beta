import React from 'react';
import { useState } from 'react';

export default function GenderSelect({ formData, handleChange }) {
  const [selectedGender, setSelectedGender] = useState(formData.gender_identity);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    handleChange(event);
  };

  return (
    <div className="flex space-x-4">
      <label
        htmlFor="man-gender-identity"
        className={`card ${selectedGender === 'man' ? 'card-selected' : ''}`}
      >
        Man
        <input
          id="man-gender-identity"
          type="radio"
          name="gender_identity"
          value="man"
          onChange={handleGenderChange}
          checked={selectedGender === 'man'}
        />
      </label>
      <label
        htmlFor="woman-gender-identity"
        className={`card ${selectedGender === 'woman' ? 'card-selected' : ''}`}
      >
        Woman
        <input
          id="woman-gender-identity"
          type="radio"
          name="gender_identity"
          value="woman"
          onChange={handleGenderChange}
          checked={selectedGender === 'woman'}
        />
      </label>
      <label
        htmlFor="more-gender-identity"
        className={`card ${selectedGender === 'more' ? 'card-selected' : ''}`}
      >
        More
        <input
          id="more-gender-identity"
          type="radio"
          name="gender_identity"
          value="more"
          onChange={handleGenderChange}
          checked={selectedGender === 'more'}
        />
      </label>
    </div>
  );
}