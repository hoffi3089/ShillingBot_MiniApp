// types.ts
export interface Admin {
    id: number;
    username: string;
    isOwner: boolean;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    username: string;
    raidCount?: number;
    engagement?: number;
    participationCount?: number;
  }
  
  export interface LeaderboardData {
    topHosts: LeaderboardEntry[];
    mostEngaged: LeaderboardEntry[];
    mostFrequentParticipants: LeaderboardEntry[];
  }
  
  export interface LeaderboardResponse {
    admins: string;
    today: LeaderboardData;
    thisMonth: LeaderboardData;
    allTime: LeaderboardData;
  }
  