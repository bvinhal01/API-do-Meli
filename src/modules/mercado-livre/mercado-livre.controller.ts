import { Controller, Get, Param } from '@nestjs/common';
import { MercadoLivreService } from './mercado-livre.service';

@Controller('meli') // Isso define que todas as URLs aqui começam com /meli
export class MercadoLivreController {
  
  // Injetamos o Service aqui para podermos usar a lógica que escrevemos antes
  constructor(private readonly mercadoLivreService: MercadoLivreService) {}

  // Criamos uma rota do tipo GET que aceita um ID na URL
  // Exemplo: localhost:3000/meli/buscar/MLB12345
  @Get('buscar/:id')
  async buscarProduto(@Param('id') id: string) {
    // Aqui chamamos o serviço e retornamos o resultado
    return await this.mercadoLivreService.buscarProdutoNoMeli(id);
  }
}