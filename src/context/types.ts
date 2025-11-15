type JSONArray = Array<string | number | boolean | null | JSONObject | JSONArray>;
type JSONObject = { [key: string]: JSONValue };
type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

export type { JSONArray, JSONObject, JSONValue };