import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { sp } from '@pnp/sp';

require('./styles.css');
const logoImg = require("../../../../stylelibrary/images/logo.png") as string;

export default function NewGame() {

  const history = useHistory();

  const pictureLibraryName: string = "Galeria";
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');
  const [imageFiles, setImageFiles] = React.useState([]);

  const userId = localStorage.getItem('userId');

  const onChangeHandler = event => {

    let files = event.target.files;
    let contador = 0;
    var arquivos = [];

    for (contador; contador < files.length; contador++) {
      arquivos.push(files[contador]);
    }

    setImageFiles(arquivos);
  };

  async function UploadArquivo(nomeBiblioteca: string, files: any): Promise<void> {
    await sp.web.getFolderByServerRelativeUrl(nomeBiblioteca).files.add(files.name, files, true)
      .then((data) => {
        console.log(data);
      });

  }

  async function CriarFolder(nomeBiblioteca: string, nomeFolder: string): Promise<void> {
    await sp.web.lists.getByTitle(nomeBiblioteca).rootFolder.serverRelativeUrl.get()
      .then(response => {
        sp.web
          .getFolderByServerRelativeUrl(response)
          .folders.add(nomeFolder);
      });
  }

  async function handleNewGame(e) {
    e.preventDefault();

    try {
      sp.web.lists.getByTitle("Games").items.add({
        Title: title,
        Description: description,
        Price: value,
        DefaultImage: (imageFiles[0].name !== null ? imageFiles[0].name.toString() : "SemImagem.png"),
        UserId: userId
      }).then(async response => {

        if (imageFiles.length > 0) {
          await CriarFolder(pictureLibraryName, response.data.ID.toString());
          await UploadArquivo(`${pictureLibraryName}/${response.data.ID}`, imageFiles[0]);
          history.push('/profile');
        }

      });
    }
    catch (err) {
      console.log("Erro", err);
    }
  }

  return (
    <div className="new-game-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Games" className="logo" />

          <h1>Cadastrar novo game</h1>
          <p>Cadastre o jogo que deseja vender.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#D96968" />
            Voltar para profile
          </Link>
        </section>

        <form onSubmit={handleNewGame}>
          <input
            placeholder="Título do jogo"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <input type="file" name="imageFiles" onChange={onChangeHandler} />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
