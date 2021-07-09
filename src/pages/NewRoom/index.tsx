import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';

import { Button } from '../../components/Button/index';

import { useState } from 'react';

import { database } from '../../services/firebase';

import { PageAuth } from './styles';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [roomName, setRoomName] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (roomName.trim()) {
      const reference = database.ref('rooms');

      const firebaseRoom = await reference.push({
        title: roomName,
        authorId: user?.id
      });

      history.push(`/admin/rooms/${firebaseRoom.key}`);
    }
  }

  return (
    <PageAuth>
      <aside>
        <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire suas dúvidas de sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImage} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </PageAuth>
  )
}
