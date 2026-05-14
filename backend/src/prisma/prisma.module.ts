import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Bu dekoratör sayesinde PrismaService tüm projede her an erişilebilir olacak
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Diğer modüllerin kullanabilmesi için dışa aktarıyoruz
})
export class PrismaModule {}