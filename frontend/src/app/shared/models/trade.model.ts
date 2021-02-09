export interface Trade {
    type: string,
    id?: number,
    date?: Date,
    motivation: string,
    description: string,
    expectedIncrease: number,
    percent: number,
    startdate: Date,
    enddate: Date,
    fiatcurrency: string,
    cryptocurrency: string,
    author?: string
}
