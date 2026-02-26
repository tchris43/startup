// import React from 'react';
// import './discover.css';



// export function Discover({ user }) {
//     const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
//     const [msg, setMsg] = React.useState('...listening');

//     React.useEffect(() => {
//         setInterval(() => {
//             const names = ['bob', 'fish', 'tim'];
//             const randomName = names[Math.floor(Math.random() * names.length)];
//             const randomCount = Math.floor(Math.random() * 100) + 1;
//             const newMsg = `${randomName}: ${randomCount}`;
//             setMsg(newMsg);
//         }, 1000);
//     })

//     function sendInvite() {
//         setCount(count + 1);
//         localStorage.setItem('count', count + 1);
//     }

//     return (
//         <main className="bg-light text-dark">
//             <h2>
//                 Your Upcoming Events - {user}
//             </h2>
//             <div id="upcomingCarousel" className="carousel slide">
//                 <div id="slide1" className="upcoming carousel-item">
//                     <span className="card left-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 1</figcaption>
//                     </span>
//                     <span className="card middle-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 2</figcaption>
//                     </span>
//                     <span className="card right-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 3</figcaption>
//                     </span>
//                 </div>
//                 <div id="slide2" className="upcoming carousel-item">
//                     <span className="card left-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 4</figcaption>
//                     </span>
//                     <span className="card middle-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 5</figcaption>
//                     </span>
//                     <span className="card right-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 6</figcaption>
//                     </span>
//                 </div>
//                 <a className="carousel-control-prev" data-slide="prev">
//                     <span className="carousel-control-prev-icon"></span>
//                 </a>
//                 <a className="carousel-control-next" data-slide="next">
//                     <span className="carousel-control-next-icon"></span>
//                 </a>
//             </div>
//             <br />
//             <h2>
//                 Browse Events
//             </h2>
//             <div id="eventCarousel" className="carousel slide">
//                 <div id="slide1" className="upcoming carousel-item">
//                     <span className="card left-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 1</figcaption>
//                     </span>
//                     <span className="card middle-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 2</figcaption>
//                     </span>
//                     <span className="card right-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 3</figcaption>
//                     </span>
//                 </div>
//                 <div id="slide2" className="upcoming carousel-item">
//                     <span className="card left-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 4</figcaption>
//                     </span>
//                     <span className="card middle-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 5</figcaption>
//                     </span>
//                     <span className="card right-card">
//                         <img src="card.png" width={200} />
//                         <figcaption>Event 6</figcaption>
//                     </span>
//                 </div>
//                 <a className="carousel-control-prev" data-slide="prev">
//                     <span className="carousel-control-prev-icon"></span>
//                 </a>
//                 <a className="carousel-control-next" data-slide="next">
//                     <span className="carousel-control-next-icon"></span>
//                 </a>
//             </div>

//             <label for="invites">Invites:</label>
//             <textarea id="invites" name="invites">Send and Recieve Invites!</textarea>
//             <div> {msg} </div>
//             <button onClick={sendInvite}>Send!</button>
//             <div>{count}</div>

//         </main>
//     );
// }

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
            const newMsg = `${randomName}: ${randomCount}`;
            setMsg(newMsg);
        }, 5000);
    })

    function sendInvite() {
        setCount(count + 1);
        localStorage.setItem('count', count + 1);
    }

    const [slide, setSlide] = React.useState(0);
    const [slide2, setSlide2] = React.useState(0);

    return (
        <main className="bg-light text-dark">
            <h2>
                Your Upcoming Events - {user}
            </h2>

            <div className="carousel slide">
                <div className={`upcoming carousel-item ${slide === 0? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide === 1? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>

                <button onClick = {() => setSlide((slide+1)%2)} className="carousel-control-prev carousel-control-prev-icon"/>
                <button onClick = {() => setSlide((slide+1)%2)} className="carousel-control-next carousel-control-next-icon"/>

            </div>

            <hr/>
            <hr/>


            <h2>
                Browse Events
            </h2>

            <div className="carousel slide">
                <div className={`upcoming carousel-item ${slide2 === 0? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>

                <div className={`upcoming carousel-item ${slide2 === 1? 'active' : ''}`}>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className="card left-card">
                        <img src="card.png" width={200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>

                <button onClick = {() => setSlide2((slide2+1)%2)} className="carousel-control-prev carousel-control-prev-icon"/>
                <button onClick = {() => setSlide2((slide2+1)%2)} className="carousel-control-next carousel-control-next-icon"/>

            </div>
            
            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites">Send and Recieve Invites!</textarea>
            <div> {msg} </div>
            <button onClick={sendInvite}>Send!</button>
            <div>{count}</div>

        </main>
    );
}