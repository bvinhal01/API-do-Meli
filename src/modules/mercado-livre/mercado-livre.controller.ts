import { Controller, Get, Query } from '@nestjs/common';
import { MercadoLivreService } from './mercado-livre.service';

@Controller('meli')
export class MercadoLivreController {
  constructor(private readonly mercadoLivreService: MercadoLivreService) {}

  // Rota 1: Digite isso no navegador para começar
  @Get('login')
  login() {
    return { url: this.mercadoLivreService.getAuthorizationUrl() };
  }

  // Rota 2: O Mercado Livre vai chamar essa rota automaticamente (Callback)
  @Get() // Note que deixei vazio para pegar a raiz do redirect_uri
  async handleCallback(@Query('code') code: string) {
    if (code) {
      return await this.mercadoLivreService.exchangeCodeForToken(code);
    }
    return { message: 'Aguardando código...' };
  }
}