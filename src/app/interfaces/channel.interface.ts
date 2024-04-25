export interface Channel {
    id?: string,
    name : string,
    description : string,
    created_at: number,
    creator: string, // 'user_id'
    members: string[], 
    active_members: string[],
    channel_type: 'main' | 'direct' | 'thread' ,
}