import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MercadoLivreService } from './mercado-livre.service';
import { MercadoLivreController } from './mercado-livre.controller';

@Module({
  imports: [HttpModule],
  providers: [MercadoLivreService],
  controllers: [MercadoLivreController], // <--- Certifique-se que o Controller está aqui
})
export class MercadoLivreModule {}