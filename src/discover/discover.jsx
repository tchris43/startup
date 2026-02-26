import React from 'react';
import './discover.css';



export function Discover({ user }) {
    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
    const [msg, setMsg] = React.useState('...listening');

    React.useEffect(() => {
        setInterval(() => {
            const names = ['bob', 'fish', 'tim'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCount = Math.floor(Math.random() * 100) + 1;
            const newMsg = `${randomName}: come with me to event ${randomCount}!`;
            setMsg(newMsg);
        }, 5000);
    }, [])


    const [slide, setSlide] = React.useState(0);
    const [slide2, setSlide2] = React.useState(0);
    const [pop, setPop] = React.useState(null);
    const [invite, setInvite] = React.useState(null);

    const [events, setEvents] = React.useState(null);

    React.useEffect(() => {
        setEvents("card.png");
    }, [])    
    

    return (
        <main className="bg-light text-dark">
            <h2>
                Your Upcoming events - {user}
            </h2>

            <div className="carousel slide">
                <div className={`upcoming carousel-item ${slide === 0? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide === 1? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide === 2? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 7</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 8</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 9</figcaption>
                    </span>
                </div>

                <button onClick = {() => setSlide((slide === 0? 2 : slide-1))} className="carousel-control-prev carousel-control-prev-icon"/>
                <button onClick = {() => setSlide((slide === 2? 0 : slide+1))} className="carousel-control-next carousel-control-next-icon"/>

            </div>

            <hr/>
            <hr/>


            <h2>
                Browse {events}
            </h2>

            <div className="carousel slide">
                <div className={`upcoming carousel-item ${slide2 === 0? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide2 === 1? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide2 === 2? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 7</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 8</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src={events} width={200} />
                        <figcaption>Event 9</figcaption>
                    </span>
                </div>

                {pop && <div className="position-fixed top-0 end-0 alert alert-info m-3">
                    {pop}
                </div>}

                <button onClick = {() => setSlide2(slide2 === 0? 2 : slide2-1)} className="carousel-control-prev carousel-control-prev-icon"/>
                <button onClick = {() => setSlide2(slide2 === 2? 0 : slide2+1)} className="carousel-control-next carousel-control-next-icon"/>

            </div>
            
            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites" onChange={(e) => setInvite(e.target.value)}>Post and Recieve Invites!</textarea>
            <div> {msg} </div>
            <button onClick={() => {
                setPop(`"${user}: ${invite}" successfully posted!`);
                setTimeout(() => setPop(null), 3000);
            }}>Post!</button>

        </main>
    );
}