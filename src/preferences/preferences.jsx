import React from 'react';
import { useNavigate } from 'react-router-dom';





export function Preferences({user}) {
    const navigate = useNavigate();

    const [eventTypes, setEventTypes] = React.useState([]);
    const [eventDays, setEventDays] = React.useState([]);

    React.useEffect(() => {
        localStorage.setItem('types', JSON.stringify(eventTypes));
    }, [eventTypes]);

    React.useEffect(() => {
        localStorage.setItem('days', JSON.stringify(eventDays));
    }, [eventDays]);

    React.useEffect(() => {
        fetch('api/getPref')
        .then(res => res.json())
        .then(preferences => {
            setEventTypes(preferences?.types || []);
            setEventDays(preferences?.days || []);
        })
    }, [])

    


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

    
    

    


    async function save(){
        const preferences = {
            types: eventTypes,
            days: eventDays
        };
        await fetch('/api/savePref', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(preferences)
        });

    }

  return (
    <main className="bg-light text-dark">
            <form method = "get">
                <fieldset>
                    <legend>Select your preferences</legend>
                    <div>
                        <input type="checkbox" id = "Sports" name = "interests" value = "Sports" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Sports")}/>
                        <label htmlFor = "Sports">Sports</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Music" name = "interests" value = "Music" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Music")} />
                        <label htmlFor = "Music">Music</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Arts" name = "interests" value = "Arts" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Arts")} />
                        <label htmlFor = "Arts">Arts & Theatre</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Film" name = "interests" value = "Film" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Film")} />
                        <label htmlFor = "Film">Film</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "Misc" name = "interests" value = "Misc" onChange={(e) => handleTypeChange(e)} checked={eventTypes.includes("Misc")} />
                        <label htmlFor = "Misc">Miscellaneous</label>
                    </div>


                    <legend>Days of the week</legend>
                    <div>
                        <input type="checkbox" id = "m" name = "days" value = "m" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("m")}/>
                        <label htmlFor = "m">Mon</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "t" name = "days" value = "t" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("t")}/>
                        <label htmlFor = "m">Tues</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "w" name = "days" value = "w" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("w")}/>
                        <label htmlFor = "m">Wed</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "th" name = "days" value = "th" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("th")}/>
                        <label htmlFor = "m">Thurs</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "f" name = "days" value = "f" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("f")}/>
                        <label htmlFor = "m">Fri</label>
                    </div>
                    <div>
                        <input type="checkbox" id = "s" name = "days" value = "s" onChange={(e) => handleDayChange(e)} checked={eventDays.includes("s")}/>
                        <label htmlFor = "m">Sat</label>
                    </div>
                </fieldset>
                <button onClick = {() => save()}>Save</button>

                
            </form>
        </main>
  );
}