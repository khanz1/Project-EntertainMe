/**
 * Represents the name and description with multiple language properties.
 */
interface NameDescription {
  /**
   * Name or description in English.
   * @example "Oneshot"
   */
  en?: string;
}

/**
 * Represents the attributes of a tag.
 */
interface TagAttributes {
  /**
   * Name of the tag.
   * @example { en: "Oneshot" }
   */
  name: NameDescription;
  /**
   * Description of the tag.
   * @example {}
   */
  description: NameDescription;
  /**
   * Group to which the tag belongs.
   * @example "format"
   */
  group: string;
  /**
   * Version of the tag.
   * @example 1
   */
  version: number;
}

/**
 * Represents a relationship of a tag.
 */
interface Relationship {
  /**
   * ID of the related item.
   * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  id: string;
  /**
   * Type of the related item.
   * @example "string"
   */
  type: string;
  /**
   * Related item type.
   * @example "monochrome"
   */
  related: string;
  /**
   * Attributes of the related item.
   * @example {}
   */
  attributes: Record<string, unknown>;
}

/**
 * Represents a tag data.
 */
export interface TagData {
  /**
   * ID of the tag.
   * @example "0234a31e-a729-4e28-9d6a-3f87c4966b9e"
   */
  id: string;
  /**
   * Type of the tag.
   * @example "tag"
   */
  type: string;
  /**
   * Attributes of the tag.
   */
  attributes: TagAttributes;
  /**
   * Relationships of the tag.
   * @example []
   */
  relationships: Relationship[];
}

/**
 * Represents the response containing a collection of tags.
 */
export interface TagCollection {
  /**
   * Result of the request.
   * @example "ok"
   */
  result: string;
  /**
   * Type of the response.
   * @example "collection"
   */
  response: string;
  /**
   * Data of the tags.
   */
  data: TagData[];
  /**
   * Limit of the items in the response.
   * @example 76
   */
  limit: number;
  /**
   * Offset of the items in the response.
   * @example 0
   */
  offset: number;
  /**
   * Total number of items available.
   * @example 76
   */
  total: number;
}