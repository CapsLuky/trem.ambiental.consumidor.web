import { IMessages } from './IMessages';

export interface IRequestResult<TypeOut> {
  success: boolean;
  payload: TypeOut;
  errors: Array<{titulo: '', mensagem: '', tipo: ''}>;
  messages: Array<IMessages>;
}
