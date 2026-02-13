import React from 'react';

export function Preferences() {
  return (
    <main class="bg-light text-dark">
            <form method = "get" action="search.html">
                <fieldset>
                    <legend>Select your preferences</legend>
                    <div>
                        <input type="checkbox" id = "concerts" name = "interests" value = "concerts" />
                        <label for = "concerts">Concerts</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "dances" name = "interests" value = "dances" />
                        <label for = "dances">Dances</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "plays" name = "interests" value = "plays" />
                        <label for = "plays">Plays</label>
                    </div>

                    <div>
                        <label for = "price">Select price range</label>
                        <select id="price" name ="price">
                            <option value="low">$0-$15</option>
                            <option value="low">$0-$30</option>
                            <option value="low">$0-$45</option>
                            <option value="low">$0-$60</option>
                            <option value="low">$0-$80</option>
                            <option value="low">$0-$100</option>
                            <option value="low">Any Price</option>
                        </select>
                    </div>

                    <legend>Days of the week</legend>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Mon</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Tues</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Wed</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Thurs</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Fri</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" />
                        <label for = "m">Sat</label>
                    </div>
                </fieldset>
                <button type="submit">Save</button>

                
            </form>
        </main>
  );
}