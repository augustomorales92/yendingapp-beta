import React from 'react'
import { useState } from 'react'

export default function InterestSelected({initialValue}: {initialValue?: string}) {
  const [selectedInterest, setSelectedInterest] = useState(initialValue)

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInterest(e.target.value)
  }

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
        className={`card ${
          selectedInterest === 'woman' ? 'card-selected' : ''
        }`}
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
        className={`card ${
          selectedInterest === 'everyone' ? 'card-selected' : ''
        }`}
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
{/*       <input type="hidden" name='previas_interest' value={selectedInterest}/>
 */}
    </div>
  )
}
