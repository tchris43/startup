import React from 'react';
import { useNavigate } from 'react-router-dom';





export function Preferences({user}) {
    const navigate = useNavigate();

    const [eventTypes, setEventTypes] = React.useState(() => JSON.parse(localStorage.getItem('types') || []));
    const [eventPrice, setEventPrice] = React.useState(() => JSON.parse(localStorage.getItem('price') || null));
    const [eventDays, setEventDays] = React.useState(() => JSON.parse(localStorage.getItem('days') || []));

    React.useEffect(() => {
        localStorage.setItem('types', JSON.stringify(eventTypes));
    }, [eventTypes]);

    React.useEffect(() => {
        localStorage.setItem('days', JSON.stringify(eventDays));
    }, [eventDays]);

    


    function handleTypeChange(e){
        const val = e.target.value;

        if (eventTypes.includes(val)){
            setEventTypes(eventTypes.filter(type => type !== val));
        }
        else {
            setEventTypes([...eventTypes, val]);
        }

        localStorage.setItem('types', JSON.stringify(eventTypes));
    }

    function handleDayChange(e){
        const val = e.target.value;
        
        if (eventDays.includes(val)){
            setEventDays(eventDays.filter(day => day !== val));
        }
        else {
            setEventDays([...eventDays, val])
        }
        localStorage.setItem('days', JSON.stringify(eventDays));
    }

    function handlePriceChange(e){
        setEventPrice(e.target.value);
        localStorage.setItem('price', e.target.value);
    }
    



    

    //TODO: Verify this correctly calls the endpoint
    async function save(){
        const res = fetch('/api/getPref', {
            //TODO: verify it is UPDATE
            method: UPDATE,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({},)
        });
        await res.json();
        //TODO: verify I don't need local storage
        if (!res.ok){
            alert('Save Failed');
        }
        navigate('/discover');
    }

  return (
    <main class="bg-light text-dark">
            <form method = "get">
                <fieldset>
                    <legend>Select your preferences</legend>
                    <div>
                        <input type="checkbox" id = "concerts" name = "interests" value = "concerts" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("concerts")}/>
                        <label for = "concerts">Concerts</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "dances" name = "interests" value = "dances" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("dances")} />
                        <label for = "dances">Dances</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "plays" name = "interests" value = "plays" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("plays")} />
                        <label for = "plays">Plays</label>
                    </div>

                    <div>
                        <label for = "price">Select price range</label>
                        <select id="price" name ="price" onChange={(e) => handlePriceChange(e)}>
                            <option value="15">$0-$15</option>
                            <option value="30">$0-$30</option>
                            <option value="45">$0-$45</option>
                            <option value="60">$0-$60</option>
                            <option value="80">$0-$80</option>
                            <option value="100">$0-$100</option>
                            <option value="200">$0-200</option>
                        </select>
                    </div>

                    <legend>Days of the week</legend>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("m")}/>
                        <label for = "m">Mon</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "t" name = "days" value = "t" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("t")}/>
                        <label for = "m">Tues</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "w" name = "days" value = "w" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("w")}/>
                        <label for = "m">Wed</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "th" name = "days" value = "th" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("th")}/>
                        <label for = "m">Thurs</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "f" name = "days" value = "f" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("f")}/>
                        <label for = "m">Fri</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "s" name = "days" value = "s" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("s")}/>
                        <label for = "m">Sat</label>
                    </div>
                </fieldset>
                <button onClick = {() => save()}>Save</button>

                
            </form>
        </main>
  );
}