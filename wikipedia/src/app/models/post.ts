export class Post {
  id: number;
  name: string;
  description: string;
  references: string[];
  userId: string;
  userName: string;
  createdAt: string;
  lastUpdatedAt: string;
  topic: string[];
  like: number;
  dislike: number;

  constructor(
    id: number,
    name: string,
    description: string,
    references: string[],
    userId: string,
    userName: string,
    createdAt: string,
    lastUpdatedAt: string,
    topic: string[],
    like: number,
    dislike: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.references = references;
    this.userId = userId;
    this.userName = userName;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
    this.topic = topic;
    this.like = like;
    this.dislike = dislike;
  }
}
