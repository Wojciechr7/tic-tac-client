import {IPlayer} from './iplayer';
import {ISessionResult} from './isessionresult';


export interface ISession {
    from: IPlayer;
    to: IPlayer;
    id: number;
    squares: Array<any>;
    result: ISessionResult;
    status: boolean;
    actualPlayer: IPlayer;
}
