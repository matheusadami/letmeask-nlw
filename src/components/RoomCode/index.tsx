import toast from 'react-hot-toast';

import copyImage from '../../assets/images/copy.svg';
import { ThemeType } from '../../contexts/ThemeContext';

import { ComponentRoomCode } from './styles';

type RoomCodeProps = {
  theme?: ThemeType;
  code: string;
};

export function RoomCode(props: RoomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Copied to clipboard');
  }

  return  (
    <ComponentRoomCode theme={props.theme} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImage} alt="Copy room code" title="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </ComponentRoomCode>
  );
}
