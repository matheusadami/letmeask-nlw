import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type RoomType = {
  title: string;
  authorId: string;
  endedAt?: string; 
};

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId?: string;
};

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string
  }>
}>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [room, setRoom] = useState<RoomType>();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const reference = database.ref(`rooms/${roomId}`);

    reference.on('value', room => {
      const firebaseQuestions: FirebaseQuestions = room.val().questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likesCount: Object.values(value.likes ?? []).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        };
      });

      setRoom(room.val() as RoomType);
      setTitle(room.val().title);
      setQuestions(parsedQuestions);
    });

    return () => {
      reference.off('value');
    };

  }, [roomId, user?.id]);

  return { questions, title, room };
}
