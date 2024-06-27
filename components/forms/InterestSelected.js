import React from 'react';
import { useState } from 'react';

export default function InterestSelected({ formData, handleChange }) {
    const [selectedInterest, setSelectedInterest] = useState(formData.previas_interest);

    const handleInterestChange = (event) => {
        setSelectedInterest(event.target.value);
        handleChange(event);
    };

    return (
        <div className="flex space-x-4">
            <label
                htmlFor="man-gender-interest"
                className={`card ${selectedInterest === 'man' ? 'card-selected' : ''}`}
            >
                Man
                <input
                    id="man-gender-interest"
                    type="radio"
                    name="previas_interest"
                    value="man"
                    onChange={handleInterestChange}
                    checked={selectedInterest === 'man'}
                />
            </label>
            <label
                htmlFor="woman-gender-interest"
                className={`card ${selectedInterest === 'woman' ? 'card-selected' : ''}`}
            >
                Woman
                <input
                    id="woman-gender-interest"
                    type="radio"
                    name="previas_interest"
                    value="woman"
                    onChange={handleInterestChange}
                    checked={selectedInterest === 'woman'}
                />
            </label>
            <label
                htmlFor="everyone-gender-interest"
                className={`card ${selectedInterest === 'everyone' ? 'card-selected' : ''}`}
            >
                Everyone
                <input
                    id="everyone-gender-interest"
                    type="radio"
                    name="previas_interest"
                    value="everyone"
                    onChange={handleInterestChange}
                    checked={selectedInterest === 'everyone'}
                />
            </label>
        </div>
    );
}