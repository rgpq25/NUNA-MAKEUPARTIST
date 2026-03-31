import type { Access } from "payload";

export const isLoggedInOrPublished: Access = ({ req: { user } }) => {
	// Return true if user is logged in
	if (user) {
		return true;
	}

	// Non-logged in users can only read published docs
	return {
		_status: {
			equals: "published",
		},
	};
};
