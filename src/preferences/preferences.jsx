import React from 'react';
import { useNavigate } from 'react-router-dom';





export function Preferences({user}) {
    const navigate = useNavigate();

    const [eventTypes, setEventTypes] = React.useState(() => JSON.parse(localStorage.getItem('types') || []));
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

    
    //TODO: verify dict created correctly
    const preferences = {
        types: eventTypes,
        days: eventDays
    }

    

    //TODO: Verify this correctly calls the endpoint
    async function save(){
        const res = fetch('/api/getPref', {
            //TODO: verify it is UPDATE
            method: UPDATE,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(preferences)
        });
        await res.json();
        //TODO: verify I don't need local storage
        if (!res.ok){
            alert('Save Failed');
        }
        navigate('/discover');
    }
//TODO: Double check I changed the types in the other places necessary
  return (
    <main class="bg-light text-dark">
            <form method = "get">
                <fieldset>
                    <legend>Select your preferences</legend>
                    <div>
                        <input type="checkbox" id = "Sports" name = "interests" value = "Sports" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Sports")}/>
                        <label for = "Sports">Sports</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Music" name = "interests" value = "Music" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Music")} />
                        <label for = "Music">Music</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Arts" name = "interests" value = "Arts & Theatre" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Arts")} />
                        <label for = "Arts">Arts & Theatre</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Film" name = "interests" value = "Film" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Film")} />
                        <label for = "Film">Film</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Misc" name = "interests" value = "Misc" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Misc")} />
                        <label for = "Misc">Miscellaneous</label>
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