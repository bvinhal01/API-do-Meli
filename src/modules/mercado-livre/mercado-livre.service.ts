import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProductResponseDto } from './dtos/product-response.dto';

@Injectable()
export class MercadoLivreService {
  private readonly logger = new Logger(MercadoLivreService.name);

  constructor(private readonly httpService: HttpService) {}

  async buscarProdutoNoMeli(idDoProduto: string): Promise<ProductResponseDto> {
    const url = `https://api.mercadolibre.com/items/${idDoProduto}`;
    
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      
      return {
        id: data.id,
        title: data.title,
        price: data.price,
        currency_id: data.currency_id,
        permalink: data.permalink,
        thumbnail: data.thumbnail,
      };
    } catch (error) {
      // ESTA LINHA ABAIXO É A CHAVE: Ela vai imprimir o erro real no terminal
      console.error('ERRO REAL DA API:', error.response?.data || error.message);
      
      this.logger.error(`Erro ao buscar produto: ${error.message}`);
      throw new Error(`Erro ao buscar produto: ${idDoProduto}`);
    }
  }
}