import { Player } from "./player";

export interface GameSetting {
    gridColCount: number;
    consecutiveSymbolCount: number;
    players: Player[];
}
