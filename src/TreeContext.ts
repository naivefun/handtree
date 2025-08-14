import { createContext } from "react";

export interface ITreeContext {
	indent: number;
	/**
	 * Ordered trail from root to parent of current node indicating whether
	 * each ancestor at that depth is the last node in its branch.
	 * Index corresponds to depth level.
	 */
	ancestorLastTrail: boolean[];

	classNames?: {
		chevron?: string;
	}
}

export const TreeContext = createContext<ITreeContext>(null as any);
TreeContext.displayName = "TreeContext";


