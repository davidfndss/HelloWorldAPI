import { Injectable, BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { createClient } from '@supabase/supabase-js'
import { PrismaService } from 'src/database/prisma.service'
import { SuccessMsg, ISuccessMsg } from 'src/utils/SuccessMsg'

@Injectable()
export class UploadsService {

  @Inject() 
  private readonly prisma: PrismaService;
  
  async uploadImageService(image: UploadImageDto, userId: string, avatarOrBackground: string): Promise<ISuccessMsg> {
    if (!image || !image.fieldname) {
      throw new BadRequestException('Invalid image uploaded');
    }
    image.originalname = String(userId + `.${avatarOrBackground}`)
    const supabaseURL = process.env.SUPABASE_URL
    const supabaseKEY = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false
      }      
    })
    const data = await supabase.storage.from(process.env.SUPABASE_BUCKET).upload(image.originalname, image.buffer, {
      upsert: true
    })
    const imgSignedUrl = await supabase.storage.from(process.env.SUPABASE_BUCKET).createSignedUrl(image.originalname, 157680000)

    let updateData
    if (avatarOrBackground == 'avatar') {
      updateData = {
        avatar: imgSignedUrl.data.signedUrl
      }
    }
    if (avatarOrBackground == 'background') {
      updateData = {
        background: imgSignedUrl.data.signedUrl
      }
    }
    
    const avatarUpdated = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: updateData
    })
    if (!avatarUpdated) throw new InternalServerErrorException('Internal server error')
    return SuccessMsg(`${avatarOrBackground} updated successfuly`)
  }
}
