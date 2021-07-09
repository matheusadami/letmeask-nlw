import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import googleIconImage from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button/index';

import { database } from '../../services/firebase';

import toast, { Toaster } from 'react-hot-toast';

import { PageAuth } from './styles';

export function Home() {
  const history = useHistory();
  const { user, googleSignIn } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await googleSignIn();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim()) {

      const room = await database.ref(`rooms/${roomCode}`).get();

      if (!room.exists()) {
        return toast.error('You must be logger in');
      }

      if (room.val().endedAt) {
        return toast.error('Room already closed');
      }

      history.push(`/rooms/${roomCode}`);
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImage} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
        <Toaster />
      </main>
    </PageAuth>
  )
}
