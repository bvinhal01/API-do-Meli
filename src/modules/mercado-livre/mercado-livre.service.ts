import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MercadoLivreService {
  private readonly logger = new Logger(MercadoLivreService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // Para ler o .env
  ) {}

  // 1. Gera o link que você vai clicar para autorizar o app
  getAuthorizationUrl() {
    const clientId = this.configService.get('ML_CLIENT_ID');
    const redirectUri = this.configService.get('ML_REDIRECT_URI');
    return `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  }

  // 2. Troca o código recebido pelo Token Real
  async exchangeCodeForToken(code: string) {
    const url = 'https://api.mercadolibre.com/oauth/token';
    const body = {
      grant_type: 'authorization_code',
      client_id: this.configService.get('ML_CLIENT_ID'),
      client_secret: this.configService.get('ML_CLIENT_SECRET'),
      code: code,
      redirect_uri: this.configService.get('ML_REDIRECT_URI'),
    };

    try {
      const { data } = await firstValueFrom(this.httpService.post(url, body));
      this.logger.log('Token gerado com sucesso!');
      return data; // Aqui vem o access_token
    } catch (error) {
      this.logger.error('Erro ao gerar token', error.response?.data);
      throw error;
    }
  }
}