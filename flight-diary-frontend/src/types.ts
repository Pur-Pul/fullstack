export interface DiaryEntry {
    id: string,
    date: string,
    weather: string,
    visibility: string,
    comment: string
};

export type NewDiaryEntry = {
    date: string,
    weather: string,
    visibility: string,
    comment: string
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type MessageType = "error" | "message"

export type Message = {
    text: string
    type: MessageType
}
