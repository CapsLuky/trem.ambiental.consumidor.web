import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

export class TokenModel {
  usuarioId!: string;
  nome!: string;
  email!: string;
  role = new Array<string>();
  expirationDate!: moment.Moment;
  isExpired = true;
  tokenType!: string;

  constructor(readonly accessToken: string | null) {
    this.deserializeToken(accessToken);
  }

  private deserializeToken(token: string | null): void {

    if (token === null) {
      return;
    }

    const decoder = new JwtHelperService();
    const tokenDesereized = decoder.decodeToken(token);


    this.usuarioId = tokenDesereized.sub;
    this.nome = tokenDesereized.unique_name;
    this.email = tokenDesereized.email;
    this.role.push(tokenDesereized.role);
    this.expirationDate = moment(decoder.getTokenExpirationDate(token));
    this.isExpired = decoder.isTokenExpired(token);
    this.tokenType = 'bearer';
  }
}
