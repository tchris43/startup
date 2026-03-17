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
    const [preferredPrice, setPrice] = React.useState(0);

    

    //TODO: Actually do something with this
    React.useEffect(() => {
        console.log("Fetching the API");
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=GRGAmTWkOolvR63LJvSsnshUlS48au9A")
        .then((response) => response.json())
        .then((data) => {
            console.log("got the response!");
            console.log(data._embedded.events);
        })
        .catch((error) => {
            console.log("Error fetching events: ", error);
        });
    }, [])


    React.useEffect(() => {
        setEvents([
            { image: "/concert.png", type: "concerts", day: "m", price: 120 },
            { image: "/dance.png", type: "dances", day: "t", price: 45 },
            { image: "/play.png", type: "plays", day: "w", price: 60 },
            { image: "/concert.png", type: "concerts", day: "th", price: 80 },
            { image: "/dance.png", type: "dances", day: "f", price: 30 },
            { image: "/play.png", type: "plays", day: "s", price: 150 },
            { image: "/concert.png", type: "concerts", day: "m", price: 200 },
            { image: "/dance.png", type: "dances", day: "th", price: 20 },
            { image: "/play.png", type: "plays", day: "f", price: 75 }
        ]);
    }, []);



    // const preferredTypes = JSON.parse(localStorage.getItem("types") || "[]");
    // const preferredDays = JSON.parse(localStorage.getItem("days") || "[]");
    // const preferredPrice = parseInt(localStorage.getItem("price"));


    //TODO: Fix the backend to be a map for each cat

    React.useEffect(() => {
        fetch("/api/getPref")
        .then((response) => response.json())
        .then((preferences) => {
            setTypes(preferences.types);
            setDays(preferences.days);
            setPrice(preferences.price);
        })
    })

   


    const preferredEvents = events.filter((event) => {
        const typeMatch = preferredTypes.length == 0 || preferredTypes.includes(event.type);
        const dayMatch = preferredDays.length == 0 || preferredDays.includes(event.day);
        const priceMatch = isNaN(preferredPrice) || event.price <= preferredPrice;
        
        return typeMatch && dayMatch && priceMatch;
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
                    <img src={preferredEvents[currentIndex].image} width={200} />
                    <figcaption>{preferredEvents[currentIndex].day} ${preferredEvents[currentIndex].price}</figcaption>
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