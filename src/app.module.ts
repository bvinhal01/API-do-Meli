import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- Importe isso
import { MercadoLivreModule } from './modules/mercado-livre/mercado-livre.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- Adicione isso aqui
    MercadoLivreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}