export interface CatalogType {
	cata_name: string;
	user_id: number;
	cata_id: number;
}

export interface MemoType {
	memo_id: number;
	cata_id: number;
	title: string;
	content: string;
	update_at: number;
}
