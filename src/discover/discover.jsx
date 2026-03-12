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

    //Don't forget to update preferredEvents functionality


    const [slide, setSlide] = React.useState(0);
    const [slide2, setSlide2] = React.useState(0);
    const [pop, setPop] = React.useState(null);
    const [invite, setInvite] = React.useState(null);

    const [events, setEvents] = React.useState([]);
    const [preferredEvents, setPreferredEvents] = React.useState([]);


    React.useEffect(() => {
    setEvents([
      { image: "/concert.png", type: "concert", day: "m", price: 120 },
      { image: "/dance.png", type: "dance", day: "t", price: 45 },
      { image: "/play.png", type: "play", day: "w", price: 60 },
      { image: "/concert.png", type: "concert", day: "th", price: 80 },
      { image: "/dance.png", type: "dance", day: "f", price: 30 },
      { image: "/play.png", type: "play", day: "s", price: 150 },
      { image: "/concert.png", type: "concert", day: "m", price: 200 },
      { image: "/dance.png", type: "dance", day: "th", price: 20 },
      { image: "/play.png", type: "play", day: "f", price: 75 }
    ]);
}, []);

    React.useEffect(() => {
        const preferredTypes = localStorage.getItem("types");
        const preferredDays = localStorage.getItem("days");
        const preferredPrice = localStorage.getItem("price");
        events.forEach((event, index) => {
            if (preferredTypes.includes(event.type) && preferredDays.includes(event.day) && event.price <= parseInt(preferredPrice)){
                setPreferredEvents([...preferredEvents, event]);
            }
        })
    }, [])
    

    return (
        <main className="bg-light text-dark">
            <h2>
                Browse Events
            </h2>

            <div className="carousel slide">
                <div className= "carousel-inner">
                    <div className='upcoming carousel-item active'>
                        {preferredEvents.map((event) => (
                            event.image &&(
                            <span className="card left-card">
                                <img src={event.image} width={200} />
                                <figcaption>{event.day} ${event.price}</figcaption>
                            </span>
                            )
                        ))}
                    </div>
                </div>

                {/* <div className={`upcoming carousel-item ${slide2 === 1? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide2 === 2? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={preferredEvents[0].image} width={200} />
                        <figcaption>{preferredEvents[0].day} ${preferredEvents[0].price}</figcaption>
                    </span>
                </div> */}

                {pop && <div className="position-fixed top-0 end-0 alert alert-success m-3">
                    {pop}
                </div>}

                <button onClick = {() => setSlide2(slide2 === 0? 2 : slide2-1)} className="carousel-control-prev carousel-control-prev-icon"></button>
                <button onClick = {() => setSlide2(slide2 === 2? 0 : slide2+1)} className="carousel-control-next carousel-control-next-icon"></button>

            </div>
            
            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites" onChange={(e) => setInvite(e.target.value)}>Post and Recieve Invites!</textarea>
            <div className = "position-fixed bottom-0 end-0 alert alert-info"> {msg} </div>
            <button onClick={() => {
                setPop(`"${user}: ${invite}" successfully posted!`);
                setTimeout(() => setPop(null), 3000);
            }}>Post!</button>

        </main>
    );
}