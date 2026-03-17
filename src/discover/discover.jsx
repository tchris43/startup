import React from 'react';
import './discover.css';



export function Discover({ user }) {
    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
    const [msg, setMsg] = React.useState('...listening');

    React.useEffect(() => {
        setInterval(() => {
            const names = ['bob', 'fish', 'tim'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCount = Math.floor(Math.random() * 9) + 1;
            const newMsg = `${randomName}: come with me to event ${randomCount}!`;
            setMsg(newMsg);
        }, 5000);
    }, [])




    const [pop, setPop] = React.useState(null);
    const [invite, setInvite] = React.useState(null);

    const [events, setEvents] = React.useState([]);


    const [preferredTypes, setTypes] = React.useState([]);
    const [preferredDays, setDays] = React.useState([]);

    

    //TODO: Actually do something with this
    React.useEffect(() => {
        console.log("Fetching the API");
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=GRGAmTWkOolvR63LJvSsnshUlS48au9A")
        .then((response) => response.json())
        .then((data) => {
            console.log("got the response!");
            console.log(data._embedded.events);
            parseResponse(data);
        })
        .catch((error) => {
            console.log("Error fetching events: ", error);
        });
    }, [])

    //TODO: verify this is implemented correctly
    function toWeekday(dateTime){
        const days = ['m', 't', 'w', 'th', 'f', 's', 's'];
        const date = new Date(dateTime);
        const dayIndex = date.getDay();
        return days[dayIndex];
    }


    function parseResponse(res){
        const eventList = res._embedded.events;
        let parsedEvents = [];
        for (let event of res){
            //TODO: change the types to what actually exists
            let type = event.type;
            let day =  toWeekday(event.dates.start.localDate);
            //TODO: verify I correctly removed price everywhere
            //TODO: verify I have correctly built the event object
            parsedEvents.push({
                type: type,
                day: day
            });
        }
        setEvents(parsedEvents);
       
        
    }


    React.useEffect(() => {
        setEvents([
            { image: "/concert.png", type: "concerts", day: "m"},
            { image: "/dance.png", type: "dances", day: "t"},
            { image: "/play.png", type: "plays", day: "w"},
            { image: "/concert.png", type: "concerts", day: "th"},
            { image: "/dance.png", type: "dances", day: "f"},
            { image: "/play.png", type: "plays", day: "s"},
            { image: "/concert.png", type: "concerts", day: "m"},
            { image: "/dance.png", type: "dances", day: "th"},
            { image: "/play.png", type: "plays", day: "f" }
        ]);
    }, []);



    // const preferredTypes = JSON.parse(localStorage.getItem("types") || "[]");
    // const preferredDays = JSON.parse(localStorage.getItem("days") || "[]");
    // const preferredPrice = parseInt(localStorage.getItem("price"));


    //TODO: Verify it correctly accesses the dict in the backend

    React.useEffect(() => {
        fetch("/api/getPref")
        .then((response) => response.json())
        .then((preferences) => {
            setTypes(preferences.types);
            setDays(preferences.days);
        })
    })

   


    const preferredEvents = events.filter((event) => {
        const typeMatch = preferredTypes.length == 0 || preferredTypes.includes(event.type);
        const dayMatch = preferredDays.length == 0 || preferredDays.includes(event.day);
        
        return typeMatch && dayMatch;
    });

    const [currentIndex, setCurrentIndex] = React.useState(0);

    function getNextEvent(){
        if (currentIndex < preferredEvents.length-1){
            setCurrentIndex(currentIndex+1);
        }
        else {
            setCurrentIndex(0);
        }
    }

    return (
        <main className="bg-light text-dark">
            <h2>
                Browse Events
            </h2>

            {preferredEvents.length === 0 && <div>No events match your preferences.</div>}
            {preferredEvents.length > 0 && (
                <span className="card left-card">
                    <img src={'/card.png'} width={200} />
                    <figcaption>{preferredEvents[currentIndex].day} </figcaption>
                </span>
            )}

            <button onClick={() => getNextEvent()}>Next</button>


            {pop && <div className="position-fixed top-0 end-0 alert alert-success m-3">
                {pop}
            </div>}



            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites" onChange={(e) => setInvite(e.target.value)}>Post and Recieve Invites!</textarea>
            <div className="position-fixed bottom-0 end-0 alert alert-info"> {msg} </div>
            <button onClick={() => {
                setPop(`"${user}: ${invite}" successfully posted!`);
                setTimeout(() => setPop(null), 3000);
            }}>Post!</button>

        </main>
    );
}