import React from 'react';
import './discover.css';
import {InviteEvent, InviteNotifier} from './eventNotifier.js';



export function Discover({ user }) {
    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
    const [msg, setMsg] = React.useState('...listening');
    const [inviteEvents, setInviteEvents] = React.useState([]);

    React.useEffect(() => {
        InviteNotifier.addHandler(handleInviteEvent);

        return () => {
            InviteNotifier.removeHandler(handleInviteEvent);
        };
    });

    function handleInviteEvent(inviteEvent) {
        setInviteEvents([...inviteEvents, inviteEvent]);
    }

    function createInviteArray() {
        const messageArray = [];
        for (const [i, inviteEvent] of inviteEvents.entries()) {
            console.log(inviteEvent);
            let message = `${inviteEvent.from}: ${inviteEvent.value}`;

            messageArray.push(
                <div key={i}>
                    <span> {message} </span>
                </div>
            );
        }
        return messageArray;
    }

    // React.useEffect(() => {
    //     setInterval(() => {
    //         const names = ['bob', 'fish', 'tim'];
    //         const randomName = names[Math.floor(Math.random() * names.length)];
    //         const randomCount = Math.floor(Math.random() * 9) + 1;
    //         const newMsg = `${randomName}: come with me to event ${randomCount}!`;
    //         setMsg(newMsg);
    //     }, 5000);
    // }, [])




    const [pop, setPop] = React.useState(null);
    const [invite, setInvite] = React.useState(null);

    const [events, setEvents] = React.useState([]);
    const [preferredEvents, setPreferredEvents] = React.useState([]);

    const [preferredTypes, setTypes] = React.useState([]);
    const [preferredDays, setDays] = React.useState([]);

    async function setUp(){
        const response = await fetch("/api/getPref");
        const json = await response.json();

        const eventResponse = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=GRGAmTWkOolvR63LJvSsnshUlS48au9A");
        const eventData = await eventResponse.json();
    
        console.log("got the response!");
        console.log(eventData._embedded.events);
        const parsedEvents = parseResponse(eventData);
        console.log(json.preferences.types);
        console.log(json.preferences.days);
        console.log(parsedEvents);
        setPreferredEvents(parsedEvents.filter((event) => {
        const typeMatch = json.preferences.types.length == 0 || json.preferences.types.includes(event.type);
        const dayMatch = json.preferences.days.length == 0 || json.preferences.days.includes(event.day);
        
        return typeMatch && dayMatch;
        }));
    }

    React.useEffect(() => {
        setUp();
    }, [])

    function toWeekday(dateTime){
        const days = ['m', 't', 'w', 'th', 'f', 's', 'su'];
        const date = new Date(dateTime);
        const dayIndex = date.getDay();
        return days[dayIndex];
    }


    function parseResponse(res){
        const eventList = res._embedded.events;
        let parsedEvents = [];
        for (let event of eventList){
            //TODO: verify adding name worked
            let name = event.name;
            let url = event.url;
            let type = event.classifications[0].segment.name;
            let day =  toWeekday(event.dates.start.localDate);
            parsedEvents.push({
                name: name,
                url: url,
                type: type,
                day: day
            });
        }
        return parsedEvents;
       
        
    }



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
                    <figcaption>{preferredEvents[currentIndex].name} </figcaption>
                    <a href= {preferredEvents[currentIndex].url} > Event Link </a>
                </span>
            )}

            <button onClick={() => getNextEvent()}>Next</button>


            {pop && <div className="position-fixed top-0 end-0 alert alert-success m-3">
                {pop}
            </div>}



            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites" onChange={(e) => setInvite(e.target.value)}>Post and Recieve Invites!</textarea>
            <div className="position-fixed bottom-0 end-0 alert alert-info"> {createInviteArray()} </div>
            <button onClick={() => {
                setPop(`"${user}: ${invite}" successfully posted!`);
                setTimeout(() => setPop(null), 3000);
                InviteNotifier.broadcastEvent(user, InviteEvent.Invite, invite);
            }}>Post!</button>

        </main>
    );
}