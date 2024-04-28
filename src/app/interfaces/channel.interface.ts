import { ChannelTypeEnum } from '../shared/enums/channel-type.enum';

export interface Channel {

  id?: string;
  name: string;
  description: string;
  created_at: number;
  creator: string; // 'user_id'
  members: string[];
  active_members: string[];
  channel_type: ChannelTypeEnum;
}

