import { IAnnouncement } from "../interfaces/announcement.interface";

export class Announcement implements IAnnouncement {
    constructor(
        public title: string,
        public description: string,
        public date: Date
    ) { }
}