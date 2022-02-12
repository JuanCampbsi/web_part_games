import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { sp } from '@pnp/sp';

require('./styles.css');
const logoImg = require("../../../../stylelibrary/images/logo.png") as string;
const gamesimg = require("../../../../stylelibrary/images/games.png") as string;

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();

        try
        {
            sp.web.lists
            .getByTitle("Users")
            .select("ID, Title, Email, WhatsApp, City, UF")
            .items
            .filter(`ID eq ${id}`)
            .top(1)
            .get()
            .then(items => {
                localStorage.setItem('userId', id);
                localStorage.setItem('userName', items[0].Title);
                history.push('/profile');
            });

        }
        catch(err) {
            alert('Falha no login');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Games" className="logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <input
                        placeholder="Seu UserID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                </form>
            </section>

            <img src={ gamesimg } alt="Games" className="imagemHome"/>
        </div>
    );
}


