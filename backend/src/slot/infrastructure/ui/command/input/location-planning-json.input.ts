export interface LocationPlanningJsonInput {
    opening_time: {
        monday?: Array<{ from: string; to: string }>
        tuesday?: Array<{ from: string; to: string }>
        wednesday?: Array<{ from: string; to: string }>
        thursday?: Array<{ from: string; to: string }>
        friday?: Array<{ from: string; to: string }>
        saturday?: Array<{ from: string; to: string }>
        sunday?: Array<{ from: string; to: string }>
    },
    terrains: Array<{ name: string, players: number }>,
    session_duration: string,
}