import React from 'react'

export const City = () => {
  return (
    <div>
        <form action="">
            <label htmlFor="">City</label>
            <input type="text" name="city" />

            <label htmlFor="">Country</label>
            <select name="country" >
                <option value="--">Select Country</option>
            </select>

            <label htmlFor="">Population</label>
            <input type="Number" name="population" />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}
