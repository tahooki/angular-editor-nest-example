import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/content')
  getContent(): string {
    return JSON.stringify({content: this.appService.getContent()});
  }

  @Post('update/content')
  updateContent(@Body() body): string {
    this.appService.setContent(body.content);
    return JSON.stringify({isSucceed: true});
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() files) {
    return JSON.stringify({
      imageUrl: `http://localhost:3000/images/${files[0].filename}`,
    });
  }
}
