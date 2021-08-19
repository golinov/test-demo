import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProfileDocument = Profile & Document;

@Schema({
  toJSON: {
    transform: (doc: Profile, ret: Profile) => {
      if (doc.photo) {
        ret.photo = `${process.env.APP_URL}/${doc.photo}`;
      }
    },
  },
})
export class Profile {
  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  photo: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
