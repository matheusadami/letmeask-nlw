import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';

import logoImage from '../../assets/images/logo.svg';
import deleteImage from '../../assets/images/delete.svg';
import answerImage from '../../assets/images/answer.svg';
import checkImage from '../../assets/images/check.svg';

import { Question } from '../../components/Question/index';
import { RoomCode } from '../../components/RoomCode/index';
import { Button } from '../../components/Button/index';

import toast, { Toaster } from 'react-hot-toast';

import { database } from '../../services/firebase';

import { PageRoom } from './styles';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { useTheme } from '../../hooks/useTheme';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const { questions, title, room } = useRoom(params.id);

  useEffect(() => {
    if (room?.endedAt) {
      history.push('/');
    }
  }, [room]);

  async function handleEndRoom() {
    await database.ref(`rooms/${params.id}`).update({
      endedAt: new Date().toString()
    });

    toast.success('Room ended successfully');
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you remove this question?')) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
      toast.success('Question removed successfully');
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true
    });
  }
  
  return (
    <PageRoom theme={theme}>
      <header>
        <div className="content">
          <img src={logoImage} alt="Letmeask" />
          <div>
            <ThemeSwitcher />
            <RoomCode theme={theme} code={params.id}></RoomCode>
            <Button onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => 
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered
              &&
              (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImage} alt="Check question as answered" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImage} alt="Highlights the question" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImage} alt="Delete question" />
              </button>
            </Question>
          )}
        </div>

        <Toaster />
      </main>
    </PageRoom>
  );
}
