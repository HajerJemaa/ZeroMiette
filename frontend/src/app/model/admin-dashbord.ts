export class AdminDashbord {
    constructor(
        public stats: {
          total_users: number;
          pending_users: number;
          total_announcements: number;
        },
        public recent_activity: { type: string; user_name?: string; title?: string; dateC: string }[],
        public admin_profile: {
          user_name: string;
          email: string;
          first_name?: string;
          last_name?: string;
          number?: string;
        }
    ){}

}
