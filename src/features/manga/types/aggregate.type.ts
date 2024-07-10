export interface AggregateChapter {
  /**
   * The chapter number or identifier.
   * @example "0"
   */
  chapter: string;
  /**
   * The unique identifier for the chapter.
   * @example "1978b489-0cee-46f1-8962-b1007e79f84f"
   */
  id: string;
  /**
   * An array of other related chapter IDs.
   * @example ["262a7aa1-4dd1-4bde-8cbf-0c39c31c9ab2", "5beb7d92-e39d-4238-8482-90baaa1febcc"]
   */
  others: string[];
  /**
   * The count of related chapters.
   * @example 6
   */
  count: number;
}

interface Volume {
  /**
   * The volume number or identifier.
   * @example "1"
   */
  volume: string;
  /**
   * The count of chapters in the volume.
   * @example 32
   */
  count: number;
  /**
   * A dictionary of chapters in the volume.
   */
  chapters: { [key: string]: AggregateChapter };
}

interface Volumes {
  /**
   * A dictionary of volumes.
   */
  [key: string]: Volume;
}

export interface MangaAggregate {
  /**
   * The result of the request.
   * @example "ok"
   */
  result: string;
  /**
   * A dictionary of volumes.
   */
  volumes: Volumes;
}
