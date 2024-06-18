import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3ModuleOptions } from './interfaces/s3.interface';
import { S3Service } from './nest-s3.service';

@Global()
@Module({
  providers: [S3Service],
})
export class S3Module {
  static forRoot(options: S3ModuleOptions): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: 'S3_MODULE_OPTIONS',
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }

  static forRootAsync(options: {
    imports: any[];
    inject: any[];
    useFactory: (...args: any[]) => S3ModuleOptions | Promise<S3ModuleOptions>;
  }): DynamicModule {
    return {
      module: S3Module,
      imports: options.imports,
      providers: [
        {
          provide: 'S3_MODULE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
