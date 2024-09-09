export interface Note {
  id: string;
  title: string;
  parent_id: string | null;
  content: string;
  type: "shared" | "private";
}
