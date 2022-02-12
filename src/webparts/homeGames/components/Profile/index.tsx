import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { sp } from '@pnp/sp';

require('./styles.css');
const logoImg = require("../../../../stylelibrary/images/logo.png") as string;

export default function Profile(props) {
    const history = useHistory();
    const [games, setGames] = useState([]);

    const Nome = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    async function loadgames() {
      await sp.web.lists
        .getByTitle("Games")
        .select("ID, Title, Description, Price, UserId, DefaultImage")
        .items
        .filter(`UserId eq ${userId}`)
        .top(5000)
        .get()
        .then(items => {
            setGames(items);
        },
        (err) => {
          console.log("Erro ao carregar! ", err);
        });
    }

    async function handleDeletegame(id) {
        try
        {
            await sp.web.lists
            .getByTitle("Games")
            .items.getById(id)
            .delete()
            .then(async () => {

                setGames(games.filter(game => game.ID !== id));
                await sp.web.lists
                    .getByTitle("Galeria")
                    .rootFolder.serverRelativeUrl.get()
                    .then(async response => {
                        await sp.web
                          .getFolderByServerRelativeUrl(`${response}/${id}`)
                          .delete()
                          .then(() => {
                              console.log("deletou a folder");
                          });
                    });

            });
        }
        catch(err)
        {
            alert('Erro ao deletar');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    useEffect(() => {
      loadgames();
    }, []);

    return (
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Games" className="logo"/>
                <span>Bem vindo(a), {Nome}</span>

                <Link className="button" to="/games/new">Cadastrar novo game</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#D96968" />
                </button>
            </header>

            {games.length > 0 ? <h1>games cadastrados</h1> : null}

            <ul>
                {games.length > 0 ? (
                    games.map(game => (
                        <li key={game.ID}>
                            <strong>GAME:</strong>
                            <p>{game.Title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{game.Description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(game.Price)}</p>
                            <p><img width="150" src={game.DefaultImage === "SemImagem.png" ? props.siteUrl + "/Galeria/SemImagem.png"
                              : decodeURIComponent(props.siteUrl + "/Galeria/"+ game.ID + "/" + game.DefaultImage)} /></p>

                            <button onClick={() => handleDeletegame(game.ID)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))) : (<h1>nenhum game cadastrado</h1>)
                }
            </ul>
        </div>
    );
}
