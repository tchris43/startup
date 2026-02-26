import React from 'react';
import { useNavigate } from 'react-router-dom';





export function Preferences({user}) {
    const navigate = useNavigate();

    const [eventType, setEventType] = React.useState(null);
    const [eventPrice, setEventPrice] = React.useState(null);
    const [eventDay, setEventDay] = React.useState(null);

    function handleTypeChange(e){
        const val = eventType === e.target.value? null : e.target.value;

        setEventType(val);
        localStorage.setItem('type', e.target.value);
    }

    function handleDayChange(e){
        const val = eventDay === e.target.value? null : e.target.value;
        
        setEventDay(val);
        localStorage.setItem('day', e.target.value);
    }

    function handlePriceChange(e){
        setEventPrice(e.target.value);
        localStorage.setItem('price', e.target.value);
    }

  return (
    <main class="bg-light text-dark">
            <form method = "get">
                <fieldset>
                    <legend>Select your preferences</legend>
                    <div>
                        <input type="checkbox" id = "concerts" name = "interests" value = "concerts" onChange={(e) => handleTypeChange(e)} checked={eventType === "concerts"}/>
                        <label for = "concerts">Concerts</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "dances" name = "interests" value = "dances" onChange={(e) => handleTypeChange(e)} checked={eventType === "dances"} />
                        <label for = "dances">Dances</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "plays" name = "interests" value = "plays" onChange={(e) => handleTypeChange(e)} checked={eventType ==="plays"} />
                        <label for = "plays">Plays</label>
                    </div>

                    <div>
                        <label for = "price">Select price range</label>
                        <select id="price" name ="price" onChange={(e) => handlePriceChange(e)}>
                            <option value="lowest">$0-$15</option>
                            <option value="lower">$0-$30</option>
                            <option value="low">$0-$45</option>
                            <option value="medium">$0-$60</option>
                            <option value="high">$0-$80</option>
                            <option value="higher">$0-$100</option>
                            <option value="highest">Any Price</option>
                        </select>
                    </div>

                    <legend>Days of the week</legend>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" onChange={(e) => handleDayChange(e)} checked={eventDay ==="m"}/>
                        <label for = "m">Mon</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "t" name = "days" value = "t" onChange={(e) => handleDayChange(e)} checked={eventDay ==="t"}/>
                        <label for = "m">Tues</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "w" name = "days" value = "w" onChange={(e) => handleDayChange(e)} checked={eventDay ==="w"}/>
                        <label for = "m">Wed</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "th" name = "days" value = "th" onChange={(e) => handleDayChange(e)} checked={eventDay ==="th"}/>
                        <label for = "m">Thurs</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "f" name = "days" value = "f" onChange={(e) => handleDayChange(e)} checked={eventDay ==="f"}/>
                        <label for = "m">Fri</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "s" name = "days" value = "s" onChange={(e) => handleDayChange(e)} checked={eventDay === "s"}/>
                        <label for = "m">Sat</label>
                    </div>
                </fieldset>
                <button onClick = {() => navigate('/discover')}>Save</button>

                
            </form>
        </main>
  );
}